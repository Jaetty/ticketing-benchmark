package io.github.jaetty.benchmark.train.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTrain is a Querydsl query type for Train
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTrain extends EntityPathBase<Train> {

    private static final long serialVersionUID = 1337831924L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTrain train = new QTrain("train");

    public final NumberPath<Long> trainId = createNumber("trainId", Long.class);

    public final QTrainType trainType;

    public QTrain(String variable) {
        this(Train.class, forVariable(variable), INITS);
    }

    public QTrain(Path<? extends Train> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTrain(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTrain(PathMetadata metadata, PathInits inits) {
        this(Train.class, metadata, inits);
    }

    public QTrain(Class<? extends Train> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.trainType = inits.isInitialized("trainType") ? new QTrainType(forProperty("trainType")) : null;
    }

}

