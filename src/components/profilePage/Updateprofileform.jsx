"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Lock, Mail, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import axiosSecure from "@/lib/axios/axiosSecure";
import {
  updateUserInfo,
  changeUserPassword,
  updateUserEmail,
} from "@/services/Auth.service";

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="theme-text-secondary text-xs uppercase tracking-widest font-medium">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
);

const inputCls =
  "theme-input border border-[var(--input-border)] rounded-xl px-4 py-2.5 theme-text-primary text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:border-primary/40 transition-colors w-full";

const Card = ({ icon: Icon, title, children, onSubmit }) => (
  <div className="theme-card border theme-border rounded-2xl overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b theme-border">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" strokeWidth={1.7} />
      </div>
      <h3 className="theme-text-primary text-sm font-semibold">{title}</h3>
    </div>
    <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
      {children}
    </form>
  </div>
);

const SubmitBtn = ({ loading, label }) => (
  <button
    type="submit"
    disabled={loading}
    className="bg-primary text-[#061008] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
  >
    {loading ? "Saving..." : label}
  </button>
);

const UpdateProfileForm = () => {
  const { userInfo, setUserInfo } = useAuthStore();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register: regProfile,
    handleSubmit: handleProfile,
    formState: { errors: profileErrors, isSubmitting: profileLoading },
  } = useForm({
    defaultValues: { name: userInfo?.name || "", photo: userInfo?.photo || "" },
  });

  const {
    register: regEmail,
    handleSubmit: handleEmail,
    formState: { errors: emailErrors, isSubmitting: emailLoading },
  } = useForm({ defaultValues: { email: userInfo?.email || "" } });

  const {
    register: regPw,
    handleSubmit: handlePw,
    getValues: getValuesPw,
    reset: resetPw,
    formState: { errors: pwErrors, isSubmitting: pwLoading },
  } = useForm();

  const onUpdateProfile = async ({ name, photo }) => {
    try {
      await updateUserInfo({ displayName: name, photoURL: photo });
      const res = await axiosSecure.patch("/auth/me", { name, photo });
      if (res.data?.data) setUserInfo(res.data.data);
      toast.success("Profile updated!");
    } catch (err) {
      console.error(`Update profile ERROR: ${err}`);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile",
      );
    }
  };

  const onUpdateEmail = async ({ email }) => {
    try {
      await updateUserEmail(email);
      const res = await axiosSecure.patch("/auth/me", { email });
      if (res.data?.data) setUserInfo(res.data.data);
      toast.success("Email updated!");
    } catch (err) {
      console.error(`Update email ERROR: ${err}`);
      if (err.code === "auth/requires-recent-login") {
        toast.error(
          "Please log out and log back in before changing your email.",
        );
      } else {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to update email",
        );
      }
    }
  };

  const onUpdatePassword = async ({ password }) => {
    try {
      await changeUserPassword(password);
      toast.success("Password updated!");
      resetPw();
    } catch (err) {
      console.error(`Update password ERROR: ${err}`);
      if (err.code === "auth/requires-recent-login") {
        toast.error(
          "Please log out and log back in before changing your password.",
        );
      } else {
        toast.error(err.message || "Failed to update password");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
        <h2 className="theme-text-primary font-semibold text-base">
          Edit Profile
        </h2>
      </div>

      <Card
        icon={ImageIcon}
        title="Profile Info"
        onSubmit={handleProfile(onUpdateProfile)}
      >
        <Field label="Display Name" error={profileErrors.name?.message}>
          <input
            className={inputCls}
            placeholder="Your name"
            {...regProfile("name", { required: "Name is required" })}
          />
        </Field>
        <Field label="Photo URL" error={profileErrors.photo?.message}>
          <input
            className={inputCls}
            placeholder="https://..."
            {...regProfile("photo", { required: "Photo URL is required" })}
          />
        </Field>
        <SubmitBtn loading={profileLoading} label="Save Profile" />
      </Card>

      <Card
        icon={Mail}
        title="Email Address"
        onSubmit={handleEmail(onUpdateEmail)}
      >
        <Field label="New Email" error={emailErrors.email?.message}>
          <input
            type="email"
            className={inputCls}
            placeholder="you@example.com"
            {...regEmail("email", { required: "Email is required" })}
          />
        </Field>
        <SubmitBtn loading={emailLoading} label="Update Email" />
      </Card>

      <Card
        icon={Lock}
        title="Change Password"
        onSubmit={handlePw(onUpdatePassword)}
      >
        <Field label="New Password" error={pwErrors.password?.message}>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              className={inputCls}
              placeholder="Min. 6 characters"
              {...regPw("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition-colors"
            >
              {showPw ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </Field>
        <Field label="Confirm Password" error={pwErrors.confirm?.message}>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className={inputCls}
              placeholder="Re-enter password"
              {...regPw("confirm", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === getValuesPw("password") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition-colors"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </Field>
        <SubmitBtn loading={pwLoading} label="Update Password" />
      </Card>
    </div>
  );
};

export default UpdateProfileForm;
