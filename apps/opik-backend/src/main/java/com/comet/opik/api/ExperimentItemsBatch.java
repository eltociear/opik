package com.comet.opik.api;

import com.comet.opik.infrastructure.ratelimit.RateEventContainer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.Set;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ExperimentItemsBatch(
        @JsonView( {
                ExperimentItem.View.Write.class}) @NotNull @Size(min = 1, max = 1000) @Valid Set<ExperimentItem> experimentItems)
        implements
            RateEventContainer{

    @Override
    public long eventCount() {
        return experimentItems.size();
    }
}
