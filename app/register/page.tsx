"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    password: "",
    userType: "client",
    acceptedTerms: false
  })

  const handleUserTypeChange = (type: string) => {
    console.log('Changing user type to:', type);
    setFormData(prev => ({ ...prev, userType: type }));
  }

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*]/.test(password)
    
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData);
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.acceptedTerms) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true)

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.")
      setIsLoading(false)
      return
    }

    try {
      console.log('Starting registration process...');
      const supabase = createClient()
      console.log('Supabase client created successfully.');

      const signUpData = {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
            location: formData.location,
            user_type: formData.userType,
            ...(formData.userType === 'creative' && { profession: formData.profession })
          }
        }
      };
      console.log('Sending signup data to Supabase:', { ...signUpData, password: '[REDACTED]' });
      
      const { data: { user }, error: signUpError } = await supabase.auth.signUp(signUpData)

      if (signUpError) {
        console.error('SignUp Error:', signUpError.message);
        throw signUpError;
      }
      console.log('User signed up successfully:', user);

      if (user) {
        console.log('User created successfully:', { userId: user.id, userType: formData.userType });
        console.log('Creating profile for user type:', formData.userType);
        // Profile creation is handled by the database trigger
        console.log('Profile will be created by database trigger');
      }

      toast.success("Account created successfully! Please check your email to verify your account.")
      router.push("/login")
    } catch (error: any) {
      console.error('Registration failed with error:', error);
      const errorMessage = error.message || "Failed to create account";
      console.log('Showing error toast:', errorMessage);
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Join Brand Connect to find or offer creative services across Tanzania
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="client" 
                onClick={() => handleUserTypeChange("client")}
              >
                Client
              </TabsTrigger>
              <TabsTrigger 
                value="creative" 
                onClick={() => handleUserTypeChange("creative")}
              >
                Creative Professional
              </TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Full Name</Label>
                <Input 
                  id="client-name" 
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input 
                  id="client-email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Phone Number</Label>
                <Input 
                  id="client-phone" 
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-location">Location</Label>
                <Input 
                  id="client-location" 
                  placeholder="Enter your city/region"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="client-password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="client-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  By registering, you agree to receive marketing communications and updates as outlined in our Privacy Policy.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="creative" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="creative-name">Full Name</Label>
                <Input 
                  id="creative-name" 
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creative-email">Email</Label>
                <Input 
                  id="creative-email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creative-phone">Phone Number</Label>
                <Input 
                  id="creative-phone" 
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creative-location">Location</Label>
                <Input 
                  id="creative-location" 
                  placeholder="Enter your city/region"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creative-profession">Profession</Label>
                <Input 
                  id="creative-profession" 
                  placeholder="e.g. Graphic Designer, Photographer"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="creative-password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="creative-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms-creative"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    required
                  />
                  <label htmlFor="terms-creative" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  By registering, you agree to receive marketing communications and updates as outlined in our Privacy Policy.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
        </form>
      </Card>
    </div>
  )
}
