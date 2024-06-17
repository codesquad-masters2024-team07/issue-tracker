package codesquad.issuetracker.label;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import codesquad.issuetracker.milestone.MilestoneService;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class LabelServiceTest {


    @Mock
    private LabelRepository labelRepository;
    @Mock
    private MilestoneService milestoneService;

    @InjectMocks
    private LabelService labelService;

    @Test
    @DisplayName("모든 라벨에 대한 정보를 불러오는 테스트")
    void testFindAllLabels() {
        Label label1 = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .backgroundColor("#FF0000")
            .isDeleted(false)
            .build();

        Label label2 = Label.builder()
            .name("테스트 라벨2")
            .description("테스트 내용2")
            .backgroundColor("#DC143C")
            .isDeleted(false)
            .build();

        when(labelRepository.findAll()).thenReturn(
            new PageImpl<>(List.of(label1, label2)));

        List<Label> fetchedAllLabels = labelService.fetchFilteredLabels(any(Pageable.class));
        assertThat(fetchedAllLabels).containsExactly(label1, label2);

    }

    @Test
    @DisplayName("findById로 라벨을 반환하는 테스트")
    void findById_ReturnLabel() {
        Label label = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .backgroundColor("#FF0000")
            .build();

        when(labelRepository.findById(1L)).thenReturn(Optional.of(label));
        Label fetchedLabel = labelService.findById(1L);
        assertThat(fetchedLabel).isEqualTo(label);
    }

    @Test
    @DisplayName("Id로 라벨을 못찾을 때 예외를 반환하는 테스트")
    void findById_ThrowsExceptionWhenLabelNotFound() {
        when(labelRepository.findById(1L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> labelService.findById(1L))
            .isInstanceOf(NoSuchElementException.class);
    }
}
