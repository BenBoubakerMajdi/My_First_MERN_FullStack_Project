import { Routes, Route } from "react-router-dom";
import { WorkoutSplits } from "./Pages/WorkoutSplits";
import { WorkoutDays } from "./Pages/WorkoutDays";
import { Exercises } from "./Pages/Exercises";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/workoutSplits" element={<WorkoutSplits />} />
        <Route path="/workoutDays" element={<WorkoutDays />} />
        <Route path="/Exercises" element={<Exercises />} />
      </Routes>
    </div>
  );
}

export default App;
