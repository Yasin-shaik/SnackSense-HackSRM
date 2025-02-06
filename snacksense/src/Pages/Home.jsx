import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export default function SnackSense() {
  return (
    <div className="bg-cover d-flex flex-column align-items-center justify-content-center mt-50">
      <main className="container text-center py-5 overlay-content">
        {/* Welcome Section */}
        <section className="text-white mb-5 welcome-section">
          <h1 className="display-4 fw-bold">
            Welcome! Let's make healthier snack choices today!
          </h1>
          <p className="lead">
            Your health insights, diet plans, and barcode scanner are just a tap
            away.
          </p>
          <div className="bg-white rounded mx-auto w-100 max-w-3xl h-48"></div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mt-5 cta-section text-white py-4 rounded">
          <h2 className="h4 fw-bold">Make Every Bite Count!</h2>
          <p>
            Keep scanning and learning about your food choices. The more you
            scan, the smarter our recommendations get!
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link to="/scanQR">
              <button className="btn btn-light fw-bold">
                Scan More Snacks
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
