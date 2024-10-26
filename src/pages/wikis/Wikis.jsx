/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CircularProgress } from '@mui/material';
import { useState, useEffect, useContext, useRef } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../providers/auth_provider';
import { CONFIG } from '../../data/config';
import { API } from '../../data/api';

export default function Wikis() {
    const apiCall = useRef(undefined)
    const auth = useAuth()
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState(undefined)
    const [wikis, setwikis] = useState([])
    const [filteredWikis, setFilteredWikis] = useState([])

    useEffect(() => {
        // Check if user info exists in context
        if (!auth.user) return
        fetchVideos();
    }, [auth]); // Empty dependency to run once on mount

    useEffect(() => {
        console.log("inoking")
        let _wikis = [...wikis]
        console.log(_wikis)
        let filteredWikis = _wikis.filter((wiki) =>
            wiki.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredWikis(filteredWikis)
    }, [searchQuery])

    const fetchVideos = async (level) => {

        try {
            apiCall.current = API.auth.request({
                path: `/user/wikis/`,
                method: "GET"
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            setwikis(response.wikis);
            setFilteredWikis(response.wikis)
        }
        catch (err) {
            console.log(err)
            if (err.error) {
                setError(`خطا: ${err.error}`);
            } else {
                setError('خطا: ' + err.message);
            }
        } finally {
            setLoading(false)
        }
    };
    return (
        <>
            <div css={css`display:flex;flex-direction:row;`}>
                {/* Search input */}
                <input
                    type="search"
                    id="default-search"
                    dir="rtl" // Add this for RTL direction
                    className="mt-4 mb-4 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-500 focus:border-blue-500 text-right" // Add text-right to align the text
                    placeholder="جستجوی مربی"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change

                />
            </div>
            <div css={css`min-height:600px;display:flex;flex-direction:column;gap:20px;justify-content:center;`}>
                {loading ?
                    <div css={css`display:flex;flex-direction:column;gap:20px;justify-content:center;align-items:center;align-items:center;`}>
                        <CircularProgress />
                        <h1>در حال اماده سازی</h1>
                    </div>
                    :
                    filteredWikis.map((wiki) => {
                        return <Card key={wiki.id} id={wiki.id} >
                            <video
                                controls
                                className="w-full h-auto"
                                src={`${CONFIG.MEDIA_URL}${wiki.video_url}`}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {wiki.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    })
                }
            </div>
        </>

    )
}
