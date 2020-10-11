//React imports
import React, {useEffect, useState} from 'react';
// Router imports
import {Link} from "@reach/router"
//Material UI imports
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
//Local imports
import {getCountry} from "../services/country-http.service";

const CountryDetails = (props) => {
    // Accordion show/hide
    const [expanded, setExpanded] = useState('panel1');
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCountry(props.id).then(res => {
            setCountry(res.data);
            setIsLoading(false);
        }).catch(error => setIsLoading(false));
    }, [props.id]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (isLoading) {
        return <LinearProgress/>;
    } else {
        return (
            <div>
                <Link to="..">Go Back</Link>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Country details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component={'span'}>
                            <div>Name: {country.name}</div>
                            <div>Capital: {country.capital}</div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

};
export default CountryDetails;
