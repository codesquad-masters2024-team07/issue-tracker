package codesquad.issuetracker.comment;

import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void updateContent(Long id, CommentUpdateRequest request) {
        Comment comment = findById(id);
        comment.updateContent(request.content());
        commentRepository.save(comment);
    }

    public Comment findById(Long id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        return optionalComment.orElseThrow(NoSuchElementException::new);
    }

}
