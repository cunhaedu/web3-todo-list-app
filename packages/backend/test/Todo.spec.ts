import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Todo__factory as TodoFactoryType, Todo } from "../typechain";

describe("Todo", function () {
  let TodoFactory: TodoFactoryType;
  let todo: Todo;

  beforeEach(async () => {
    TodoFactory = await ethers.getContractFactory("Todo");
    todo = await TodoFactory.deploy();
  });

  describe("Tasks", () => {
    it("Should return an empty task list when theres is no task", async () => {
      expect((await todo.getTasks()).length).to.equal(0);
    });

    it("Should create a new task", async () => {
      await todo.createTask("Example task", "Peter");
      const tasks = await todo.getTasks();

      expect(tasks.length).to.equal(1);
    });

    it("Should create task and mark it as done", async () => {
      await todo.createTask("Example task", "Peter");
      let tasks = await todo.getTasks();

      await todo.toggleDone(tasks[0].id);

      tasks = await todo.getTasks();

      expect(tasks[0].isDone).to.equal(true);
    });

    it("Should create task, mark it as done and then undone it", async () => {
      await todo.createTask("Example task", "Peter");
      let tasks = await todo.getTasks();

      await todo.toggleDone(tasks[0].id);

      tasks = await todo.getTasks();

      expect(tasks[0].isDone).to.equal(true);

      await todo.toggleDone(tasks[0].id);

      tasks = await todo.getTasks();

      expect(tasks[0].isDone).to.equal(false);
    });
  });
});
