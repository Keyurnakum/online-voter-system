import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    idDocument: null,
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 50) return 'error';
    if (strength < 75) return 'warning';
    return 'success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be 18 or older to register';
      }
    }
    
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 75) {
      newErrors.password = 'Password must be stronger (include uppercase, numbers, and symbols)';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Successful registration
      alert(`Registration successful! Please check your email (${formData.email}) for verification instructions.`);
      setIsLoading(false);
    }, 2000);
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="User" size={16} />
          <span>Personal Information</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
          />
        </div>
        
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          description="We'll send verification instructions to this email"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={handlePhoneChange}
          error={errors.phone}
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          error={errors.dateOfBirth}
          description="You must be 18 or older to register"
          required
        />
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="MapPin" size={16} />
          <span>Address Information</span>
        </h3>
        
        <Input
          label="Street Address"
          type="text"
          name="address"
          placeholder="Enter your street address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleInputChange}
            error={errors.city}
            required
          />
          
          <Input
            label="ZIP Code"
            type="text"
            name="zipCode"
            placeholder="12345"
            value={formData.zipCode}
            onChange={handleInputChange}
            error={errors.zipCode}
            required
          />
        </div>
        
        <Select
          label="State"
          options={stateOptions}
          value={formData.state}
          onChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
          error={errors.state}
          placeholder="Select your state"
          searchable
          required
        />
      </div>

      {/* ID Verification */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="FileText" size={16} />
          <span>ID Verification</span>
        </h3>
        
        <Input
          label="Government ID Document"
          type="file"
          name="idDocument"
          onChange={handleInputChange}
          error={errors.idDocument}
          description="Upload a clear photo of your driver's license, passport, or state ID"
          accept="image/*,.pdf"
        />
      </div>

      {/* Password Setup */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Lock" size={16} />
          <span>Password Setup</span>
        </h3>
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary civic-transition"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-caption text-text-secondary">Password Strength</span>
              <span className={`font-caption text-${getPasswordStrengthColor(passwordStrength)}`}>
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full civic-transition bg-${getPasswordStrengthColor(passwordStrength)}`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary civic-transition"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <Checkbox
        label="I accept the Terms of Service and Privacy Policy"
        name="acceptTerms"
        checked={formData.acceptTerms}
        onChange={handleInputChange}
        error={errors.acceptTerms}
        description="By registering, you agree to our voter eligibility requirements and platform policies"
        required
      />

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Register to Vote
      </Button>

      <div className="text-center">
        <p className="text-sm font-caption text-text-secondary">
          Already have an account? Switch to Sign In tab above.
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;