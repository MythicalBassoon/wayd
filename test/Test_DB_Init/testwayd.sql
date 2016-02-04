--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: emails; Type: TABLE; Schema: public; Owner: Spencer; Tablespace: 
--

CREATE TABLE emails (
    email character varying(40),
    poll_id integer,
    id integer NOT NULL
);


ALTER TABLE emails OWNER TO "Spencer";

--
-- Name: emails_id_seq; Type: SEQUENCE; Schema: public; Owner: Spencer
--

CREATE SEQUENCE emails_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE emails_id_seq OWNER TO "Spencer";

--
-- Name: emails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Spencer
--

ALTER SEQUENCE emails_id_seq OWNED BY emails.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: Spencer; Tablespace: 
--

CREATE TABLE events (
    title character varying(100),
    description character varying(10000),
    start_time character varying(40),
    stop_time character varying(40),
    category character varying(40),
    address character varying(500),
    city character varying(500),
    state character varying(500),
    lat character varying(40),
    long character varying(40),
    source character varying(50),
    source_id character varying(50),
    image_thumb character varying(5000),
    image_medium character varying(5000),
    id integer NOT NULL
);


ALTER TABLE events OWNER TO "Spencer";

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: Spencer
--

CREATE SEQUENCE events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_id_seq OWNER TO "Spencer";

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Spencer
--

ALTER SEQUENCE events_id_seq OWNED BY events.id;


--
-- Name: polls; Type: TABLE; Schema: public; Owner: Spencer; Tablespace: 
--

CREATE TABLE polls (
    event_id integer,
    user_id integer,
    num_participants integer,
    yes_count integer DEFAULT 0,
    no_count integer DEFAULT 0,
    id integer NOT NULL
);


ALTER TABLE polls OWNER TO "Spencer";

--
-- Name: polls_id_seq; Type: SEQUENCE; Schema: public; Owner: Spencer
--

CREATE SEQUENCE polls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE polls_id_seq OWNER TO "Spencer";

--
-- Name: polls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Spencer
--

ALTER SEQUENCE polls_id_seq OWNED BY polls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: Spencer; Tablespace: 
--

CREATE TABLE users (
    first_name character varying(40),
    last_name character varying(40),
    user_name character varying(40),
    password character varying(40),
    access_token character varying(1000),
    id integer NOT NULL
);


ALTER TABLE users OWNER TO "Spencer";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: Spencer
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO "Spencer";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Spencer
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY emails ALTER COLUMN id SET DEFAULT nextval('emails_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY events ALTER COLUMN id SET DEFAULT nextval('events_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY polls ALTER COLUMN id SET DEFAULT nextval('polls_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: emails; Type: TABLE DATA; Schema: public; Owner: Spencer
--

COPY emails (email, poll_id, id) FROM stdin;
\.


--
-- Name: emails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Spencer
--

SELECT pg_catalog.setval('emails_id_seq', 1, false);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: Spencer
--

COPY events (title, description, start_time, stop_time, category, address, city, state, lat, long, source, source_id, image_thumb, image_medium, id) FROM stdin;
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Spencer
--

SELECT pg_catalog.setval('events_id_seq', 1, false);


--
-- Data for Name: polls; Type: TABLE DATA; Schema: public; Owner: Spencer
--

COPY polls (event_id, user_id, num_participants, yes_count, no_count, id) FROM stdin;
\.


--
-- Name: polls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Spencer
--

SELECT pg_catalog.setval('polls_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Spencer
--

COPY users (first_name, last_name, user_name, password, access_token, id) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Spencer
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: emails_pkey; Type: CONSTRAINT; Schema: public; Owner: Spencer; Tablespace: 
--

ALTER TABLE ONLY emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: Spencer; Tablespace: 
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: polls_pkey; Type: CONSTRAINT; Schema: public; Owner: Spencer; Tablespace: 
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT polls_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: Spencer; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: emails_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY emails
    ADD CONSTRAINT emails_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES polls(id);


--
-- Name: polls_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT polls_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(id);


--
-- Name: polls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Spencer
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT polls_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: Spencer
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM "Spencer";
GRANT ALL ON SCHEMA public TO "Spencer";
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

