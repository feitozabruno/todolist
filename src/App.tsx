import React, { useState } from 'react';
import './global.css';
import Logo from './assets/logo.svg';
import { StylesContainer, Container } from './styles';
import {
  PlusCircle,
  Circle,
  CheckCircle,
  ClipboardList,
  Trash,
} from 'lucide-react';

interface TasksProps {
  id: number;
  description: string;
  completed: boolean;
}

export function App() {
  // Define o estado inicial da lista de tarefas
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  // Função para adicionar uma nova tarefa à lista
  const handleCreateNewTask = (description: string) => {
    setTasks([...tasks, { id: Date.now(), description, completed: false }]);
  };

  // Função para marcar uma tarefa como completa
  const handleCompleteTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Função para validar o formulário
  const [formValidate, setFormValidate] = useState(false);

  const validateForm = (value: string) => {
    setFormValidate(value.trim().length > 0);
  };

  return (
    <StylesContainer>
      <header>
        <img src={Logo} />
      </header>
      <Container>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleCreateNewTask((e.target as HTMLFormElement).task.value);
            (e.target as HTMLFormElement).task.value = '';
            setFormValidate(false);
          }}
        >
          <input
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => validateForm(e.target.value)}
          />
          <button type="submit" disabled={!formValidate}>
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        {tasks.length !== 0 ? (
          <ul>
            <div>
              <h3>
                Tarefas criadas
                <span>{tasks.length}</span>
              </h3>
              <h3>
                Tarefas concluídas
                <span>
                  {tasks.filter((task) => task.completed).length}/{tasks.length}
                </span>
              </h3>
            </div>

            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <button onClick={() => handleCompleteTask(task.id)}>
                    {task.completed ? (
                      <CheckCircle size={20} color="var(--purple)" />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>
                  {task.completed ? (
                    <span className="completed">{task.description}</span>
                  ) : (
                    <span>{task.description}</span>
                  )}
                  <button onClick={() => handleDeleteTask(task.id)}>
                    <Trash size={20} />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="NoTasks">
            <ClipboardList size={60} />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <br />
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}
      </Container>
    </StylesContainer>
  );
}
