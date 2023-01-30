package giorgosathanasopoulos.com.github.fullstacktodo.Todo;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Table
@Entity
@Getter
@NoArgsConstructor
public class Todo {
    @Id
    @GeneratedValue(generator = "todo_id_generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "todo_id_generator", sequenceName = "todo_id_sequence")
    private long id;


    @Setter
    @NonNull
    private String title;
    @Setter
    @NonNull
    private String description;


    @Setter
    private boolean completed;
    @Setter
    private boolean deleted;


    @Setter
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @NonNull
    private LocalDate deadline;
    @CreatedDate
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate createdAt;
    @Setter
    @LastModifiedDate
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate updatedAt;

    public Todo(String title, String description, LocalDate deadline) {
        this.title = title;
        this.description = description;
        this.completed = false;
        this.deleted = false;
        this.deadline = deadline;
        createdAt = updatedAt = LocalDate.now();
    }
}
