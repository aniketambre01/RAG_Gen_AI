import { useState } from "react";

import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import SearchBar from "../components/common/SearchBar";
import Avatar from "../components/common/Avatar";
import EmptyState from "../components/common/EmptyState";

function ComponentTest() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10 p-10">

      <h1 className="text-3xl font-bold">
        Component Playground
      </h1>

      {/* Button */}

      <Card title="Button">
        <div className="flex gap-3 flex-wrap">

          <Button>Primary</Button>

          <Button variant="secondary">
            Secondary
          </Button>

          <Button variant="outline">
            Outline
          </Button>

          <Button loading>
            Loading
          </Button>

        </div>
      </Card>

      {/* Card */}

      <Card
        title="Card Component"
        description="Testing card component"
      >
        Hello World
      </Card>

      {/* Loader */}

      <Card title="Loader">
        <Loader />
      </Card>

      {/* Search */}

      <Card title="Search">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search..."
        />
      </Card>

      {/* Avatar */}

      <Card title="Avatar">
        <div className="flex gap-4">

          <Avatar name="Aniket Ambre" />

          <Avatar
            name="John Doe"
            status="online"
          />

        </div>
      </Card>

      {/* Empty */}

      <Card title="Empty State">

        <EmptyState
          title="No Files"
          description="Upload your first document."
          actionLabel="Upload"
        />

      </Card>

      {/* Modal */}

      <Card title="Modal">

        <Button
          onClick={() => setOpen(true)}
        >
          Open Modal
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Test Modal"
        >
          Hello Modal
        </Modal>

      </Card>

    </div>
  );
}

export default ComponentTest;