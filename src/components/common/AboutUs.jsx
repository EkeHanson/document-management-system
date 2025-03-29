import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600 mb-4">
        Welcome to our <strong>Document Management System (DMS)</strong> – a robust and comprehensive
        solution designed to streamline document control, versioning, access management, and
        collaboration for engineering projects. Our platform ensures seamless document workflow,
        security, and compliance with industry standards.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Mission</h2>
      <p className="text-gray-600 mb-4">
        Our mission is to provide an efficient and secure document management solution that
        enhances productivity, ensures data integrity, and simplifies complex document workflows
        for engineering teams.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Key Features</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Role-based access control</li>
        <li>Document versioning with automatic version numbering</li>
        <li>Watermarking for downloaded/printed documents</li>
        <li>Check-in/check-out system for secure document editing</li>
        <li>Comprehensive audit trails and reporting</li>
        <li>AutoCAD and BIM integration</li>
        <li>Mobile-responsive design</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Why Choose Us?</h2>
      <p className="text-gray-600 mb-4">
        We understand the challenges of document management in engineering projects. Our system
        is built with cutting-edge technologies such as <strong>React (Vite), Tailwind CSS, and Redux</strong>, ensuring
        high performance, scalability, and an intuitive user experience. Whether you're handling
        critical project documents or tracking transmittals, our DMS is designed to optimize
        your workflow.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Get in Touch</h2>
      <p className="text-gray-600">
        Have questions or want to learn more? Contact us today and let’s build a more efficient document
        management experience together.
      </p>
    </div>
  );
};

export default AboutUs;
