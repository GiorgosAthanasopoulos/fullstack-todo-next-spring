package giorgosathanasopoulos.com.github.fullstacktodo.Todo;

import lombok.AllArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    // METHOD:HTTP-GET
    public List<Todo> getAll() {
        return todoRepository.findAll().stream().filter(todo -> !todo.isDeleted()).toList();
    }

    public Optional<Todo> get(long id) {
        return todoRepository.findById(id);
    }

    public List<Todo> getAllDeleted() {
        return todoRepository.findAll().stream().filter(Todo::isDeleted).toList();
    }

    // METHOD:HTTP-POST
    public void post(String title, String description, LocalDate deadline) {
        todoRepository.save(new Todo(title, description, deadline));
    }

    // METHOD:HTTP-PUT
    public boolean put(long id, String title, String description, boolean completed) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();
        boolean updated = false;

        if (title != null && title.length() > 0 && !Objects.equals(title, todo.getTitle())) {
            todo.setTitle(title);
            updated = true;
        }
        if (description != null && description.length() > 0 && !Objects.equals(description, todo.getDescription())) {
            todo.setDescription(description);
            updated = true;
        }
        if (completed != todo.isCompleted()) {
            todo.setCompleted(completed);
            updated = true;
        }

        if (updated) {
            todo.setUpdatedAt(LocalDate.now());
            todoRepository.save(todo);
        }

        return true;
    }

    public boolean putTitle(long id, String title) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();
        return put(todo.getId(), title, todo.getDescription(), todo.isCompleted());
    }

    public boolean putDescription(long id, String description) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();
        return put(todo.getId(), todo.getTitle(), description, todo.isCompleted());
    }

    public boolean putCompleted(long id, boolean completed) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();
        return put(todo.getId(), todo.getTitle(), todo.getDescription(), completed);
    }

    public boolean putDeadline(long id, LocalDate deadline) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();
        todo.setDeadline(deadline);
        todo.setUpdatedAt(LocalDate.now());
        todoRepository.save(todo);

        return true;
    }

    // METHOD:HTTP-DELETE
    public boolean delete(long id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();

        todo.setDeleted(true);
        todo.setUpdatedAt(LocalDate.now());
        todoRepository.save(todo);

        return true;
    }

    public boolean deleteAll() {
        List<Todo> todos = todoRepository.findAll();

        for (Todo todo : todos) {
            if (!delete(todo.getId())) {
                return false;
            }
        }

        return true;
    }

    public boolean undelete(long id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isEmpty()) {
            return false;
        }

        Todo todo = todoOptional.get();
        todo.setDeleted(false);
        todo.setUpdatedAt(LocalDate.now());
        todoRepository.save(todo);

        return true;
    }

    public boolean undeleteAll() {
        for (Todo todo : todoRepository.findAll()) {
            if (!undelete(todo.getId())) {
                return false;
            }
        }

        return true;
    }
}
