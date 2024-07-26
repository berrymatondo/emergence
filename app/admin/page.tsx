import Link from "next/link";
import React from "react";

const AdminPage = () => {
  return (
    <div>
      <Link href="/admin/users">Utilisateurs</Link>
    </div>
  );
};

export default AdminPage;
