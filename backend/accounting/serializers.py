from rest_framework import serializers
from .models import Account, Transaction,FundTransfer
from user_app.models import CustomUser

class ShortUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','name','email']

class AccountSerializer(serializers.ModelSerializer):
    user = ShortUserDetailsSerializer(read_only=True)  # Include user details

    class Meta:
        model = Account
        fields = ['user', 'balance']  # Include user and balance

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'amount', 'transaction_type', 'trans_mode', 'issued_by', 'issued_date', 'status']

class TransactionApproveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['status']

class FundTransferSerializer(serializers.ModelSerializer):
    class Meta:
        model=FundTransfer
        fields=['transfer_to','transfer_from','amount','issued_by','issued_date']
