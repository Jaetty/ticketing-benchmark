package io.github.jaetty.benchmark.train.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRouteStation is a Querydsl query type for RouteStation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRouteStation extends EntityPathBase<RouteStation> {

    private static final long serialVersionUID = -1776406209L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRouteStation routeStation = new QRouteStation("routeStation");

    public final QRoute route;

    public final NumberPath<Long> scheduleId = createNumber("scheduleId", Long.class);

    public final QStation station;

    public final NumberPath<Integer> stationOrder = createNumber("stationOrder", Integer.class);

    public QRouteStation(String variable) {
        this(RouteStation.class, forVariable(variable), INITS);
    }

    public QRouteStation(Path<? extends RouteStation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRouteStation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRouteStation(PathMetadata metadata, PathInits inits) {
        this(RouteStation.class, metadata, inits);
    }

    public QRouteStation(Class<? extends RouteStation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.route = inits.isInitialized("route") ? new QRoute(forProperty("route")) : null;
        this.station = inits.isInitialized("station") ? new QStation(forProperty("station")) : null;
    }

}

