from rest_framework import generics
from .models import Account,Transaction,FundTransfer
from .serializers import AccountSerializer,TransactionSerializer,TransactionApproveSerializer,FundTransferSerializer
from .permissions import IsAdminUser
from user_app.permissions import IsSuperUser
from rest_framework.permissions import AllowAny,IsAuthenticated  
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import transaction as db_transaction

class AllUserBalanceDetailsView(generics.ListAPIView):
    queryset=Account.objects.all()
    serializer_class=AccountSerializer
    permission_classes=[IsAdminUser]

class CheckBalanceView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]  # Require authentication and custom permission

    def get_object(self):
        # Get the account for the user with the ID passed in the URL
        account = Account.objects.get(user_id=self.kwargs['pk'])
        
        # Ensure the requesting user is either the owner of the account or a staff member
        if self.request.user.is_staff or account.user == self.request.user:
            return account
        else:
            # If not allowed, raise a permission denied error
            raise PermissionDenied("You do not have permission to view this balance.")
        
class TransactionCreateView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        transaction = serializer.save(issued_by=self.request.user, status='pending')
        # transaction = serializer.save()  # Save the transaction first
        user = transaction.user  # Get the user from the saved transaction

        # Check if the account exists; if not, create one
        account, created = Account.objects.get_or_create(user=user)
        # Only update the account balance if it's a deposit
        if transaction.transaction_type == 'deposit':
            account = transaction.user.account
            account.update_balance(transaction.amount, transaction.transaction_type)

class TransactionApproveView(generics.UpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionApproveSerializer
    permission_classes = [IsSuperUser]  # Use the custom permission class

    def update(self, request, *args, **kwargs):
        transaction = self.get_object()

        serializer = self.get_serializer(transaction, data=request.data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

            # Check the status and update the balance accordingly
            status = serializer.validated_data.get('status')
            account = transaction.user.account

            if status == 'approved':
                try:
                    account.update_balance(transaction.amount, transaction.transaction_type)  # Update balance for approved transactions
                    serializer.status='approved'
                except ValueError as e:
                    return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            if status=='declined':
                serializer.status='declined'

            # If the status is declined, we don't do anything with the balance
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FundTransferView(generics.CreateAPIView):
    serializer_class=FundTransferSerializer
    permission_classes=[IsAdminUser]

    @db_transaction.atomic  # Ensure atomicity
    def perform_create(self, serializer):
        
        transaction=serializer.save(issued_by=self.request.user)

        transfer_to=transaction.transfer_to
        transfer_form=transaction.transfer_from

        transfee=transfer_to.account
        transferor=transfer_form.account
        
        # Try to update their balances and catch any errors
        try:
            transferor.update_balance(transaction.amount,'payment')
            transfee.update_balance(transaction.amount,'deposit')
            
        except ValidationError as e:
            # This will raise a proper response if there's insufficient balance
            Response(e)


