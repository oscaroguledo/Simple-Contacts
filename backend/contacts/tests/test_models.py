# contacts/tests/test_models.py
from django.test import TestCase
from .models import Contact

class ContactModelTest(TestCase):
    def test_string_representation(self):
        contact = Contact(name='John Doe')
        self.assertEqual(str(contact), 'John Doe')

    def test_contact_creation(self):
        contact = Contact.objects.create(
            name='Jane Doe',
            address='16 beauly place',
            phone_number='0987654321'
        )
        self.assertEqual(contact.name, 'Jane Doe')
        self.assertEqual(contact.address, '16 beauly place')
        self.assertEqual(contact.phone_number, '0987654321')
