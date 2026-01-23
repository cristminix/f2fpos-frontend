import type { Route } from "./+types/home";

import ProtectedRoute from "~/components/guards/ProtectedRoute";
import ProtectedLayout from "~/components/layouts/ProtectedLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "F2F POS APP" }, { name: "description", content: "Hi!" }];
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <div>
          <p>redirecting ...</p>
        </div>
      </ProtectedLayout>
    </ProtectedRoute>
  );
}
