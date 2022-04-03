//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Todo {
    struct Task {
        uint256 id;
        uint256 date;
        string content;
        string author;
        bool isDone;
        uint256 dateComplete;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public nextTaskId;

    event TaskCreated(
        uint256 id,
        uint256 date,
        string content,
        string author,
        bool isDone
    );

    event TaskStatusToggled(uint256 id, uint256 date, bool isDone);

    function createTask(string memory _content, string memory _author)
        external
    {
        tasks[nextTaskId] = Task(
            nextTaskId + 1,
            block.timestamp,
            _content,
            _author,
            false,
            0
        );

        emit TaskCreated(nextTaskId, block.timestamp, _content, _author, false);

        nextTaskId++;
    }

    function getTasks() external view returns (Task[] memory) {
        Task[] memory _tasks = new Task[](nextTaskId);

        for (uint256 i = 0; i < nextTaskId; i++) {
            _tasks[i] = tasks[i];
        }

        return _tasks;
    }

    function toggleDone(uint256 id) external {
        require(tasks[id - 1].id != 0, "Task does not exists!");

        Task storage task = tasks[id - 1];

        task.isDone = !task.isDone;
        task.dateComplete = task.isDone ? block.timestamp : 0;

        emit TaskStatusToggled(id, task.dateComplete, task.isDone);
    }
}
