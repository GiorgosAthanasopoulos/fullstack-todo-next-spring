package giorgosathanasopoulos.com.github.fullstacktodo.Todo;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin(originPatterns = "http://localhost:3000/")
@RequestMapping("api/v1/todo")
public class TodoController {
    private final TodoService todoService;

    @GetMapping("get")
    public List<Todo> getALl() {
        return todoService.getAll();
    }

    @GetMapping("get/{id}")
    public Optional<Todo> get(@PathVariable long id) {
        return todoService.get(id);
    }

    @GetMapping("get/deleted")
    public List<Todo> getAllDeleted() {
        return todoService.getAllDeleted();
    }

    @PostMapping("post")
    public void post(@RequestParam String title, @RequestParam String description, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate deadline) {
        todoService.post(title, description, deadline);
    }

    @PutMapping("put/title/{id}")
    public boolean putTitle(@PathVariable long id, @RequestParam String title) {
        return todoService.putTitle(id, title);
    }

    @PutMapping("put/description/{id}")
    public boolean putDescription(@PathVariable long id, @RequestParam String description) {
        return todoService.putDescription(id, description);
    }

    @PutMapping("put/completed/{id}")
    public boolean putCompleted(@PathVariable long id, @RequestParam boolean completed) {
        return todoService.putCompleted(id, completed);
    }

    @PutMapping("put/deadline/{id}")
    public boolean putDeadline(@PathVariable long id, @RequestParam LocalDate deadline) {
        return todoService.putDeadline(id, deadline);
    }

    @PutMapping("put/undelete/all")
    public boolean undeleteAll() {
        return todoService.undeleteAll();
    }

    @PutMapping("put/undelete/{id}")
    public boolean undelete(@PathVariable long id) {
        return todoService.undelete(id);
    }

    @DeleteMapping("delete/{id}")
    public boolean delete(@PathVariable long id) {
        return todoService.delete(id);
    }

    @DeleteMapping("delete")
    public boolean deleteAll() {
        return todoService.deleteAll();
    }
}