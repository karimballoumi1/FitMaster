from django.db import models
from django.core.validators import EmailValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

GOAL_CHOICES = [
    ('lose_weight', 'Lose Weight'),
    ('gain_muscle', 'Gain Muscle'),
    ('maintain', 'Maintain'),
]

DIFFICULTY_CHOICES = [
    (1, 'Easy'),
    (2, 'Medium'),
    (3, 'Hard'),
]

def password_validator(value):
    if (len(value) < 8 or 
        not any(char.isupper() for char in value) or 
        not any(char.islower() for char in value) or 
        not any(char.isdigit() for char in value)):
        raise ValidationError(
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.'
        )

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)  # Re-enable username
    name = models.CharField(max_length=150, unique=True) # add unique=True
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    goal = models.CharField(max_length=11, choices=GOAL_CHOICES, default="maintain")
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'  # Authentification via email
    REQUIRED_FIELDS = ['name','username'] # add username

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',
        blank=True
    )

    def __str__(self):
        return self.name

class ExerciseCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Exercise(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(ExerciseCategory, on_delete=models.CASCADE)
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES)
    duration = models.PositiveIntegerField(null=True, blank=True)
    image = models.ImageField(upload_to='exercises/', null=True, blank=True)
    image1 = models.ImageField(upload_to='exercises/', null=True, blank=True)
    image2 = models.ImageField(upload_to='exercises/', null=True, blank=True)
    video = models.FileField(upload_to='exercises/', null=True, blank=True)
    description = models.TextField()
    benefits = models.TextField()

    def __str__(self):
        return self.title

class RecipeCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(RecipeCategory, on_delete=models.CASCADE)
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES)
    prep_time = models.PositiveIntegerField()
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)
    description = models.TextField()
    calories = models.PositiveIntegerField()
    protein = models.FloatField(validators=[MinValueValidator(0)])
    carbs = models.FloatField(validators=[MinValueValidator(0)])
    fat = models.FloatField(validators=[MinValueValidator(0)])
    benefits = models.TextField()

    def __str__(self):
        return self.title

class ProductCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    image1 = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return f"Image for {self.product.name}"

class NutritionalData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nutritional_data')
    date = models.DateField(auto_now_add=True)
    calories = models.PositiveIntegerField()
    protein = models.FloatField(validators=[MinValueValidator(0)])
    carbs = models.FloatField(validators=[MinValueValidator(0)])
    fat = models.FloatField(validators=[MinValueValidator(0)])

    def __str__(self):
        return f"Nutritional data for {self.user.name} on {self.date}"

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.name}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.cart.user.name}'s cart"
