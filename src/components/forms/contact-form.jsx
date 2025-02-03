import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { init, sendForm } from "emailjs-com";
import { notifyError, notifySuccess } from "@/utils/toast";
import ErrorMsg from "../common/error-msg";
import { useIsMobile } from "@/utils/isMobileUtil"; // Import the custom hook

// initialize EmailJS with your user ID
init("b233R9hwalgmVSVG4");

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Message"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed.")
    .label("Terms and Conditions"),
});

const ContactForm = () => {
  const isMobile = useIsMobile(); // Check if the device is mobile

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const form = document.getElementById("contact-form");
    sendForm("service_azzz72y", "template_z2gc50o", form)
      .then(() => {
        notifySuccess("Message sent successfully!");
        reset();
      })
      .catch(() => {
        notifyError("Failed to send the message. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
      <div className="tp-contact-input-wrapper">
        {/* Input fields */}
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("name")}
              name="name"
              id="name"
              type="text"
              placeholder="Enter your Name"
              className={isMobile ? "rounded" : ""} // Add rounded class only for mobile
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="name">Your Name</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>

        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("email")}
              name="email"
              id="email"
              type="email"
              placeholder="Example@mail.com"
              className={isMobile ? "rounded" : ""} // Add rounded class only for mobile
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>

        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("subject")}
              name="subject"
              id="subject"
              type="text"
              placeholder="Write your subject"
              className={isMobile ? "rounded" : ""} // Add rounded class only for mobile
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="subject">Subject</label>
          </div>
          <ErrorMsg msg={errors.subject?.message} />
        </div>

        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <textarea
              {...register("message")}
              id="message"
              name="message"
              placeholder="Write your message here..."
              className={isMobile ? "rounded" : ""} // Add rounded class only for mobile
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="message">Your Message</label>
          </div>
          <ErrorMsg msg={errors.message?.message} />
        </div>
      </div>

      <div className="tp-contact-suggestions mb-20">
        <div className="tp-contact-remember">
          <input
            {...register("remember")}
            name="remember"
            id="remember"
            type="checkbox"
          />
          <label htmlFor="remember" style={{color:isMobile ?"gray":"", fontSize:isMobile ?"12px":"14px", marginLeft:isMobile ?"":"10px"}}>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            border: "none",
            padding: "10px 20px",
            borderRadius: isMobile ? "6px" : "5px", // Rounded corners for mobile
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#990100";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#000000";
          }}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
