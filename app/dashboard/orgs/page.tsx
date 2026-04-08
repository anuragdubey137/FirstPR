"use client";

import { useEffect, useState } from "react";
import OrgTable from "@/components/OrgTable";

export default function Page() {
  const [orgs, setOrgs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orgs")
      .then((res) => res.json())
      .then((data) => {
        const parsed =
          typeof data === "string" ? JSON.parse(data) : data;

        setOrgs(parsed);
      });
  }, []);

  return <OrgTable orgs={orgs} />;
}