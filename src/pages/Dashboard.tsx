import Card from "../components/common/Card";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card title="Projects">
          <h2 className="text-4xl font-bold">12</h2>
        </Card>

        <Card title="Documents">
          <h2 className="text-4xl font-bold">184</h2>
        </Card>

        <Card title="Chats">
          <h2 className="text-4xl font-bold">67</h2>
        </Card>

        <Card title="Storage">
          <h2 className="text-4xl font-bold">1.8 GB</h2>
        </Card>

      </div>

      <Card
        title="Recent Activity"
        description="Your latest AI interactions"
      >
        <div className="space-y-3">

          <div className="rounded-lg border p-4">
            Uploaded Resume.pdf
          </div>

          <div className="rounded-lg border p-4">
            Asked AI about Python code
          </div>

          <div className="rounded-lg border p-4">
            Uploaded Financial Report.xlsx
          </div>

        </div>
      </Card>

    </div>
  );
};

export default Dashboard;