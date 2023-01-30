package giorgosathanasopoulos.com.github.fullstacktodo.Todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class TodoConfig {
    @Bean
    CommandLineRunner commandLineRunner(TodoRepository todoRepository) {
        return args -> {
            LocalDate now = LocalDate.now();
            Todo todo = new Todo("Title", "Description", LocalDate.now().plusDays(1));

            List<Todo> todos = new ArrayList<>();
            todos.add(todo);

            todoRepository.saveAll(todos);
        };
    }
}
