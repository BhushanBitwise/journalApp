import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.16),_transparent_35%)]">
      <Outlet />
    </div>
  );
};

export default AppLayout;
