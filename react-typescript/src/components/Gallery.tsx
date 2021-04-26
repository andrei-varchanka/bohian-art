import React from 'react';
import {apiService} from "../api";
import {Painting} from "../api/";
import '../styles/gallery.scss';
import PaintingCard from "./PaintingCard";

type GalleryProps = {};
type GalleryState = { paintings?: Array<Painting>, count?: number };

class Gallery extends React.Component<GalleryProps, GalleryState> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        await this.getPaintings();
    }

    async getPaintings() {
        const response = (await apiService.getAllPaintings()).data;
        console.log(response);
        this.setState({
            paintings: response.paintings,
            count: response.count
        })
    }

    render() {
        return (
            <div className="gallery">
                <div className="items">
                    {
                        this.state.paintings?.map(painting => {
                            return <div className="item"><PaintingCard key={painting?.name} painting={painting}/></div>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Gallery;
