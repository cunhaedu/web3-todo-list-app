import { FormEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { BigNumber } from 'ethers';
import { Todo as TodoType } from '@web3-todo-list-app/backend/typechain';

import { getBlockchain } from '../ethereum';
import { ITask } from '../interfaces/ITask';

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [todo, setTodo] = useState<TodoType | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const { todo: blockchainTodo } = await getBlockchain();

        console.log(blockchainTodo);

        const blockchainTasks = await blockchainTodo.getTasks();

        setTodo(blockchainTodo);
        setTasks(blockchainTasks);
      } catch (err) {
        alert(err);
      }
    };

    init();
 }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!todo || !content) {
      return;
    }

    const tx = await todo.createTask(content, 'Pedro')
    await tx.wait();

    setContent('');

    const blockchainTasks = await todo.getTasks();
    setTasks(blockchainTasks);
  }

  async function toggleDone(id: BigNumber) {
    if (!todo) {
      return;
    }

    const tx = await todo.toggleDone(id);
    await tx.wait();

    const blockchainTasks = await todo.getTasks();
    setTasks(blockchainTasks);
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Adicionar tarefa"
              onChange={e => setContent(e.target.value)}
            />
            <button
              className="flex-no-shrink p-2 rounded text-white border-teal bg-blue-500 hover:bg-blue-700 disabled:opacity-50"
              type="submit"
              disabled={content.length === 0}
            >
              Adicionar
            </button>
          </div>
        </form>

        {tasks.map(task => (
          <div key={task.id.toString()} className="flex flex-col">
            <label className="inline-flex items-center justify-center mt-5 w-full">
              <input
                className="form-checkbox h-5 w-5 text-gray-600"
                type="checkbox"
                checked={task.isDone}
                onChange={e => toggleDone(task.id)}
              />
              <span className={`${task.isDone && 'line-through'} ml-2 text-gray-700`}>{task.content}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
