import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function onAddNewProjectClickHandler() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function goToMainScreen() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function createNewProject(projectData) {
    setProjectState((prevState) => {
      const newProjectsArray = [
        ...prevState.projects,
        { ...projectData, tasks: [] },
      ];

      return {
        ...prevState,
        projects: newProjectsArray,
        selectedProjectId: newProjectsArray.length - 1,
      };
    });
  }

  function onProjectSelect(projectId) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId,
    }));
  }

  function onProjectDelete(projectId) {
    setProjectState((prevState) => {
      const projects = [...prevState.projects];
      projects.splice(projectId, 1);

      return {
        ...prevState,
        projects,
        selectedProjectId: undefined,
      };
    });
  }

  function onAddTask(task, projectId) {
    setProjectState((prevState) => {
      const projects = [...prevState.projects];
      const tasks = projects[projectId].tasks;

      projects[projectId] = {
        ...projects[projectId],
        tasks: [...tasks, task],
      };

      return {
        ...prevState,
        projects,
      };
    });
  }

  function onDeleteTask(taskId, projectId) {
    setProjectState((prevState) => {
      const projects = [...prevState.projects];
      const tasks = [...projects[projectId].tasks];
      tasks.splice(taskId, 1);

      projects[projectId] = {
        ...projects[projectId],
        tasks,
      };

      return {
        ...prevState,
        projects,
      };
    });
  }

  const projectScreen =
    projectState.selectedProjectId === undefined ? (
      <NoProjectSelected onAddNewProject={onAddNewProjectClickHandler} />
    ) : projectState.selectedProjectId === null ? (
      <NewProject onCancel={goToMainScreen} onSave={createNewProject} />
    ) : (
      <SelectedProject
        project={projectState.projects[projectState.selectedProjectId]}
        selectedProjectId={projectState.selectedProjectId}
        onDelete={onProjectDelete}
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
      />
    );

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onAddNewProject={onAddNewProjectClickHandler}
        projects={projectState.projects}
        onSelect={onProjectSelect}
      />

      {projectScreen}
    </main>
  );
}

export default App;
