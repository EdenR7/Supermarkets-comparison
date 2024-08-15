import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoaderCircle,
  LockKeyhole,
  Mail,
  User,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/auth-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useJsApiLoader,
  Autocomplete,
  Libraries,
} from "@react-google-maps/api";
import { PASSWORD_MESSAGE, REGEX_PASSWORD } from "@/constants/auth.constant";

// Access the API key based on your environment setup
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Use this for Vite
// const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Use this for Create React App

const libraries: Libraries = ["places"];

// Define the form schema with additional fields.
const formSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    username: z.string().min(1).max(50),
    email: z.string().email(),
    address: z.string().min(1).max(100),
    password: z.string().min(8).regex(REGEX_PASSWORD, {
      message: PASSWORD_MESSAGE,
    }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error path
  });

export type RegisterFormValues = z.infer<typeof formSchema>;

function RegisterPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey as string,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  function onSubmit(values: RegisterFormValues) {
    const { confirmPassword, ...valuesToSubmit } = values;

    try {
      setIsPending(true);
      register(valuesToSubmit);
      toast({
        title: "Great!",
        description: "You have successfully registered.",
        variant: "primary",
      });
      navigate("/auth/login");
    } catch (error: any) {
      if (error?.response?.data?.error) {
        if (error.response.data.error === "Email already exists") {
          form.setError("email", {
            type: "manual",
            message: error.response.data.error,
          });
        } else {
          toast({
            title: error.response.data.error,
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "An error occurred",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  }

  function handlePlaceSelect() {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address || "");
      form.setValue("address", place.formatted_address || "");
    }
  }

  function onLoad(autoC: google.maps.places.Autocomplete) {
    setAutocomplete(autoC);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
    form.setValue("address", e.target.value);
  }

  return (
    <>
      <Card className=" py-6 min-h-96 min-w-80 flex flex-col items-center justify-center gap-4 rounded-xl">
        <CardTitle className="text-3xl">Register</CardTitle>
        <CardContent className="w-full max-w-80 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isPending} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <IconInput
                          Icon={User}
                          placeholder="First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <IconInput
                          Icon={User}
                          placeholder="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <IconInput
                          Icon={User}
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <IconInput
                          Icon={Mail}
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Autocomplete
                          onLoad={onLoad}
                          onPlaceChanged={handlePlaceSelect}
                        >
                          <IconInput
                            Icon={MapPin}
                            placeholder="Address"
                            {...field}
                            value={address}
                            onChange={onChange}
                          />
                        </Autocomplete>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IconInput
                            Icon={LockKeyhole}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                          />
                          <span
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IconInput
                            Icon={LockKeyhole}
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...field}
                          />
                          <span
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
              <Separator className="my-8" />
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
          <CardFooter className=" mt-4">
            <p className="text-xs">
              Already have an account?{" "}
              <Link className="underline font-bold" to="/auth/login">
                Login
              </Link>
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
}

export default RegisterPage;
