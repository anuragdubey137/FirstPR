import path from "path";
import csv from "csvtojson";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data/orgs.csv");

    const jsonArray = await csv().fromFile(filePath);

    const orgs = jsonArray.map((item: any) => ({
      repo: item["Repository"],
      company: item["Company Name"],
      companyUrl: item["Company URL"],
      careerUrl: item["Career URL"],
      tags: item["Tags"] ? item["Tags"].split(",") : [],
      language: item["Language"],
      description: item["Description"],
    }));
    orgs.sort((a, b) =>
  a.company.localeCompare(b.company)
);
return Response.json(orgs);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load CSV" }, { status: 500 });
  }
}