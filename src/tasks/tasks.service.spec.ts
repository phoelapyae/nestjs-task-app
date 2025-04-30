import { Test } from "@nestjs/testing";
import { TaskRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service"

const mockTasksRepository = () => ({
    getTasks: jest.fn()
});

const mockUser = {
    username: 'Ariel',
    id: 'someId',
    password: 'somePassword',
    tasks: []
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository: TaskRepository;

    beforeEach(async() => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: TaskRepository, useFactory: mockTasksRepository}
            ]
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TaskRepository);
    })

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and return the result', async () => {
            (tasksRepository.getTasks as jest.Mock).mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });
})