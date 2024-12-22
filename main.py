import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import qrcode

load_dotenv()

SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def send_email(user_email, user_name, qr_image_path):
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = user_email
    msg['Subject'] = "Your Event Ticket"

    body = f"Hello {user_name},\n\nPlease find your event ticket attached. This is a automated test email. If it worked, then I'm super cool and you should be happy about that.\n\nBest regards, my Python script uwu!"
    msg.attach(MIMEText(body, 'plain'))

    with open(qr_image_path, "rb") as f:
        img = MIMEImage(f.read())
        img.add_header('Content-Disposition', 'attachment', filename=os.path.basename(qr_image_path))
        msg.attach(img)

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, user_email, msg.as_string())
        print(f"Email sent to {user_name} at {user_email}")
    except Exception as e:
        print(f"Error sending email to {user_name}: {str(e)}")
    finally:
        server.quit()
        
URL = os.getenv("REACT_APP_SUPABASE_URL")
KEY = os.getenv("REACT_APP_SUPABASE_ANON_KEY")

supabase: Client = create_client(URL, KEY)

fetchUsers = supabase.table("users").select("*").execute()

qr_codes_folder = "qr_codes"
if not os.path.exists(qr_codes_folder):
    os.makedirs(qr_codes_folder)

for user in fetchUsers.data:
    qr_url = user['random_key']
    qr_img = qrcode.make(qr_url)
    qr_img.save(os.path.join(qr_codes_folder, f"{user['name']}_ticket.png"))
    
    send_email(user["email"], user["name"], os.path.join(qr_codes_folder, f"{user['name']}_ticket.png"))
