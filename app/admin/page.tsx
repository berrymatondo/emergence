import Link from "next/link";
import React from "react";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/admin/users">Users</Link>
      <Link href="/admin/countries">Countries</Link>
      <Link href="/admin/matrix">Matrices</Link>
      <Link href="/admin/batches">Batches</Link>
    </div>
  );
};

export default AdminPage;
