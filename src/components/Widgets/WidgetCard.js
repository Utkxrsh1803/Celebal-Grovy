import React from 'react';
import './WidgetCard.css';
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import WidgetEntry from './WidgetEntry';

export default function WidgetCard({ title, similar, featured, newRelease }) {

    return (<div className="widgetcard-body">
        <p className="widget-title">{title}</p>
        {similar
            ? similar.map((artist) => (
                <WidgetEntry
                    key={artist?.name}
                    title={artist?.name}
                    subtitle={artist?.followers?.total + " Followers"}
                    image={artist?.images[2]?.url}
                />
            ))
            : featured
                ? featured.map((playlist) => (
                    <WidgetEntry
                        key={playlist?.name}
                        title={playlist?.name}
                        subtitle={playlist?.tracks?.total + " Songs"}
                        image={playlist?.images[0]?.url}
                    />
                ))
                : newRelease
                    ? newRelease.map((album) => (
                        <WidgetEntry
                            key={album?.name}
                            title={album?.name}
                            subtitle={album?.artists[0]?.name}
                            image={album?.images[2]?.url}
                        />
                    ))
                    : null}
        <div className="widget-fade">
            <div className="fade-button">
                <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
                    <FiChevronRight />
                </IconContext.Provider>
            </div>
        </div>
    </div>
);
}
