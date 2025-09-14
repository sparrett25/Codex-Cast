import { Outlet } from "react-router-dom";
import StoryHeader from "../components/StoryHeader";

export default function CastShell() {
  return (
    <>
      <StoryHeader />
      <main className="min-h-screen pt-14">
        <Outlet />
      </main>
    </>
  );
}
