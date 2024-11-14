        #  Email Verification 
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.template.loader import render_to_string

def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    domain = get_current_site(request).domain
    verification_url = reverse('verify-email', kwargs={'uid': uid, 'token': token})
    full_url = f"http://{domain}{verification_url}"
    
    subject = "Email Verification"
    message = render_to_string('email_verification.html', {
        'user': user,
        'verification_url': full_url,
    })
    send_mail(subject, message, 'from@example.com', [user.email])