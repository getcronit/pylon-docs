import { PageConfig, PageProps, useAuth } from "@atsnek/jaen";
import * as React from "react";
import { Link } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">
          Welcome to Your Website
        </h1>

        <div className="mb-6">
          {isAuthenticated ? (
            <p className="text-gray-800">
              Hello,{" "}
              <span className="font-semibold">
                {user?.profile.preferred_username}
              </span>
              ! You are authenticated. You can now access protected pages.
            </p>
          ) : (
            <p className="text-gray-800">You are not authenticated.</p>
          )}
        </div>

        <div className="flex justify-between">
          <Link
            to={isAuthenticated ? "/protected" : "/login"}
            className="text-blue-500 hover:underline"
          >
            {isAuthenticated ? "Go to Protected Page" : "Login"}
          </Link>
          {!isAuthenticated && (
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

export { Head } from "@atsnek/jaen";

export const pageConfig: PageConfig = {
  label: "Jaen Template",
};
