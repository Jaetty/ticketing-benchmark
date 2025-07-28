package io.github.jaetty.benchmark.train.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTrainType is a Querydsl query type for TrainType
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTrainType extends EntityPathBase<TrainType> {

    private static final long serialVersionUID = -183264434L;

    public static final QTrainType trainType = new QTrainType("trainType");

    public final StringPath trainName = createString("trainName");

    public final NumberPath<Integer> trainTypeId = createNumber("trainTypeId", Integer.class);

    public QTrainType(String variable) {
        super(TrainType.class, forVariable(variable));
    }

    public QTrainType(Path<? extends TrainType> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTrainType(PathMetadata metadata) {
        super(TrainType.class, metadata);
    }

}

