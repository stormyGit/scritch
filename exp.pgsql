--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: active_admin_comments; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.active_admin_comments (
    id bigint NOT NULL,
    namespace character varying,
    body text,
    resource_type character varying,
    resource_id bigint,
    author_type character varying,
    author_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.active_admin_comments OWNER TO stormy;

--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.active_admin_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.active_admin_comments_id_seq OWNER TO stormy;

--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.active_admin_comments_id_seq OWNED BY public.active_admin_comments.id;


--
-- Name: active_storage_attachments; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.active_storage_attachments (
    id bigint NOT NULL,
    name character varying NOT NULL,
    record_type character varying NOT NULL,
    record_id bigint NOT NULL,
    blob_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.active_storage_attachments OWNER TO stormy;

--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.active_storage_attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.active_storage_attachments_id_seq OWNER TO stormy;

--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.active_storage_attachments_id_seq OWNED BY public.active_storage_attachments.id;


--
-- Name: active_storage_blobs; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.active_storage_blobs (
    id bigint NOT NULL,
    key character varying NOT NULL,
    filename character varying NOT NULL,
    content_type character varying,
    metadata text,
    byte_size bigint NOT NULL,
    checksum character varying NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.active_storage_blobs OWNER TO stormy;

--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.active_storage_blobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.active_storage_blobs_id_seq OWNER TO stormy;

--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.active_storage_blobs_id_seq OWNED BY public.active_storage_blobs.id;


--
-- Name: activities; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    trackable_type character varying NOT NULL,
    trackable_id uuid NOT NULL,
    owner_type character varying NOT NULL,
    owner_id uuid NOT NULL,
    key character varying,
    parameters text,
    recipient_type character varying NOT NULL,
    recipient_id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.activities OWNER TO stormy;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activities_id_seq OWNER TO stormy;

--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.admin_users (
    id bigint NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.admin_users OWNER TO stormy;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.admin_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_users_id_seq OWNER TO stormy;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: adverts; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.adverts (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    width integer,
    height integer,
    size integer,
    impressions integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    public boolean DEFAULT false,
    file character varying,
    status character varying DEFAULT 'pending'::character varying,
    user_id uuid,
    url character varying,
    clicks integer DEFAULT 0,
    is_placeholder boolean DEFAULT false
);


ALTER TABLE public.adverts OWNER TO stormy;

--
-- Name: adverts_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.adverts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adverts_id_seq OWNER TO stormy;

--
-- Name: adverts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.adverts_id_seq OWNED BY public.adverts.id;


--
-- Name: announcements; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.announcements (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    body text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    title character varying
);


ALTER TABLE public.announcements OWNER TO stormy;

--
-- Name: announcements_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.announcements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcements_id_seq OWNER TO stormy;

--
-- Name: announcements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.announcements_id_seq OWNED BY public.announcements.id;


--
-- Name: apps; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.apps (
    id bigint NOT NULL,
    maintenance boolean DEFAULT false,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.apps OWNER TO stormy;

--
-- Name: apps_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.apps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.apps_id_seq OWNER TO stormy;

--
-- Name: apps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.apps_id_seq OWNED BY public.apps.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO stormy;

--
-- Name: asset_requests; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.asset_requests (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    asset_type character varying NOT NULL,
    asset_name character varying NOT NULL,
    url character varying NOT NULL,
    body character varying,
    user_id uuid,
    status character varying DEFAULT 'new'::character varying,
    assignee_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.asset_requests OWNER TO stormy;

--
-- Name: asset_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.asset_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asset_requests_id_seq OWNER TO stormy;

--
-- Name: asset_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.asset_requests_id_seq OWNED BY public.asset_requests.id;


--
-- Name: banned_users; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.banned_users (
    id bigint NOT NULL,
    telegram_id character varying,
    ban_reason text,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    notification_message character varying,
    banned_until timestamp without time zone,
    user_attributes json DEFAULT '{}'::json,
    user_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.banned_users OWNER TO stormy;

--
-- Name: banned_users_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.banned_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banned_users_id_seq OWNER TO stormy;

--
-- Name: banned_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.banned_users_id_seq OWNED BY public.banned_users.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.categories OWNER TO stormy;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO stormy;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: chats; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.chats (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    sender_id uuid,
    recipient_id uuid,
    accepted_at timestamp without time zone,
    is_sender_unread boolean DEFAULT false,
    is_recipient_unread boolean DEFAULT true,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.chats OWNER TO stormy;

--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.chats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chats_id_seq OWNER TO stormy;

--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: chronofage_jobs; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.chronofage_jobs (
    id integer NOT NULL,
    job_class character varying,
    job_id character varying,
    queue_name character varying,
    arguments text,
    priority integer DEFAULT 0,
    host character varying,
    started_at timestamp without time zone,
    completed_at timestamp without time zone,
    failed_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    output character varying
);


ALTER TABLE public.chronofage_jobs OWNER TO stormy;

--
-- Name: chronofage_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.chronofage_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chronofage_jobs_id_seq OWNER TO stormy;

--
-- Name: chronofage_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.chronofage_jobs_id_seq OWNED BY public.chronofage_jobs.id;


--
-- Name: claims; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.claims (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    fursuit_id uuid NOT NULL,
    user_id uuid NOT NULL,
    status character varying DEFAULT 'open'::character varying NOT NULL,
    conflictual boolean DEFAULT false,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.claims OWNER TO stormy;

--
-- Name: claims_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.claims_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.claims_id_seq OWNER TO stormy;

--
-- Name: claims_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.claims_id_seq OWNED BY public.claims.id;


--
-- Name: comment_reports; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.comment_reports (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    description text,
    comment_id uuid,
    reporter_id uuid,
    status character varying DEFAULT 'new'::character varying,
    assignee_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.comment_reports OWNER TO stormy;

--
-- Name: comment_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.comment_reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_reports_id_seq OWNER TO stormy;

--
-- Name: comment_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.comment_reports_id_seq OWNED BY public.comment_reports.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    medium_id uuid,
    body text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    parent_id uuid,
    replies_count integer DEFAULT 0
);


ALTER TABLE public.comments OWNER TO stormy;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO stormy;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: commission_statuses; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.commission_statuses (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.commission_statuses OWNER TO stormy;

--
-- Name: commission_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.commission_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commission_statuses_id_seq OWNER TO stormy;

--
-- Name: commission_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.commission_statuses_id_seq OWNED BY public.commission_statuses.id;


--
-- Name: editions; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.editions (
    id bigint NOT NULL,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    country character varying,
    city character varying,
    kind character varying,
    year integer,
    name character varying,
    event_id uuid,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    venue character varying,
    attendance integer,
    slug character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    picture character varying,
    theme character varying,
    charity character varying
);


ALTER TABLE public.editions OWNER TO stormy;

--
-- Name: editions_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.editions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.editions_id_seq OWNER TO stormy;

--
-- Name: editions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.editions_id_seq OWNED BY public.editions.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.events (
    id bigint NOT NULL,
    name character varying,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    slug character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    avatar character varying,
    web character varying
);


ALTER TABLE public.events OWNER TO stormy;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO stormy;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: faves; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.faves (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    medium_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.faves OWNER TO stormy;

--
-- Name: faves_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.faves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faves_id_seq OWNER TO stormy;

--
-- Name: faves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.faves_id_seq OWNED BY public.faves.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.follows (
    id integer NOT NULL,
    followable_type character varying NOT NULL,
    follower_type character varying NOT NULL,
    blocked boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    followable_id uuid,
    follower_id uuid,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.follows OWNER TO stormy;

--
-- Name: follows_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.follows_id_seq OWNER TO stormy;

--
-- Name: follows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.follows_id_seq OWNED BY public.follows.id;


--
-- Name: friendly_id_slugs; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.friendly_id_slugs (
    id integer NOT NULL,
    slug character varying NOT NULL,
    sluggable_id integer NOT NULL,
    sluggable_type character varying(50),
    scope character varying,
    created_at timestamp without time zone
);


ALTER TABLE public.friendly_id_slugs OWNER TO stormy;

--
-- Name: friendly_id_slugs_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.friendly_id_slugs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.friendly_id_slugs_id_seq OWNER TO stormy;

--
-- Name: friendly_id_slugs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.friendly_id_slugs_id_seq OWNED BY public.friendly_id_slugs.id;


--
-- Name: fursuit_builds; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_builds (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_builds OWNER TO stormy;

--
-- Name: fursuit_builds_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_builds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_builds_id_seq OWNER TO stormy;

--
-- Name: fursuit_builds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_builds_id_seq OWNED BY public.fursuit_builds.id;


--
-- Name: fursuit_fingers; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_fingers (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_fingers OWNER TO stormy;

--
-- Name: fursuit_fingers_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_fingers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_fingers_id_seq OWNER TO stormy;

--
-- Name: fursuit_fingers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_fingers_id_seq OWNED BY public.fursuit_fingers.id;


--
-- Name: fursuit_genders; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_genders (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_genders OWNER TO stormy;

--
-- Name: fursuit_genders_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_genders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_genders_id_seq OWNER TO stormy;

--
-- Name: fursuit_genders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_genders_id_seq OWNED BY public.fursuit_genders.id;


--
-- Name: fursuit_leg_types; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_leg_types (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.fursuit_leg_types OWNER TO stormy;

--
-- Name: fursuit_leg_types_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_leg_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_leg_types_id_seq OWNER TO stormy;

--
-- Name: fursuit_leg_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_leg_types_id_seq OWNED BY public.fursuit_leg_types.id;


--
-- Name: fursuit_makers; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_makers (
    id bigint NOT NULL,
    fursuit_id uuid,
    maker_id uuid,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_makers OWNER TO stormy;

--
-- Name: fursuit_makers_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_makers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_makers_id_seq OWNER TO stormy;

--
-- Name: fursuit_makers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_makers_id_seq OWNED BY public.fursuit_makers.id;


--
-- Name: fursuit_media; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_media (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fursuit_id uuid,
    medium_id uuid,
    user_id uuid
);


ALTER TABLE public.fursuit_media OWNER TO stormy;

--
-- Name: fursuit_media_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_media_id_seq OWNER TO stormy;

--
-- Name: fursuit_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_media_id_seq OWNED BY public.fursuit_media.id;


--
-- Name: fursuit_paddings; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_paddings (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_paddings OWNER TO stormy;

--
-- Name: fursuit_paddings_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_paddings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_paddings_id_seq OWNER TO stormy;

--
-- Name: fursuit_paddings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_paddings_id_seq OWNED BY public.fursuit_paddings.id;


--
-- Name: fursuit_species; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_species (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fursuit_id uuid,
    specy_id uuid
);


ALTER TABLE public.fursuit_species OWNER TO stormy;

--
-- Name: fursuit_species_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_species_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_species_id_seq OWNER TO stormy;

--
-- Name: fursuit_species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_species_id_seq OWNED BY public.fursuit_species.id;


--
-- Name: fursuit_styles; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_styles (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.fursuit_styles OWNER TO stormy;

--
-- Name: fursuit_styles_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_styles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_styles_id_seq OWNER TO stormy;

--
-- Name: fursuit_styles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_styles_id_seq OWNED BY public.fursuit_styles.id;


--
-- Name: fursuit_subscriptions; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_subscriptions (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    fursuit_id uuid,
    user_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_subscriptions OWNER TO stormy;

--
-- Name: fursuit_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_subscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_subscriptions_id_seq OWNER TO stormy;

--
-- Name: fursuit_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_subscriptions_id_seq OWNED BY public.fursuit_subscriptions.id;


--
-- Name: fursuit_users; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuit_users (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    user_id uuid,
    fursuit_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.fursuit_users OWNER TO stormy;

--
-- Name: fursuit_users_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuit_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuit_users_id_seq OWNER TO stormy;

--
-- Name: fursuit_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuit_users_id_seq OWNED BY public.fursuit_users.id;


--
-- Name: fursuits; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.fursuits (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying,
    slug character varying,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    creation_year integer,
    fursuit_leg_type_id uuid,
    fursuit_style_id uuid,
    avatar character varying,
    fursuit_padding_id uuid,
    fursuit_build_id uuid,
    fursuit_finger_id uuid,
    base_color character varying,
    eyes_color character varying,
    is_hybrid boolean DEFAULT false,
    fursuit_gender_id uuid
);


ALTER TABLE public.fursuits OWNER TO stormy;

--
-- Name: fursuits_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.fursuits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fursuits_id_seq OWNER TO stormy;

--
-- Name: fursuits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.fursuits_id_seq OWNED BY public.fursuits.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.likes (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    medium_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.likes OWNER TO stormy;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO stormy;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: lists; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.lists (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.lists OWNER TO stormy;

--
-- Name: lists_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.lists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists_id_seq OWNER TO stormy;

--
-- Name: lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.lists_id_seq OWNED BY public.lists.id;


--
-- Name: lists_users; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.lists_users (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    list_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.lists_users OWNER TO stormy;

--
-- Name: lists_users_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.lists_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists_users_id_seq OWNER TO stormy;

--
-- Name: lists_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.lists_users_id_seq OWNED BY public.lists_users.id;


--
-- Name: maker_claims; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.maker_claims (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    maker_id uuid NOT NULL,
    user_id uuid NOT NULL,
    status character varying DEFAULT 'open'::character varying NOT NULL,
    conflictual boolean DEFAULT false,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.maker_claims OWNER TO stormy;

--
-- Name: maker_claims_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.maker_claims_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maker_claims_id_seq OWNER TO stormy;

--
-- Name: maker_claims_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.maker_claims_id_seq OWNED BY public.maker_claims.id;


--
-- Name: maker_subscriptions; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.maker_subscriptions (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    maker_id uuid,
    user_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.maker_subscriptions OWNER TO stormy;

--
-- Name: maker_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.maker_subscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maker_subscriptions_id_seq OWNER TO stormy;

--
-- Name: maker_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.maker_subscriptions_id_seq OWNED BY public.maker_subscriptions.id;


--
-- Name: makers; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.makers (
    id bigint NOT NULL,
    name character varying,
    web character varying,
    country character varying,
    slug character varying,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    avatar character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    reference integer,
    region character varying,
    user_id uuid,
    commission_status character varying DEFAULT 'N/A'::character varying,
    commission_status_id uuid
);


ALTER TABLE public.makers OWNER TO stormy;

--
-- Name: makers_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.makers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.makers_id_seq OWNER TO stormy;

--
-- Name: makers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.makers_id_seq OWNED BY public.makers.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.media (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id uuid,
    duration integer,
    slug character varying,
    views_count integer DEFAULT 0,
    comments_count integer DEFAULT 0,
    likes_count integer DEFAULT 0,
    comments_disabled boolean DEFAULT false,
    refused_at timestamp without time zone,
    share_on_twitter boolean DEFAULT true,
    small_thumbnail_key character varying,
    picture character varying,
    width integer,
    height integer,
    data json,
    exif json,
    size integer,
    edition_id uuid,
    fursuit_id uuid,
    category_id uuid,
    panel_id uuid,
    completion integer DEFAULT 0,
    fursuits_count integer,
    sub_event_id uuid,
    faves_count integer DEFAULT 0,
    photographer_slug character varying,
    photographer_string character varying,
    tag_locked boolean DEFAULT false,
    tagger uuid,
    tag_lock_data timestamp without time zone,
    is_gif boolean DEFAULT false
);


ALTER TABLE public.media OWNER TO stormy;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_id_seq OWNER TO stormy;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: medium_reports; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.medium_reports (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    description text,
    medium_id uuid,
    reporter_id uuid,
    status character varying DEFAULT 'new'::character varying,
    assignee_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.medium_reports OWNER TO stormy;

--
-- Name: medium_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.medium_reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medium_reports_id_seq OWNER TO stormy;

--
-- Name: medium_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.medium_reports_id_seq OWNED BY public.medium_reports.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    chat_id uuid,
    sender_id uuid,
    body character varying,
    picture character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO stormy;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO stormy;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: moderation_comments; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.moderation_comments (
    id bigint NOT NULL,
    subject_id uuid,
    subject_type character varying,
    body text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    moderator_id bigint
);


ALTER TABLE public.moderation_comments OWNER TO stormy;

--
-- Name: moderation_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.moderation_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moderation_comments_id_seq OWNER TO stormy;

--
-- Name: moderation_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.moderation_comments_id_seq OWNED BY public.moderation_comments.id;


--
-- Name: moderators; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.moderators (
    id bigint NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    name character varying,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying,
    last_sign_in_ip character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    capabilities character varying[] DEFAULT '{}'::character varying[],
    telegram_id character varying,
    telegram_username character varying
);


ALTER TABLE public.moderators OWNER TO stormy;

--
-- Name: moderators_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.moderators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moderators_id_seq OWNER TO stormy;

--
-- Name: moderators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.moderators_id_seq OWNED BY public.moderators.id;


--
-- Name: panels; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.panels (
    id bigint NOT NULL,
    name character varying,
    edition_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.panels OWNER TO stormy;

--
-- Name: panels_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.panels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.panels_id_seq OWNER TO stormy;

--
-- Name: panels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.panels_id_seq OWNED BY public.panels.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.reports (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    description text,
    user_id uuid,
    reporter_id uuid,
    status character varying DEFAULT 'new'::character varying,
    assignee_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.reports OWNER TO stormy;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO stormy;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: ribbon_announcements; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.ribbon_announcements (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    body character varying NOT NULL,
    public boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.ribbon_announcements OWNER TO stormy;

--
-- Name: ribbon_announcements_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.ribbon_announcements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ribbon_announcements_id_seq OWNER TO stormy;

--
-- Name: ribbon_announcements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.ribbon_announcements_id_seq OWNED BY public.ribbon_announcements.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO stormy;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.sessions (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO stormy;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO stormy;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.species (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.species OWNER TO stormy;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.species_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO stormy;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: sponsors; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.sponsors (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    customer json,
    charge json,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status character varying,
    charge_id character varying,
    customer_id character varying,
    "limit" timestamp without time zone,
    plan character varying,
    user_id uuid
);


ALTER TABLE public.sponsors OWNER TO stormy;

--
-- Name: sponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.sponsors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sponsors_id_seq OWNER TO stormy;

--
-- Name: sponsors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.sponsors_id_seq OWNED BY public.sponsors.id;


--
-- Name: statistics; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.statistics (
    id bigint NOT NULL,
    users integer,
    likes integer,
    media integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    tags integer DEFAULT 0,
    claimed_suits integer DEFAULT 0,
    claimed_makers integer DEFAULT 0,
    sponsors integer DEFAULT 0,
    faves integer DEFAULT 0,
    comments integer DEFAULT 0,
    average_completion double precision DEFAULT 0.0,
    impressions integer
);


ALTER TABLE public.statistics OWNER TO stormy;

--
-- Name: statistics_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.statistics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statistics_id_seq OWNER TO stormy;

--
-- Name: statistics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.statistics_id_seq OWNED BY public.statistics.id;


--
-- Name: sub_events; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.sub_events (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.sub_events OWNER TO stormy;

--
-- Name: sub_events_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.sub_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sub_events_id_seq OWNER TO stormy;

--
-- Name: sub_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.sub_events_id_seq OWNED BY public.sub_events.id;


--
-- Name: suspended_users; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.suspended_users (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    user_id uuid NOT NULL,
    "limit" timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    reason character varying
);


ALTER TABLE public.suspended_users OWNER TO stormy;

--
-- Name: suspended_users_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.suspended_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suspended_users_id_seq OWNER TO stormy;

--
-- Name: suspended_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.suspended_users_id_seq OWNED BY public.suspended_users.id;


--
-- Name: tag_reports; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.tag_reports (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    description text,
    medium_id uuid,
    reporter_id uuid,
    status character varying DEFAULT 'new'::character varying,
    assignee_id bigint,
    fursuit_medium_ids uuid[] DEFAULT '{}'::uuid[]
);


ALTER TABLE public.tag_reports OWNER TO stormy;

--
-- Name: tag_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.tag_reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_reports_id_seq OWNER TO stormy;

--
-- Name: tag_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.tag_reports_id_seq OWNED BY public.tag_reports.id;


--
-- Name: taggings; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.taggings (
    id integer NOT NULL,
    tag_id integer,
    taggable_type character varying NOT NULL,
    taggable_id uuid NOT NULL,
    tagger_type character varying,
    tagger_id uuid,
    context character varying(128),
    created_at timestamp without time zone
);


ALTER TABLE public.taggings OWNER TO stormy;

--
-- Name: taggings_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.taggings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.taggings_id_seq OWNER TO stormy;

--
-- Name: taggings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.taggings_id_seq OWNED BY public.taggings.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying,
    taggings_count integer DEFAULT 0
);


ALTER TABLE public.tags OWNER TO stormy;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO stormy;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: tech_reports; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.tech_reports (
    id bigint NOT NULL,
    page character varying,
    description text,
    user_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    kind character varying
);


ALTER TABLE public.tech_reports OWNER TO stormy;

--
-- Name: tech_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.tech_reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tech_reports_id_seq OWNER TO stormy;

--
-- Name: tech_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.tech_reports_id_seq OWNED BY public.tech_reports.id;


--
-- Name: tooltips; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.tooltips (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    public boolean DEFAULT false,
    file character varying,
    category character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying,
    body character varying,
    aspect character varying,
    topic character varying
);


ALTER TABLE public.tooltips OWNER TO stormy;

--
-- Name: tooltips_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.tooltips_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tooltips_id_seq OWNER TO stormy;

--
-- Name: tooltips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.tooltips_id_seq OWNED BY public.tooltips.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    slug character varying,
    bio character varying,
    telegram_id character varying,
    avatar character varying,
    banner character varying,
    theme character varying DEFAULT 'dark'::character varying,
    last_activities_read timestamp without time zone,
    website character varying,
    public boolean DEFAULT true,
    blocked_users_ids character varying[] DEFAULT '{}'::character varying[],
    last_announcements_read timestamp without time zone,
    chat_enabled boolean DEFAULT true,
    tag_tutorial boolean DEFAULT true,
    customer json,
    charge json,
    available_impressions integer DEFAULT 0,
    charge_id character varying,
    customer_id character varying,
    show_ads boolean DEFAULT true,
    show_tooltips boolean DEFAULT true,
    telegram_username character varying,
    score integer DEFAULT 0,
    global_score integer DEFAULT 0,
    metric_species character varying,
    suspension_count integer DEFAULT 0,
    offenses_number integer DEFAULT 0,
    used_free_trial boolean DEFAULT false,
    last_seen_media timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_seen_fursuits timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_seen_makers timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    bought_impressions integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO stormy;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO stormy;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: views; Type: TABLE; Schema: public; Owner: stormy
--

CREATE TABLE public.views (
    id bigint NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ip character varying,
    user_id uuid,
    medium_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.views OWNER TO stormy;

--
-- Name: views_id_seq; Type: SEQUENCE; Schema: public; Owner: stormy
--

CREATE SEQUENCE public.views_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.views_id_seq OWNER TO stormy;

--
-- Name: views_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stormy
--

ALTER SEQUENCE public.views_id_seq OWNED BY public.views.id;


--
-- Name: active_admin_comments id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.active_admin_comments ALTER COLUMN id SET DEFAULT nextval('public.active_admin_comments_id_seq'::regclass);


--
-- Name: active_storage_attachments id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.active_storage_attachments ALTER COLUMN id SET DEFAULT nextval('public.active_storage_attachments_id_seq'::regclass);


--
-- Name: active_storage_blobs id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.active_storage_blobs ALTER COLUMN id SET DEFAULT nextval('public.active_storage_blobs_id_seq'::regclass);


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: adverts id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.adverts ALTER COLUMN id SET DEFAULT nextval('public.adverts_id_seq'::regclass);


--
-- Name: announcements id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.announcements ALTER COLUMN id SET DEFAULT nextval('public.announcements_id_seq'::regclass);


--
-- Name: apps id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.apps ALTER COLUMN id SET DEFAULT nextval('public.apps_id_seq'::regclass);


--
-- Name: asset_requests id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.asset_requests ALTER COLUMN id SET DEFAULT nextval('public.asset_requests_id_seq'::regclass);


--
-- Name: banned_users id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.banned_users ALTER COLUMN id SET DEFAULT nextval('public.banned_users_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- Name: chronofage_jobs id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.chronofage_jobs ALTER COLUMN id SET DEFAULT nextval('public.chronofage_jobs_id_seq'::regclass);


--
-- Name: claims id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.claims ALTER COLUMN id SET DEFAULT nextval('public.claims_id_seq'::regclass);


--
-- Name: comment_reports id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.comment_reports ALTER COLUMN id SET DEFAULT nextval('public.comment_reports_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: commission_statuses id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.commission_statuses ALTER COLUMN id SET DEFAULT nextval('public.commission_statuses_id_seq'::regclass);


--
-- Name: editions id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.editions ALTER COLUMN id SET DEFAULT nextval('public.editions_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: faves id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.faves ALTER COLUMN id SET DEFAULT nextval('public.faves_id_seq'::regclass);


--
-- Name: follows id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.follows ALTER COLUMN id SET DEFAULT nextval('public.follows_id_seq'::regclass);


--
-- Name: friendly_id_slugs id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.friendly_id_slugs ALTER COLUMN id SET DEFAULT nextval('public.friendly_id_slugs_id_seq'::regclass);


--
-- Name: fursuit_builds id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_builds ALTER COLUMN id SET DEFAULT nextval('public.fursuit_builds_id_seq'::regclass);


--
-- Name: fursuit_fingers id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_fingers ALTER COLUMN id SET DEFAULT nextval('public.fursuit_fingers_id_seq'::regclass);


--
-- Name: fursuit_genders id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_genders ALTER COLUMN id SET DEFAULT nextval('public.fursuit_genders_id_seq'::regclass);


--
-- Name: fursuit_leg_types id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_leg_types ALTER COLUMN id SET DEFAULT nextval('public.fursuit_leg_types_id_seq'::regclass);


--
-- Name: fursuit_makers id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_makers ALTER COLUMN id SET DEFAULT nextval('public.fursuit_makers_id_seq'::regclass);


--
-- Name: fursuit_media id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_media ALTER COLUMN id SET DEFAULT nextval('public.fursuit_media_id_seq'::regclass);


--
-- Name: fursuit_paddings id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_paddings ALTER COLUMN id SET DEFAULT nextval('public.fursuit_paddings_id_seq'::regclass);


--
-- Name: fursuit_species id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_species ALTER COLUMN id SET DEFAULT nextval('public.fursuit_species_id_seq'::regclass);


--
-- Name: fursuit_styles id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_styles ALTER COLUMN id SET DEFAULT nextval('public.fursuit_styles_id_seq'::regclass);


--
-- Name: fursuit_subscriptions id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_subscriptions ALTER COLUMN id SET DEFAULT nextval('public.fursuit_subscriptions_id_seq'::regclass);


--
-- Name: fursuit_users id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_users ALTER COLUMN id SET DEFAULT nextval('public.fursuit_users_id_seq'::regclass);


--
-- Name: fursuits id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuits ALTER COLUMN id SET DEFAULT nextval('public.fursuits_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: lists id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.lists ALTER COLUMN id SET DEFAULT nextval('public.lists_id_seq'::regclass);


--
-- Name: lists_users id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.lists_users ALTER COLUMN id SET DEFAULT nextval('public.lists_users_id_seq'::regclass);


--
-- Name: maker_claims id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.maker_claims ALTER COLUMN id SET DEFAULT nextval('public.maker_claims_id_seq'::regclass);


--
-- Name: maker_subscriptions id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.maker_subscriptions ALTER COLUMN id SET DEFAULT nextval('public.maker_subscriptions_id_seq'::regclass);


--
-- Name: makers id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.makers ALTER COLUMN id SET DEFAULT nextval('public.makers_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: medium_reports id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.medium_reports ALTER COLUMN id SET DEFAULT nextval('public.medium_reports_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: moderation_comments id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.moderation_comments ALTER COLUMN id SET DEFAULT nextval('public.moderation_comments_id_seq'::regclass);


--
-- Name: moderators id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.moderators ALTER COLUMN id SET DEFAULT nextval('public.moderators_id_seq'::regclass);


--
-- Name: panels id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.panels ALTER COLUMN id SET DEFAULT nextval('public.panels_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: ribbon_announcements id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.ribbon_announcements ALTER COLUMN id SET DEFAULT nextval('public.ribbon_announcements_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Name: sponsors id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.sponsors ALTER COLUMN id SET DEFAULT nextval('public.sponsors_id_seq'::regclass);


--
-- Name: statistics id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.statistics ALTER COLUMN id SET DEFAULT nextval('public.statistics_id_seq'::regclass);


--
-- Name: sub_events id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.sub_events ALTER COLUMN id SET DEFAULT nextval('public.sub_events_id_seq'::regclass);


--
-- Name: suspended_users id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.suspended_users ALTER COLUMN id SET DEFAULT nextval('public.suspended_users_id_seq'::regclass);


--
-- Name: tag_reports id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tag_reports ALTER COLUMN id SET DEFAULT nextval('public.tag_reports_id_seq'::regclass);


--
-- Name: taggings id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.taggings ALTER COLUMN id SET DEFAULT nextval('public.taggings_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: tech_reports id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tech_reports ALTER COLUMN id SET DEFAULT nextval('public.tech_reports_id_seq'::regclass);


--
-- Name: tooltips id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tooltips ALTER COLUMN id SET DEFAULT nextval('public.tooltips_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: views id; Type: DEFAULT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.views ALTER COLUMN id SET DEFAULT nextval('public.views_id_seq'::regclass);


--
-- Data for Name: active_admin_comments; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.active_admin_comments (id, namespace, body, resource_type, resource_id, author_type, author_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: active_storage_attachments; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.active_storage_attachments (id, name, record_type, record_id, blob_id, created_at) FROM stdin;
\.


--
-- Data for Name: active_storage_blobs; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.active_storage_blobs (id, key, filename, content_type, metadata, byte_size, checksum, created_at) FROM stdin;
\.


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.activities (id, trackable_type, trackable_id, owner_type, owner_id, key, parameters, recipient_type, recipient_id, created_at, updated_at) FROM stdin;
243	MediumReport	85f5c5ed-4737-40ee-951b-689887807069	User	ffa902c2-63b1-40a9-8fbf-348a65ec7960	medium_report.create	\N	User	02b49ce7-22fd-429f-b1b1-55cfad638f59	2019-05-05 23:52:31.298839	2019-05-05 23:52:31.298839
244	MediumReport	aefe2fba-c954-408c-822a-a1e557a2f309	User	ffa902c2-63b1-40a9-8fbf-348a65ec7960	medium_report.create	\N	User	3e69717e-9803-4fc1-9909-419092780574	2019-05-06 20:56:38.696994	2019-05-06 20:56:38.696994
246	Follow	3a971a0a-1e5d-40f1-b86f-a2a809ef3d7c	User	3e69717e-9803-4fc1-9909-419092780574	follow.create	\N	User	bd88fca0-9b2d-4252-9357-298429a6d5a3	2019-05-08 20:24:03.473637	2019-05-08 20:24:03.473637
247	MediumReport	96163f4f-d953-453d-878a-bd02fb4e5662	User	ffa902c2-63b1-40a9-8fbf-348a65ec7960	medium_report.create	\N	User	3e69717e-9803-4fc1-9909-419092780574	2019-05-10 09:03:54.53585	2019-05-10 09:03:54.53585
248	AssetRequest	15b55060-bd3f-4d8f-90cc-0d75cca98911	User	ffa902c2-63b1-40a9-8fbf-348a65ec7960	asset_request.create	\N	User	3e69717e-9803-4fc1-9909-419092780574	2019-05-10 20:19:52.420247	2019-05-10 20:19:52.420247
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.admin_users (id, email, encrypted_password, reset_password_token, reset_password_sent_at, remember_created_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: adverts; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.adverts (id, uuid, width, height, size, impressions, created_at, updated_at, public, file, status, user_id, url, clicks, is_placeholder) FROM stdin;
24	5b255795-3be8-4804-adec-026a409da58a	300	90	405420	606	2019-05-06 20:23:45.708349	2019-05-12 22:42:32.91741	f	66c30940-c412-4bcd-88e8-a1587b3240aa.gif	live	3e69717e-9803-4fc1-9909-419092780574	http://http://eafb9fff.ngrok.io/fursuits	0	f
25	ea5e891a-b83e-467b-b585-8e16dc46c23f	300	90	405420	623	2019-05-06 20:23:57.508934	2019-05-12 22:42:33.002827	f	001da8de-d1d6-4d9d-bb44-66268e2e711f.gif	live	3e69717e-9803-4fc1-9909-419092780574	http://http://eafb9fff.ngrok.io/fursuits	0	f
28	daaf2485-f64c-4a3b-835f-af265bae8340	1533	2120	981958	0	2019-05-12 22:42:44.102642	2019-05-12 22:42:44.102642	f	2a9ce432-4265-4d46-9e20-cceb2714ea7f.jpeg	pending	3e69717e-9803-4fc1-9909-419092780574	http://sdfg	0	f
27	b1f1837b-6996-48bb-8573-d5cd79b9548a	304	292	72327	0	2019-05-12 22:41:12.802711	2019-05-12 22:41:12.802711	f	4cb7eccc-4501-437e-8f47-5c92e75c94cf.png	pending	3e69717e-9803-4fc1-9909-419092780574	http://aderfg	0	f
26	8ef302d9-9b92-40d1-be20-98cbc25ab7dd	512	512	299875	0	2019-05-12 22:40:05.513962	2019-05-12 22:40:05.513962	f	33d2a8ce-4459-4220-baaf-d6c6688ace9a.png	pending	3e69717e-9803-4fc1-9909-419092780574	http://asdgrf	0	f
\.


--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.announcements (id, uuid, body, created_at, updated_at, title) FROM stdin;
1	173b8d1a-184e-48ce-b27c-3430e1fd6a40	This is an announcement about stuff and all that	2019-01-31 19:50:04.659794	2019-01-31 20:24:36.811482	We are live!
2	6cc99007-376c-4a16-bb2c-26ec0c9b0ea1	What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\nWhere can I get some?\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.	2019-01-31 19:57:57.525291	2019-01-31 20:50:15.076676	blank
3	dc0710d0-a594-41a5-8df0-0418a4336b20	# Dillinger\n\n[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)\n\n[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)\n\nDillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.\n\n  - Type some Markdown on the left\n  - See HTML in the right\n  - Magic\n\n# New Features!\n\n  - Import a HTML file and watch it magically convert to Markdown\n  - Drag and drop images (requires your Dropbox account be linked)\n\n\nYou can also:\n  - Import and save files from GitHub, Dropbox, Google Drive and One Drive\n  - Drag and drop markdown and HTML files into Dillinger\n  - Export documents as Markdown, HTML and PDF\n\nMarkdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nThis text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.\n\n### Tech\n\nDillinger uses a number of open source projects to work properly:\n\n* [AngularJS] - HTML enhanced for web apps!\n* [Ace Editor] - awesome web-based text editor\n* [markdown-it] - Markdown parser done right. Fast and easy to extend.\n* [Twitter Bootstrap] - great UI boilerplate for modern web apps\n* [node.js] - evented I/O for the backend\n* [Express] - fast node.js network app framework [@tjholowaychuk]\n* [Gulp] - the streaming build system\n* [Breakdance](http://breakdance.io) - HTML to Markdown converter\n* [jQuery] - duh\n\nAnd of course Dillinger itself is open source with a [public repository][dill]\n on GitHub.\n\n### Installation\n\nDillinger requires [Node.js](https://nodejs.org/) v4+ to run.\n\nInstall the dependencies and devDependencies and start the server.\n\n```sh\n$ cd dillinger\n$ npm install -d\n$ node app\n```\n\nFor production environments...\n\n```sh\n$ npm install --production\n$ NODE_ENV=production node app\n```	2019-01-31 20:01:29.261337	2019-01-31 20:50:15.093458	blank
4	b38cf71d-7bac-4284-b4a5-d9c02dc063fc	# Scritch is almost live!\n\n![N](https://pm1.narvii.com/6830/bb065a3407190dd5de686e611e5216d65c717cd9v2_128.jpg)\n\nWhere can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\n\nSome text here!\n\n  - And a list of stuff\n  - another thing!\n  - One last!\n\nWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n# New Features!\n\n  - We added thsis and this\n  - And even this!\n\n\nAnd about that:\n  - Did you know\n  - That you can \n  - Do this?\n\nThis awesome links goes to [Google](http://google.com)\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nThis text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.\n\n### Installation\n\nDillinger requires [Node.js](https://nodejs.org/) v4+ to run.\n\nInstall the dependencies and devDependencies and start the server.\n\n```sh\n$ cd dillinger\n$ npm install -d\n$ node app\n```\n\nFor production environments...\n\n```sh\n$ npm install --production\n$ NODE_ENV=production node app\n```\n\n### Plugins\n\nDillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.\n\n| Plugin | README |\n| ------ | ------ |\n| Dropbox | [plugins/dropbox/README.md][PlDb] |\n| Github | [plugins/github/README.md][PlGh] |\n| Google Drive | [plugins/googledrive/README.md][PlGd] |\n| OneDrive | [plugins/onedrive/README.md][PlOd] |\n| Medium | [plugins/medium/README.md][PlMe] |\n| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |\n\n\n### Development\n\nWant to contribute? Great!\n\nDillinger uses Gulp + Webpack for fast developing.\nMake a change in your file and instantanously see your updates!\n\nOpen your favorite Terminal and run these commands.\n\nFirst Tab:\n```sh\n$ node app\n```\n\nSecond Tab:\n```sh\n$ gulp watch\n```\n\n(optional) Third:\n```sh\n$ karma test\n```\n#### Building for source\nFor production release:\n```sh\n$ gulp build --prod\n```\nGenerating pre-built zip archives for distribution:\n```sh\n$ gulp build dist --prod\n```\n### Docker\nDillinger is very easy to install and deploy in a Docker container.\n\nBy default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.\n\n```sh\ncd dillinger\ndocker build -t joemccann/dillinger:${package.json.version} .\n```\nThis will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.\n\nOnce done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):\n\n```sh\ndocker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}\n```\n\nVerify the deployment by navigating to your server address in your preferred browser.\n\n```sh\n127.0.0.1:8000\n```\n\n#### Kubernetes + Google Cloud\n\nSee [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)\n\n\n### Todos\n\n - Write MORE Tests\n - Add Night Mode\n\nLicense\n----\n\nMIT\n\n\n**Free Software, Hell Yeah!**\n\n[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)\n\n\n   [dill]: <https://github.com/joemccann/dillinger>\n   [git-repo-url]: <https://github.com/joemccann/dillinger.git>\n   [john gruber]: <http://daringfireball.net>\n   [df1]: <http://daringfireball.net/projects/markdown/>\n   [markdown-it]: <https://github.com/markdown-it/markdown-it>\n   [Ace Editor]: <http://ace.ajax.org>\n   [node.js]: <http://nodejs.org>\n   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>\n   [jQuery]: <http://jquery.com>\n   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>\n   [express]: <http://expressjs.com>\n   [AngularJS]: <http://angularjs.org>\n   [Gulp]: <http://gulpjs.com>\n\n   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>\n   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>\n   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>\n   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>\n   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>\n   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>\n	2019-01-31 20:47:22.759964	2019-01-31 20:51:55.742844	Awesome announcement
\.


--
-- Data for Name: apps; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.apps (id, maintenance, created_at, updated_at) FROM stdin;
1	f	2019-04-30 00:38:06.622882	2019-05-10 06:27:35.646646
\.


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2019-01-17 07:34:07.232279	2019-01-17 07:34:07.232279
\.


--
-- Data for Name: asset_requests; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.asset_requests (id, uuid, asset_type, asset_name, url, body, user_id, status, assignee_id, created_at, updated_at) FROM stdin;
1	c65a3eb5-ba73-4ac6-b2eb-01bd965d80a1	Event	asd	http://asd	asd	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-20 01:45:14.921009	2019-03-20 01:49:17.979312
2	18806de2-0f87-43e5-86d2-31e5c355d939	Event	asd	http://asd	asd	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-20 01:49:33.290351	2019-03-20 01:49:38.109509
3	968a9ce8-2c4b-425e-9b28-3a1b2fb45293	Fursuit	Stormy	http://sdfg	adfpginhbuj\nsadfg\nsdfg\n\nsdfg\nsdfg\nsd\nfg\nsdfg\n\ndfg\ndfg\n	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-05-06 21:52:04.879348	2019-05-06 21:52:32.859938
4	15b55060-bd3f-4d8f-90cc-0d75cca98911	Fursuit	asdf	http://asdf	asdf	3e69717e-9803-4fc1-9909-419092780574	new	\N	2019-05-10 20:19:52.351788	2019-05-10 20:19:52.351788
\.


--
-- Data for Name: banned_users; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.banned_users (id, telegram_id, ban_reason, uuid, notification_message, banned_until, user_attributes, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.categories (id, name, created_at, updated_at, uuid) FROM stdin;
1	Animals & Pets	2019-02-25 12:41:48.100337	2019-02-25 12:41:48.100337	0915b93c-8d8a-45b3-aeb5-5f5230b2b711
2	Antiques & Collectibles	2019-02-25 12:41:48.126163	2019-02-25 12:41:48.126163	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2
3	Business Office & Industrial	2019-02-25 12:41:48.13489	2019-02-25 12:41:48.13489	a2edc378-7bd1-4d38-adc5-12edd944106c
4	Comedic	2019-02-25 12:41:48.144133	2019-02-25 12:41:48.144133	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7
5	Computing & Technology	2019-02-25 12:41:48.152152	2019-02-25 12:41:48.152152	5c86cae6-e3cf-4ec1-862c-2141abc683cb
6	Costuming/Cosplay	2019-02-25 12:41:48.160585	2019-02-25 12:41:48.160585	a9101a71-590d-4483-8b50-c6194c005e16
7	Fitness	2019-02-25 12:41:48.168885	2019-02-25 12:41:48.168885	8381fbbb-b2fa-4a08-8f20-3dc2a81f042d
8	Food & Drink	2019-02-25 12:41:48.177513	2019-02-25 12:41:48.177513	c863f6bb-8310-4bd0-be08-08718cb1a822
9	Fund Raising	2019-02-25 12:41:48.185261	2019-02-25 12:41:48.185261	c54af0f8-ab16-4e03-a58a-f20c13ab907f
10	Gaming	2019-02-25 12:41:48.194175	2019-02-25 12:41:48.194175	46f0b8f6-0180-4829-8089-ebd892b1a6e7
11	Group	2019-02-25 12:41:48.202112	2019-02-25 12:41:48.202112	07f1a9f5-9b8a-46cf-b1bc-eb565878659e
12	Historical	2019-02-25 12:41:48.211214	2019-02-25 12:41:48.211214	55e7dba9-aac7-46cd-8d6e-fc1390d4fc17
13	Holidays & Travel	2019-02-25 12:41:48.219618	2019-02-25 12:41:48.219618	120a807b-8bc0-4388-a268-2a49ff8282ee
14	Home	2019-02-25 12:41:48.230929	2019-02-25 12:41:48.230929	92ef1a3b-1ae2-4523-b1a9-974f6ad86e57
15	Inflatables	2019-02-25 12:41:48.239705	2019-02-25 12:41:48.239705	ef4e6077-7d43-44d6-a33e-4144130b1c7a
16	Literature	2019-02-25 12:41:48.248993	2019-02-25 12:41:48.248993	5d382a2b-4812-4c28-8ad4-40f3503ef974
17	Macro/Micro	2019-02-25 12:41:48.258242	2019-02-25 12:41:48.258242	e08bd72e-8190-4427-bb49-e6fe4971efc2
18	Music & Instruments	2019-02-25 12:41:48.266814	2019-02-25 12:41:48.266814	7bd9ce48-169d-408d-91b9-3edc4da5bff2
19	Other	2019-02-25 12:41:48.275929	2019-02-25 12:41:48.275929	25d89295-cc64-43b0-b1c5-1044b9bb0ea0
20	Outdoors	2019-02-25 12:41:48.284488	2019-02-25 12:41:48.284488	e91d05f6-dc2f-4a18-8cdb-b6eb15573cd7
21	Paws	2019-02-25 12:41:48.292297	2019-02-25 12:41:48.292297	3169e0d2-4cfd-4317-b446-f92f38e25e81
22	Plush	2019-02-25 12:41:48.301217	2019-02-25 12:41:48.301217	66bdd1bf-4747-45c1-857a-b689ceb55323
23	Seasonal Event (Birthday/Wedding/Anniversary etc)	2019-02-25 12:41:48.308478	2019-02-25 12:41:48.308478	fb1789db-da91-4798-ad02-173760a4c91d
24	Seasonal Event (Festive)	2019-02-25 12:41:48.316408	2019-02-25 12:41:48.316408	43b95ff1-4d71-4425-b9d9-29e9fda4981f
25	Seasonal Event (Halloween)	2019-02-25 12:41:48.323775	2019-02-25 12:41:48.323775	d6a437ca-4bd6-42ee-9202-18e0c68ba40c
26	Seasonal Event (New Year)	2019-02-25 12:41:48.331345	2019-02-25 12:41:48.331345	29f18cb1-a384-4ae6-a1ca-e2b4fbd4f096
27	Seasonal Event (Other)	2019-02-25 12:41:48.339014	2019-02-25 12:41:48.339014	1cb080d1-df0d-4c89-8207-f4276c5bce69
28	Seasonal Event (Thanksgiving)	2019-02-25 12:41:48.346936	2019-02-25 12:41:48.346936	cded912a-84a8-469d-8b51-5deeb4786f36
29	Sports (Aquatic)	2019-02-25 12:41:48.353946	2019-02-25 12:41:48.353946	d4c5fdc5-8f47-4dbb-8d64-be61c99f4173
30	Sports (Avianic)	2019-02-25 12:41:48.364381	2019-02-25 12:41:48.364381	9008ca21-606e-4e90-a8c5-46c435ef6391
31	Sports (Other)	2019-02-25 12:41:48.371852	2019-02-25 12:41:48.371852	28273a66-0af0-49c5-b2ad-b6ed4c4dcd39
32	Sports (Team)	2019-02-25 12:41:48.380545	2019-02-25 12:41:48.380545	e1f02c90-56ab-4326-9057-623e24d4d793
33	Sports (Winter)	2019-02-25 12:41:48.387912	2019-02-25 12:41:48.387912	834bb40d-1ef0-4e97-9fa3-0e09cfdb51f1
34	Underwear	2019-02-25 12:41:48.395539	2019-02-25 12:41:48.395539	26642bc0-b6b9-4165-8f6c-1b15e25eeb97
35	Vehicles (2 Wheels or Less)	2019-02-25 12:41:48.403148	2019-02-25 12:41:48.403148	ad691139-bd78-483f-beaf-d59562af58b7
36	Vehicles (4 Wheels or More)	2019-02-25 12:41:48.410891	2019-02-25 12:41:48.410891	a7f08582-14dc-492d-b939-2160e2b33637
37	Vehicles (4 Wheels)	2019-02-25 12:41:48.418647	2019-02-25 12:41:48.418647	f77a65b6-ceaf-4f30-b1b4-6e2d98ef706a
38	Vehicles (Airborne)	2019-02-25 12:41:48.427617	2019-02-25 12:41:48.427617	a271f67a-0b55-498c-9859-e8b247a99ba7
39	Vehicles (Tracked)	2019-02-25 12:41:48.435045	2019-02-25 12:41:48.435045	1adb44b0-3917-44f6-8c95-47a8a229c1e9
40	Vehicles (Waterborne)	2019-02-25 12:41:48.443285	2019-02-25 12:41:48.443285	3652f2cf-851a-4300-8001-66b45313b094
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.chats (id, uuid, sender_id, recipient_id, accepted_at, is_sender_unread, is_recipient_unread, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: chronofage_jobs; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.chronofage_jobs (id, job_class, job_id, queue_name, arguments, priority, host, started_at, completed_at, failed_at, created_at, updated_at, output) FROM stdin;
\.


--
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.claims (id, uuid, fursuit_id, user_id, status, conflictual, created_at, updated_at) FROM stdin;
87	bbf8bdd8-b528-422f-91b4-cc2e2caa62eb	3318a956-2337-41ad-883e-3fef890edfed	3e69717e-9803-4fc1-9909-419092780574	accepted	f	2019-04-24 21:12:46.485271	2019-04-24 21:13:05.879031
88	031489fd-9764-4541-ba1d-b7816d2b6084	d7866a9c-3686-4d61-9d0e-e8329fe9c41d	3e69717e-9803-4fc1-9909-419092780574	accepted	f	2019-04-24 22:58:23.145449	2019-04-24 22:58:27.36745
89	005985bf-918d-497b-bd6e-0ca81e34399a	701f9dfa-03e8-4017-a6e5-21c3704ac879	02b49ce7-22fd-429f-b1b1-55cfad638f59	accepted	f	2019-05-01 00:28:55.01472	2019-05-01 00:34:21.397791
\.


--
-- Data for Name: comment_reports; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.comment_reports (id, uuid, description, comment_id, reporter_id, status, assignee_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.comments (id, uuid, user_id, medium_id, body, created_at, updated_at, parent_id, replies_count) FROM stdin;
\.


--
-- Data for Name: commission_statuses; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.commission_statuses (id, uuid, name, created_at, updated_at) FROM stdin;
1	7714da95-148c-4866-b3d7-4babc6a14157	Closed	2019-05-07 05:20:06.470755	2019-05-07 05:20:06.470755
2	b17dbf8c-4c26-4b9b-86de-1c628a26a7fb	Open (with conditions)	2019-05-07 05:20:30.528227	2019-05-07 05:20:30.528227
3	ad103031-4220-4fd3-a305-e7fbbb0d916f	Retired	2019-05-07 05:20:33.479397	2019-05-07 05:20:33.479397
4	b29e9d94-0b30-45f7-b009-373a6d047a2b	Open	2019-05-07 05:20:40.373358	2019-05-07 05:20:40.373358
\.


--
-- Data for Name: editions; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.editions (id, start_date, end_date, country, city, kind, year, name, event_id, uuid, venue, attendance, slug, created_at, updated_at, picture, theme, charity) FROM stdin;
1622	2009-02-21 00:00:00	2009-02-24 00:00:00	Brazil	São Roque, São Paulo	Convention	2009	2009	55075b5b-3e37-4310-96ea-83fbc216d77c	ba28ca62-46ed-41e1-95aa-e72b26c97344	Sítio Maio	22	2009	2019-03-29 20:15:05.550276	2019-03-29 20:15:05.550276	\N	\N	\N
1623	2010-02-13 00:00:00	2010-02-16 00:00:00	Brazil	São Roque, São Paulo	Convention	2010	2010	55075b5b-3e37-4310-96ea-83fbc216d77c	cce75250-38d4-41b1-9a3d-5f6e40ff95a0	Sítio Maio	37	2010	2019-03-29 20:15:08.453173	2019-03-29 20:15:08.453173	\N	\N	\N
1624	2011-03-05 00:00:00	2011-03-08 00:00:00	Brazil	São Roque, São Paulo	Convention	2011	2011	55075b5b-3e37-4310-96ea-83fbc216d77c	8878cf1b-23de-4082-9fdb-233ef7d1d237	Sítio Maio	55	2011	2019-03-29 20:15:08.476549	2019-03-29 20:15:08.476549	\N	\N	\N
1625	2012-02-18 00:00:00	2012-02-21 00:00:00	Brazil	Ribeirão Grande, São Paulo	Convention	2012	2012	55075b5b-3e37-4310-96ea-83fbc216d77c	f8014ee0-ec56-4f75-8aeb-1e9c2b90a84b	Intervales State Park	50	2012	2019-03-29 20:15:08.496659	2019-03-29 20:15:08.496659	\N	\N	\N
1626	2013-02-09 00:00:00	2013-02-12 00:00:00	Brazil	Ribeirão Grande, São Paulo	Convention	2013	2013	55075b5b-3e37-4310-96ea-83fbc216d77c	c28fe895-0fc0-4dc8-b071-0316429ddc03	Intervales State Park	55	2013	2019-03-29 20:15:08.530406	2019-03-29 20:15:08.530406	\N	\N	\N
1627	2014-03-01 00:00:00	2014-03-04 00:00:00	Brazil	Ribeirão Grande, São Paulo	Convention	2014	2014	55075b5b-3e37-4310-96ea-83fbc216d77c	149e6479-dbb5-4e29-b9df-f6099fb0e7d7	Intervales State Park	73	2014	2019-03-29 20:15:08.559801	2019-03-29 20:15:08.559801	\N	\N	\N
1628	2015-02-14 00:00:00	2015-02-17 00:00:00	Brazil	Ribeirão Grande, São Paulo	Convention	2015	2015	55075b5b-3e37-4310-96ea-83fbc216d77c	3517eeea-0b27-4fd2-b742-fc8717c372f5	Intervales State Park	68	2015	2019-03-29 20:15:08.593745	2019-03-29 20:15:08.593745	\N	\N	\N
1630	2017-10-06 00:00:00	2017-10-08 00:00:00	United States	San Antonio, Texas	Convention	2017	2017	7c5d57ed-2b0b-404e-b5f1-604c75e22f7a	2bf74fde-6ba9-48c1-a084-1a6590e6317e	El Tropicano Riverwalk Hotel	737	2017	2019-03-29 20:15:08.659791	2019-03-29 20:15:08.659791	\N	\N	\N
1631	2018-10-05 00:00:00	2018-10-07 00:00:00	United States	San Antonio, Texas	Convention	2018	2018	7c5d57ed-2b0b-404e-b5f1-604c75e22f7a	7d05a66f-ae26-44ac-afdc-7b3e502b4dda	El Tropicano Riverwalk Hotel	\N	2018	2019-03-29 20:15:11.430646	2019-03-29 20:15:11.430646	\N	\N	\N
1632	2019-10-04 00:00:00	2006-04-19 00:00:00	United States	San Antonio, Texas	Convention	2019	2019	7c5d57ed-2b0b-404e-b5f1-604c75e22f7a	8e757b80-5ea9-4f7b-9310-7f5e216defca	El Tropicano Riverwalk Hotel	\N	2019	2019-03-29 20:15:11.448077	2019-03-29 20:15:11.448077	\N	\N	\N
1633	2007-03-30 00:00:00	2007-04-01 00:00:00	United States	Spokane, Washington	Convention	2007	2019	396c2e03-4fe7-4fd1-b953-5aed860ff3a2	c07efb78-b5af-466b-8d9c-344733e311ae	Ridpath Hotel	\N	2019	2019-03-29 20:15:11.464161	2019-03-29 20:15:11.464161	\N	\N	\N
1634	2008-04-18 00:00:00	2008-04-20 00:00:00	United States	Spokane, Washington	Convention	2008	2019	396c2e03-4fe7-4fd1-b953-5aed860ff3a2	429ab6bb-e33d-4fe0-957a-7240862d6ce3	Ridpath Hotel	\N	2019-2	2019-03-29 20:15:14.250409	2019-03-29 20:15:14.250409	\N	\N	\N
1635	2009-05-15 00:00:00	2009-05-17 00:00:00	United States	Spokane Valley, Washington	Convention	2009	2019	396c2e03-4fe7-4fd1-b953-5aed860ff3a2	c1e920c6-94d8-448c-8224-c7bb518b94ba	Mirabeau Park Hotel & Convention Center	\N	2019-3	2019-03-29 20:15:14.275446	2019-03-29 20:15:14.275446	\N	\N	\N
1636	2010-10-01 00:00:00	2010-10-03 00:00:00	United States	Redondo Beach, California	Convention	2010	2010	94f383ef-265a-4cc3-887f-7e177276014f	d8ac4f34-6f4a-40e9-ad09-36cb6b80821e	Best Western Sunrise	\N	2010	2019-03-29 20:15:14.297368	2019-03-29 20:15:14.297368	\N	\N	\N
1637	2011-09-30 00:00:00	2011-10-02 00:00:00	United States	Redondo Beach, California	Convention	2011	2011	94f383ef-265a-4cc3-887f-7e177276014f	2d1c63ad-a721-442d-a759-3cf01a8f9c43	Crowne Plaza	\N	2011	2019-03-29 20:15:17.044197	2019-03-29 20:15:17.044197	\N	\N	\N
1638	2018-01-26 00:00:00	2018-01-28 00:00:00	United States	Raleigh, North Carolina	Convention	2018	2018	eb0d63b2-b06f-4285-869f-347b042abe8c	4ddc5323-343c-48e2-a070-b9e891211827	Hampton Inn and Suites	295	2018	2019-03-29 20:15:17.059023	2019-03-29 20:15:17.059023	\N	\N	\N
1639	2019-01-18 00:00:00	2019-01-20 00:00:00	United States	Raleigh, North Carolina	Convention	2019	2019	eb0d63b2-b06f-4285-869f-347b042abe8c	31ec2103-2d26-43a7-8a15-dabd802996b6	Embassy Suites	\N	2019	2019-03-29 20:15:19.726299	2019-03-29 20:15:19.726299	\N	\N	\N
1640	2015-02-27 00:00:00	2015-03-01 00:00:00	United States	Cambridge, Massachusetts	Convention	2015	2015	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	c8e2e34e-7e4a-4ca7-a858-8bd0da06114f	Hyatt Regency Cambridge	\N	2015	2019-03-29 20:15:19.74112	2019-03-29 20:15:19.74112	\N	\N	\N
1641	2018-02-23 00:00:00	2018-02-25 00:00:00	United States	Boston, Massachusetts	Convention	2018	2018	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	7208abbc-3af4-4cee-84c6-d81ef9ba8bc9	Boston Park Plaza	\N	2018	2019-03-29 20:15:22.771082	2019-03-29 20:15:22.771082	\N	\N	\N
1642	2016-01-21 00:00:00	2016-01-24 00:00:00	United States	Cambridge, Massachusetts	Convention	2016	2016	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	b5cd19b4-aa01-4eab-bea9-9144a38119ac	Hyatt Regency Cambridge	\N	2016	2019-03-29 20:15:22.796039	2019-03-29 20:15:22.796039	\N	\N	\N
1643	2017-01-19 00:00:00	2017-01-22 00:00:00	United States	Cambridge, Massachusetts	Convention	2017	2017	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	0f4b324c-1210-476b-a50f-836e649f8aaa	Hyatt Regency Cambridge	\N	2017	2019-03-29 20:15:22.826323	2019-03-29 20:15:22.826323	\N	\N	\N
1644	2018-02-23 00:00:00	2018-02-25 00:00:00	United States	Boston, Massachusetts	Convention	2018	2018	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	262b4f9d-bc73-4e51-9655-1f8fd1539c9c	Boston Park Plaza	\N	2018-2	2019-03-29 20:15:22.862106	2019-03-29 20:15:22.862106	\N	\N	\N
1645	2019-02-22 00:00:00	2019-02-24 00:00:00	United States	Boston, Massachusetts	Convention	2019	2019	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	045885d6-c31d-490f-a76f-6b8d03b726d2	Boston Park Plaza	\N	2019	2019-03-29 20:15:22.888233	2019-03-29 20:15:22.888233	\N	\N	\N
1646	2017-11-09 00:00:00	2017-11-12 00:00:00	United States	Seattle, Washington	Convention	2017	2017	88b1a474-dda0-4d8c-a4a0-31c71dfa8372	9ee0db35-3041-40e6-bf47-77d239d49ff2	Seattle Renaissance Hotel	809	2017	2019-03-29 20:15:22.915338	2019-03-29 20:15:22.915338	\N	\N	\N
1647	2018-10-08 00:00:00	2018-10-11 00:00:00	United States	Seattle, Washington	Convention	2018	2018	88b1a474-dda0-4d8c-a4a0-31c71dfa8372	809e53cb-ade2-4b7b-92f7-5406fea6b964	Seattle Renaissance Hotel	\N	2018	2019-03-29 20:15:26.941331	2019-03-29 20:15:26.941331	\N	\N	\N
1648	2019-10-25 00:00:00	2019-10-27 00:00:00	United States	Seattle, Washington	Convention	2019	2019	88b1a474-dda0-4d8c-a4a0-31c71dfa8372	35fc9a61-7f75-4265-8fda-3f40b61d70fc	Hyatt Regency Seattle	\N	2019	2019-03-29 20:15:26.963494	2019-03-29 20:15:26.963494	\N	\N	\N
1649	2018-10-11 00:00:00	2018-10-14 00:00:00	United States	Chattanooga, Tennessee	Convention	2018	2018	86547dcf-610f-4eef-8db4-e5fce44c88bb	153107aa-508f-42da-9908-3b1170e7846d	Marriott Downtown Hotel	\N	2018	2019-03-29 20:15:26.987401	2019-03-29 20:15:26.987401	\N	\N	\N
1650	2019-11-21 00:00:00	2019-11-24 00:00:00	United States	Chattanooga, Tennessee	Convention	2019	2019	86547dcf-610f-4eef-8db4-e5fce44c88bb	82a3803f-c8aa-4598-b785-31cfeb838b41	Marriott Downtown Hotel	\N	2019	2019-03-29 20:15:29.837415	2019-03-29 20:15:29.837415	\N	\N	\N
1651	2017-10-27 00:00:00	2017-10-28 00:00:00	United States	Salt Lake City, Utah	Convention	2017	2017	fc341f19-98ca-4a9a-89fb-e3d53a906de1	54a5be9a-759e-4121-82fb-4e1d9c7cd69b	Radisson Hotel	\N	2017	2019-03-29 20:15:29.851121	2019-03-29 20:15:29.851121	\N	\N	\N
1652	2018-08-10 00:00:00	2018-08-12 00:00:00	United States	Layton, Utah	Convention	2018	2018	fc341f19-98ca-4a9a-89fb-e3d53a906de1	f2d8aec5-7aa8-4cff-948c-cdbd67f19d02	Davis Conference Center	\N	2018	2019-03-29 20:15:32.500364	2019-03-29 20:15:32.500364	\N	\N	\N
1653	2019-07-19 00:00:00	2019-07-21 00:00:00	United States	Layton, Utah	Convention	2019	2019	fc341f19-98ca-4a9a-89fb-e3d53a906de1	6fb93f1e-cb3d-4bd1-9132-d6d3450cce9e	Davis Conference Center	\N	2019	2019-03-29 20:15:32.518069	2019-03-29 20:15:32.518069	\N	\N	\N
1654	1998-07-03 00:00:00	1998-07-05 00:00:00	United States	Albany, New York	Convention	1998	1998	e23e5efc-54d5-4b72-9f45-2e6342f256c3	aa1e5b56-25f1-4081-9311-08b0f7e6761b	Omni Albany Hotel	\N	1998	2019-03-29 20:15:32.53348	2019-03-29 20:15:32.53348	\N	\N	\N
1655	2001-07-27 00:00:00	2001-07-29 00:00:00	United States	Philadelphia, Pennsylvania	Convention	2001	2001	e23e5efc-54d5-4b72-9f45-2e6342f256c3	c52d3a68-8525-440f-a0eb-1843e4bd15d5	Adam's Mark Hotel	\N	2001	2019-03-29 20:15:35.451648	2019-03-29 20:15:35.451648	\N	\N	\N
1656	2002-07-12 00:00:00	2002-07-14 00:00:00	United States	Philadelphia, Pennsylvania	Convention	2002	2002	e23e5efc-54d5-4b72-9f45-2e6342f256c3	314602b5-db16-4b9d-a6b0-02414a45342b	Adam's Mark Hotel	\N	2002	2019-03-29 20:15:35.468991	2019-03-29 20:15:35.468991	\N	\N	\N
1657	2004-07-09 00:00:00	2004-07-11 00:00:00	United States	Philadelphia, Pennsylvania	Convention	2004	2004	e23e5efc-54d5-4b72-9f45-2e6342f256c3	4432a088-b043-4be0-9be0-427cf49fe605	Adam's Mark Hotel	\N	2004	2019-03-29 20:15:35.484157	2019-03-29 20:15:35.484157	\N	\N	\N
1658	1997-07-03 00:00:00	1997-07-06 00:00:00	United States	Albany, New York	Convention	1997	1997	e23e5efc-54d5-4b72-9f45-2e6342f256c3	b9cf0b2d-e942-448b-845f-a3dd0bcaa69b	Omni Albany Hotel	\N	1997	2019-03-29 20:15:35.500552	2019-03-29 20:15:35.500552	\N	\N	\N
1659	1999-07-01 00:00:00	1999-07-04 00:00:00	United States	Valley Forge, Pennsylvania	Convention	1999	1999	e23e5efc-54d5-4b72-9f45-2e6342f256c3	0e8a23f1-8282-40f1-a7f1-6d5c9b51f9e4	Valley Forge Hilton	\N	1999	2019-03-29 20:15:35.513419	2019-03-29 20:15:35.513419	\N	\N	\N
1660	2000-06-29 00:00:00	2000-07-02 00:00:00	United States	Valley Forge, Pennsylvania	Convention	2000	2000	e23e5efc-54d5-4b72-9f45-2e6342f256c3	6963b5d0-1a7f-46d3-8a5c-abcdfc3a4362	Valley Forge Hilton	\N	2000	2019-03-29 20:15:35.529662	2019-03-29 20:15:35.529662	\N	\N	\N
1661	2003-07-17 00:00:00	2003-07-20 00:00:00	United States	Philadelphia, Pennsylvania	Convention	2003	2003	e23e5efc-54d5-4b72-9f45-2e6342f256c3	b2989c97-7f89-4943-82eb-3ecea36fd497	Adam's Mark Hotel	\N	2003	2019-03-29 20:15:35.543793	2019-03-29 20:15:35.543793	\N	\N	\N
1662	2005-07-07 00:00:00	2005-07-10 00:00:00	United States	Philadelphia, Pennsylvania	Convention	2005	2005	e23e5efc-54d5-4b72-9f45-2e6342f256c3	100b3fd4-b3c2-458c-9786-86fe94f5db9e	Wyndham (now Sheraton)	\N	2005	2019-03-29 20:15:35.562538	2019-03-29 20:15:35.562538	\N	\N	\N
1663	2006-06-15 00:00:00	2006-06-18 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2006	2006	e23e5efc-54d5-4b72-9f45-2e6342f256c3	0be8eda4-df3f-4439-aadf-61267004bb87	Westin Hotel and David L. Lawrence Convention Center	\N	2006	2019-03-29 20:15:35.579781	2019-03-29 20:15:35.579781	\N	\N	\N
1664	2007-07-05 00:00:00	2007-07-08 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2007	2007	e23e5efc-54d5-4b72-9f45-2e6342f256c3	ca3ab4dc-9ebd-49f6-9202-958323d2345e	Westin Hotel and David L. Lawrence Convention Center	\N	2007	2019-03-29 20:15:35.596166	2019-03-29 20:15:35.596166	\N	\N	\N
1665	2008-06-26 00:00:00	2008-06-29 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2008	2008	e23e5efc-54d5-4b72-9f45-2e6342f256c3	0c34721e-ccb2-4f82-be5b-d9172e00205a	Westin Hotel and David L. Lawrence Convention Center	\N	2008	2019-03-29 20:15:35.610543	2019-03-29 20:15:35.610543	\N	\N	\N
1666	2009-07-02 00:00:00	2009-07-05 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2009	2009	e23e5efc-54d5-4b72-9f45-2e6342f256c3	f831768f-779f-41ef-97bf-66eadb6736b7	Westin Hotel and David L. Lawrence Convention Center	\N	2009	2019-03-29 20:15:35.627476	2019-03-29 20:15:35.627476	\N	\N	\N
1667	2010-06-24 00:00:00	2010-06-27 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2010	2010	e23e5efc-54d5-4b72-9f45-2e6342f256c3	c9b9600a-5de8-4da9-ba54-4f7af86ced22	Westin Hotel and David L. Lawrence Convention Center	\N	2010	2019-03-29 20:15:35.641967	2019-03-29 20:15:35.641967	\N	\N	\N
1668	2011-06-23 00:00:00	2011-06-26 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2011	2011	e23e5efc-54d5-4b72-9f45-2e6342f256c3	c7c72261-342c-47a5-a17c-d7b7a2aad97e	Westin Hotel and David L. Lawrence Convention Center	\N	2011	2019-03-29 20:15:35.658371	2019-03-29 20:15:35.658371	\N	\N	\N
1669	2012-06-14 00:00:00	2012-06-17 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2012	2012	e23e5efc-54d5-4b72-9f45-2e6342f256c3	2dd2c4ae-1f77-4d1a-a422-de556e18f7b6	Westin Hotel and David L. Lawrence Convention Center	\N	2012	2019-03-29 20:15:35.673592	2019-03-29 20:15:35.673592	\N	\N	\N
1670	2013-07-04 00:00:00	2013-07-07 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2013	2013	e23e5efc-54d5-4b72-9f45-2e6342f256c3	fa7181a8-c7d0-426d-88d7-4e3a2a429155	Westin Hotel and David L. Lawrence Convention Center	\N	2013	2019-03-29 20:15:35.688813	2019-03-29 20:15:35.688813	\N	\N	\N
1671	2014-07-03 00:00:00	2014-07-06 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2014	2014	e23e5efc-54d5-4b72-9f45-2e6342f256c3	741c18e7-287f-4379-b683-5b08adfaf5d4	Westin Hotel and David L. Lawrence Convention Center	\N	2014	2019-03-29 20:15:35.704759	2019-03-29 20:15:35.704759	\N	\N	\N
1672	2015-07-09 00:00:00	2015-07-12 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2015	2015	e23e5efc-54d5-4b72-9f45-2e6342f256c3	485c8d78-8500-4978-be6a-2b8f30815a0e	Westin Hotel and David L. Lawrence Convention Center	\N	2015	2019-03-29 20:15:35.718761	2019-03-29 20:15:35.718761	\N	\N	\N
1673	2016-06-30 00:00:00	2016-07-03 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2016	2016	e23e5efc-54d5-4b72-9f45-2e6342f256c3	d4e76ef3-95ca-4c4e-b62e-c14ec6446342	Westin Hotel and David L. Lawrence Convention Center	\N	2016	2019-03-29 20:15:35.734839	2019-03-29 20:15:35.734839	\N	\N	\N
1674	2017-06-29 00:00:00	2017-07-02 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2017	2017	e23e5efc-54d5-4b72-9f45-2e6342f256c3	4c194bea-c37b-40f8-8abf-a32a5a2332bc	Westin Hotel and David L. Lawrence Convention Center	\N	2017	2019-03-29 20:15:35.749299	2019-03-29 20:15:35.749299	\N	\N	\N
1675	2018-07-05 00:00:00	2018-07-08 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2018	2018	e23e5efc-54d5-4b72-9f45-2e6342f256c3	305bf5eb-45e7-434e-a721-7222a7e6f08d	Westin Hotel and David L. Lawrence Convention Center	\N	2018	2019-03-29 20:15:35.76601	2019-03-29 20:15:35.76601	\N	\N	\N
1676	2019-07-04 00:00:00	2019-07-07 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2019	2019	e23e5efc-54d5-4b72-9f45-2e6342f256c3	f5f24d41-7716-4d92-be5d-10a7340aeb4e	Westin Hotel and David L. Lawrence Convention Center	\N	2019	2019-03-29 20:15:35.780873	2019-03-29 20:15:35.780873	\N	\N	\N
1677	2006-08-11 00:00:00	2006-08-13 00:00:00	Canada	Montreal, Quebec	Convention	2006	2006	f2285e41-bd04-48d4-bf79-c5c6dfe6aef2	3e2be249-78df-464c-9591-89f344672922	Doubletree Plaza Hotel	\N	2006	2019-03-29 20:15:35.799658	2019-03-29 20:15:35.799658	\N	\N	\N
1678	2007-07-27 00:00:00	2007-07-29 00:00:00	Canada	Montreal, Quebec	Convention	2007	2007	f2285e41-bd04-48d4-bf79-c5c6dfe6aef2	2dbb4a9c-34cd-4a22-b8cb-1127e6ed31b4	Doubletree Plaza Hotel	\N	2007	2019-03-29 20:15:38.476463	2019-03-29 20:15:38.476463	\N	\N	\N
1679	2016-05-05 00:00:00	2016-05-08 00:00:00	United States	Columbus, Ohio	Convention	2016	2016	ae250ec9-bcf5-416c-9386-425c2af701bd	e2c5aabc-22da-477a-8dcc-5145e49ff79a	Worthington Holiday Inn	\N	2016	2019-03-29 20:15:38.492768	2019-03-29 20:15:38.492768	\N	\N	\N
1680	2017-05-25 00:00:00	2017-05-28 00:00:00	United States	Columbus, Ohio	Convention	2017	2017	ae250ec9-bcf5-416c-9386-425c2af701bd	1599520d-4d47-4411-9ea8-5d774e5e64e2	Worthington Holiday Inn	\N	2017	2019-03-29 20:15:41.138957	2019-03-29 20:15:41.138957	\N	\N	\N
1681	2018-05-24 00:00:00	2018-05-27 00:00:00	United States	Columbus, Ohio	Convention	2018	2018	ae250ec9-bcf5-416c-9386-425c2af701bd	297850a4-cc0f-4c05-830f-5404725a1d8c	Crowne Plaza North	\N	2018	2019-03-29 20:15:41.161583	2019-03-29 20:15:41.161583	\N	\N	\N
1682	2019-05-23 00:00:00	2019-05-26 00:00:00	United States	Columbus, Ohio	Convention	2019	2019	ae250ec9-bcf5-416c-9386-425c2af701bd	634d2294-e00e-4cb1-8cdb-819e70023115	Crowne Plaza North	\N	2019	2019-03-29 20:15:41.192151	2019-03-29 20:15:41.192151	\N	\N	\N
1683	2017-10-20 00:00:00	2017-10-22 00:00:00	United States	Wisconsin Dells, Wisconsin	Convention	2017	2017	99361cbc-2fb9-404a-a182-c1d49de76952	6e4ff40a-eccb-464a-8e51-952094f8283b	Kalahari Resort and Conference Center	\N	2017	2019-03-29 20:15:41.215943	2019-03-29 20:15:41.215943	\N	\N	\N
1684	2018-01-11 00:00:00	2018-01-13 00:00:00	United States	Wisconsin Dells, Wisconsin	Convention	2018	2018	99361cbc-2fb9-404a-a182-c1d49de76952	c971235d-2824-4312-8111-1f9fb79bde14	Chula Vista Resort	\N	2018	2019-03-29 20:15:44.354207	2019-03-29 20:15:44.354207	\N	\N	\N
1685	2019-10-11 00:00:00	2019-10-13 00:00:00	United States	Wisconsin Dells, Wisconsin	Convention	2019	2019	99361cbc-2fb9-404a-a182-c1d49de76952	d8a79292-5009-41ff-90c4-7a3e0ee7cd87	Chula Vista Resort	\N	2019	2019-03-29 20:15:44.379377	2019-03-29 20:15:44.379377	\N	\N	\N
1686	2013-10-11 00:00:00	2013-10-13 00:00:00	United States	Phoenix, Arizona	Convention	2013	2013	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	41102535-7708-4053-82e8-1b32bd6ca5a3	Embassy Suites Phoenix - Scottsdale Hotel	\N	2013	2019-03-29 20:15:44.396899	2019-03-29 20:15:44.396899	\N	\N	\N
1687	2014-10-31 00:00:00	2014-11-02 00:00:00	United States	Phoenix, Arizona	Convention	2014	2014	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	1b53a298-909b-490d-be71-7607514df476	Pointe Hilton Squaw Peak Resort	\N	2014	2019-03-29 20:15:47.199112	2019-03-29 20:15:47.199112	\N	\N	\N
1688	2015-10-16 00:00:00	2015-10-18 00:00:00	United States	Scottsdale, Arizona	Convention	2015	2015	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	4c565321-528c-440e-bcdd-22e2e7432afa	Scottsdale Resort at McCormick Ranch	\N	2015	2019-03-29 20:15:47.230218	2019-03-29 20:15:47.230218	\N	\N	\N
1689	2016-09-30 00:00:00	2016-10-02 00:00:00	United States	Scottsdale, Arizona	Convention	2016	2016	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	4c92c17b-b2c4-4b44-bc41-fc9f9add12be	Scottsdale Resort at McCormick Ranch	\N	2016	2019-03-29 20:15:47.248604	2019-03-29 20:15:47.248604	\N	\N	\N
1690	2017-11-17 00:00:00	2017-11-19 00:00:00	United States	Scottsdale, Arizona	Convention	2017	2017	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	ccc4bdc7-17d7-4e63-aa52-323ef44795b1	Scottsdale Resort at McCormick Ranch	\N	2017	2019-03-29 20:15:47.265902	2019-03-29 20:15:47.265902	\N	\N	\N
1691	2018-10-26 00:00:00	2018-10-28 00:00:00	United States	Mesa, Arizona	Convention	2018	2018	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	7514c761-cd8d-46ac-8415-64a79b8093e6	Phoenix Marriott Mesa	\N	2018	2019-03-29 20:15:47.280445	2019-03-29 20:15:47.280445	\N	\N	\N
1692	2019-10-25 00:00:00	2019-10-27 00:00:00	United States	Mesa, Arizona	Convention	2019	2019	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	48eeefc6-10eb-46fb-9c08-df896a8d441a	Delta Hotels Phoenix Mesa	\N	2019	2019-03-29 20:15:47.298194	2019-03-29 20:15:47.298194	\N	\N	\N
1693	2017-01-05 00:00:00	2017-01-09 00:00:00	United States	Little Rock, Arkansas	Convention	2017	2017	4f82b857-c4fa-4e80-871f-8ca6ce75cd49	e8f6ee06-1b10-4a09-a6fa-2c281660aabd	The Embassy Suites	103	2017	2019-03-29 20:15:47.312979	2019-03-29 20:15:47.312979	\N	\N	\N
1694	2002-09-28 00:00:00	2002-10-04 00:00:00	Australia	Melbourne	Furmeet	2002	2002	52aaf331-4758-4572-8495-810eb3271cff	9d149e8f-2927-4bb1-9718-92e259e86c5d	Melbourne Metro YHA	\N	2002	2019-03-29 20:15:49.914698	2019-03-29 20:15:49.914698	\N	\N	\N
1695	2004-04-24 00:00:00	2004-04-24 00:00:00	Germany	Berlin	Convention	2004	1	9648fa4c-3fc9-4e7b-a600-6b84050b2854	be42d98e-c8d8-4fdf-99ac-102a30b270c6	Gemeindehaus der Philipp Melanchthon Gemeinde	\N	1	2019-03-29 20:15:52.653908	2019-03-29 20:15:52.653908	\N	\N	\N
1696	2005-04-30 00:00:00	2005-04-30 00:00:00	Germany	Berlin	Convention	2005	2	9648fa4c-3fc9-4e7b-a600-6b84050b2854	b5231969-6bed-4bea-b3cb-3341c89a04d0	Gemeindehaus der Philipp Melanchthon Gemeinde	\N	2	2019-03-29 20:15:55.469479	2019-03-29 20:15:55.469479	\N	\N	\N
1697	2006-04-22 00:00:00	2006-04-22 00:00:00	Germany	Berlin	Convention	2006	3	9648fa4c-3fc9-4e7b-a600-6b84050b2854	ac67aa55-9add-483a-a57c-c1bdb1bf73ed	Gemeindehaus der Philipp Melanchthon Gemeinde	\N	3	2019-03-29 20:15:55.487781	2019-03-29 20:15:55.487781	\N	\N	\N
1698	2007-06-15 00:00:00	2007-06-17 00:00:00	Germany	Berlin	Convention	2007	4	9648fa4c-3fc9-4e7b-a600-6b84050b2854	afd1c9d0-4c41-4fab-8431-76d9dd27da49	Köpenicker Kanusportclub	\N	4	2019-03-29 20:15:55.5105	2019-03-29 20:15:55.5105	\N	\N	\N
1699	2008-06-19 00:00:00	2008-06-22 00:00:00	Germany	Berlin	Convention	2008	5	9648fa4c-3fc9-4e7b-a600-6b84050b2854	ccd7f512-0c7d-4bc4-bc1d-b6ccd5d7c281	Zeltlagerplatz e.V.	\N	5	2019-03-29 20:15:55.528073	2019-03-29 20:15:55.528073	\N	\N	\N
1700	2009-06-18 00:00:00	2009-06-21 00:00:00	Germany	Berlin	Convention	2009	6	9648fa4c-3fc9-4e7b-a600-6b84050b2854	ed324ac9-db50-4898-b26f-befbf49422eb	Zeltlagerplatz e.V.	\N	6	2019-03-29 20:15:55.550219	2019-03-29 20:15:55.550219	\N	\N	\N
1701	2010-06-17 00:00:00	2010-06-20 00:00:00	Germany	Berlin	Convention	2010	7	9648fa4c-3fc9-4e7b-a600-6b84050b2854	8b1ec666-8333-4488-a47d-5d4f78373681	Zeltlagerplatz e.V.	\N	7	2019-03-29 20:15:55.57386	2019-03-29 20:15:55.57386	\N	\N	\N
1702	2011-06-16 00:00:00	2011-06-19 00:00:00	Germany	Berlin	Convention	2011	8	9648fa4c-3fc9-4e7b-a600-6b84050b2854	b5d81a24-b13a-4f3d-b78f-e1e3fc9e74c4	Grunewaldheim	\N	8	2019-03-29 20:15:55.593581	2019-03-29 20:15:55.593581	\N	\N	\N
1703	2012-06-21 00:00:00	2012-06-24 00:00:00	Germany	Berlin	Convention	2012	9	9648fa4c-3fc9-4e7b-a600-6b84050b2854	2e0bdcc7-2f1f-4d7b-82bb-477a9e97c787	Grunewaldheim	\N	9	2019-03-29 20:15:55.616547	2019-03-29 20:15:55.616547	\N	\N	\N
1704	2013-06-20 00:00:00	2013-06-23 00:00:00	Germany	Berlin	Convention	2013	10	9648fa4c-3fc9-4e7b-a600-6b84050b2854	4ab9991d-c89e-4610-aa7b-9010c9d8a9d8	Fahrten-Ferne-Abenteuer eV Grunewaldheim	\N	10	2019-03-29 20:15:55.641007	2019-03-29 20:15:55.641007	\N	\N	\N
1705	2014-06-12 00:00:00	2014-06-15 00:00:00	Germany	Berlin	Convention	2014	11	9648fa4c-3fc9-4e7b-a600-6b84050b2854	87818a91-6f4c-4f2f-b282-9996072a82a8	Fahrten-Ferne-Abenteuer eV Grunewaldheim	\N	11	2019-03-29 20:15:55.659109	2019-03-29 20:15:55.659109	\N	\N	\N
1706	2015-06-18 00:00:00	2015-06-21 00:00:00	Germany	Berlin	Convention	2015	12	9648fa4c-3fc9-4e7b-a600-6b84050b2854	a1fbb63e-1840-4be9-ac23-65821e88cbac	Fahrten-Ferne-Abenteuer eV Grunewaldheim	\N	12	2019-03-29 20:15:55.682211	2019-03-29 20:15:55.682211	\N	\N	\N
1707	2017-06-23 00:00:00	2017-06-25 00:00:00	United States	Lincoln, Montana	Convention	2017	2017	551aea9f-3492-4355-ba87-601d802405bd	e6842165-d227-40cf-918a-8e88ea1f4d7c	Aspen Grove Picnic Area, Helena National Forest	\N	2017	2019-03-29 20:15:55.705542	2019-03-29 20:15:55.705542	\N	\N	\N
1708	2018-06-21 00:00:00	2018-06-24 00:00:00	United States	Florence, Montana	Convention	2018	2018	551aea9f-3492-4355-ba87-601d802405bd	b519a244-d510-4ef7-a6d2-314f23e1e682	Larry Creek Campground	\N	2018	2019-03-29 20:15:58.672215	2019-03-29 20:15:58.672215	\N	\N	\N
1709	2019-06-27 00:00:00	2019-06-30 00:00:00	United States	Florence, Montana	Convention	2019	2019	551aea9f-3492-4355-ba87-601d802405bd	e90e6505-2946-4f32-b6a9-8eb741956921	Larry Creek Campground	\N	2019	2019-03-29 20:15:58.695594	2019-03-29 20:15:58.695594	\N	\N	\N
1710	2013-05-03 00:00:00	2013-05-05 00:00:00	United States	Reno, Nevada	Convention	2013	2013	6e29608d-6a87-4430-8d27-d4361fbb2f78	8fdf75be-a5a3-4d49-9de0-5422f8cc55c9	Grand Sierra Resort Hotel	\N	2013	2019-03-29 20:15:58.720569	2019-03-29 20:15:58.720569	\N	\N	\N
1711	2014-03-28 00:00:00	2014-03-30 00:00:00	United States	Reno, Nevada	Convention	2014	2014	6e29608d-6a87-4430-8d27-d4361fbb2f78	74edf13f-61eb-474a-a0b2-fecde4008efc	Grand Sierra Resort Hotel	\N	2014	2019-03-29 20:16:01.513367	2019-03-29 20:16:01.513367	\N	\N	\N
1712	2015-05-14 00:00:00	2015-05-17 00:00:00	United States	Reno, Nevada	Convention	2015	2015	6e29608d-6a87-4430-8d27-d4361fbb2f78	03268a45-250c-43ec-9940-4d554379f1c8	Grand Sierra Resort Hotel	\N	2015	2019-03-29 20:16:01.529509	2019-03-29 20:16:01.529509	\N	\N	\N
1713	2016-05-12 00:00:00	2016-05-15 00:00:00	United States	Reno, Nevada	Convention	2016	2016	6e29608d-6a87-4430-8d27-d4361fbb2f78	92787b99-971e-4650-a6f3-fbe54e573a75	Grand Sierra Resort Hotel	\N	2016	2019-03-29 20:16:01.548663	2019-03-29 20:16:01.548663	\N	\N	\N
1714	2017-06-01 00:00:00	2017-06-04 00:00:00	United States	Reno, Nevada	Convention	2017	2017	6e29608d-6a87-4430-8d27-d4361fbb2f78	103e5de8-20bd-415a-8d16-bee830f11255	Grand Sierra Resort Hotel	\N	2017	2019-03-29 20:16:01.567133	2019-03-29 20:16:01.567133	\N	\N	\N
1715	2018-05-10 00:00:00	2018-05-13 00:00:00	United States	Reno, Nevada	Convention	2018	2018	6e29608d-6a87-4430-8d27-d4361fbb2f78	c4147b07-f811-4dd3-83b4-7e938a03f052	Grand Sierra Resort Hotel	\N	2018	2019-03-29 20:16:01.583758	2019-03-29 20:16:01.583758	\N	\N	\N
1716	2019-05-16 00:00:00	2019-05-19 00:00:00	United States	Reno, Nevada	Convention	2019	2019	6e29608d-6a87-4430-8d27-d4361fbb2f78	01541d08-0aa7-4ee3-a3f1-9381bdec3560	Grand Sierra Resort Hotel	\N	2019	2019-03-29 20:16:01.599846	2019-03-29 20:16:01.599846	\N	\N	\N
1717	2016-09-09 00:00:00	2016-09-11 00:00:00	Brazil	Santos, São Paulo	Convention	2016	2016	b259392d-7879-49da-acdb-8fdb5a35efce	6c81cd60-b74c-4aad-bcad-1a6b99da95e0	Mercure Santos Hotel	\N	2016	2019-03-29 20:16:01.619906	2019-03-29 20:16:01.619906	\N	\N	\N
1718	2017-08-25 00:00:00	2017-08-27 00:00:00	Brazil	Santos, São Paulo	Convention	2017	2017	b259392d-7879-49da-acdb-8fdb5a35efce	17fbf8eb-172e-4edc-9f3b-f380f960eccb	Mercure Santos Hotel	\N	2017	2019-03-29 20:16:04.410589	2019-03-29 20:16:04.410589	\N	\N	\N
1719	2018-08-17 00:00:00	2018-08-19 00:00:00	Brazil	Santos, São Paulo	Convention	2018	2018	b259392d-7879-49da-acdb-8fdb5a35efce	8f7ead17-562b-40ec-b0b7-96c1b76d4409	Mercure Santos Hotel	\N	2018	2019-03-29 20:16:04.425456	2019-03-29 20:16:04.425456	\N	\N	\N
1720	2019-08-23 00:00:00	2019-08-25 00:00:00	Brazil	Santos, São Paulo	Convention	2019	2019	b259392d-7879-49da-acdb-8fdb5a35efce	67d5bd3f-a3a3-4672-97a7-174084a49e13	Mercure Santos Hotel	\N	2019	2019-03-29 20:16:04.448501	2019-03-29 20:16:04.448501	\N	\N	\N
1721	2004-05-28 00:00:00	2004-05-30 00:00:00	United States	California	Convention	2004	2004	b8f21967-5fd1-4530-b508-a52f162d1817	d84ce097-5a03-448c-a5be-2af3dbfa3cfa	Atrium Hotel in Irvine	\N	2004	2019-03-29 20:16:04.492662	2019-03-29 20:16:04.492662	\N	\N	\N
1722	2005-05-20 00:00:00	2005-05-22 00:00:00	United States	Costa Mesa, California	Convention	2005	1	b8f21967-5fd1-4530-b508-a52f162d1817	43bc22a7-15fd-4098-9724-913d5f7939a4	Holiday Inn	\N	1	2019-03-29 20:16:07.207541	2019-03-29 20:16:07.207541	\N	\N	\N
1723	2006-05-05 00:00:00	2006-05-07 00:00:00	United States	Costa Mesa, California	Convention	2006	2	b8f21967-5fd1-4530-b508-a52f162d1817	5ca2bf72-945a-4b65-bd84-b234326574f7	Holiday Inn	\N	2	2019-03-29 20:16:07.229422	2019-03-29 20:16:07.229422	\N	\N	\N
1724	2007-05-04 00:00:00	2007-05-06 00:00:00	United States	Costa Mesa, California	Convention	2007	3	b8f21967-5fd1-4530-b508-a52f162d1817	e10caa27-6957-4c26-a72e-9ae659a088be	Holiday Inn	\N	3	2019-03-29 20:16:07.248054	2019-03-29 20:16:07.248054	\N	\N	\N
1725	2008-05-15 00:00:00	2008-05-18 00:00:00	United States	Irvine, California	Convention	2008	4	b8f21967-5fd1-4530-b508-a52f162d1817	a25150be-a026-4399-8a30-91f738a73c9c	Hyatt Regency	\N	4	2019-03-29 20:16:07.263433	2019-03-29 20:16:07.263433	\N	\N	\N
1726	2009-06-05 00:00:00	2009-06-07 00:00:00	United States	Irvine, California	Convention	2009	5	b8f21967-5fd1-4530-b508-a52f162d1817	c7691bc6-924c-4423-a6df-f0f2fe20a641	Irvine Marriott	\N	5	2019-03-29 20:16:07.279809	2019-03-29 20:16:07.279809	\N	\N	\N
1727	2010-06-04 00:00:00	2010-06-06 00:00:00	United States	Irvine, California	Convention	2010	6	b8f21967-5fd1-4530-b508-a52f162d1817	4f2db0c4-abff-42f0-81ed-3ae257eb69a1	Irvine Marriott	\N	6	2019-03-29 20:16:07.296068	2019-03-29 20:16:07.296068	\N	\N	\N
1728	2011-06-03 00:00:00	2011-06-05 00:00:00	United States	Irvine, California	Convention	2011	7	b8f21967-5fd1-4530-b508-a52f162d1817	6e54da09-af4a-4655-a5b9-186c96126afa	Irvine Marriott	\N	7	2019-03-29 20:16:07.322607	2019-03-29 20:16:07.322607	\N	\N	\N
1729	2012-06-01 00:00:00	2012-06-03 00:00:00	United States	Irvine, California	Convention	2012	8	b8f21967-5fd1-4530-b508-a52f162d1817	d1254230-3788-47ac-9ce5-9aaab57971af	Irvine Marriott	\N	8	2019-03-29 20:16:07.336224	2019-03-29 20:16:07.336224	\N	\N	\N
1730	2013-05-31 00:00:00	2013-06-02 00:00:00	United States	Irvine, California	Convention	2013	9	b8f21967-5fd1-4530-b508-a52f162d1817	367736c9-5e3b-485f-9630-b757911535a0	Irvine Marriott	\N	9	2019-03-29 20:16:07.353336	2019-03-29 20:16:07.353336	\N	\N	\N
1731	2014-05-30 00:00:00	2014-06-01 00:00:00	United States	Irvine, California	Convention	2014	10	b8f21967-5fd1-4530-b508-a52f162d1817	34d9dc44-c29f-4141-a32c-28ee84246fc1	Irvine Marriott	\N	10	2019-03-29 20:16:07.370025	2019-03-29 20:16:07.370025	\N	\N	\N
1732	2015-06-05 00:00:00	2015-06-07 00:00:00	United States	Irvine, California	Convention	2015	11	b8f21967-5fd1-4530-b508-a52f162d1817	569ec5a7-8d59-4e77-a9f1-cc44948619e7	Irvine Marriott	\N	11	2019-03-29 20:16:07.389307	2019-03-29 20:16:07.389307	\N	\N	\N
1733	2016-06-03 00:00:00	2016-06-05 00:00:00	United States	Pomona, California	Convention	2016	12	b8f21967-5fd1-4530-b508-a52f162d1817	5cd24587-351c-4490-9783-962c670f6c92	Fairplex Sheraton Hotel and Convention Center	\N	12	2019-03-29 20:16:07.413725	2019-03-29 20:16:07.413725	\N	\N	\N
1734	2017-05-19 00:00:00	2017-05-21 00:00:00	United States	Pomona, California	Convention	2017	13	b8f21967-5fd1-4530-b508-a52f162d1817	5b4da2bd-7b70-4867-88e7-c948b97286bb	Fairplex Sheraton Hotel and Convention Center	\N	13	2019-03-29 20:16:07.429334	2019-03-29 20:16:07.429334	\N	\N	\N
1735	1998-08-21 00:00:00	1998-08-23 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	1998	1998	0f9351fe-71ee-46e1-a808-c510349e4357	b6aa711a-4aa3-448b-8bb6-224f23891e09	Camp Arowhon	\N	1998	2019-03-29 20:16:07.449026	2019-03-29 20:16:07.449026	\N	\N	\N
1736	1999-08-14 00:00:00	1999-08-18 00:00:00	Canada	Minden, Ontario	Convention	1999	1999	0f9351fe-71ee-46e1-a808-c510349e4357	ddf84693-1137-401d-8601-f6baf6bd62cc	Kinark Outdoor Centre	\N	1999	2019-03-29 20:16:10.191171	2019-03-29 20:16:10.191171	\N	\N	\N
1737	2000-08-16 00:00:00	2000-08-20 00:00:00	Canada	Minden, Ontario	Convention	2000	2000	0f9351fe-71ee-46e1-a808-c510349e4357	3a2dcabd-a25d-428b-82e3-51a28265af21	Kinark Outdoor Centre	\N	2000	2019-03-29 20:16:10.20706	2019-03-29 20:16:10.20706	\N	\N	\N
1738	2001-08-22 00:00:00	2001-08-26 00:00:00	Canada	Minden, Ontario	Convention	2001	2001	0f9351fe-71ee-46e1-a808-c510349e4357	936a26c6-db2b-4680-9a66-fadcacf3c249	Kinark Outdoor Centre	\N	2001	2019-03-29 20:16:10.225266	2019-03-29 20:16:10.225266	\N	\N	\N
1739	2002-08-21 00:00:00	2002-08-25 00:00:00	Canada	Minden, Ontario	Convention	2002	2002	0f9351fe-71ee-46e1-a808-c510349e4357	d72f8186-0798-42b8-8aa6-8f855e40ad18	Kinark Outdoor Centre	\N	2002	2019-03-29 20:16:10.242324	2019-03-29 20:16:10.242324	\N	\N	\N
1740	2003-08-20 00:00:00	2003-08-24 00:00:00	Canada	Minden, Ontario	Convention	2003	2003	0f9351fe-71ee-46e1-a808-c510349e4357	f429a5fe-3105-46b8-b6fd-0eedcd2cc49a	Kinark Outdoor Centre	\N	2003	2019-03-29 20:16:10.263653	2019-03-29 20:16:10.263653	\N	\N	\N
1741	2004-08-25 00:00:00	2004-08-29 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2004	2004	0f9351fe-71ee-46e1-a808-c510349e4357	19fce8b7-e03b-46f0-b26e-8bc1e2550280	Camp Arowhon	\N	2004	2019-03-29 20:16:10.28382	2019-03-29 20:16:10.28382	\N	\N	\N
1742	2005-08-27 00:00:00	2005-08-31 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2005	2005	0f9351fe-71ee-46e1-a808-c510349e4357	d7e65954-46c4-4695-8a8c-07a4b968594f	Camp Arowhon	\N	2005	2019-03-29 20:16:10.298013	2019-03-29 20:16:10.298013	\N	\N	\N
1743	2006-09-02 00:00:00	2006-09-06 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2006	2006	0f9351fe-71ee-46e1-a808-c510349e4357	ba9da22a-6b7b-4343-983e-229370605f3d	Camp Arowhon	\N	2006	2019-03-29 20:16:10.314731	2019-03-29 20:16:10.314731	\N	\N	\N
1744	2007-08-27 00:00:00	2007-08-31 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2007	2007	0f9351fe-71ee-46e1-a808-c510349e4357	1f1e7295-8d5e-45d3-a716-8de644387749	Camp Arowhon	\N	2007	2019-03-29 20:16:10.331063	2019-03-29 20:16:10.331063	\N	\N	\N
1745	2008-08-24 00:00:00	2008-08-28 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2008	2008	0f9351fe-71ee-46e1-a808-c510349e4357	4e9c26c0-312d-4794-bdb3-108c5ec8cfc0	Camp Arowhon	\N	2008	2019-03-29 20:16:10.352494	2019-03-29 20:16:10.352494	\N	\N	\N
1746	2009-08-29 00:00:00	2009-09-02 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2009	2009	0f9351fe-71ee-46e1-a808-c510349e4357	331f850f-88b8-4e01-9ad1-298253e04889	Camp Arowhon	\N	2009	2019-03-29 20:16:10.370125	2019-03-29 20:16:10.370125	\N	\N	\N
1747	2010-09-01 00:00:00	2010-09-05 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2010	2010	0f9351fe-71ee-46e1-a808-c510349e4357	162d9f81-4729-4c97-8415-5c98adce839a	Camp Arowhon	\N	2010	2019-03-29 20:16:10.392581	2019-03-29 20:16:10.392581	\N	\N	\N
1748	2011-08-31 00:00:00	2011-09-04 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2011	2011	0f9351fe-71ee-46e1-a808-c510349e4357	73a88c96-779b-494c-a5ef-f70fe6eb6c37	Camp Arowhon	\N	2011	2019-03-29 20:16:10.415344	2019-03-29 20:16:10.415344	\N	\N	\N
1749	2012-08-24 00:00:00	2012-08-28 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2012	2012	0f9351fe-71ee-46e1-a808-c510349e4357	50d7cf0e-352b-4713-b4b8-712604593f58	Camp Arowhon	\N	2012	2019-03-29 20:16:10.433404	2019-03-29 20:16:10.433404	\N	\N	\N
1750	2013-08-22 00:00:00	2013-08-26 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2013	2013	0f9351fe-71ee-46e1-a808-c510349e4357	b419661d-163a-4190-9a43-a1d2b366295e	Camp Arowhon	\N	2013	2019-03-29 20:16:10.454687	2019-03-29 20:16:10.454687	\N	\N	\N
1751	2014-08-21 00:00:00	2014-08-25 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2014	2014	0f9351fe-71ee-46e1-a808-c510349e4357	9bdf12cb-6873-4c1a-b610-d060d8f49aeb	Camp Arowhon	\N	2014	2019-03-29 20:16:10.469816	2019-03-29 20:16:10.469816	\N	\N	\N
1752	2015-08-20 00:00:00	2015-08-24 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2015	2015	0f9351fe-71ee-46e1-a808-c510349e4357	fa1e0c90-3a25-4dca-b78c-d14aa417c984	Camp Arowhon	\N	2015	2019-03-29 20:16:10.490214	2019-03-29 20:16:10.490214	\N	\N	\N
1753	2016-08-25 00:00:00	2016-08-29 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2016	2016	0f9351fe-71ee-46e1-a808-c510349e4357	a66130f1-f928-4b36-ab5f-a2010ca638a5	Camp Arowhon	\N	2016	2019-03-29 20:16:10.508249	2019-03-29 20:16:10.508249	\N	\N	\N
1754	2017-08-24 00:00:00	2017-08-28 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2017	2017	0f9351fe-71ee-46e1-a808-c510349e4357	95e5eb80-3f21-4970-820c-3ac315878af9	Camp Arowhon	\N	2017	2019-03-29 20:16:10.524474	2019-03-29 20:16:10.524474	\N	\N	\N
1755	2018-08-23 00:00:00	2018-08-27 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2018	2018	0f9351fe-71ee-46e1-a808-c510349e4357	861e294b-e63d-4daa-8e5a-ae9694a9a772	Camp Arowhon	\N	2018	2019-03-29 20:16:10.540641	2019-03-29 20:16:10.540641	\N	\N	\N
1756	2019-08-22 00:00:00	2019-08-26 00:00:00	Canada	Algonquin Provincial Park, Ontario	Convention	2019	2019	0f9351fe-71ee-46e1-a808-c510349e4357	c6a9fc64-da3d-4659-b491-a805a0307622	Camp Arowhon	\N	2019	2019-03-29 20:16:10.556728	2019-03-29 20:16:10.556728	\N	\N	\N
1757	2009-06-12 00:00:00	2009-06-14 00:00:00	United States	Sussex County, Delaware	Convention	2009	1	be1ef2c6-e510-4239-865a-08d5ed7e7ece	85cb254a-d665-4119-86f2-fd636d6b1b33	Cape Henlopen State Park	\N	1	2019-03-29 20:16:10.572391	2019-03-29 20:16:10.572391	\N	\N	\N
1758	2010-06-11 00:00:00	2010-06-13 00:00:00	United States	Sussex County, Delaware	Convention	2010	2	be1ef2c6-e510-4239-865a-08d5ed7e7ece	9447cc3d-252a-4a37-adf7-d666f0b8a751	Cape Henlopen State Park	\N	2	2019-03-29 20:16:13.191885	2019-03-29 20:16:13.191885	\N	\N	\N
1759	2011-09-08 00:00:00	2011-09-11 00:00:00	United States	Sussex County, Delaware	Convention	2011	3	be1ef2c6-e510-4239-865a-08d5ed7e7ece	f2232374-470e-44b5-b76d-f63c652aa93f	Cape Henlopen State Park	\N	3	2019-03-29 20:16:13.206175	2019-03-29 20:16:13.206175	\N	\N	\N
1760	2012-09-06 00:00:00	2012-09-09 00:00:00	United States	Sussex County, Delaware	Convention	2012	4	be1ef2c6-e510-4239-865a-08d5ed7e7ece	2cc86f00-4d89-4334-8b86-5c75a09457e6	Cape Henlopen State Park	\N	4	2019-03-29 20:16:13.222517	2019-03-29 20:16:13.222517	\N	\N	\N
1761	2013-09-19 00:00:00	2013-09-22 00:00:00	United States	Sussex County, Delaware	Convention	2013	5	be1ef2c6-e510-4239-865a-08d5ed7e7ece	0873d804-ea06-478d-9da0-9bd89e8e6f0d	Cape Henlopen State Park	\N	5	2019-03-29 20:16:13.237634	2019-03-29 20:16:13.237634	\N	\N	\N
1762	2017-09-08 00:00:00	2017-09-10 00:00:00	United States	Danbury, Connecticut	Convention	2017	2017	14dd5dd0-a976-40f3-a926-61db4d63a8a6	e7efafde-e53e-4b74-9f8e-647d9ba9f76a	Crowne Plaza Danbury	\N	2017	2019-03-29 20:16:13.255937	2019-03-29 20:16:13.255937	\N	\N	\N
1763	2018-08-17 00:00:00	2018-08-19 00:00:00	United States	Danbury, Connecticut	Convention	2018	2018	14dd5dd0-a976-40f3-a926-61db4d63a8a6	b7edf59a-5a01-4ec0-aa7a-423e08140d05	Crowne Plaza Danbury	\N	2018	2019-03-29 20:16:15.93148	2019-03-29 20:16:15.93148	\N	\N	\N
1764	2019-08-09 00:00:00	2019-08-11 00:00:00	United States	Danbury, Connecticut	Convention	2019	2019	14dd5dd0-a976-40f3-a926-61db4d63a8a6	208aea4a-cc15-4fce-abef-4132179e7617	Crowne Plaza Danbury	\N	2019	2019-03-29 20:16:15.963905	2019-03-29 20:16:15.963905	\N	\N	\N
1765	2020-08-14 00:00:00	2020-08-16 00:00:00	United States	Danbury, Connecticut	Convention	2020	2020	14dd5dd0-a976-40f3-a926-61db4d63a8a6	bf095816-9033-4446-a6bf-5b1c0b2c2a1c	Crowne Plaza Danbury	\N	2020	2019-03-29 20:16:15.98484	2019-03-29 20:16:15.98484	\N	\N	\N
1766	2010-08-05 00:00:00	2010-08-09 00:00:00	United States	La Pine, Oregon	Convention	2010	2010	1202a062-3271-4db2-bd55-3c79be00dc32	19b0bbc2-9645-45db-bad7-33c8a8b5dbcf	Ogden Group Camp, Deschutes National Forest	\N	2010	2019-03-29 20:16:16.005271	2019-03-29 20:16:16.005271	\N	\N	\N
1767	2011-08-04 00:00:00	2011-08-08 00:00:00	United States	La Pine, Oregon	Convention	2011	2011	1202a062-3271-4db2-bd55-3c79be00dc32	92a6052e-f4e6-451f-a89e-9745f35cf0c3	Ogden Group Camp, Deschutes National Forest	\N	2011	2019-03-29 20:16:18.760734	2019-03-29 20:16:18.760734	\N	\N	\N
1768	2012-08-02 00:00:00	2012-08-06 00:00:00	United States	La Pine, Oregon	Convention	2012	2012	1202a062-3271-4db2-bd55-3c79be00dc32	c5d93752-408b-41ff-a2af-a0b0dfb58365	Ogden Group Camp, Deschutes National Forest	\N	2012	2019-03-29 20:16:18.776018	2019-03-29 20:16:18.776018	\N	\N	\N
1769	2013-08-01 00:00:00	2013-08-05 00:00:00	United States	La Pine, Oregon	Convention	2013	2013	1202a062-3271-4db2-bd55-3c79be00dc32	a9498798-72c8-412c-9118-4757243e5776	Ogden Group Camp, Deschutes National Forest	\N	2013	2019-03-29 20:16:18.792918	2019-03-29 20:16:18.792918	\N	\N	\N
1770	2014-07-31 00:00:00	2014-08-04 00:00:00	United States	La Pine, Oregon	Convention	2014	2014	1202a062-3271-4db2-bd55-3c79be00dc32	878c5c39-a496-4d07-906e-f8b4920205eb	Ogden Group Camp, Deschutes National Forest	\N	2014	2019-03-29 20:16:18.808048	2019-03-29 20:16:18.808048	\N	\N	\N
1771	2015-07-30 00:00:00	2015-08-03 00:00:00	United States	La Pine, Oregon	Convention	2015	2015	1202a062-3271-4db2-bd55-3c79be00dc32	63766b7d-2d94-48b6-98da-0787d9e9b212	Ogden Group Camp, Deschutes National Forest	\N	2015	2019-03-29 20:16:18.826217	2019-03-29 20:16:18.826217	\N	\N	\N
1772	2016-08-04 00:00:00	2016-08-08 00:00:00	United States	La Pine, Oregon	Convention	2016	2016	1202a062-3271-4db2-bd55-3c79be00dc32	079d7797-5a61-4c8e-8abe-db1ebc454593	Ogden Group Camp, Deschutes National Forest	\N	2016	2019-03-29 20:16:18.842771	2019-03-29 20:16:18.842771	\N	\N	\N
1773	2017-08-03 00:00:00	2017-08-07 00:00:00	United States	La Pine, Oregon	Convention	2017	2017	1202a062-3271-4db2-bd55-3c79be00dc32	5005bd1f-af32-4c61-9079-9bfa74dfcee5	Ogden Group Camp, Deschutes National Forest	\N	2017	2019-03-29 20:16:18.860294	2019-03-29 20:16:18.860294	\N	\N	\N
1774	2018-08-02 00:00:00	2018-08-06 00:00:00	United States	La Pine, Oregon	Convention	2018	2018	1202a062-3271-4db2-bd55-3c79be00dc32	747af0c4-4904-44d1-acc8-5705bb1bc9ba	Ogden Group Camp, Deschutes National Forest	\N	2018	2019-03-29 20:16:18.873204	2019-03-29 20:16:18.873204	\N	\N	\N
1775	2019-08-01 00:00:00	2019-08-05 00:00:00	United States	La Pine, Oregon	Convention	2019	2019	1202a062-3271-4db2-bd55-3c79be00dc32	a631c9a5-7cf3-4aa8-b96c-45631c06b189	Ogden Group Camp, Deschutes National Forest	\N	2019	2019-03-29 20:16:18.889718	2019-03-29 20:16:18.889718	\N	\N	\N
1776	2018-03-31 00:00:00	2018-04-01 00:00:00	Mexico	Jilotzingo, Estado de Mexico	Convention	2018	2018	9eeaac7e-003d-4564-b68d-ef052e8553cf	07b1f5b4-eeaa-4fd7-8de0-7da8b1608090	Capoxi Water Dam	36	2018	2019-03-29 20:16:18.902888	2019-03-29 20:16:18.902888	\N	\N	\N
1777	2019-03-30 00:00:00	2019-03-31 00:00:00	Mexico	Jilotzingo, Estado de Mexico	Convention	2019	2019	9eeaac7e-003d-4564-b68d-ef052e8553cf	4456794e-99bf-4dc9-88e5-71820b431848	Capoxi Water Dam	\N	2019	2019-03-29 20:16:21.618218	2019-03-29 20:16:21.618218	\N	\N	\N
1778	2002-08-16 00:00:00	2002-08-18 00:00:00	Canada	Ottawa, Ontario	Convention	2002	2002	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	d8ab8e20-8542-4113-ade0-4f9761db23ea	Courtyard Ottawa Downtown	\N	2002	2019-03-29 20:16:21.632727	2019-03-29 20:16:21.632727	\N	\N	\N
1779	2003-05-30 00:00:00	2003-06-01 00:00:00	Canada	Ottawa, Ontario	Convention	2003	2003	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	8c126810-93ec-46c9-9a20-1c5d61b9910c	Chimo Hotel	\N	2003	2019-03-29 20:16:24.324991	2019-03-29 20:16:24.324991	\N	\N	\N
1780	2004-06-04 00:00:00	2004-06-06 00:00:00	Canada	Ottawa, Ontario	Convention	2004	2004	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	18d3c0cd-fa81-4b0d-8464-1ae19d649866	Chimo Hotel	\N	2004	2019-03-29 20:16:24.34854	2019-03-29 20:16:24.34854	\N	\N	\N
1781	2005-06-03 00:00:00	2005-06-05 00:00:00	Canada	Ottawa, Ontario	Convention	2005	2005	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	d4c915f9-744b-482c-8c12-8df375b7dd81	Best Western Victoria Park Suites Hotel	\N	2005	2019-03-29 20:16:24.372824	2019-03-29 20:16:24.372824	\N	\N	\N
1782	2006-06-23 00:00:00	2006-06-25 00:00:00	Canada	Ottawa, Ontario	Convention	2006	2006	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	a3e8ed52-f357-4662-8654-16fca554dab6	Best Western Victoria Park Suites Hotel	\N	2006	2019-03-29 20:16:24.398117	2019-03-29 20:16:24.398117	\N	\N	\N
1783	2007-06-08 00:00:00	2007-06-10 00:00:00	Canada	Ottawa, Ontario	Convention	2007	2007	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	709f0323-3971-4d86-82fc-8089e5acd2fb	Best Western Victoria Park Suites Hotel	\N	2007	2019-03-29 20:16:24.429614	2019-03-29 20:16:24.429614	\N	\N	\N
1784	2016-11-11 00:00:00	2016-11-13 00:00:00	Canada	Ottawa, Ontario	Convention	2016	2016	a97acdc0-6725-4ad0-8f03-63cd81d8b5a8	c5e77147-293a-405f-b06e-27ea8410a14a	ALT Hotel	\N	2016	2019-03-29 20:16:24.453317	2019-03-29 20:16:24.453317	\N	\N	\N
1785	2017-11-10 00:00:00	2017-11-12 00:00:00	Canada	Ottawa, Ontario	Convention	2017	2017	a97acdc0-6725-4ad0-8f03-63cd81d8b5a8	632ce3ec-6212-4dd7-810f-4001c80d82bd	ALT Hotel	\N	2017	2019-03-29 20:16:27.156251	2019-03-29 20:16:27.156251	\N	\N	\N
1786	2018-08-03 00:00:00	2018-08-05 00:00:00	Canada	Ottawa, Ontario	Convention	2018	2018	a97acdc0-6725-4ad0-8f03-63cd81d8b5a8	3e0e3b7a-9090-4c13-9678-a9a4c353ad5e	The Brookstreet Hotel	\N	2018	2019-03-29 20:16:27.17933	2019-03-29 20:16:27.17933	\N	\N	\N
1787	2019-08-02 00:00:00	2019-08-04 00:00:00	Canada	Ottawa, Ontario	Convention	2019	2019	a97acdc0-6725-4ad0-8f03-63cd81d8b5a8	e7b121cd-46e6-459d-94e1-42f47e042356	The Brookstreet Hotel	\N	2019	2019-03-29 20:16:27.197914	2019-03-29 20:16:27.197914	\N	\N	\N
1788	2015-07-18 00:00:00	2015-07-18 00:00:00	China	Mainland	Convention	2015	2015	5cf4c81e-9abb-401a-9a41-062f5414c582	56941db9-f8c4-4f71-9c3d-35afab122073	Mainland	\N	2015	2019-03-29 20:16:27.22086	2019-03-29 20:16:27.22086	\N	\N	\N
1789	2010-04-30 00:00:00	2010-05-02 00:00:00	Germany	Camping Pfählhof GmbH	Convention	2010	1	f178c0f9-a315-46fe-b26d-397e4af7cd91	9f9f15f5-7878-4697-8744-462bad5b0d90	Bad Urach	30	1	2019-03-29 20:16:30.158537	2019-03-29 20:16:30.158537	\N	\N	\N
1790	2011-05-27 00:00:00	2011-05-29 00:00:00	Germany	Sigmaringen	Convention	2011	2	f178c0f9-a315-46fe-b26d-397e4af7cd91	0d239dcd-cc6c-4330-9a6b-bb63ec286d34	Campingplatz Sigmaringen	55	2	2019-03-29 20:16:32.645665	2019-03-29 20:16:32.645665	\N	\N	\N
1791	2012-06-15 00:00:00	2012-06-17 00:00:00	Germany	Sigmaringen	Convention	2012	3	f178c0f9-a315-46fe-b26d-397e4af7cd91	06ec1161-d9d4-49bd-8b9a-cd10c4b4c42e	Campingplatz Sigmaringen	81	3	2019-03-29 20:16:32.662151	2019-03-29 20:16:32.662151	\N	\N	\N
1792	2013-05-24 00:00:00	2013-05-26 00:00:00	Germany	Sigmaringen	Convention	2013	4	f178c0f9-a315-46fe-b26d-397e4af7cd91	f59875fb-55d1-4b9e-a18e-dc6cb5244dc3	Campingplatz Sigmaringen	88	4	2019-03-29 20:16:32.677222	2019-03-29 20:16:32.677222	\N	\N	\N
1793	2014-06-13 00:00:00	2014-06-15 00:00:00	Germany	Sigmaringen	Convention	2014	5	f178c0f9-a315-46fe-b26d-397e4af7cd91	0caf8409-e8c8-4661-a3bf-5d55801c5a88	Campingplatz Sigmaringen	83	5	2019-03-29 20:16:32.695236	2019-03-29 20:16:32.695236	\N	\N	\N
1794	2015-06-12 00:00:00	2015-06-14 00:00:00	Germany	Sigmaringen	Convention	2015	6	f178c0f9-a315-46fe-b26d-397e4af7cd91	e95ce997-2932-4e7d-8eae-8824f5ff997f	Campingplatz Sigmaringen	86	6	2019-03-29 20:16:32.713818	2019-03-29 20:16:32.713818	\N	\N	\N
1795	2016-06-17 00:00:00	2016-06-19 00:00:00	Germany	Horb am Neckar	Convention	2016	7	f178c0f9-a315-46fe-b26d-397e4af7cd91	7501905b-7cc3-47bb-813d-9f019aa9411f	Kaiser-Maximilian Ritterspiele	103	7	2019-03-29 20:16:32.734266	2019-03-29 20:16:32.734266	\N	\N	\N
1796	2017-06-16 00:00:00	2017-06-18 00:00:00	Germany	Horb am Neckar	Convention	2017	8	f178c0f9-a315-46fe-b26d-397e4af7cd91	f3767fbb-14b4-4c29-9614-52a99d281671	Kaiser-Maximilian Ritterspiele	0	8	2019-03-29 20:16:32.756853	2019-03-29 20:16:32.756853	\N	\N	\N
1797	2018-06-15 00:00:00	2018-06-17 00:00:00	Germany	Horb am Neckar	Convention	2018	9	f178c0f9-a315-46fe-b26d-397e4af7cd91	69a93f0a-b34a-4505-9db6-8aefa33fd65e	Kaiser-Maximilian Ritterspiele	0	9	2019-03-29 20:16:32.774601	2019-03-29 20:16:32.774601	\N	\N	\N
1798	2019-06-14 00:00:00	2019-06-16 00:00:00	Germany	Horb am Neckar	Convention	2019	10	f178c0f9-a315-46fe-b26d-397e4af7cd91	63f6e0fd-852a-4ccc-a6c8-7e6a59648870	Kaiser-Maximilian Ritterspiele	0	10	2019-03-29 20:16:32.794343	2019-03-29 20:16:32.794343	\N	\N	\N
1799	2010-09-11 00:00:00	2010-09-12 00:00:00	United States	Clinton Lake, Kansas	Furmeet	2010	2010	f87f937a-e330-4e01-8171-dbbbeba8f2c1	3c66ec33-8a82-4467-904e-ad1b3964dd90	Camp Bloomington West	\N	2010	2019-03-29 20:16:32.811308	2019-03-29 20:16:32.811308	\N	\N	\N
1800	2011-09-09 00:00:00	2011-09-11 00:00:00	United States	Clinton Lake, Kansas	Furmeet	2011	2011	f87f937a-e330-4e01-8171-dbbbeba8f2c1	dd79cff8-2bfc-4332-8f9a-426469cc48d1	Bloomington West Group Park	\N	2011	2019-03-29 20:16:35.535131	2019-03-29 20:16:35.535131	\N	\N	\N
1801	2012-09-14 00:00:00	2012-09-16 00:00:00	United States	Topeka, Kasas	Furmeet	2012	2012	f87f937a-e330-4e01-8171-dbbbeba8f2c1	b4320c87-e8dd-466c-9e3f-76371d9b9b4f	Capital City KOA Campground	\N	2012	2019-03-29 20:16:35.547926	2019-03-29 20:16:35.547926	\N	\N	\N
1802	2013-10-03 00:00:00	2013-10-06 00:00:00	United States	Wichita, Kansas	Convention	2013	2013	64977fe8-7bcc-4f99-8b38-5030d835c1e1	67d94cdb-527c-448c-b1b5-247bddad4ae2	Drury Plaza Hotel Broadview	\N	2013	2019-03-29 20:16:35.565526	2019-03-29 20:16:35.565526	\N	\N	\N
1803	2014-11-06 00:00:00	2014-11-10 00:00:00	United States	Wichita, Kansas	Convention	2014	2014	64977fe8-7bcc-4f99-8b38-5030d835c1e1	12b89287-c064-49be-9bec-728e9ea87e62	Drury Plaza Hotel Broadview	\N	2014	2019-03-29 20:16:38.176971	2019-03-29 20:16:38.176971	\N	\N	\N
1804	2015-11-05 00:00:00	2015-11-08 00:00:00	United States	Wichita, Kansas	Convention	2015	2015	64977fe8-7bcc-4f99-8b38-5030d835c1e1	76a3b010-45bb-4768-bd3c-78be6b98c41e	Drury Plaza Hotel Broadview	\N	2015	2019-03-29 20:16:38.190421	2019-03-29 20:16:38.190421	\N	\N	\N
1805	2005-03-25 00:00:00	2005-03-28 00:00:00	Czech Republic	Pardubice	Convention	2005	2005	c08c43ea-9e45-4a4b-98b9-664d532d81c8	3ec0f895-8ba8-4563-b27d-a83c8dd83a3b	Březová nad Svitavou	\N	2005	2019-03-29 20:16:38.21358	2019-03-29 20:16:38.21358	\N	\N	\N
1806	2007-04-06 00:00:00	2007-04-09 00:00:00	Czech Republic	Turnov, Liberec	Convention	2007	2007	c08c43ea-9e45-4a4b-98b9-664d532d81c8	6ad66931-77a4-43fd-8ed9-09f6b10f285d	Bartošova Pec	\N	2007	2019-03-29 20:16:40.780405	2019-03-29 20:16:40.780405	\N	\N	\N
1807	2008-03-21 00:00:00	2008-03-24 00:00:00	Czech Republic	Ledeč nad Sázavou	Convention	2008	2008	c08c43ea-9e45-4a4b-98b9-664d532d81c8	b5b257ad-b446-46fb-99fd-4840dad62368	Sluneční zátoka	\N	2008	2019-03-29 20:16:40.797053	2019-03-29 20:16:40.797053	\N	\N	\N
1808	2009-07-15 00:00:00	2009-07-18 00:00:00	Czech Republic	Zlenice, Prague	Convention	2009	2009	c08c43ea-9e45-4a4b-98b9-664d532d81c8	676dba83-6f71-4776-aedc-43c71c5c8617	Hláska hotel	\N	2009	2019-03-29 20:16:40.818464	2019-03-29 20:16:40.818464	\N	\N	\N
1809	2010-06-30 00:00:00	2010-07-03 00:00:00	Czech Republic	Zlenice, Prague	Convention	2010	2010	c08c43ea-9e45-4a4b-98b9-664d532d81c8	3818bbe4-d77f-497e-87da-e9b60329285a	Hláska hotel	\N	2010	2019-03-29 20:16:40.832277	2019-03-29 20:16:40.832277	\N	\N	\N
1810	2011-07-14 00:00:00	2011-07-17 00:00:00	Czech Republic	Prague	Convention	2011	2011	c08c43ea-9e45-4a4b-98b9-664d532d81c8	e768f66b-c90f-421e-88ed-679f0ba32538	Vltava hotel	\N	2011	2019-03-29 20:16:40.848824	2019-03-29 20:16:40.848824	\N	\N	\N
1811	2012-07-05 00:00:00	2012-07-08 00:00:00	Czech Republic	Kouty, Bohemian-Moravian Highlands	Convention	2012	2012	c08c43ea-9e45-4a4b-98b9-664d532d81c8	33c2fd27-e5b9-4f85-a1cd-8b6fbdef60dd	Hotel Luna	\N	2012	2019-03-29 20:16:40.862581	2019-03-29 20:16:40.862581	\N	\N	\N
1812	2013-06-27 00:00:00	2013-06-30 00:00:00	Czech Republic	Kouty, Bohemian-Moravian Highlands	Convention	2013	2013	c08c43ea-9e45-4a4b-98b9-664d532d81c8	9f6230d5-4dfd-44d5-b493-dcb5b5d4951a	Hotel Luna	\N	2013	2019-03-29 20:16:40.881661	2019-03-29 20:16:40.881661	\N	\N	\N
1813	2006-03-28 00:00:00	2006-04-01 00:00:00	Czech Republic	Březová nad Svitavou	Convention	2006	2006	c08c43ea-9e45-4a4b-98b9-664d532d81c8	a9c85a91-b56c-4467-97d3-8d3b674b9064	Turistická ubytovna Pohoda	\N	2006	2019-03-29 20:16:40.897744	2019-03-29 20:16:40.897744	\N	\N	\N
1814	2014-06-25 00:00:00	2014-06-29 00:00:00	Czech Republic	Kouty, Bohemian-Moravian Highlands	Convention	2014	2014	c08c43ea-9e45-4a4b-98b9-664d532d81c8	df965d2e-6882-47f6-91d2-f8508de3f32c	Hotel Luna	\N	2014	2019-03-29 20:16:40.916394	2019-03-29 20:16:40.916394	\N	\N	\N
1815	2015-06-24 00:00:00	2015-06-28 00:00:00	Czech Republic	Bohemian-Moravian Highlands	Convention	2015	2015	c08c43ea-9e45-4a4b-98b9-664d532d81c8	8a4c4f52-4db3-4552-a9fe-69d563a9d3eb	Hotel Skalský dvůr	\N	2015	2019-03-29 20:16:40.931847	2019-03-29 20:16:40.931847	\N	\N	\N
1816	2016-07-06 00:00:00	2016-07-10 00:00:00	Czech Republic	Bohemian-Moravian Highlands	Convention	2016	2016	c08c43ea-9e45-4a4b-98b9-664d532d81c8	93512c22-e490-4aa8-9644-4736329d3d9e	Hotel Skalský dvůr	\N	2016	2019-03-29 20:16:40.951669	2019-03-29 20:16:40.951669	\N	\N	\N
1817	2017-07-05 00:00:00	2017-07-09 00:00:00	Czech Republic	Bohemian-Moravian Highlands	Convention	2017	2017	c08c43ea-9e45-4a4b-98b9-664d532d81c8	2ee6693d-63c8-48b9-9477-1b8c01917e58	Hotel Skalský dvůr	\N	2017	2019-03-29 20:16:40.966934	2019-03-29 20:16:40.966934	\N	\N	\N
1818	2018-07-11 00:00:00	2018-07-15 00:00:00	Czech Republic	Bohemian-Moravian Highlands	Convention	2018	2018	c08c43ea-9e45-4a4b-98b9-664d532d81c8	5cd2694e-5133-4923-8346-f49e51986218	Hotel Skalský dvůr	\N	2018	2019-03-29 20:16:40.983512	2019-03-29 20:16:40.983512	\N	\N	\N
1819	2019-07-10 00:00:00	2019-07-14 00:00:00	Czech Republic	Bohemian-Moravian Highlands	Convention	2019	2019	c08c43ea-9e45-4a4b-98b9-664d532d81c8	dde3cc8d-bb03-4f6c-a53e-1e36c51e45f6	Hotel Skalský dvůr	\N	2019	2019-03-29 20:16:41.000288	2019-03-29 20:16:41.000288	\N	\N	\N
1820	2010-08-06 00:00:00	2010-08-08 00:00:00	Canada	London, Ontario	Convention	2010	2010	acce60a6-cf59-463e-9d4d-eb2275bd76d7	e369b8b6-cdcb-485f-acc5-3c0c3d03a2bb	Four Points by Sheraton	\N	2010	2019-03-29 20:16:41.01734	2019-03-29 20:16:41.01734	\N	\N	\N
1821	2011-07-22 00:00:00	2011-07-24 00:00:00	Canada	London, Ontario	Convention	2011	2011	acce60a6-cf59-463e-9d4d-eb2275bd76d7	810f471f-50ba-4c32-93ae-0c7008f4cd09	Four Points by Sheraton	\N	2011	2019-03-29 20:16:43.64334	2019-03-29 20:16:43.64334	\N	\N	\N
1822	2012-07-27 00:00:00	2012-07-29 00:00:00	Canada	London, Ontario	Convention	2012	2012	acce60a6-cf59-463e-9d4d-eb2275bd76d7	667a388a-2d93-4cfe-b1cb-203872279e20	Four Points by Sheraton	\N	2012	2019-03-29 20:16:43.663357	2019-03-29 20:16:43.663357	\N	\N	\N
1823	2013-08-02 00:00:00	2013-08-04 00:00:00	Canada	London, Ontario	Convention	2013	2013	acce60a6-cf59-463e-9d4d-eb2275bd76d7	3cb6ef9a-5bdf-42ed-9dec-935ae63e0f47	Four Points by Sheraton	\N	2013	2019-03-29 20:16:43.681842	2019-03-29 20:16:43.681842	\N	\N	\N
1824	2014-08-01 00:00:00	2014-08-03 00:00:00	Canada	London, Ontario	Convention	2014	2014	acce60a6-cf59-463e-9d4d-eb2275bd76d7	3aba49c7-c99f-472d-b986-088df8db61ed	Four Points by Sheraton	\N	2014	2019-03-29 20:16:43.699956	2019-03-29 20:16:43.699956	\N	\N	\N
1825	1989-01-21 00:00:00	1989-01-22 00:00:00	United States	Costa Mesa, California	Convention	1989	1989	bdb6f819-4ce6-4ec0-b300-3ddad933238b	39c037e0-386c-4d20-84a7-ba12797fc44e	Holiday Inn Bristol Plaza	\N	1989	2019-03-29 20:16:43.722082	2019-03-29 20:16:43.722082	\N	\N	\N
1826	1990-01-26 00:00:00	1990-01-28 00:00:00	United States	Costa Mesa, California	Convention	1990	1990	bdb6f819-4ce6-4ec0-b300-3ddad933238b	ec08df10-b75c-448d-9354-7b6ac4f232f1	Holiday Inn Bristol Plaza	\N	1990	2019-03-29 20:16:46.424028	2019-03-29 20:16:46.424028	\N	\N	\N
1827	1991-01-25 00:00:00	1991-01-27 00:00:00	United States	Anaheim, California	Convention	1991	1991	bdb6f819-4ce6-4ec0-b300-3ddad933238b	da53c7dc-b408-4d13-8f5c-24e44cf77c4b	Holiday Inn	\N	1991	2019-03-29 20:16:46.437734	2019-03-29 20:16:46.437734	\N	\N	\N
1828	1992-01-24 00:00:00	1992-01-26 00:00:00	United States	Anaheim, California	Convention	1992	1992	bdb6f819-4ce6-4ec0-b300-3ddad933238b	14a0fecd-78c3-45c0-a550-905d505b7d65	Holiday Inn	\N	1992	2019-03-29 20:16:46.454334	2019-03-29 20:16:46.454334	\N	\N	\N
1829	1993-01-22 00:00:00	1993-01-24 00:00:00	United States	Costa Mesa, California	Convention	1993	1993	bdb6f819-4ce6-4ec0-b300-3ddad933238b	5ceb5e1f-6e1a-45ad-a034-bdffa9f012d5	Red Lion Inn	\N	1993	2019-03-29 20:16:46.470827	2019-03-29 20:16:46.470827	\N	\N	\N
1830	1994-01-21 00:00:00	1994-01-23 00:00:00	United States	Irvine, California	Convention	1994	1994	bdb6f819-4ce6-4ec0-b300-3ddad933238b	15595773-388d-445f-b5de-be538d63ee02	Airporter Garden Hotel	\N	1994	2019-03-29 20:16:46.490991	2019-03-29 20:16:46.490991	\N	\N	\N
1831	1995-01-13 00:00:00	1995-01-15 00:00:00	United States	Irvine, California	Convention	1995	1995	bdb6f819-4ce6-4ec0-b300-3ddad933238b	463c381c-75d4-4c94-b89d-606612ed6a82	Airporter Garden Hotel	\N	1995	2019-03-29 20:16:46.509256	2019-03-29 20:16:46.509256	\N	\N	\N
1832	1996-01-12 00:00:00	1996-01-14 00:00:00	United States	Irvine, California	Convention	1996	1996	bdb6f819-4ce6-4ec0-b300-3ddad933238b	9a6e611b-3706-4ed1-8f2e-a6695ab2144e	Atrium Marquis Hotel	\N	1996	2019-03-29 20:16:46.52721	2019-03-29 20:16:46.52721	\N	\N	\N
1833	1997-01-16 00:00:00	1997-01-19 00:00:00	United States	Buena Park, California	Convention	1997	1997	bdb6f819-4ce6-4ec0-b300-3ddad933238b	b6560bc9-9a78-489d-8cb2-002a5d4db667	Buena Park Hotel and Convention Center	\N	1997	2019-03-29 20:16:46.541717	2019-03-29 20:16:46.541717	\N	\N	\N
1834	1998-01-15 00:00:00	1998-01-18 00:00:00	United States	Buena Park, California	Convention	1998	1998	bdb6f819-4ce6-4ec0-b300-3ddad933238b	06d7c43a-d649-416d-ab6e-35868082ad47	Buena Park Hotel and Convention Center	\N	1998	2019-03-29 20:16:46.559144	2019-03-29 20:16:46.559144	\N	\N	\N
1835	1999-04-01 00:00:00	1999-04-04 00:00:00	United States	San Diego, California	Convention	1999	1999	bdb6f819-4ce6-4ec0-b300-3ddad933238b	65d74efb-5ba7-4b08-8505-4a6728c1c1e8	Town and Country Resort and Convention Center	\N	1999	2019-03-29 20:16:46.573721	2019-03-29 20:16:46.573721	\N	\N	\N
1836	2000-04-06 00:00:00	2000-04-09 00:00:00	United States	Irvine, California	Convention	2000	2000	bdb6f819-4ce6-4ec0-b300-3ddad933238b	5506776b-5bb4-4882-be60-cf26d17181dd	Irvine Hilton Hotel	\N	2000	2019-03-29 20:16:46.590343	2019-03-29 20:16:46.590343	\N	\N	\N
1837	2001-04-19 00:00:00	2001-04-22 00:00:00	United States	Burbank, California	Convention	2001	2001	bdb6f819-4ce6-4ec0-b300-3ddad933238b	32baefe0-2897-40ac-a800-45aed7d3cf66	Hilton Burbank Airport & Convention Center	\N	2001	2019-03-29 20:16:46.605889	2019-03-29 20:16:46.605889	\N	\N	\N
1838	2002-04-26 00:00:00	2002-04-28 00:00:00	United States	Burbank, California	Convention	2002	2002	bdb6f819-4ce6-4ec0-b300-3ddad933238b	0f7060ec-a075-4f8f-90eb-6f097194caba	Hilton Burbank Airport & Convention Center	\N	2002	2019-03-29 20:16:46.623296	2019-03-29 20:16:46.623296	\N	\N	\N
1839	2003-04-25 00:00:00	2003-04-27 00:00:00	United States	Burbank, California	Convention	2003	2003	bdb6f819-4ce6-4ec0-b300-3ddad933238b	3bc3bf75-e260-4b08-850c-884adfd58152	Hilton Burbank Airport & Convention Center	\N	2003	2019-03-29 20:16:46.636711	2019-03-29 20:16:46.636711	\N	\N	\N
1840	1995-10-13 00:00:00	1995-10-15 00:00:00	United States	Elizabeth, New Jersey	Convention	1995	1995	408e01ee-4ea5-44ee-aa96-d759ae114ecb	3b3a9ac1-23a0-4551-9295-f96b2033d7d5	Holiday Inn Jetport	\N	1995	2019-03-29 20:16:46.65274	2019-03-29 20:16:46.65274	\N	\N	\N
1841	1996-11-15 00:00:00	1996-11-17 00:00:00	United States	Independence, Ohio	Convention	1996	1996	408e01ee-4ea5-44ee-aa96-d759ae114ecb	d5d47449-b167-4de2-8309-27928bbba9ea	Holiday Inn Independence	\N	1996	2019-03-29 20:16:49.327512	2019-03-29 20:16:49.327512	\N	\N	\N
1842	2014-01-10 00:00:00	2014-01-12 00:00:00	Australia	Melbourne, Victoria	Convention	2014	2014	84a3b67e-7ee6-448f-b854-be83ac7616d3	2deeba17-66df-4603-ad9c-3f3c680be67c	Melbourne Convention and Exhibition Centre	\N	2014	2019-03-29 20:16:49.342315	2019-03-29 20:16:49.342315	\N	\N	\N
1843	2015-01-08 00:00:00	2015-01-11 00:00:00	Australia	Carlton, Victoria	Convention	2015	2015	84a3b67e-7ee6-448f-b854-be83ac7616d3	a0235945-462c-472d-8872-35a103c053ed	Arrow on Swanston	\N	2015	2019-03-29 20:16:51.856038	2019-03-29 20:16:51.856038	\N	\N	\N
1844	2016-01-08 00:00:00	2016-01-10 00:00:00	Australia	Richmond, Melbourne	Convention	2016	2016	84a3b67e-7ee6-448f-b854-be83ac7616d3	96163efa-5e9f-486f-90e1-a81e36c81235	Amora Riverwalk Melbourne Hotel	\N	2016	2019-03-29 20:16:51.870993	2019-03-29 20:16:51.870993	\N	\N	\N
1845	2017-01-06 00:00:00	2017-01-08 00:00:00	Australia	Richmond, Melbourne	Convention	2017	2017	84a3b67e-7ee6-448f-b854-be83ac7616d3	bf721500-c7c4-40b0-86b2-07dd51c37c07	Amora Riverwalk Melbourne Hotel	\N	2017	2019-03-29 20:16:51.885066	2019-03-29 20:16:51.885066	\N	\N	\N
1846	2018-02-23 00:00:00	2018-02-25 00:00:00	Australia	Richmond, Melbourne	Convention	2018	2018	84a3b67e-7ee6-448f-b854-be83ac7616d3	e5dcde18-4c3c-4eee-a6ca-321c0cd24d29	Amora Riverwalk Melbourne Hotel	\N	2018	2019-03-29 20:16:51.901562	2019-03-29 20:16:51.901562	\N	\N	\N
1847	2017-08-04 00:00:00	2017-08-06 00:00:00	Mexico	Guadalajara, Jalisco	Convention	2017	2017	08b8e182-d213-4205-ac95-ac7cbd7d0964	86351ae5-8a80-4890-acc2-ca68c2a0fb24	Laffayette Hotel	170	2017	2019-03-29 20:16:51.916769	2019-03-29 20:16:51.916769	\N	\N	\N
1848	2018-10-12 00:00:00	2018-10-14 00:00:00	Mexico	Guadalajara, Jalisco	Convention	2018	2018	08b8e182-d213-4205-ac95-ac7cbd7d0964	8e311041-23bc-49b3-bc5b-55c6245e6751	Laffayette Hotel	\N	2018	2019-03-29 20:16:54.757075	2019-03-29 20:16:54.757075	\N	\N	\N
1849	2019-10-11 00:00:00	2019-10-12 00:00:00	Mexico	Guadalajara, Jalisco	Convention	2019	2019	08b8e182-d213-4205-ac95-ac7cbd7d0964	d9e14e60-a173-466d-a8eb-e2c5ed9ec240	Laffayette Hotel	\N	2019	2019-03-29 20:16:54.769645	2019-03-29 20:16:54.769645	\N	\N	\N
1850	2008-11-22 00:00:00	2008-11-23 00:00:00	Mexico	Cuernavaca	Convention	2008	1	da0c15b1-3bc2-40e9-9c28-e965b6849fae	282553a3-f3eb-47fc-b49c-ee80b8be462b	Xochitepec	\N	1	2019-03-29 20:16:54.78754	2019-03-29 20:16:54.78754	\N	\N	\N
1851	2019-08-03 00:00:00	2019-08-04 00:00:00	Mexico	Ciudad de México	Convention	2019	2	da0c15b1-3bc2-40e9-9c28-e965b6849fae	5d862036-650f-4c54-a521-217b6e648a60	Hotel Ritz	\N	2	2019-03-29 20:16:57.549753	2019-03-29 20:16:57.549753	\N	\N	\N
1852	2008-06-20 00:00:00	2008-06-23 00:00:00	United Kingdom	Manchester, England	Convention	2008	2008	9c4914fc-6bd9-4057-93fe-5356e76e7a02	d685f7e2-1e91-48d0-bb1a-e06885159113	Manchester International Youth Hostel	\N	2008	2019-03-29 20:16:57.567977	2019-03-29 20:16:57.567977	\N	\N	\N
1853	2009-05-22 00:00:00	2009-05-25 00:00:00	United Kingdom	Manchester, England	Convention	2009	2009	9c4914fc-6bd9-4057-93fe-5356e76e7a02	d0293528-dd10-457b-99eb-ef6223b8525a	Manchester International Youth Hostel	\N	2009	2019-03-29 20:17:00.30168	2019-03-29 20:17:00.30168	\N	\N	\N
1854	2010-05-07 00:00:00	2010-05-10 00:00:00	United Kingdom	Didsbury, Manchester, England	Convention	2010	2010	9c4914fc-6bd9-4057-93fe-5356e76e7a02	d5b2abb4-3dd8-4a09-9039-6ccebbc6316c	Britannia Country House Hotel	\N	2010	2019-03-29 20:17:00.321493	2019-03-29 20:17:00.321493	\N	\N	\N
1855	2011-05-06 00:00:00	2011-05-09 00:00:00	United Kingdom	Didsbury, Manchester, England	Convention	2011	2011	9c4914fc-6bd9-4057-93fe-5356e76e7a02	d60648e1-7e43-46f5-aea1-7c9bbaaa8f75	Britannia Country House Hotel	\N	2011	2019-03-29 20:17:00.365887	2019-03-29 20:17:00.365887	\N	\N	\N
1856	2012-05-25 00:00:00	2012-05-28 00:00:00	United Kingdom	Hinckley, Leicestershire, England	Convention	2012	2012	9c4914fc-6bd9-4057-93fe-5356e76e7a02	ae516e3f-7066-4016-8dfa-be767e311dc7	Hinckley Island Hotel	\N	2012	2019-03-29 20:17:00.382204	2019-03-29 20:17:00.382204	\N	\N	\N
1857	2013-05-30 00:00:00	2013-06-03 00:00:00	United Kingdom	Hinckley, Leicestershire, England	Convention	2013	2013	9c4914fc-6bd9-4057-93fe-5356e76e7a02	b07b4b98-47c5-4517-b0d4-276bc7b52c8d	Hinckley Island Hotel	\N	2013	2019-03-29 20:17:00.399772	2019-03-29 20:17:00.399772	\N	\N	\N
1858	2014-05-23 00:00:00	2014-05-27 00:00:00	United Kingdom	Birmingham, England	Convention	2014	2014	9c4914fc-6bd9-4057-93fe-5356e76e7a02	daae57e0-53e4-4745-8e1a-b757ae65e3a7	Birmingham Hilton Metropole	\N	2014	2019-03-29 20:17:00.414714	2019-03-29 20:17:00.414714	\N	\N	\N
1859	2015-05-22 00:00:00	2015-05-26 00:00:00	United Kingdom	Birmingham, England	Convention	2015	2015	9c4914fc-6bd9-4057-93fe-5356e76e7a02	2bc07905-4cb0-4883-9205-397f69006128	Birmingham Hilton Metropole	\N	2015	2019-03-29 20:17:00.432481	2019-03-29 20:17:00.432481	\N	\N	\N
1860	2016-05-27 00:00:00	2016-05-31 00:00:00	United Kingdom	Birmingham, England	Convention	2016	2016	9c4914fc-6bd9-4057-93fe-5356e76e7a02	bd6f826d-4810-4d3f-8dd9-0a55983d668f	Birmingham Hilton Metropole	\N	2016	2019-03-29 20:17:00.447734	2019-03-29 20:17:00.447734	\N	\N	\N
1861	2017-05-26 00:00:00	2017-05-30 00:00:00	United Kingdom	Birmingham, England	Convention	2017	2017	9c4914fc-6bd9-4057-93fe-5356e76e7a02	fb1f0d2d-85d6-4e9c-b51c-3774e754d763	Birmingham Hilton Metropole	\N	2017	2019-03-29 20:17:00.464999	2019-03-29 20:17:00.464999	\N	\N	\N
1862	2018-05-25 00:00:00	2018-05-29 00:00:00	United Kingdom	Birmingham, England	Convention	2018	2018	9c4914fc-6bd9-4057-93fe-5356e76e7a02	28f1e0b4-8c68-4f75-82ac-0ce72831b2cf	Birmingham Hilton Metropole	\N	2018	2019-03-29 20:17:00.480341	2019-03-29 20:17:00.480341	\N	\N	\N
1863	2019-05-23 00:00:00	2019-05-28 00:00:00	United Kingdom	Birmingham, England	Convention	2019	2019	9c4914fc-6bd9-4057-93fe-5356e76e7a02	693d4b7f-d7ee-4e1b-9c6e-af53e3b0fdba	Birmingham Hilton Metropole	\N	2019	2019-03-29 20:17:00.497996	2019-03-29 20:17:00.497996	\N	\N	\N
1864	2003-09-26 00:00:00	2003-09-28 00:00:00	United Kingdom	Tacoma, Washington	Convention	2003	2003	9d64c7fb-e089-41d3-bf51-1922a0d31536	3b626490-ac91-4bd5-8a5b-1b43291c22f4	Sheraton Tacoma Convention Center	\N	2003	2019-03-29 20:17:00.513527	2019-03-29 20:17:00.513527	\N	\N	\N
1865	2004-09-24 00:00:00	2004-09-26 00:00:00	United Kingdom	Tacoma, Washington	Convention	2004	2004	9d64c7fb-e089-41d3-bf51-1922a0d31536	d26c74b0-e411-4d0e-8e0f-9a035c650703	Sheraton Tacoma Convention Center	\N	2004	2019-03-29 20:17:03.169689	2019-03-29 20:17:03.169689	\N	\N	\N
1866	2005-10-21 00:00:00	2005-10-23 00:00:00	United Kingdom	SeaTac, Washington	Convention	2005	2005	9d64c7fb-e089-41d3-bf51-1922a0d31536	916f13f4-6b63-406d-9d5e-9994638e4fbe	Sea-Tac Radisson Airport Hotel	\N	2005	2019-03-29 20:17:03.183634	2019-03-29 20:17:03.183634	\N	\N	\N
1867	2006-08-11 00:00:00	2006-08-13 00:00:00	Canada	Calgary	Furmeet	2006	2006	2af32865-53ba-478e-be94-4ad8e081958f	00d72794-fe0c-4c2a-a580-9b1813b30798	Various Locations	\N	2006	2019-03-29 20:17:03.199581	2019-03-29 20:17:03.199581	\N	\N	\N
1868	2008-06-30 00:00:00	2008-06-30 00:00:00	United States	Newark, Delaware	Furmeet	2008	1	834b5a8f-15db-4a47-992f-fd007144a983	de49c6bb-a5e9-45ce-ac2a-b25984be26f1	Brunswick Blue Hen Lanes	\N	1	2019-03-29 20:17:06.154356	2019-03-29 20:17:06.154356	\N	\N	\N
1869	2008-08-25 00:00:00	2008-08-25 00:00:00	United States	Wilmington, Delaware	Furmeet	2008	2	834b5a8f-15db-4a47-992f-fd007144a983	690188ff-d19c-44c7-a7ee-74b409fb9e5e	AMF Lanes	\N	2	2019-03-29 20:17:08.811787	2019-03-29 20:17:08.811787	\N	\N	\N
1870	2008-09-15 00:00:00	2008-09-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2008	3	834b5a8f-15db-4a47-992f-fd007144a983	1ea0321b-2317-45b6-bfee-75c9270f5037	AMF Lanes	\N	3	2019-03-29 20:17:08.828516	2019-03-29 20:17:08.828516	\N	\N	\N
1871	2008-11-15 00:00:00	2008-11-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2008	4	834b5a8f-15db-4a47-992f-fd007144a983	8c68664f-7a16-4050-b254-75fab6e32c9b	AMF Lanes	\N	4	2019-03-29 20:17:08.848786	2019-03-29 20:17:08.848786	\N	\N	\N
1872	2009-01-15 00:00:00	2009-01-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	5	834b5a8f-15db-4a47-992f-fd007144a983	4a71a89e-6594-4ddc-9e60-722d0a407228	AMF Lanes	\N	5	2019-03-29 20:17:08.868743	2019-03-29 20:17:08.868743	\N	\N	\N
1873	2009-02-15 00:00:00	2009-02-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	6	834b5a8f-15db-4a47-992f-fd007144a983	a4bcb78b-feba-4cc6-a579-f07101982065	AMF Lanes	\N	6	2019-03-29 20:17:08.887682	2019-03-29 20:17:08.887682	\N	\N	\N
1874	2009-03-15 00:00:00	2009-03-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	7	834b5a8f-15db-4a47-992f-fd007144a983	d505d3af-2a24-49d8-9ad1-70b5c9e6636e	AMF Lanes	\N	7	2019-03-29 20:17:08.900548	2019-03-29 20:17:08.900548	\N	\N	\N
1875	2009-05-15 00:00:00	2009-05-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	8	834b5a8f-15db-4a47-992f-fd007144a983	d4232b7f-3f1c-45e2-afee-1d0e9259b2b1	AMF Lanes	\N	8	2019-03-29 20:17:08.916499	2019-03-29 20:17:08.916499	\N	\N	\N
1876	2009-06-15 00:00:00	2009-06-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	9	834b5a8f-15db-4a47-992f-fd007144a983	7a0ef5df-05e3-46b2-aff7-1b20f5a14572	AMF Lanes	\N	9	2019-03-29 20:17:08.93172	2019-03-29 20:17:08.93172	\N	\N	\N
1877	2009-07-15 00:00:00	2009-07-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	10	834b5a8f-15db-4a47-992f-fd007144a983	4ff3b76e-9313-4835-830f-04b8acb6f8d9	AMF Lanes	\N	10	2019-03-29 20:17:08.948694	2019-03-29 20:17:08.948694	\N	\N	\N
1878	2009-09-15 00:00:00	2009-09-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	11	834b5a8f-15db-4a47-992f-fd007144a983	d6a122cb-291c-4be0-bbc2-36ff9f68d0df	AMF Lanes	\N	11	2019-03-29 20:17:08.962216	2019-03-29 20:17:08.962216	\N	\N	\N
1879	2009-10-15 00:00:00	2009-10-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	12	834b5a8f-15db-4a47-992f-fd007144a983	235534bc-26ad-46fc-a3b2-d2ccb7601f09	AMF Lanes	\N	12	2019-03-29 20:17:08.978071	2019-03-29 20:17:08.978071	\N	\N	\N
1880	2009-12-15 00:00:00	2009-12-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2009	13	834b5a8f-15db-4a47-992f-fd007144a983	216b01c1-8425-46cb-98b6-4ab5b9e3a0b5	AMF Lanes	\N	13	2019-03-29 20:17:08.993003	2019-03-29 20:17:08.993003	\N	\N	\N
1881	2010-01-15 00:00:00	2010-01-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	14	834b5a8f-15db-4a47-992f-fd007144a983	684dcc7c-864a-4cd7-8d8d-39bca4730d73	AMF Lanes	\N	14	2019-03-29 20:17:09.008116	2019-03-29 20:17:09.008116	\N	\N	\N
1882	2010-03-15 00:00:00	2010-03-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	15	834b5a8f-15db-4a47-992f-fd007144a983	4b419ad0-1dd5-4dce-aea6-d7631ca3364f	AMF Lanes	\N	15	2019-03-29 20:17:09.023423	2019-03-29 20:17:09.023423	\N	\N	\N
1883	2010-05-15 00:00:00	2010-05-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	16	834b5a8f-15db-4a47-992f-fd007144a983	6b3d3af7-1558-417e-8fc1-712039de72c4	AMF Lanes	\N	16	2019-03-29 20:17:09.038108	2019-03-29 20:17:09.038108	\N	\N	\N
1884	2010-06-15 00:00:00	2010-06-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	17	834b5a8f-15db-4a47-992f-fd007144a983	c0a24d8a-522a-46b7-886d-8dfe5617dc66	AMF Lanes	\N	17	2019-03-29 20:17:09.052716	2019-03-29 20:17:09.052716	\N	\N	\N
1885	2010-07-21 00:00:00	2010-07-31 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	18	834b5a8f-15db-4a47-992f-fd007144a983	3d85d785-0cde-45e7-b2e6-be43233ffd85	AMF Lanes	\N	18	2019-03-29 20:17:09.066691	2019-03-29 20:17:09.066691	\N	\N	\N
1886	2010-08-15 00:00:00	2010-08-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	19	834b5a8f-15db-4a47-992f-fd007144a983	8c3bfc70-8a03-4508-8baf-2d23257f36b2	AMF Lanes	\N	19	2019-03-29 20:17:09.082941	2019-03-29 20:17:09.082941	\N	\N	\N
1887	2010-09-15 00:00:00	2010-09-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	20	834b5a8f-15db-4a47-992f-fd007144a983	0507797a-61e4-4ca0-9837-6ccb99f3be5b	AMF Lanes	\N	20	2019-03-29 20:17:09.098339	2019-03-29 20:17:09.098339	\N	\N	\N
1888	2010-10-23 00:00:00	2010-10-23 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	21	834b5a8f-15db-4a47-992f-fd007144a983	42ac4465-7faa-4d8d-b929-318548828c98	AMF Lanes	\N	21	2019-03-29 20:17:09.115645	2019-03-29 20:17:09.115645	\N	\N	\N
1889	2010-11-15 00:00:00	2010-11-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	22	834b5a8f-15db-4a47-992f-fd007144a983	4c696aff-ec5c-45a8-9c9f-3048d4c86d46	AMF Lanes	\N	22	2019-03-29 20:17:09.138592	2019-03-29 20:17:09.138592	\N	\N	\N
1890	2010-12-15 00:00:00	2010-12-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2010	23	834b5a8f-15db-4a47-992f-fd007144a983	4265bb9d-4fac-496b-9e49-bf4992500a34	AMF Lanes	\N	23	2019-03-29 20:17:09.165971	2019-03-29 20:17:09.165971	\N	\N	\N
1891	2011-02-15 00:00:00	2011-02-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	24	834b5a8f-15db-4a47-992f-fd007144a983	27b82936-0e4a-4fb6-a595-c34a4be607d0	AMF Lanes	\N	24	2019-03-29 20:17:09.193059	2019-03-29 20:17:09.193059	\N	\N	\N
1892	2011-03-26 00:00:00	2011-03-26 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	25	834b5a8f-15db-4a47-992f-fd007144a983	10b726ac-128d-4bc9-8f7e-ecbe8d77853d	AMF Lanes	\N	25	2019-03-29 20:17:09.213559	2019-03-29 20:17:09.213559	\N	\N	\N
1893	2011-04-30 00:00:00	2011-04-30 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	26	834b5a8f-15db-4a47-992f-fd007144a983	e12d3950-7d95-4774-92b1-59c4073bf439	AMF Lanes	\N	26	2019-03-29 20:17:09.228794	2019-03-29 20:17:09.228794	\N	\N	\N
1894	2011-06-28 00:00:00	2011-06-28 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	27	834b5a8f-15db-4a47-992f-fd007144a983	58f2167b-7b59-4ce8-a919-696c8296b147	AMF Lanes	\N	27	2019-03-29 20:17:09.247161	2019-03-29 20:17:09.247161	\N	\N	\N
1895	2011-07-15 00:00:00	2011-07-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	28	834b5a8f-15db-4a47-992f-fd007144a983	01c8e07d-75b9-4f3c-9a0d-fddbb42a6aa4	AMF Lanes	\N	28	2019-03-29 20:17:09.262964	2019-03-29 20:17:09.262964	\N	\N	\N
1896	2011-08-15 00:00:00	2011-08-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	29	834b5a8f-15db-4a47-992f-fd007144a983	708f5ba0-b8b8-49a9-8f0b-55e0e01e2041	AMF Lanes	\N	29	2019-03-29 20:17:09.279036	2019-03-29 20:17:09.279036	\N	\N	\N
1897	2011-09-15 00:00:00	2011-09-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	30	834b5a8f-15db-4a47-992f-fd007144a983	37cf440b-6260-4f35-839a-5343a287bf0a	AMF Lanes	\N	30	2019-03-29 20:17:09.294457	2019-03-29 20:17:09.294457	\N	\N	\N
1898	2011-10-15 00:00:00	2011-10-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	31	834b5a8f-15db-4a47-992f-fd007144a983	8161cf50-5fc2-41a5-b37f-45118fa12ef1	AMF Lanes	\N	31	2019-03-29 20:17:09.309387	2019-03-29 20:17:09.309387	\N	\N	\N
1899	2011-11-15 00:00:00	2011-11-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2011	32	834b5a8f-15db-4a47-992f-fd007144a983	335ac84d-1cfe-4aed-b279-47017925eabd	AMF Lanes	\N	32	2019-03-29 20:17:09.325335	2019-03-29 20:17:09.325335	\N	\N	\N
1900	2012-01-28 00:00:00	2012-01-28 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	33	834b5a8f-15db-4a47-992f-fd007144a983	b3ada4c1-a465-4d20-9f76-613f16272bfd	AMF Lanes	\N	33	2019-03-29 20:17:09.337764	2019-03-29 20:17:09.337764	\N	\N	\N
1901	2012-02-15 00:00:00	2012-02-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	34	834b5a8f-15db-4a47-992f-fd007144a983	807a273f-c8b3-4fbc-a278-3547e6d4ce07	AMF Lanes	\N	34	2019-03-29 20:17:09.355889	2019-03-29 20:17:09.355889	\N	\N	\N
1902	2012-03-31 00:00:00	2012-03-31 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	35	834b5a8f-15db-4a47-992f-fd007144a983	56d1ccae-2320-4ffa-b22e-764f2ac6b351	AMF Lanes	\N	35	2019-03-29 20:17:09.368899	2019-03-29 20:17:09.368899	\N	\N	\N
1903	2012-04-28 00:00:00	2012-04-28 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	36	834b5a8f-15db-4a47-992f-fd007144a983	2d5811c1-ce6f-4eb9-88d2-fe26886dbe93	AMF Lanes	\N	36	2019-03-29 20:17:09.38359	2019-03-29 20:17:09.38359	\N	\N	\N
1904	2012-07-21 00:00:00	2012-07-21 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	37	834b5a8f-15db-4a47-992f-fd007144a983	071149ac-77ce-46bf-840c-db38a44102f4	AMF Lanes	\N	37	2019-03-29 20:17:09.397999	2019-03-29 20:17:09.397999	\N	\N	\N
1905	2012-08-18 00:00:00	2012-08-18 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	38	834b5a8f-15db-4a47-992f-fd007144a983	dc4f88b5-f597-420e-9234-a9761d9a873b	AMF Lanes	\N	38	2019-03-29 20:17:09.415696	2019-03-29 20:17:09.415696	\N	\N	\N
1906	2012-09-29 00:00:00	2012-09-29 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	39	834b5a8f-15db-4a47-992f-fd007144a983	e1cac945-cd92-4a47-a5e7-4d51c5b08c24	AMF Lanes	\N	39	2019-03-29 20:17:09.429083	2019-03-29 20:17:09.429083	\N	\N	\N
1907	2012-11-03 00:00:00	2012-11-03 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	40	834b5a8f-15db-4a47-992f-fd007144a983	6273795b-37c6-4ae0-b03c-0c76f32b2488	AMF Lanes	\N	40	2019-03-29 20:17:09.446657	2019-03-29 20:17:09.446657	\N	\N	\N
1908	2012-12-01 00:00:00	2012-12-01 00:00:00	United States	Wilmington, Delaware	Furmeet	2012	41	834b5a8f-15db-4a47-992f-fd007144a983	66306807-3d0f-426c-abfb-d197ce93af7d	AMF Lanes	\N	41	2019-03-29 20:17:09.461514	2019-03-29 20:17:09.461514	\N	\N	\N
1909	2013-01-26 00:00:00	2013-01-26 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	42	834b5a8f-15db-4a47-992f-fd007144a983	a56d69ab-10d4-4d1e-ae1b-8b4327dfbdd3	AMF Lanes	\N	42	2019-03-29 20:17:09.476965	2019-03-29 20:17:09.476965	\N	\N	\N
1910	2013-02-23 00:00:00	2013-02-23 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	43	834b5a8f-15db-4a47-992f-fd007144a983	0058bc40-85b8-4a87-bd8a-c04d3c4922d5	AMF Lanes	\N	43	2019-03-29 20:17:09.492271	2019-03-29 20:17:09.492271	\N	\N	\N
1911	2013-04-27 00:00:00	2013-04-27 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	44	834b5a8f-15db-4a47-992f-fd007144a983	5a50d6d4-f4cc-4f54-9a5f-a4b0de888da1	AMF Lanes	\N	44	2019-03-29 20:17:09.505718	2019-03-29 20:17:09.505718	\N	\N	\N
1912	2013-05-25 00:00:00	2013-05-25 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	45	834b5a8f-15db-4a47-992f-fd007144a983	c5f4b5fd-cfd8-4457-baf7-8a4e2ee5588a	AMF Lanes	\N	45	2019-03-29 20:17:09.521941	2019-03-29 20:17:09.521941	\N	\N	\N
1913	2013-07-22 00:00:00	2013-07-22 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	46	834b5a8f-15db-4a47-992f-fd007144a983	9388a9cc-29cf-4e04-a0af-be3a7a74dc19	AMF Lanes	\N	46	2019-03-29 20:17:09.534701	2019-03-29 20:17:09.534701	\N	\N	\N
1914	2013-08-31 00:00:00	2013-08-31 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	47	834b5a8f-15db-4a47-992f-fd007144a983	1fc34312-3006-4281-99c7-2c1e2d0bc88e	AMF Lanes	\N	47	2019-03-29 20:17:09.552299	2019-03-29 20:17:09.552299	\N	\N	\N
1915	2013-09-28 00:00:00	2013-09-28 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	48	834b5a8f-15db-4a47-992f-fd007144a983	7ffcb1de-0fd1-4328-9164-15e473e32ca5	AMF Lanes	\N	48	2019-03-29 20:17:09.565698	2019-03-29 20:17:09.565698	\N	\N	\N
1916	2013-10-15 00:00:00	2013-10-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	49	834b5a8f-15db-4a47-992f-fd007144a983	d1ada36e-72ea-449a-9750-9ee6884f8041	AMF Lanes	\N	49	2019-03-29 20:17:09.585379	2019-03-29 20:17:09.585379	\N	\N	\N
1917	2013-12-07 00:00:00	2013-12-07 00:00:00	United States	Wilmington, Delaware	Furmeet	2013	50	834b5a8f-15db-4a47-992f-fd007144a983	9b82895e-1af2-4d96-bde0-b0fe0cadc448	AMF Lanes	\N	50	2019-03-29 20:17:09.598769	2019-03-29 20:17:09.598769	\N	\N	\N
1918	2014-02-22 00:00:00	2014-02-22 00:00:00	United States	Wilmington, Delaware	Furmeet	2014	51	834b5a8f-15db-4a47-992f-fd007144a983	bcfd2da8-12a5-461c-8455-3641498d1d4c	AMF Lanes	\N	51	2019-03-29 20:17:09.614719	2019-03-29 20:17:09.614719	\N	\N	\N
1919	2014-04-26 00:00:00	2014-04-26 00:00:00	United States	Wilmington, Delaware	Furmeet	2014	52	834b5a8f-15db-4a47-992f-fd007144a983	d745968f-259c-49e4-8623-7bf985fcb625	AMF Lanes	\N	52	2019-03-29 20:17:09.628391	2019-03-29 20:17:09.628391	\N	\N	\N
1920	2014-06-15 00:00:00	2014-06-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2014	53	834b5a8f-15db-4a47-992f-fd007144a983	245bff25-d7c6-41e2-a22f-ae712d8e8227	AMF Lanes	\N	53	2019-03-29 20:17:09.64151	2019-03-29 20:17:09.64151	\N	\N	\N
1921	2014-09-27 00:00:00	2014-09-27 00:00:00	United States	Wilmington, Delaware	Furmeet	2014	54	834b5a8f-15db-4a47-992f-fd007144a983	ee08adaf-ac63-466e-82b6-f1b0128d41bc	AMF Lanes	\N	54	2019-03-29 20:17:09.656435	2019-03-29 20:17:09.656435	\N	\N	\N
1922	2014-11-08 00:00:00	2014-11-08 00:00:00	United States	Wilmington, Delaware	Furmeet	2014	55	834b5a8f-15db-4a47-992f-fd007144a983	310426cc-371f-4e47-8071-63a3cd7d4d9f	AMF Lanes	\N	55	2019-03-29 20:17:09.669379	2019-03-29 20:17:09.669379	\N	\N	\N
1923	2015-03-14 00:00:00	2015-03-14 00:00:00	United States	Wilmington, Delaware	Furmeet	2015	56	834b5a8f-15db-4a47-992f-fd007144a983	3d4b547f-ff81-4cdb-819d-6cbfcef08537	AMF Lanes	\N	56	2019-03-29 20:17:09.685991	2019-03-29 20:17:09.685991	\N	\N	\N
1924	2015-04-25 00:00:00	2015-04-25 00:00:00	United States	Wilmington, Delaware	Furmeet	2015	57	834b5a8f-15db-4a47-992f-fd007144a983	2a5fdae5-becc-419d-ba1f-084423bc78f1	AMF Lanes	\N	57	2019-03-29 20:17:09.698779	2019-03-29 20:17:09.698779	\N	\N	\N
1925	2015-05-07 00:00:00	2015-05-07 00:00:00	United States	Wilmington, Delaware	Furmeet	2015	58	834b5a8f-15db-4a47-992f-fd007144a983	ceea668f-6868-454f-8f40-6c7381c4cae4	AMF Lanes	\N	58	2019-03-29 20:17:09.714289	2019-03-29 20:17:09.714289	\N	\N	\N
1926	2015-05-21 00:00:00	2015-05-21 00:00:00	United States	Wilmington, Delaware	Furmeet	2015	59	834b5a8f-15db-4a47-992f-fd007144a983	b5805bfc-0978-4c20-b3fe-aa050e48337d	AMF Lanes	\N	59	2019-03-29 20:17:09.727853	2019-03-29 20:17:09.727853	\N	\N	\N
1927	2017-06-17 00:00:00	2017-06-17 00:00:00	United States	Wilmington, Delaware	Furmeet	2017	60	834b5a8f-15db-4a47-992f-fd007144a983	cc01bb3c-e56d-4748-a353-69402ffe9ea9	AMF Lanes	\N	60	2019-03-29 20:17:09.741273	2019-03-29 20:17:09.741273	\N	\N	\N
1928	2017-09-09 00:00:00	2017-09-09 00:00:00	United States	Wilmington, Delaware	Furmeet	2017	61	834b5a8f-15db-4a47-992f-fd007144a983	53967ff1-63a8-44b0-9807-bd5d2c223406	AMF Lanes	\N	61	2019-03-29 20:17:09.756122	2019-03-29 20:17:09.756122	\N	\N	\N
1929	2017-12-15 00:00:00	2017-12-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2017	62	834b5a8f-15db-4a47-992f-fd007144a983	4f71d373-478d-42f1-b212-ec088889e701	AMF Lanes	\N	62	2019-03-29 20:17:09.768625	2019-03-29 20:17:09.768625	\N	\N	\N
1930	2018-02-03 00:00:00	2018-02-03 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	63	834b5a8f-15db-4a47-992f-fd007144a983	008fdbaf-63e4-4e6d-9ca5-f89d043e179e	AMF Lanes	\N	63	2019-03-29 20:17:09.785057	2019-03-29 20:17:09.785057	\N	\N	\N
1931	2018-05-19 00:00:00	2018-05-19 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	64	834b5a8f-15db-4a47-992f-fd007144a983	6ec5a945-3a91-4c90-99c9-1e68551f2871	AMF Lanes	\N	64	2019-03-29 20:17:09.799381	2019-03-29 20:17:09.799381	\N	\N	\N
1932	2018-08-04 00:00:00	2018-08-04 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	65	834b5a8f-15db-4a47-992f-fd007144a983	7ff50e32-161b-48a4-8f81-36173c2f78f9	AMF Lanes	\N	65	2019-03-29 20:17:09.815528	2019-03-29 20:17:09.815528	\N	\N	\N
1933	2018-09-29 00:00:00	2018-09-29 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	66	834b5a8f-15db-4a47-992f-fd007144a983	0ac0f3d4-98ae-48d7-b566-b01ed67ee03c	AMF Lanes	\N	66	2019-03-29 20:17:09.828477	2019-03-29 20:17:09.828477	\N	\N	\N
1934	2018-11-03 00:00:00	2018-11-03 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	67	834b5a8f-15db-4a47-992f-fd007144a983	f318d106-05b1-4d4e-8129-6d06979083ce	AMF Lanes	\N	67	2019-03-29 20:17:09.847545	2019-03-29 20:17:09.847545	\N	\N	\N
1935	2019-02-16 00:00:00	2019-02-16 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	68	834b5a8f-15db-4a47-992f-fd007144a983	9eb035b1-ffcc-4a60-98d7-25639277d2c1	AMF Lanes	\N	68	2019-03-29 20:17:09.860868	2019-03-29 20:17:09.860868	\N	\N	\N
1936	2019-04-13 00:00:00	2019-04-13 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	69	834b5a8f-15db-4a47-992f-fd007144a983	63acd83b-54a8-467c-a2dc-b7ab8192e26f	AMF Lanes	\N	69	2019-03-29 20:17:09.873393	2019-03-29 20:17:09.873393	\N	\N	\N
1937	2019-06-01 00:00:00	2019-06-01 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	70	834b5a8f-15db-4a47-992f-fd007144a983	267c64c8-4214-47aa-a0a8-d09a8d71b21f	AMF Lanes	\N	70	2019-03-29 20:17:09.889052	2019-03-29 20:17:09.889052	\N	\N	\N
1938	2019-09-21 00:00:00	2019-09-21 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	71	834b5a8f-15db-4a47-992f-fd007144a983	870081fc-0ca9-4c18-bfe2-46240eb2efd8	AMF Lanes	\N	71	2019-03-29 20:17:09.901595	2019-03-29 20:17:09.901595	\N	\N	\N
1939	2019-11-09 00:00:00	2019-11-09 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	72	834b5a8f-15db-4a47-992f-fd007144a983	b637b166-7a19-4849-b1dc-b980f1cd3dab	AMF Lanes	\N	72	2019-03-29 20:17:09.91626	2019-03-29 20:17:09.91626	\N	\N	\N
1940	2016-12-15 00:00:00	2016-12-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2016	1	738bce12-5284-40d8-a709-db50ca069a1e	e0d2261f-d25d-483d-a75b-df832781d278	Wilmington Home Amusements	\N	1	2019-03-29 20:17:09.931294	2019-03-29 20:17:09.931294	\N	\N	\N
1941	2017-06-15 00:00:00	2017-06-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2017	2	738bce12-5284-40d8-a709-db50ca069a1e	e03935d3-8892-4b1f-885a-11a2e2ebab79	Wilmington Home Amusements	\N	2	2019-03-29 20:17:12.558479	2019-03-29 20:17:12.558479	\N	\N	\N
1942	2017-12-15 00:00:00	2017-12-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2017	3	738bce12-5284-40d8-a709-db50ca069a1e	fb8399c3-e122-4e8c-8e0a-9634ef4b1fd1	Wilmington Home Amusements	\N	3	2019-03-29 20:17:12.572548	2019-03-29 20:17:12.572548	\N	\N	\N
1943	2018-06-09 00:00:00	2018-06-09 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	4	738bce12-5284-40d8-a709-db50ca069a1e	85ae05af-3414-4559-8077-9b83da1d8eb2	Wilmington Home Amusements	\N	4	2019-03-29 20:17:12.590811	2019-03-29 20:17:12.590811	\N	\N	\N
1944	2018-12-15 00:00:00	2018-12-15 00:00:00	United States	Wilmington, Delaware	Furmeet	2018	5	738bce12-5284-40d8-a709-db50ca069a1e	8c4fc361-1494-4bdc-b9e2-7cd01a0b2485	Wilmington Home Amusements	\N	5	2019-03-29 20:17:12.603973	2019-03-29 20:17:12.603973	\N	\N	\N
1945	2019-06-22 00:00:00	2019-06-22 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	6	738bce12-5284-40d8-a709-db50ca069a1e	fff38592-4f64-45b0-b14c-9947b668c279	Wilmington Home Amusements	\N	6	2019-03-29 20:17:12.619356	2019-03-29 20:17:12.619356	\N	\N	\N
1946	2019-08-24 00:00:00	2019-08-24 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	7	738bce12-5284-40d8-a709-db50ca069a1e	216de90c-6824-4a40-a686-bf250841826f	Wilmington Home Amusements	\N	7	2019-03-29 20:17:12.633615	2019-03-29 20:17:12.633615	\N	\N	\N
1947	2019-10-19 00:00:00	2019-10-19 00:00:00	United States	Wilmington, Delaware	Furmeet	2019	8	738bce12-5284-40d8-a709-db50ca069a1e	44f23cb7-135f-4ad4-977e-0c989904839e	Wilmington Home Amusements	\N	8	2019-03-29 20:17:12.651772	2019-03-29 20:17:12.651772	\N	\N	\N
1948	2018-08-24 00:00:00	2018-08-26 00:00:00	United States	Denver, Colorado	Convention	2018	2018	5e0f8985-fd4d-4b6a-bd1d-e09e6ed31d63	d166af5c-28af-40e9-a889-918eafef9e89	Crowne Plaza Denver Airport Convention Center	2	2018	2019-03-29 20:17:12.667374	2019-03-29 20:17:12.667374	\N	\N	\N
1949	2019-08-02 00:00:00	2019-08-04 00:00:00	United States	Denver, Colorado	Convention	2019	2019	5e0f8985-fd4d-4b6a-bd1d-e09e6ed31d63	e0a2a40f-3e1c-4ef6-9d89-db6fb785905f	Crowne Plaza Denver Airport Convention Center	\N	2019	2019-03-29 20:17:15.255067	2019-03-29 20:17:15.255067	\N	\N	\N
1950	2007-06-08 00:00:00	2007-06-10 00:00:00	United States	Chicago, Illinois	Convention	2007	2007	2fffa692-b955-4b3a-ba76-a8017f40395b	2f04be56-dca7-4873-875e-4ea6d4cc4b31	Chicago Metropolitan Area	\N	2007	2019-03-29 20:17:15.270438	2019-03-29 20:17:15.270438	\N	\N	\N
1951	2008-06-13 00:00:00	2008-06-15 00:00:00	United States	Chicago, Illinois	Convention	2008	2008	2fffa692-b955-4b3a-ba76-a8017f40395b	b8dec161-6a03-4185-92da-0c4d0885dcc2	Chicago Metropolitan Area	\N	2008	2019-03-29 20:17:17.885276	2019-03-29 20:17:17.885276	\N	\N	\N
1952	2009-06-12 00:00:00	2009-06-14 00:00:00	United States	Chicago, Illinois	Convention	2009	2009	2fffa692-b955-4b3a-ba76-a8017f40395b	8355c707-a951-452a-b398-721ff08e6fa0	Chicago Metropolitan Area	\N	2009	2019-03-29 20:17:17.901444	2019-03-29 20:17:17.901444	\N	\N	\N
1953	2010-06-18 00:00:00	2010-06-20 00:00:00	United States	Chicago, Illinois	Convention	2010	2010	2fffa692-b955-4b3a-ba76-a8017f40395b	e08c1fd4-d0ca-4a3e-b7a8-6e2aefd40e26	Chicago Metropolitan Area	\N	2010	2019-03-29 20:17:17.918928	2019-03-29 20:17:17.918928	\N	\N	\N
1954	2011-06-17 00:00:00	2011-06-19 00:00:00	United States	Chicago, Illinois	Convention	2011	2011	2fffa692-b955-4b3a-ba76-a8017f40395b	b6c7f770-efb1-48ee-870f-0c301de0f9ae	Chicago Metropolitan Area	\N	2011	2019-03-29 20:17:17.9358	2019-03-29 20:17:17.9358	\N	\N	\N
1955	2012-06-01 00:00:00	2012-06-03 00:00:00	United States	Chicago, Illinois	Convention	2012	2012	2fffa692-b955-4b3a-ba76-a8017f40395b	85462069-8015-43da-95fd-d2960c00faad	Chicago Metropolitan Area	\N	2012	2019-03-29 20:17:17.950159	2019-03-29 20:17:17.950159	\N	\N	\N
1956	2013-06-28 00:00:00	2013-06-30 00:00:00	United States	Chicago, Illinois	Convention	2013	2013	2fffa692-b955-4b3a-ba76-a8017f40395b	98f53be8-d41c-4f4e-8cee-32d7834a029e	Chicago Metropolitan Area	\N	2013	2019-03-29 20:17:17.965851	2019-03-29 20:17:17.965851	\N	\N	\N
1957	2014-06-06 00:00:00	2014-06-08 00:00:00	United States	Chicago, Illinois	Convention	2014	2014	2fffa692-b955-4b3a-ba76-a8017f40395b	851c0f10-6357-441a-b626-6b8d547cbb70	Chicago Metropolitan Area	\N	2014	2019-03-29 20:17:17.982806	2019-03-29 20:17:17.982806	\N	\N	\N
1958	2016-07-22 00:00:00	2016-07-25 00:00:00	Netherlands	Zevenaar	Convention	2016	3	6e25f519-d5a1-48ae-918c-84bce0f3bd0e	dd342912-9878-4b0f-ae40-d69a739c4796	Buitengoed de Panoven	98	3	2019-03-29 20:17:17.997118	2019-03-29 20:17:17.997118	\N	\N	\N
1959	2017-07-14 00:00:00	2017-07-17 00:00:00	Netherlands	Zevenaar	Convention	2017	4	6e25f519-d5a1-48ae-918c-84bce0f3bd0e	ec661b57-1cb0-4f35-9d1d-d7e60c2af7fb	Buitengoed de Panoven	116	4	2019-03-29 20:17:20.511316	2019-03-29 20:17:20.511316	\N	\N	\N
1960	2018-06-29 00:00:00	2018-07-02 00:00:00	Netherlands	Zevenaar	Convention	2018	2018	6e25f519-d5a1-48ae-918c-84bce0f3bd0e	6c7a42ee-dbce-4f86-9bf5-80947801655d	Hoeve ter Hofstad, Someren	\N	2018	2019-03-29 20:17:20.525608	2019-03-29 20:17:20.525608	\N	\N	\N
1961	2019-07-26 00:00:00	2019-07-29 00:00:00	Netherlands	Gelderland	Convention	2019	2019	6e25f519-d5a1-48ae-918c-84bce0f3bd0e	068ad4a3-d582-4ab0-9732-0eab29ea48c5	Groepsaccommodatie Groesbeek	\N	2019	2019-03-29 20:17:20.542481	2019-03-29 20:17:20.542481	\N	\N	\N
1962	2011-09-08 00:00:00	2011-09-11 00:00:00	Germany	Harz Mountains	Convention	2011	2011	53927c89-619d-4fcb-a3a2-11fd3865deff	e690630b-a9e2-4c8d-9991-713f808fc9cb	Falkenstein	\N	2011	2019-03-29 20:17:20.557937	2019-03-29 20:17:20.557937	\N	\N	\N
1963	2012-09-27 00:00:00	2012-09-30 00:00:00	Germany	Harz Mountains	Convention	2012	2012	53927c89-619d-4fcb-a3a2-11fd3865deff	10c0b8d4-f8f5-4cef-98ce-853c98c9aa28	Falkenstein	\N	2012	2019-03-29 20:17:22.92865	2019-03-29 20:17:22.92865	\N	\N	\N
1964	2013-09-19 00:00:00	2013-09-22 00:00:00	Germany	Harz Mountains	Convention	2013	2013	53927c89-619d-4fcb-a3a2-11fd3865deff	47f6bd89-b4aa-4bfd-b239-07f1bd004600	Falkenstein	\N	2013	2019-03-29 20:17:22.94434	2019-03-29 20:17:22.94434	\N	\N	\N
1965	2014-07-24 00:00:00	2014-07-27 00:00:00	Germany	Dessau-Roßlau	Convention	2014	2014	53927c89-619d-4fcb-a3a2-11fd3865deff	4a4cd852-fb49-438f-9d41-014fd55ee232	Hostel Dessau-Rosslau	\N	2014	2019-03-29 20:17:22.957286	2019-03-29 20:17:22.957286	\N	\N	\N
1966	2015-07-22 00:00:00	2015-07-26 00:00:00	Germany	Dessau-Roßlau	Convention	2015	2015	53927c89-619d-4fcb-a3a2-11fd3865deff	103f0749-ee80-459f-9da8-c8a44fe8b0eb	Hostel Dessau-Rosslau	\N	2015	2019-03-29 20:17:22.973121	2019-03-29 20:17:22.973121	\N	\N	\N
1967	2016-07-13 00:00:00	2016-07-17 00:00:00	Germany	Dessau-Roßlau	Convention	2016	2016	53927c89-619d-4fcb-a3a2-11fd3865deff	c459720b-fb24-4541-83dd-da61314d1462	Hostel Dessau-Rosslau	\N	2016	2019-03-29 20:17:22.988412	2019-03-29 20:17:22.988412	\N	\N	\N
1968	2017-07-12 00:00:00	2017-07-16 00:00:00	Germany	Suhl	Convention	2017	2017	53927c89-619d-4fcb-a3a2-11fd3865deff	809dc732-b62f-46ee-94c9-f9acdc3c77aa	Ringberg Hotel	\N	2017	2019-03-29 20:17:23.007128	2019-03-29 20:17:23.007128	\N	\N	\N
1969	2018-07-04 00:00:00	2018-07-08 00:00:00	Germany	Suhl	Convention	2018	2018	53927c89-619d-4fcb-a3a2-11fd3865deff	32d0dd33-ee3a-4540-9d72-95d61ccf0c54	Ringberg Hotel	\N	2018	2019-03-29 20:17:23.020784	2019-03-29 20:17:23.020784	\N	\N	\N
1970	2019-07-24 00:00:00	2019-07-28 00:00:00	Germany	Suhl	Convention	2019	2019	53927c89-619d-4fcb-a3a2-11fd3865deff	0e407b7b-81a4-410f-b31b-b3c14b4179ea	Ringberg Hotel	\N	2019	2019-03-29 20:17:23.035166	2019-03-29 20:17:23.035166	\N	\N	\N
1971	2007-04-28 00:00:00	2007-04-28 00:00:00	United States	Florida	Furmeet	2007	2007	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	64f5fdd3-a570-46e2-a974-cdf9e1e519f6	Winter Garden	\N	2007	2019-03-29 20:17:23.052796	2019-03-29 20:17:23.052796	\N	\N	\N
1972	2008-05-09 00:00:00	2008-05-11 00:00:00	United States	Florida	Furmeet	2008	2008	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	77337ec4-3dda-4a92-9555-e2664b1d0f5d	Celebration	\N	2008	2019-03-29 20:17:25.878325	2019-03-29 20:17:25.878325	\N	\N	\N
1973	2009-05-29 00:00:00	2009-05-31 00:00:00	United States	Florida	Furmeet	2009	2009	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	5be2d41b-d65f-4eab-88ff-d7e8cec1d24b	Celebration	\N	2009	2019-03-29 20:17:25.891003	2019-03-29 20:17:25.891003	\N	\N	\N
1974	2010-05-21 00:00:00	2010-05-23 00:00:00	United States	Florida	Furmeet	2010	2010	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	d7c3909e-b789-4556-8594-1450492cece4	Celebration	\N	2010	2019-03-29 20:17:25.906579	2019-03-29 20:17:25.906579	\N	\N	\N
1975	2011-05-20 00:00:00	2011-05-22 00:00:00	United States	Florida	Furmeet	2011	2011	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	68a17c81-2f41-4bf5-aa05-38e86b6aca1d	Celebration	\N	2011	2019-03-29 20:17:25.922241	2019-03-29 20:17:25.922241	\N	\N	\N
1976	2012-05-18 00:00:00	2012-05-20 00:00:00	United States	Florida	Furmeet	2012	2012	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	d033799a-aa22-49de-bb89-6ef3df5cef28	Orlando	\N	2012	2019-03-29 20:17:25.94093	2019-03-29 20:17:25.94093	\N	\N	\N
1977	2013-05-10 00:00:00	2013-05-12 00:00:00	United States	Nevada	Furmeet	2013	2013	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	c2f13d69-3216-4a72-af42-ba3db9d5963b	Las Vegas	\N	2013	2019-03-29 20:17:25.955422	2019-03-29 20:17:25.955422	\N	\N	\N
1978	2014-05-09 00:00:00	2014-05-11 00:00:00	United States	Nevada	Furmeet	2014	2014	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	348d80c9-ea4a-444a-9158-13a6f78315c3	Las Vegas	\N	2014	2019-03-29 20:17:25.97152	2019-03-29 20:17:25.97152	\N	\N	\N
1979	2015-05-08 00:00:00	2015-05-10 00:00:00	United States	Florida	Furmeet	2015	2015	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	4dbfc9ea-1624-420c-9f46-5bc8dc86e624	Lake Buena Vista	\N	2015	2019-03-29 20:17:25.986099	2019-03-29 20:17:25.986099	\N	\N	\N
1980	2016-05-06 00:00:00	2016-05-08 00:00:00	United States	Nevada	Furmeet	2016	2016	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	9742a0b9-438f-4aa2-a49e-6311d3fc090c	Las Vegas	\N	2016	2019-03-29 20:17:26.001825	2019-03-29 20:17:26.001825	\N	\N	\N
1981	2007-08-18 00:00:00	2007-08-18 00:00:00	United States	Florida	Furmeet	2007	2007	db136ced-5e29-4b05-878d-5b89bf1cb83b	15290802-4cad-4b9c-855f-bc363615d8e8	Celebration	\N	2007	2019-03-29 20:17:26.016823	2019-03-29 20:17:26.016823	\N	\N	\N
1982	2008-08-09 00:00:00	2008-08-10 00:00:00	United States	Florida	Furmeet	2008	2008	db136ced-5e29-4b05-878d-5b89bf1cb83b	ba669cf4-5d43-417a-95b8-9ba84f7609c3	Celebration	\N	2008	2019-03-29 20:17:28.659429	2019-03-29 20:17:28.659429	\N	\N	\N
1983	2009-08-08 00:00:00	2009-08-09 00:00:00	United States	Florida	Furmeet	2009	2009	db136ced-5e29-4b05-878d-5b89bf1cb83b	82c5cbb6-18a3-4e65-afac-226653c2dec4	Celebration	\N	2009	2019-03-29 20:17:28.676407	2019-03-29 20:17:28.676407	\N	\N	\N
1984	2010-08-07 00:00:00	2010-08-07 00:00:00	United States	Florida	Furmeet	2010	2010	db136ced-5e29-4b05-878d-5b89bf1cb83b	c6606ad1-c9e2-46f0-a79d-8b3e5acd379e	Celebration	\N	2010	2019-03-29 20:17:28.690585	2019-03-29 20:17:28.690585	\N	\N	\N
1985	2011-08-06 00:00:00	2011-08-07 00:00:00	United States	Florida	Furmeet	2011	2011	db136ced-5e29-4b05-878d-5b89bf1cb83b	edea2783-c3c5-4e1c-bd1e-e30f6f217db4	Celebration	\N	2011	2019-03-29 20:17:28.70594	2019-03-29 20:17:28.70594	\N	\N	\N
1986	2007-01-13 00:00:00	2007-01-13 00:00:00	United States	Florida	Furmeet	2007	2007	107883b9-256a-4640-9d91-e30830af811a	6e69e534-7b35-4c4c-9a59-0edb02fc84a9	Orlando	\N	2007	2019-03-29 20:17:28.720378	2019-03-29 20:17:28.720378	\N	\N	\N
1987	2008-01-12 00:00:00	2008-01-13 00:00:00	United States	Florida	Furmeet	2008	2008	107883b9-256a-4640-9d91-e30830af811a	3693f9e9-9425-4d49-87d2-2ce61e610545	Orlando	\N	2008	2019-03-29 20:17:31.355149	2019-03-29 20:17:31.355149	\N	\N	\N
1988	2009-01-17 00:00:00	2009-01-18 00:00:00	United States	Florida	Furmeet	2009	2009	107883b9-256a-4640-9d91-e30830af811a	86f48522-f54f-41d6-baa6-feabe0e2c3ab	Orlando	\N	2009	2019-03-29 20:17:31.368972	2019-03-29 20:17:31.368972	\N	\N	\N
1989	2010-01-16 00:00:00	2010-01-17 00:00:00	United States	Florida	Furmeet	2010	2010	107883b9-256a-4640-9d91-e30830af811a	60f13475-3a36-4684-9ffd-5cff551e8cc5	Orlando	\N	2010	2019-03-29 20:17:31.386156	2019-03-29 20:17:31.386156	\N	\N	\N
1990	2011-01-22 00:00:00	2011-01-23 00:00:00	United States	Florida	Furmeet	2011	2011	107883b9-256a-4640-9d91-e30830af811a	36742c44-5170-46c7-ad3b-9e7ebf654cfb	Orlando	\N	2011	2019-03-29 20:17:31.40111	2019-03-29 20:17:31.40111	\N	\N	\N
1991	2012-01-21 00:00:00	2012-01-22 00:00:00	United States	Florida	Furmeet	2012	2012	107883b9-256a-4640-9d91-e30830af811a	48cb85df-9735-48e2-948e-d6d5bd3da9a5	Orlando	\N	2012	2019-03-29 20:17:31.417617	2019-03-29 20:17:31.417617	\N	\N	\N
1992	2013-01-26 00:00:00	2013-01-27 00:00:00	United States	Florida	Furmeet	2013	2013	107883b9-256a-4640-9d91-e30830af811a	893348ce-a953-45e1-b9c2-826eb2832cb4	Orlando	\N	2013	2019-03-29 20:17:31.432707	2019-03-29 20:17:31.432707	\N	\N	\N
1993	2014-01-25 00:00:00	2014-01-26 00:00:00	United States	Florida	Furmeet	2014	2014	107883b9-256a-4640-9d91-e30830af811a	4c2dc782-1216-49a0-87c2-7be79ebb7513	Orlando	\N	2014	2019-03-29 20:17:31.449495	2019-03-29 20:17:31.449495	\N	\N	\N
1994	2015-01-31 00:00:00	2015-02-01 00:00:00	United States	Florida	Furmeet	2015	2015	107883b9-256a-4640-9d91-e30830af811a	e821a226-47ce-4422-bd23-963cdbf82fcd	Orlando	\N	2015	2019-03-29 20:17:31.463758	2019-03-29 20:17:31.463758	\N	\N	\N
1995	2016-01-30 00:00:00	2016-01-31 00:00:00	United States	Florida	Furmeet	2016	2016	107883b9-256a-4640-9d91-e30830af811a	84c0c2d3-bcc5-4ea7-8f05-c81e21701074	Orlando	\N	2016	2019-03-29 20:17:31.480273	2019-03-29 20:17:31.480273	\N	\N	\N
1996	2007-10-20 00:00:00	2007-10-21 00:00:00	United States	Florida	Furmeet	2007	2007	8d2466b1-1c67-45f1-bb8a-76334ac21719	30a1ee75-7eb6-4c6a-8a06-65cb0233ce23	Orlando	\N	2007	2019-03-29 20:17:31.494038	2019-03-29 20:17:31.494038	\N	\N	\N
1997	2008-10-25 00:00:00	2008-10-26 00:00:00	United States	Florida	Furmeet	2008	2008	8d2466b1-1c67-45f1-bb8a-76334ac21719	2f59583d-8def-42b5-86c4-af7e7c197465	Orlando	\N	2008	2019-03-29 20:17:34.218996	2019-03-29 20:17:34.218996	\N	\N	\N
1998	2009-10-31 00:00:00	2009-11-01 00:00:00	United States	Florida	Furmeet	2009	2009	8d2466b1-1c67-45f1-bb8a-76334ac21719	5366b512-220d-41b4-bafa-a82b7a4ccd87	Orlando	\N	2009	2019-03-29 20:17:34.232751	2019-03-29 20:17:34.232751	\N	\N	\N
1999	2010-10-23 00:00:00	2010-10-24 00:00:00	United States	Florida	Furmeet	2010	2010	8d2466b1-1c67-45f1-bb8a-76334ac21719	e3bc719e-f54c-4dca-a41c-86056050fece	Orlando	\N	2010	2019-03-29 20:17:34.250527	2019-03-29 20:17:34.250527	\N	\N	\N
2000	2011-10-01 00:00:00	2011-10-02 00:00:00	United States	Florida	Furmeet	2011	2011	8d2466b1-1c67-45f1-bb8a-76334ac21719	6e1e6a3c-a4b0-48ff-9b22-07a9926cacc4	Orlando	\N	2011	2019-03-29 20:17:34.266407	2019-03-29 20:17:34.266407	\N	\N	\N
2001	2012-10-27 00:00:00	2012-10-28 00:00:00	United States	Florida	Furmeet	2012	2012	8d2466b1-1c67-45f1-bb8a-76334ac21719	45523df3-4da4-42bf-b061-039deb1588cb	Orlando	\N	2012	2019-03-29 20:17:34.285355	2019-03-29 20:17:34.285355	\N	\N	\N
2002	2013-10-26 00:00:00	2013-10-27 00:00:00	United States	Florida	Furmeet	2013	2013	8d2466b1-1c67-45f1-bb8a-76334ac21719	561562ab-d160-45b1-9e79-6dbc459e390e	Orlando	\N	2013	2019-03-29 20:17:34.299667	2019-03-29 20:17:34.299667	\N	\N	\N
2003	2014-10-25 00:00:00	2014-10-26 00:00:00	United States	Florida	Furmeet	2014	2014	8d2466b1-1c67-45f1-bb8a-76334ac21719	7d0ec72b-e573-4641-bdbc-82af98e40f22	Orlando	\N	2014	2019-03-29 20:17:34.314303	2019-03-29 20:17:34.314303	\N	\N	\N
2004	2015-10-31 00:00:00	2015-11-01 00:00:00	United States	Florida	Furmeet	2015	2015	8d2466b1-1c67-45f1-bb8a-76334ac21719	7fcc6364-0a68-40b8-b9f3-3d444d25afa3	Orlando	\N	2015	2019-03-29 20:17:34.327988	2019-03-29 20:17:34.327988	\N	\N	\N
2005	2017-04-29 00:00:00	2017-04-29 00:00:00	United States	Pensacola, Florida	Convention	2017	2017	a07e685f-a240-4241-98f3-988f028e87a9	4d0d35ba-71b4-4c2e-9a2a-3c6768eb744a	Hilton's Homewood Suites	126	2017	2019-03-29 20:17:34.342738	2019-03-29 20:17:34.342738	\N	\N	\N
2006	2018-09-21 00:00:00	2018-09-23 00:00:00	United States	Pensacola, Florida	Convention	2018	2018	a07e685f-a240-4241-98f3-988f028e87a9	120f5ace-5a28-48b4-b75b-db39f0cbda47	Hilton's Homewood Suites	\N	2018	2019-03-29 20:17:36.98586	2019-03-29 20:17:36.98586	\N	\N	\N
2007	2019-01-24 00:00:00	2019-01-26 00:00:00	United States	Pensacola, Florida	Convention	2019	2019	a07e685f-a240-4241-98f3-988f028e87a9	37830bc6-5d6c-4452-b95e-ac3a10a58396	Hilton's Homewood Suites	\N	2019	2019-03-29 20:17:37.00106	2019-03-29 20:17:37.00106	\N	\N	\N
2008	1995-06-30 00:00:00	1995-07-03 00:00:00	Germany	Kaiser-Wilhelm-Koog, Schleswig-Holstein	Convention	1995	1	c4254aea-194b-4afc-8016-9d9f817b16b0	462fd3f9-d6d4-4907-87c8-8d5d922894d2	Unknown	19	1	2019-03-29 20:17:37.01926	2019-03-29 20:17:37.01926	\N	\N	\N
2009	1996-07-18 00:00:00	1996-07-22 00:00:00	Germany	Linköping, Östergötland, Sweden	Convention	1996	2	c4254aea-194b-4afc-8016-9d9f817b16b0	3dfd9ed6-78bd-4679-8bfb-e012b69ee8bd	Unknown	35	2	2019-03-29 20:17:39.491872	2019-03-29 20:17:39.491872	\N	\N	\N
2010	1997-08-21 00:00:00	1997-08-24 00:00:00	Germany	Boostedt, Mecklenburg-Vorpommern	Convention	1997	3	c4254aea-194b-4afc-8016-9d9f817b16b0	58d9dcbf-4898-49e4-abf1-cf5869b708c7	Unknown	59	3	2019-03-29 20:17:39.504299	2019-03-29 20:17:39.504299	\N	\N	\N
2011	1998-08-01 00:00:00	1998-08-05 00:00:00	Netherlands	Heeze, Noord-Brabant	Convention	1998	4	c4254aea-194b-4afc-8016-9d9f817b16b0	0a3778cb-769d-4f82-88be-7b2677260783	Unknown	80	4	2019-03-29 20:17:39.522625	2019-03-29 20:17:39.522625	\N	\N	\N
2012	1999-07-22 00:00:00	1999-07-25 00:00:00	Germany	Berlin	Convention	1999	5	c4254aea-194b-4afc-8016-9d9f817b16b0	12375eb5-1c8c-4e83-b617-adf9402f566a	Unknown	117	5	2019-03-29 20:17:39.536309	2019-03-29 20:17:39.536309	\N	\N	\N
2013	2000-08-10 00:00:00	2000-08-13 00:00:00	Germany	Göttingen, Niedersachsen	Convention	2000	6	c4254aea-194b-4afc-8016-9d9f817b16b0	d977774d-c753-417b-9271-54803dbd0e7a	Unknown	149	6	2019-03-29 20:17:39.554375	2019-03-29 20:17:39.554375	\N	\N	\N
2014	2001-07-22 00:00:00	2001-07-25 00:00:00	Germany	Kirchen, Rheinland-Pfalz	Convention	2001	7	c4254aea-194b-4afc-8016-9d9f817b16b0	903c0493-55af-453d-a1e1-34e4789b5cc3	Unknown	230	7	2019-03-29 20:17:39.56772	2019-03-29 20:17:39.56772	\N	\N	\N
2015	2002-08-15 00:00:00	2002-08-18 00:00:00	Germany	Oberbernhards, Hessen	Convention	2002	8	c4254aea-194b-4afc-8016-9d9f817b16b0	b9686708-5519-4666-9f0f-0850f664efbb	Unknown	260	8	2019-03-29 20:17:39.585348	2019-03-29 20:17:39.585348	\N	\N	\N
2016	2003-08-21 00:00:00	2003-08-24 00:00:00	Czech Republic	Samopše, Středočeský kraj	Convention	2003	9	c4254aea-194b-4afc-8016-9d9f817b16b0	8eba45d8-24dd-42bd-ad76-7892782dc5ce	Sportareál Samopše Sports Center	165	9	2019-03-29 20:17:39.600075	2019-03-29 20:17:39.600075	\N	\N	\N
2017	2004-08-26 00:00:00	2004-08-29 00:00:00	Germany	Olpe, Nordrhein-Westfalen	Convention	2004	X	c4254aea-194b-4afc-8016-9d9f817b16b0	7b273ac5-7823-4f27-bcc4-ef19b50715c1	Unknown	295	x	2019-03-29 20:17:39.617892	2019-03-29 20:17:39.617892	\N	\N	\N
2018	2005-07-21 00:00:00	2005-07-24 00:00:00	Netherlands	Nürnberg, Bayern	Convention	2005	4	c4254aea-194b-4afc-8016-9d9f817b16b0	b6444132-e432-4e85-965f-738d0d8c6999	Nuremberg Castle	380	4-2	2019-03-29 20:17:39.63225	2019-03-29 20:17:39.63225	\N	\N	\N
2019	2006-08-23 00:00:00	2006-08-27 00:00:00	Germany	Nürnberg, Bayern	Convention	2006	10	c4254aea-194b-4afc-8016-9d9f817b16b0	57133b9b-d56a-4b9a-ae76-4a7f0521d16e	Nuremberg Castle	405	10	2019-03-29 20:17:39.649691	2019-03-29 20:17:39.649691	\N	\N	\N
2020	2007-09-05 00:00:00	2007-09-09 00:00:00	Germany	Suhl, Thüringen	Convention	2007	11	c4254aea-194b-4afc-8016-9d9f817b16b0	4a4361a0-8206-4df3-8a9e-ae13461b426e	Ringberg Resort Hotel	585	11	2019-03-29 20:17:39.664141	2019-03-29 20:17:39.664141	\N	\N	\N
2021	2008-08-27 00:00:00	2008-08-31 00:00:00	Germany	Suhl, Thüringen	Convention	2008	12	c4254aea-194b-4afc-8016-9d9f817b16b0	403cd1c8-66d6-4eda-b221-77a0fd171465	Ringberg Resort Hotel	777	12	2019-03-29 20:17:39.680125	2019-03-29 20:17:39.680125	\N	\N	\N
2022	2009-08-26 00:00:00	2009-08-30 00:00:00	Germany	Suhl, Thüringen	Convention	2009	13	c4254aea-194b-4afc-8016-9d9f817b16b0	a1a7abad-cf17-45f9-838d-4cae8a6b4287	Ringberg Resort Hotel	911	13	2019-03-29 20:17:39.696603	2019-03-29 20:17:39.696603	\N	\N	\N
2023	2010-09-01 00:00:00	2010-09-05 00:00:00	Germany	Magdeburg, Sachsen-Anhalt	Convention	2010	14	c4254aea-194b-4afc-8016-9d9f817b16b0	7d629339-77ea-4fe4-bb47-362b253f73c3	Maritim Hotel	973	14	2019-03-29 20:17:39.714066	2019-03-29 20:17:39.714066	\N	\N	\N
2024	2011-08-17 00:00:00	2011-08-21 00:00:00	Germany	Magdeburg, Sachsen-Anhalt	Convention	2011	15	c4254aea-194b-4afc-8016-9d9f817b16b0	9d6a82ad-21f3-4308-bcd2-31c81b2e8b2c	Maritim Hotel	1	15	2019-03-29 20:17:39.729989	2019-03-29 20:17:39.729989	\N	\N	\N
2025	2012-08-28 00:00:00	2012-09-02 00:00:00	Germany	Magdeburg, Sachsen-Anhalt	Convention	2012	16	c4254aea-194b-4afc-8016-9d9f817b16b0	df751f67-97ae-4ae8-bf17-21ba798a8fb7	Maritim Hotel	1	16	2019-03-29 20:17:39.74563	2019-03-29 20:17:39.74563	\N	\N	\N
2026	2013-08-21 00:00:00	2013-08-25 00:00:00	Germany	Magdeburg, Sachsen-Anhalt	Convention	2013	17	c4254aea-194b-4afc-8016-9d9f817b16b0	6389c65b-1d15-4f11-ba1b-8a49b5ba96b2	Maritim Hotel	1	17	2019-03-29 20:17:39.761285	2019-03-29 20:17:39.761285	\N	\N	\N
2027	2014-08-20 00:00:00	2014-08-24 00:00:00	Germany	Berlin	Convention	2014	18	c4254aea-194b-4afc-8016-9d9f817b16b0	2963ca7c-fdfc-4e08-acfd-af6ec5593f23	Estrel Hotel	2	18	2019-03-29 20:17:39.779177	2019-03-29 20:17:39.779177	\N	\N	\N
2028	2015-08-19 00:00:00	2015-08-23 00:00:00	Germany	Berlin	Convention	2015	19	c4254aea-194b-4afc-8016-9d9f817b16b0	933312f6-2a14-4c2f-85e9-d77b64462850	Estrel Hotel	2	19	2019-03-29 20:17:39.794361	2019-03-29 20:17:39.794361	\N	\N	\N
2029	2016-08-17 00:00:00	2016-08-21 00:00:00	Germany	Berlin	Convention	2016	20	c4254aea-194b-4afc-8016-9d9f817b16b0	eb6cc139-9e7d-4a99-8765-5500804b396e	Estrel Hotel	2	20	2019-03-29 20:17:39.811109	2019-03-29 20:17:39.811109	\N	\N	\N
2030	2017-08-16 00:00:00	2017-08-20 00:00:00	Germany	Berlin	Convention	2017	21	c4254aea-194b-4afc-8016-9d9f817b16b0	dbe6eb7a-1fd9-4ed8-8945-ae58d866763d	Estrel Hotel	2	21	2019-03-29 20:17:39.840308	2019-03-29 20:17:39.840308	\N	\N	\N
2031	2018-08-18 00:00:00	2018-08-22 00:00:00	Germany	Berlin	Convention	2018	22	c4254aea-194b-4afc-8016-9d9f817b16b0	eab4e35b-b173-4db8-bc35-1c433481e2cf	Estrel Hotel	2	22	2019-03-29 20:17:39.858316	2019-03-29 20:17:39.858316	\N	\N	\N
2032	2019-08-14 00:00:00	2019-08-18 00:00:00	Germany	Berlin	Convention	2019	23	c4254aea-194b-4afc-8016-9d9f817b16b0	e77c0a53-2664-4cdb-9b53-a89e63d4b219	Estrel Hotel	\N	23	2019-03-29 20:17:39.874066	2019-03-29 20:17:39.874066	\N	\N	\N
2033	2012-12-14 00:00:00	2012-12-16 00:00:00	United States	Springfield, Missouri	Convention	2012	2012	da95bb9a-0ba9-48f7-ab82-533e44d94b9b	b7d1b97c-0632-420d-b760-a90b6077d035	Howard Johnson Inn and Convention Center	\N	2012	2019-03-29 20:17:39.892346	2019-03-29 20:17:39.892346	\N	\N	\N
2034	2013-12-13 00:00:00	2013-12-16 00:00:00	United States	Branson, Missouri	Convention	2013	2013	da95bb9a-0ba9-48f7-ab82-533e44d94b9b	438e8b7b-5e26-4502-bf0a-4fde6e59c328	Unknown	\N	2013	2019-03-29 20:17:42.571084	2019-03-29 20:17:42.571084	\N	\N	\N
2035	2014-11-20 00:00:00	2014-11-23 00:00:00	United States	Springfield, Missouri	Convention	2014	2014	da95bb9a-0ba9-48f7-ab82-533e44d94b9b	e4093836-729c-4cac-b9a3-a4f2e3f7ab29	Howard Johnson Inn and Convention Center	\N	2014	2019-03-29 20:17:42.589794	2019-03-29 20:17:42.589794	\N	\N	\N
2036	2007-08-10 00:00:00	2007-08-12 00:00:00	United States	Newark, New Jersey	Convention	2007	2007	3655f19d-5377-4428-8e7e-2f530f3edf39	4b16e00d-af34-42b0-9f75-93c056bef06c	Ramada Newark Airport International	\N	2007	2019-03-29 20:17:42.606088	2019-03-29 20:17:42.606088	\N	\N	\N
2037	2008-08-01 00:00:00	2008-08-03 00:00:00	United States	Newark, New Jersey	Convention	2008	2008	3655f19d-5377-4428-8e7e-2f530f3edf39	365bb0b0-ed58-446a-94a0-7070107e5a41	Newark Liberty International Airport Marriott	\N	2008	2019-03-29 20:17:45.305236	2019-03-29 20:17:45.305236	\N	\N	\N
2038	2010-05-28 00:00:00	2010-05-30 00:00:00	United States	Mt Laurel, New Jersey	Convention	2010	2010	3655f19d-5377-4428-8e7e-2f530f3edf39	1249a99e-bf1f-4a00-a281-8e876e634d3c	Hotel Marriott	\N	2010	2019-03-29 20:17:45.321963	2019-03-29 20:17:45.321963	\N	\N	\N
2039	2011-05-20 00:00:00	2011-05-22 00:00:00	United States	Mt Laurel, New Jersey	Convention	2011	2011	3655f19d-5377-4428-8e7e-2f530f3edf39	24f1f4cd-53a5-439a-9005-dd5f64535561	Hotel Marriott	\N	2011	2019-03-29 20:17:45.33831	2019-03-29 20:17:45.33831	\N	\N	\N
2040	2012-08-17 00:00:00	2012-08-19 00:00:00	United States	Whippany, New Jersey	Convention	2012	2012	3655f19d-5377-4428-8e7e-2f530f3edf39	1daf4c83-caef-4fef-bd6b-0b19bde93fea	Hotel Marriott	\N	2012	2019-03-29 20:17:45.354276	2019-03-29 20:17:45.354276	\N	\N	\N
2041	2013-08-16 00:00:00	2013-08-18 00:00:00	United States	Whippany, New Jersey	Convention	2013	2013	3655f19d-5377-4428-8e7e-2f530f3edf39	c66b9f45-275c-42b6-9faf-84097b6cdc65	Hotel Marriott	\N	2013	2019-03-29 20:17:45.368545	2019-03-29 20:17:45.368545	\N	\N	\N
2042	2014-08-15 00:00:00	2014-08-17 00:00:00	United States	Whippany, New Jersey	Convention	2014	2014	3655f19d-5377-4428-8e7e-2f530f3edf39	0aceab88-b75b-4f51-a056-ff02e62635d9	Hotel Marriott	\N	2014	2019-03-29 20:17:45.385056	2019-03-29 20:17:45.385056	\N	\N	\N
2043	2015-09-11 00:00:00	2015-09-13 00:00:00	United States	Whippany, New Jersey	Convention	2015	2015	3655f19d-5377-4428-8e7e-2f530f3edf39	36580244-30ef-41e9-9760-f8deda6ae100	Hotel Marriott	\N	2015	2019-03-29 20:17:45.401531	2019-03-29 20:17:45.401531	\N	\N	\N
2044	2016-08-12 00:00:00	2016-08-14 00:00:00	United States	Herndon, Virginia	Convention	2016	2016	3655f19d-5377-4428-8e7e-2f530f3edf39	38004e2a-8d16-43c9-ab03-1bed7dbd258a	Hyatt Regency Dulles	\N	2016	2019-03-29 20:17:45.41948	2019-03-29 20:17:45.41948	\N	\N	\N
2045	2017-08-25 00:00:00	2017-08-27 00:00:00	United States	Herndon, Virginia	Convention	2017	2017	3655f19d-5377-4428-8e7e-2f530f3edf39	1360a6f1-dc9b-4a4b-895c-6252742a45b8	Hyatt Regency Dulles	\N	2017	2019-03-29 20:17:45.43415	2019-03-29 20:17:45.43415	\N	\N	\N
2046	2018-08-24 00:00:00	2018-08-26 00:00:00	United States	Herndon, Virginia	Convention	2018	2018	3655f19d-5377-4428-8e7e-2f530f3edf39	dcfc9ecc-503f-4352-99fb-83d7123cb584	Hyatt Regency Dulles	\N	2018	2019-03-29 20:17:45.451331	2019-03-29 20:17:45.451331	\N	\N	\N
2047	2019-10-04 00:00:00	2019-10-06 00:00:00	United States	Herndon, Virginia	Convention	2019	2019	3655f19d-5377-4428-8e7e-2f530f3edf39	23e9cc00-cb39-4117-927d-9f2463f3e3e8	Hyatt Regency Dulles	\N	2019	2019-03-29 20:17:45.466633	2019-03-29 20:17:45.466633	\N	\N	\N
2048	2012-10-26 00:00:00	2012-10-28 00:00:00	United States	Nashville, Tennessee	Convention	2012	2012	ae9c6850-1b47-4a19-84bd-c651413643cd	854709b4-e309-4ca0-bc3e-d6e438c68b96	Millennium Maxwell House Hotel	\N	2012	2019-03-29 20:17:45.498569	2019-03-29 20:17:45.498569	\N	\N	\N
2049	2013-11-01 00:00:00	2013-11-03 00:00:00	United States	Nashville, Tennessee	Convention	2013	2013	ae9c6850-1b47-4a19-84bd-c651413643cd	2bf3af64-148f-4608-896e-0dcf8a09455c	Holiday Inn in Knoxville West/Cedar Bluff	\N	2013	2019-03-29 20:17:48.182582	2019-03-29 20:17:48.182582	\N	\N	\N
2050	2014-11-07 00:00:00	2014-11-09 00:00:00	United States	Nashville, Tennessee	Convention	2014	2014	ae9c6850-1b47-4a19-84bd-c651413643cd	35c0a9b3-28f7-4d51-91d2-81f808d98314	Holiday Inn in Knoxville West/Cedar Bluff	\N	2014	2019-03-29 20:17:48.20333	2019-03-29 20:17:48.20333	\N	\N	\N
2051	2015-10-30 00:00:00	2015-11-01 00:00:00	United States	Nashville, Tennessee	Convention	2015	2015	ae9c6850-1b47-4a19-84bd-c651413643cd	58372f1e-05f7-4d3f-815f-8a8b544316c9	Holiday Inn Knoxville Downtown	\N	2015	2019-03-29 20:17:48.220527	2019-03-29 20:17:48.220527	\N	\N	\N
2052	2016-10-27 00:00:00	2016-10-31 00:00:00	United States	Birmingham, Alabama	Convention	2016	2016	ae9c6850-1b47-4a19-84bd-c651413643cd	51c1778d-5905-459d-b705-7a55cffaa747	Hilton Birmingham Perimeter Park	\N	2016	2019-03-29 20:17:48.239386	2019-03-29 20:17:48.239386	\N	\N	\N
2053	2017-10-19 00:00:00	2017-10-23 00:00:00	United States	Birmingham, Alabama	Convention	2017	2017	ae9c6850-1b47-4a19-84bd-c651413643cd	2957ad2b-2880-47b4-9700-132a8a4f6d2d	Hilton Birmingham Perimeter Park	\N	2017	2019-03-29 20:17:48.253838	2019-03-29 20:17:48.253838	\N	\N	\N
2054	2019-01-09 00:00:00	2019-01-13 00:00:00	United States	Birmingham, Alabama	Convention	2019	2019	ae9c6850-1b47-4a19-84bd-c651413643cd	e85dd321-0575-43d2-b4b5-3fc1e6d4e65a	Hilton Birmingham Perimeter Park	\N	2019	2019-03-29 20:17:48.270686	2019-03-29 20:17:48.270686	\N	\N	\N
2055	2003-10-31 00:00:00	2003-11-02 00:00:00	United States	Watonga, Oklahoma	Convention	2003	2003	f8dbc7ad-d9c8-4510-ab0f-c926ec71edc6	188d3cc0-8a54-4645-a04a-6ff36f0cc7bf	Roman Nose State Park	\N	2003	2019-03-29 20:17:48.28697	2019-03-29 20:17:48.28697	\N	\N	\N
2056	2015-03-19 00:00:00	2015-03-22 00:00:00	Finland	Tuusula, Finland	Convention	2015	2015	4d9686d0-21e1-43c7-8072-008589d006ed	b0624779-d51d-48d2-95bb-3667774c936c	Hotel Gustavelund	\N	2015	2019-03-29 20:17:50.934297	2019-03-29 20:17:50.934297	\N	\N	\N
2057	2016-06-16 00:00:00	2016-06-19 00:00:00	Finland	Tuusula, Finland	Convention	2016	2016	4d9686d0-21e1-43c7-8072-008589d006ed	adea2ad6-10f5-48b4-a36d-4eb4e0dd2486	Hotel Gustavelund	\N	2016	2019-03-29 20:17:53.441147	2019-03-29 20:17:53.441147	\N	\N	\N
2058	2017-07-20 00:00:00	2017-07-23 00:00:00	Finland	Tuusula, Finland	Convention	2017	2017	4d9686d0-21e1-43c7-8072-008589d006ed	309fe9a8-7c0b-4494-8ec5-c55578181772	Hotel Gustavelund	\N	2017	2019-03-29 20:17:53.455963	2019-03-29 20:17:53.455963	\N	\N	\N
2059	2018-07-12 00:00:00	2018-07-15 00:00:00	Finland	Tuusula, Finland	Convention	2018	2018	4d9686d0-21e1-43c7-8072-008589d006ed	68f57b7a-0456-4f29-a440-d640cf8251c4	Hotel Gustavelund	\N	2018	2019-03-29 20:17:53.471603	2019-03-29 20:17:53.471603	\N	\N	\N
2060	2019-10-10 00:00:00	2019-10-13 00:00:00	Finland	Tuusula, Finland	Convention	2019	2019	4d9686d0-21e1-43c7-8072-008589d006ed	bc36de50-4bc3-44d2-92dc-06244dfda2d1	Hotel Gustavelund	\N	2019	2019-03-29 20:17:53.486143	2019-03-29 20:17:53.486143	\N	\N	\N
2061	2017-11-02 00:00:00	2017-11-05 00:00:00	Belgium	Blankenberge	Convention	2017	2017	d7aa76d9-3e79-400f-9e0d-9c3e5549851b	07d5ef88-9f9f-48af-bb11-f06f199acf1c	Duinse Polders hotel	\N	2017	2019-03-29 20:17:53.505458	2019-03-29 20:17:53.505458	\N	\N	\N
2062	2018-10-31 00:00:00	2018-11-04 00:00:00	Belgium	Blankenberge	Convention	2018	2018	d7aa76d9-3e79-400f-9e0d-9c3e5549851b	efc87e42-adff-4c1f-962c-c2d2d974e523	Duinse Polders hotel	\N	2018	2019-03-29 20:17:56.025829	2019-03-29 20:17:56.025829	\N	\N	\N
2063	2019-11-20 00:00:00	2019-11-24 00:00:00	Belgium	Blankenberge	Convention	2019	2019	d7aa76d9-3e79-400f-9e0d-9c3e5549851b	60f49a15-dac2-4d28-9529-9e966e8db03d	Duinse Polders hotel	\N	2019	2019-03-29 20:17:56.043024	2019-03-29 20:17:56.043024	\N	\N	\N
2064	2003-05-01 00:00:00	2003-05-04 00:00:00	France	Chaumes-en-Brie	Convention	2003	2003	1ea54f4f-58dc-4304-b608-ac2de0753d0e	2fdb187d-7991-457b-8be4-73b663795a15	Private Residence	\N	2003	2019-03-29 20:17:56.061955	2019-03-29 20:17:56.061955	\N	\N	\N
2065	2004-11-11 00:00:00	2004-11-14 00:00:00	France	Ciran	Convention	2004	2004	1ea54f4f-58dc-4304-b608-ac2de0753d0e	899be41e-4483-44fc-b080-3ac89b65f805	Le Domaine	\N	2004	2019-03-29 20:17:59.576937	2019-03-29 20:17:59.576937	\N	\N	\N
2066	2006-04-15 00:00:00	2006-04-18 00:00:00	France	Chambord	Convention	2006	2006	1ea54f4f-58dc-4304-b608-ac2de0753d0e	584e2444-e7db-4887-a69a-ced73792e697	La Hugoire	\N	2006	2019-03-29 20:17:59.593016	2019-03-29 20:17:59.593016	\N	\N	\N
2067	2007-11-23 00:00:00	2007-11-27 00:00:00	France	Chambord	Convention	2007	2007	1ea54f4f-58dc-4304-b608-ac2de0753d0e	517fb893-366c-4860-bff2-3f267f668eb7	La Hugoire	\N	2007	2019-03-29 20:17:59.609446	2019-03-29 20:17:59.609446	\N	\N	\N
2068	2013-10-11 00:00:00	2013-10-13 00:00:00	United States	Cincinnati, Ohio	Convention	2013	2013	6bd416ab-148c-4197-9093-a0bd39353804	54d47310-edba-43ec-ac7b-437a4e0d36c0	Hilton Garden Inn Cincinnati/Sharonville	\N	2013	2019-03-29 20:17:59.626538	2019-03-29 20:17:59.626538	\N	\N	\N
2069	2014-10-10 00:00:00	2014-10-12 00:00:00	United States	Cincinnati, Ohio	Convention	2014	2014	6bd416ab-148c-4197-9093-a0bd39353804	489c5887-3908-4ca7-b7fd-44c0e1f2242e	Crowne Plaza Cincinnati Blue Ash	\N	2014	2019-03-29 20:18:02.263162	2019-03-29 20:18:02.263162	\N	\N	\N
2070	2015-10-09 00:00:00	2015-10-11 00:00:00	United States	Cincinnati, Ohio	Convention	2015	2015	6bd416ab-148c-4197-9093-a0bd39353804	3a746391-5a9a-41c1-b403-5d77f037229a	Crowne Plaza Cincinnati Blue Ash	\N	2015	2019-03-29 20:18:02.283376	2019-03-29 20:18:02.283376	\N	\N	\N
2071	2016-10-07 00:00:00	2016-10-09 00:00:00	United States	Cincinnati, Ohio	Convention	2016	2016	6bd416ab-148c-4197-9093-a0bd39353804	498be38c-0b59-4afb-813f-f5b4852b2aa8	Crowne Plaza Cincinnati Blue Ash	\N	2016	2019-03-29 20:18:02.311396	2019-03-29 20:18:02.311396	\N	\N	\N
2072	2017-10-06 00:00:00	2017-10-08 00:00:00	United States	Cincinnati, Ohio	Convention	2017	2017	6bd416ab-148c-4197-9093-a0bd39353804	dcfceb9f-06df-4f46-af8f-3eebb64bb941	Crowne Plaza Cincinnati Blue Ash	\N	2017	2019-03-29 20:18:02.336762	2019-03-29 20:18:02.336762	\N	\N	\N
2073	2018-10-11 00:00:00	2018-10-14 00:00:00	United States	Cincinnati, Ohio	Convention	2018	2018	6bd416ab-148c-4197-9093-a0bd39353804	1517d208-e5d6-4e2e-917b-0958e69e21fc	Holiday Inn & Suites Cincinnati-Eastgate	\N	2018	2019-03-29 20:18:02.360683	2019-03-29 20:18:02.360683	\N	\N	\N
2074	2019-10-31 00:00:00	2019-11-03 00:00:00	United States	Cincinnati, Ohio	Convention	2019	2019	6bd416ab-148c-4197-9093-a0bd39353804	4b2d8768-e824-4eaf-a63b-c1885d90ba37	Holiday Inn & Suites Cincinnati-Eastgate	\N	2019	2019-03-29 20:18:02.382203	2019-03-29 20:18:02.382203	\N	\N	\N
2075	2014-02-28 00:00:00	2014-03-02 00:00:00	United States	Brookfield, Wisconsin	Convention	2014	2014	82f15ed4-2e3c-4076-bc14-7ddee58e450b	2871d5b2-b25e-44ff-a191-f38f128144f9	Sheraton Milwaukee Brookfield Hotel	\N	2014	2019-03-29 20:18:02.400086	2019-03-29 20:18:02.400086	\N	\N	\N
2076	2015-02-27 00:00:00	2015-03-01 00:00:00	United States	Brookfield, Wisconsin	Convention	2015	2015	82f15ed4-2e3c-4076-bc14-7ddee58e450b	6eff8b8f-3892-40b1-be52-9fd6719d245c	Sheraton Milwaukee Brookfield Hotel	\N	2015	2019-03-29 20:18:05.186402	2019-03-29 20:18:05.186402	\N	\N	\N
2077	2016-02-26 00:00:00	2016-02-28 00:00:00	United States	Brookfield, Wisconsin	Convention	2016	2016	82f15ed4-2e3c-4076-bc14-7ddee58e450b	0fd96a67-94d7-4ba0-8339-20c72d4edd64	Sheraton Milwaukee Brookfield Hotel	\N	2016	2019-03-29 20:18:05.205879	2019-03-29 20:18:05.205879	\N	\N	\N
2078	2017-02-24 00:00:00	2017-02-26 00:00:00	United States	Brookfield, Wisconsin	Convention	2017	2017	82f15ed4-2e3c-4076-bc14-7ddee58e450b	c67d6def-e8cc-4575-88c3-bbb946f90f80	Sheraton Milwaukee Brookfield Hotel	\N	2017	2019-03-29 20:18:05.222345	2019-03-29 20:18:05.222345	\N	\N	\N
2079	2018-02-23 00:00:00	2018-02-25 00:00:00	United States	Brookfield, Wisconsin	Convention	2018	2018	82f15ed4-2e3c-4076-bc14-7ddee58e450b	2996b1d0-3910-487e-95d4-1b2867199e14	Sheraton Milwaukee Brookfield Hotel	\N	2018	2019-03-29 20:18:05.241638	2019-03-29 20:18:05.241638	\N	\N	\N
2080	2019-02-22 00:00:00	2019-02-24 00:00:00	United States	Brookfield, Wisconsin	Convention	2019	2019	82f15ed4-2e3c-4076-bc14-7ddee58e450b	d4c81db7-07e8-4d64-8491-f04cce48f068	Sheraton Milwaukee Brookfield Hotel	\N	2019	2019-03-29 20:18:05.259725	2019-03-29 20:18:05.259725	\N	\N	\N
2081	2013-04-05 00:00:00	2013-04-07 00:00:00	United States	Baltimore, Maryland	Convention	2013	2013	59b53493-fa35-49ca-91c7-0c8424ffefbb	36eba668-3fd5-4a1e-bad6-ad8f641ee188	Hunt Valley Inn	\N	2013	2019-03-29 20:18:05.277967	2019-03-29 20:18:05.277967	\N	\N	\N
2082	2014-03-14 00:00:00	2014-03-16 00:00:00	United States	Baltimore, Maryland	Convention	2014	2014	59b53493-fa35-49ca-91c7-0c8424ffefbb	6b7d9a76-07da-440f-85ba-c72c27bef0e8	Hunt Valley Inn	\N	2014	2019-03-29 20:18:08.109563	2019-03-29 20:18:08.109563	\N	\N	\N
2083	2015-03-29 00:00:00	2015-03-31 00:00:00	United States	Tysons Corner, Virginia	Convention	2015	2015	59b53493-fa35-49ca-91c7-0c8424ffefbb	375635cb-20eb-4079-b9a4-18c1854ce6fe	Sheraton Premiere Hotel	\N	2015	2019-03-29 20:18:08.125568	2019-03-29 20:18:08.125568	\N	\N	\N
2084	2016-04-08 00:00:00	2016-04-10 00:00:00	United States	Tysons Corner, Virginia	Convention	2016	2016	59b53493-fa35-49ca-91c7-0c8424ffefbb	dd1aa918-c71f-4c5c-8e2f-141ab46a7c17	Sheraton Premiere Hotel	\N	2016	2019-03-29 20:18:08.148357	2019-03-29 20:18:08.148357	\N	\N	\N
2085	2017-04-28 00:00:00	2017-04-30 00:00:00	United States	Tysons Corner, Virginia	Convention	2017	2017	59b53493-fa35-49ca-91c7-0c8424ffefbb	bf885927-1d97-4123-9b8e-66712b7ee4cd	Sheraton Premiere Hotel	\N	2017	2019-03-29 20:18:08.180192	2019-03-29 20:18:08.180192	\N	\N	\N
2086	2018-04-20 00:00:00	2018-04-22 00:00:00	United States	Tysons Corner, Virginia	Convention	2018	2018	59b53493-fa35-49ca-91c7-0c8424ffefbb	12c4b34c-cc60-4242-bef3-21cc2728fd59	Sheraton Premiere Hotel	\N	2018	2019-03-29 20:18:08.224317	2019-03-29 20:18:08.224317	\N	\N	\N
2087	2019-03-15 00:00:00	2019-03-17 00:00:00	United States	Tysons Corner, Virginia	Convention	2019	2019	59b53493-fa35-49ca-91c7-0c8424ffefbb	f8ea3b03-7b4a-444a-819d-b62bce50dbb9	Sheraton Premiere Hotel	\N	2019	2019-03-29 20:18:08.260392	2019-03-29 20:18:08.260392	\N	\N	\N
2088	2006-04-14 00:00:00	2006-04-16 00:00:00	United States	Gordonsville, Virginia	Convention	2006	2006	66dcb318-3a39-4901-b30c-37cdf2a88bca	a5dbfb81-dd46-48b5-94b7-b587e1420dfc	Various Locations	\N	2006	2019-03-29 20:18:08.300813	2019-03-29 20:18:08.300813	\N	\N	\N
2089	2006-09-22 00:00:00	2006-09-24 00:00:00	United States	Gordonsville, Virginia	Convention	2006	2006	66dcb318-3a39-4901-b30c-37cdf2a88bca	04197858-4deb-495d-9da5-90f37d42de2f	Various Locations	\N	2006-2	2019-03-29 20:18:11.052816	2019-03-29 20:18:11.052816	\N	\N	\N
2090	2007-05-04 00:00:00	2007-05-06 00:00:00	United States	Gordonsville, Virginia	Convention	2007	2007	66dcb318-3a39-4901-b30c-37cdf2a88bca	f5456d27-3fde-40db-95e5-95695e6099e2	Various Locations	\N	2007	2019-03-29 20:18:11.068712	2019-03-29 20:18:11.068712	\N	\N	\N
2091	2007-10-12 00:00:00	2007-10-14 00:00:00	United States	Gordonsville, Virginia	Convention	2007	2007	66dcb318-3a39-4901-b30c-37cdf2a88bca	9cbcb23e-5f3c-40be-8f4f-ddff7e7ba909	Various Locations	\N	2007-2	2019-03-29 20:18:11.090281	2019-03-29 20:18:11.090281	\N	\N	\N
2092	2012-05-04 00:00:00	2012-05-06 00:00:00	Canada	Edmonton, Alberta	Convention	2012	2012	8b3590cd-8093-4614-90e8-1936e08cf1e2	98ab63ed-b96e-4fe2-90c2-630d8f0bf51a	Hilton Garden Inn	\N	2012	2019-03-29 20:18:11.107964	2019-03-29 20:18:11.107964	\N	\N	\N
2093	2013-05-03 00:00:00	2013-05-05 00:00:00	Canada	Edmonton, Alberta	Convention	2013	2013	8b3590cd-8093-4614-90e8-1936e08cf1e2	0b03b891-53dc-4881-aae5-c3e60412979b	Hilton Garden Inn	\N	2013	2019-03-29 20:18:13.841377	2019-03-29 20:18:13.841377	\N	\N	\N
2094	2014-05-02 00:00:00	2014-05-04 00:00:00	Canada	Edmonton, Alberta	Convention	2014	2014	8b3590cd-8093-4614-90e8-1936e08cf1e2	061e5eaf-26c5-49bc-b5c3-6f1f995b3a67	Sawridge Inn and Conference Centre	\N	2014	2019-03-29 20:18:13.868711	2019-03-29 20:18:13.868711	\N	\N	\N
2095	2015-05-08 00:00:00	2015-05-10 00:00:00	Canada	Edmonton, Alberta	Convention	2015	2015	8b3590cd-8093-4614-90e8-1936e08cf1e2	993de931-da2b-48bd-9cf8-0c15e9e24adc	Ramada Inn and Conference Center	\N	2015	2019-03-29 20:18:13.894425	2019-03-29 20:18:13.894425	\N	\N	\N
2096	2016-05-06 00:00:00	2016-05-08 00:00:00	Canada	Edmonton, Alberta	Convention	2016	2016	8b3590cd-8093-4614-90e8-1936e08cf1e2	8454822d-5db1-4755-8880-7a0f957a4a92	Ramada Inn and Conference Center	\N	2016	2019-03-29 20:18:13.939061	2019-03-29 20:18:13.939061	\N	\N	\N
2097	2017-06-15 00:00:00	2017-06-18 00:00:00	Canada	Edmonton, Alberta	Convention	2017	2017	8b3590cd-8093-4614-90e8-1936e08cf1e2	4a7d067a-d55e-4ec9-8223-d8d2852712d3	Edmonton Inn and Conference Centre	\N	2017	2019-03-29 20:18:13.970423	2019-03-29 20:18:13.970423	\N	\N	\N
2098	2018-06-14 00:00:00	2018-06-17 00:00:00	Canada	Edmonton, Alberta	Convention	2018	2018	8b3590cd-8093-4614-90e8-1936e08cf1e2	634afb2e-ec17-461b-886f-f1d5406d457b	Edmonton Inn and Conference Centre	\N	2018	2019-03-29 20:18:13.99083	2019-03-29 20:18:13.99083	\N	\N	\N
2099	2019-06-13 00:00:00	2019-06-16 00:00:00	Canada	Edmonton, Alberta	Convention	2019	2019	8b3590cd-8093-4614-90e8-1936e08cf1e2	a760bed0-c846-4e50-9636-84a1184b2dd8	Edmonton Inn and Conference Centre	\N	2019	2019-03-29 20:18:14.012318	2019-03-29 20:18:14.012318	\N	\N	\N
2100	2016-05-27 00:00:00	2016-05-29 00:00:00	United States	West Springfield, Massachusetts	Convention	2016	2016	4db2255a-022a-4fb8-8fa9-f393c21cb8c4	1b034d6b-fe3a-4573-88c6-e4cbccba59cb	Clarion Hotel & Aqua Lagoon Water Park	\N	2016	2019-03-29 20:18:14.034403	2019-03-29 20:18:14.034403	\N	\N	\N
2101	2017-05-26 00:00:00	2017-05-28 00:00:00	United States	West Springfield, Massachusetts	Convention	2017	2017	4db2255a-022a-4fb8-8fa9-f393c21cb8c4	68427136-9244-4864-9325-eb276d6543dc	Clarion Hotel & Aqua Lagoon Water Park	\N	2017	2019-03-29 20:18:16.906545	2019-03-29 20:18:16.906545	\N	\N	\N
2102	2014-03-09 00:00:00	2014-03-09 00:00:00	Brazil	São Paulo	Furmeet	2014	1	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	2c3ee476-6b69-4fa8-bcd4-dcb87cbae028	Boliche Pysta 10, Central Plaza Shopping	65	1	2019-03-29 20:18:16.921378	2019-03-29 20:18:16.921378	\N	\N	\N
2103	2014-09-06 00:00:00	2014-09-06 00:00:00	Brazil	São Paulo	Furmeet	2014	2	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	19bf5996-2d7d-456d-b01c-bb3ab902a219	Boliche Pysta 10, Central Plaza Shopping	95	2	2019-03-29 20:18:19.598466	2019-03-29 20:18:19.598466	\N	\N	\N
2104	2015-02-21 00:00:00	2015-02-21 00:00:00	Brazil	São Paulo	Furmeet	2015	3	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	80a3c300-3bb4-478a-ac6a-feaee9c4881a	Boliche Pysta 10, Central Plaza Shopping	149	3	2019-03-29 20:18:19.61403	2019-03-29 20:18:19.61403	\N	\N	\N
2105	2015-07-04 00:00:00	2015-07-04 00:00:00	Brazil	São Paulo	Furmeet	2015	Vacation Edition - Santos	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	fd995893-0828-41ff-bba7-104be1046e6c	Boliche Rei do Strike - Santos	85	vacation-edition-santos	2019-03-29 20:18:19.632007	2019-03-29 20:18:19.632007	\N	\N	\N
2106	2015-10-31 00:00:00	2015-10-31 00:00:00	Brazil	São Paulo	Furmeet	2015	IV	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	1c8f703c-951f-4523-88ef-09422a72994e	Bomboliche Extra Anchieta - São Bernardo do Campo	248	iv	2019-03-29 20:18:19.650094	2019-03-29 20:18:19.650094	\N	\N	\N
2107	2016-02-13 00:00:00	2016-02-13 00:00:00	Brazil	São Paulo	Furmeet	2016	5	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	a1c9b93e-c1ed-4efa-b35e-85c12faf55eb	Bomboliche Extra Anchieta - São Bernardo do Campo	261	5	2019-03-29 20:18:19.668372	2019-03-29 20:18:19.668372	\N	\N	\N
2108	2016-12-03 00:00:00	2016-12-03 00:00:00	Brazil	São Paulo	Furmeet	2016	6	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	e89bccde-3db4-4c2d-900c-bcc0cccbf820	Bomboliche Extra Anchieta - São Bernardo do Campo	197	6	2019-03-29 20:18:19.687367	2019-03-29 20:18:19.687367	\N	\N	\N
2109	2017-04-29 00:00:00	2017-04-29 00:00:00	Brazil	São Paulo	Furmeet	2017	7	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	d027455d-5350-4ef3-bae0-3502d7db7e6d	Bomboliche Extra Anchieta - São Bernardo do Campo	246	7	2019-03-29 20:18:19.71259	2019-03-29 20:18:19.71259	\N	\N	\N
2110	2018-01-20 00:00:00	2018-01-20 00:00:00	Brazil	São Paulo	Furmeet	2018	8	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	09d390f4-6e9b-4f3e-b371-d580a38f45c1	Bomboliche/Up! Trampolim Park - São Bernardo do Campo	203	8	2019-03-29 20:18:19.731703	2019-03-29 20:18:19.731703	\N	\N	\N
2111	2019-03-09 00:00:00	2019-03-09 00:00:00	Brazil	São Paulo	Furmeet	2019	Vacation Edition - Santos	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	5d652cde-0ca9-45f0-946b-daa4c6e9400d	Bomboliche/Up! Trampolim Park - São Bernardo do Campo	242	vacation-edition-santos-2	2019-03-29 20:18:19.750675	2019-03-29 20:18:19.750675	\N	\N	\N
2112	2018-07-28 00:00:00	2018-07-29 00:00:00	Mexico	Puebla de Zaragoza, Puebla	Convention	2018	2018	a82bb83a-dcac-4fe9-8f38-df88e6f1f84b	c18ff9e9-137c-4e67-8875-5280e7d08f20	SNTE Seccion (23 Bulding)	80	2018	2019-03-29 20:18:19.76952	2019-03-29 20:18:19.76952	\N	\N	\N
2113	2019-07-20 00:00:00	2019-07-21 00:00:00	Mexico	Ciudad, Puebla	Convention	2019	2019	a82bb83a-dcac-4fe9-8f38-df88e6f1f84b	98c9944a-18b0-44b0-8827-3213d3a077c5	Salon Option 33 Oriente	\N	2019	2019-03-29 20:18:22.431091	2019-03-29 20:18:22.431091	\N	\N	\N
2114	2016-10-14 00:00:00	2016-10-17 00:00:00	United Kingdom	North Devon	Convention	2016	2016	29a40ccd-33a1-4518-ac0a-279d9c96c107	a44fe26f-278e-4769-ad29-5900aa2c28df	Combe Martin Beach Holiday Park	\N	2016	2019-03-29 20:18:22.46329	2019-03-29 20:18:22.46329	\N	\N	\N
2115	2017-10-13 00:00:00	2017-10-16 00:00:00	United Kingdom	North Devon	Convention	2017	2017	29a40ccd-33a1-4518-ac0a-279d9c96c107	dacd8196-550f-4ab5-be33-d89d45140e18	Combe Martin Beach Holiday Park	213	2017	2019-03-29 20:18:25.26741	2019-03-29 20:18:25.26741	\N	\N	\N
2116	2018-10-12 00:00:00	2018-10-14 00:00:00	United Kingdom	North Devon	Convention	2018	2018	29a40ccd-33a1-4518-ac0a-279d9c96c107	0f65bae7-530f-4780-9ae1-22d8b6a25e12	Sandaway Beach Holiday Park	341	2018	2019-03-29 20:18:25.286964	2019-03-29 20:18:25.286964	\N	\N	\N
2117	2019-11-08 00:00:00	2019-11-10 00:00:00	United Kingdom	Burnham on Sea	Convention	2019	2019	29a40ccd-33a1-4518-ac0a-279d9c96c107	e8a2de9c-9632-4b99-946f-0523ac9106f7	Sandy Glade Holiday Park	\N	2019	2019-03-29 20:18:25.318645	2019-03-29 20:18:25.318645	\N	\N	\N
2118	2007-10-13 00:00:00	2007-10-13 00:00:00	United States	Milwaukee, Wisconsin	Furmeet	2007	2007	63a6c417-68a1-4297-a820-b1101f7644ed	2ac8097a-fcfd-462a-bc61-fa968a154ad6	Metro Area	\N	2007	2019-03-29 20:18:25.345411	2019-03-29 20:18:25.345411	\N	\N	\N
2119	2008-10-03 00:00:00	2008-10-05 00:00:00	United States	Wisconsin Dells, Wisconsin	Furmeet	2008	2008	63a6c417-68a1-4297-a820-b1101f7644ed	25b120a5-8c57-483b-a8a9-a556f9f3e414	Wilderness Resort	\N	2008	2019-03-29 20:18:27.963478	2019-03-29 20:18:27.963478	\N	\N	\N
2120	2009-10-02 00:00:00	2009-10-05 00:00:00	United States	Wisconsin Dells, Wisconsin	Furmeet	2009	2009	63a6c417-68a1-4297-a820-b1101f7644ed	9bfdd173-51b0-4e04-b444-bf9501fa8d37	Wilderness Resort	\N	2009	2019-03-29 20:18:27.982436	2019-03-29 20:18:27.982436	\N	\N	\N
2121	2010-10-08 00:00:00	2010-10-11 00:00:00	United States	Wisconsin Dells, Wisconsin	Furmeet	2010	2010	63a6c417-68a1-4297-a820-b1101f7644ed	5c9b5200-d8fe-4191-a47a-fb5a37464661	Whitetail Ridge Private Cabin	\N	2010	2019-03-29 20:18:28.006006	2019-03-29 20:18:28.006006	\N	\N	\N
2122	2011-10-07 00:00:00	2011-10-10 00:00:00	United States	Adams County, Wisconsin	Furmeet	2011	2011	63a6c417-68a1-4297-a820-b1101f7644ed	5630968f-180f-49c3-9e78-5d3fb4182f46	Deer Haven Acres Lodge Private Cabin	\N	2011	2019-03-29 20:18:28.022718	2019-03-29 20:18:28.022718	\N	\N	\N
2123	2012-07-27 00:00:00	2012-07-29 00:00:00	United States	Milwuakee, Wisconsin	Furmeet	2012	2012	63a6c417-68a1-4297-a820-b1101f7644ed	6ea29648-5d63-438e-acdf-73ff5c0c33f3	Sightseeing and Milwaukee Brewfest	\N	2012	2019-03-29 20:18:28.042334	2019-03-29 20:18:28.042334	\N	\N	\N
2124	2013-10-11 00:00:00	2013-10-14 00:00:00	United States	Wisconsin Dells, Wisconsin	Furmeet	2013	2013	63a6c417-68a1-4297-a820-b1101f7644ed	89c551d2-b471-4a80-af6c-0df65549f5a3	Forst Private Cabin	\N	2013	2019-03-29 20:18:28.058317	2019-03-29 20:18:28.058317	\N	\N	\N
2125	2014-10-10 00:00:00	2014-10-12 00:00:00	United States	Wisconsin Dells, Wisconsin	Furmeet	2014	2014	63a6c417-68a1-4297-a820-b1101f7644ed	fbdf2446-ae9d-419f-ab3d-f3365384eefd	Arbor Dell	\N	2014	2019-03-29 20:18:28.080066	2019-03-29 20:18:28.080066	\N	\N	\N
2126	2015-10-08 00:00:00	2015-10-12 00:00:00	United States	Wautoma, Wisconsin	Furmeet	2015	2015	63a6c417-68a1-4297-a820-b1101f7644ed	b7eeae99-141c-4054-8eb6-7f983cffc3cf	Little Hills Lake Grandview Lakeside Log Lodge	\N	2015	2019-03-29 20:18:28.098987	2019-03-29 20:18:28.098987	\N	\N	\N
2127	2016-10-06 00:00:00	2016-10-10 00:00:00	United States	Wisconsin	Furmeet	2016	2016	63a6c417-68a1-4297-a820-b1101f7644ed	1bc65b61-ebb9-4f7f-94ad-2ce344f97e9b	Castle Rock Lake	\N	2016	2019-03-29 20:18:28.118292	2019-03-29 20:18:28.118292	\N	\N	\N
2128	2017-10-12 00:00:00	2017-10-16 00:00:00	United States	Wautoma, Wisconsin	Furmeet	2017	2017	63a6c417-68a1-4297-a820-b1101f7644ed	f721d742-f48b-498b-b208-1773e3a5488f	Little Hills Lake Grandview Lakeside Log Lodge	\N	2017	2019-03-29 20:18:28.138824	2019-03-29 20:18:28.138824	\N	\N	\N
2129	2007-11-30 00:00:00	2007-12-03 00:00:00	New Zealand	Waitakere, Auckland	Convention	2007	2007	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	3097e573-f655-40d2-b4f0-01565694490f	Waitakere Ranges Regional Park, Huia (Kiwanis Camp)	90	2007	2019-03-29 20:18:28.159327	2019-03-29 20:18:28.159327	\N	\N	\N
2130	2008-11-21 00:00:00	2008-11-24 00:00:00	New Zealand	Pohangina, North Island	Convention	2008	2008	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	41888155-36d8-4bce-bbf7-8749ea074bb6	Camp Rangi Woods	\N	2008	2019-03-29 20:18:31.072081	2019-03-29 20:18:31.072081	\N	\N	\N
2131	2009-11-27 00:00:00	2009-11-30 00:00:00	New Zealand	Papakura, Auckland	Convention	2009	2009	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	8686afe9-aa86-4508-a665-772c15d9dbbb	Hunua Ranges Regional Park (Kokako Lodge)	\N	2009	2019-03-29 20:18:31.086832	2019-03-29 20:18:31.086832	\N	\N	\N
2132	2010-12-10 00:00:00	2010-12-13 00:00:00	New Zealand	Papakura, Auckland	Convention	2010	2010	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	23016b85-2a65-478e-a61c-97c4a9849c1c	Hunua Ranges Regional Park (Kokako Lodge)	\N	2010	2019-03-29 20:18:31.111048	2019-03-29 20:18:31.111048	\N	\N	\N
2133	2011-12-09 00:00:00	2011-12-12 00:00:00	New Zealand	Papakura, Auckland	Convention	2011	2011	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	93a37eee-b102-4749-b9de-7ff89d72e8ae	Hunua Ranges Regional Park (Kokako Lodge)	\N	2011	2019-03-29 20:18:31.142317	2019-03-29 20:18:31.142317	\N	\N	\N
2134	2012-12-14 00:00:00	2012-12-17 00:00:00	New Zealand	Waitakere, Auckland	Convention	2012	2012	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	edac566c-7d7b-400c-8d1f-2e1d271d3255	Waitakere Ranges Regional Park, Huia (Kiwanis Lodge)	\N	2012	2019-03-29 20:18:31.157515	2019-03-29 20:18:31.157515	\N	\N	\N
2135	2014-02-06 00:00:00	2014-02-09 00:00:00	New Zealand	Wainuiomata, Wellington	Convention	2014	2014	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	84937395-d71e-4d27-9486-7400d9d533fe	Brookfield Outdoor Education Centre	\N	2014	2019-03-29 20:18:31.179204	2019-03-29 20:18:31.179204	\N	\N	\N
2136	2016-02-05 00:00:00	2016-02-08 00:00:00	New Zealand	Wainuiomata, Wellington	Convention	2016	2016	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	632f8715-a9cd-42f7-af78-7db3f630beba	Brookfield Outdoor Education Centre	\N	2016	2019-03-29 20:18:31.209956	2019-03-29 20:18:31.209956	\N	\N	\N
2137	2017-02-03 00:00:00	2017-02-06 00:00:00	New Zealand	Taupo, North Island	Convention	2017	2017	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	83342fef-d5fe-49ad-a273-50474bc1e618	MiCamp Taupo	\N	2017	2019-03-29 20:18:31.230643	2019-03-29 20:18:31.230643	\N	\N	\N
2138	2018-02-02 00:00:00	2018-02-05 00:00:00	New Zealand	Taupo, North Island	Convention	2018	2018	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	313dec10-23c4-4825-8266-33391b6793d5	MiCamp Taupo	\N	2018	2019-03-29 20:18:31.248107	2019-03-29 20:18:31.248107	\N	\N	\N
2139	2012-03-23 00:00:00	2012-03-25 00:00:00	United States	Idaho	Convention	2012	2012	0aec6c19-4a6e-43b7-9c99-d7cd61c0d027	d765db7b-ad51-4890-ba2b-3bc5a536399b	Boise	\N	2012	2019-03-29 20:18:31.267231	2019-03-29 20:18:31.267231	\N	\N	\N
2140	2013-03-08 00:00:00	2013-03-10 00:00:00	United States	Idaho	Convention	2013	2013	0aec6c19-4a6e-43b7-9c99-d7cd61c0d027	dae8b9da-ae95-4073-924a-c81bfb897956	Boise	\N	2013	2019-03-29 20:18:33.969958	2019-03-29 20:18:33.969958	\N	\N	\N
2141	2010-04-23 00:00:00	2010-04-25 00:00:00	Australia	Gold Coast, Queensland	Convention	2010	2010	c89a2067-c261-4659-9903-7a1d60af81b9	95563ee9-5386-4183-8d5f-0254bd492e3a	Vibe Hotel, Surfers Paradise	\N	2010	2019-03-29 20:18:33.989802	2019-03-29 20:18:33.989802	\N	\N	\N
2142	2011-04-15 00:00:00	2011-04-17 00:00:00	Australia	Gold Coast, Queensland	Convention	2011	2011	c89a2067-c261-4659-9903-7a1d60af81b9	a91cb5d5-f778-4e35-8dae-691d4011ac19	Vibe Hotel, Surfers Paradise	\N	2011	2019-03-29 20:18:36.59609	2019-03-29 20:18:36.59609	\N	\N	\N
2143	2012-04-27 00:00:00	2012-04-29 00:00:00	Australia	Gold Coast, Queensland	Convention	2012	2012	c89a2067-c261-4659-9903-7a1d60af81b9	134f4f7d-547c-40e9-b6c6-fc32428355c8	Watermark Hotel, Surfers Paradise	\N	2012	2019-03-29 20:18:36.611527	2019-03-29 20:18:36.611527	\N	\N	\N
2144	2013-04-26 00:00:00	2013-04-28 00:00:00	Australia	Gold Coast, Queensland	Convention	2013	2013	c89a2067-c261-4659-9903-7a1d60af81b9	c39b9bad-7e90-4a2d-beed-ed87ead76594	Outrigger, Surfers Paradise	\N	2013	2019-03-29 20:18:36.628607	2019-03-29 20:18:36.628607	\N	\N	\N
2145	2014-03-28 00:00:00	2014-03-30 00:00:00	Australia	Gold Coast, Queensland	Convention	2014	2014	c89a2067-c261-4659-9903-7a1d60af81b9	87cf3b94-bf10-434c-9887-f6ec23f49cc2	Outrigger, Surfers Paradise	\N	2014	2019-03-29 20:18:36.642049	2019-03-29 20:18:36.642049	\N	\N	\N
2146	2015-05-01 00:00:00	2015-05-03 00:00:00	Australia	Gold Coast, Queensland	Convention	2015	2015	c89a2067-c261-4659-9903-7a1d60af81b9	ce5f64a7-0afc-4395-8178-bdbce1a3a370	Outrigger, Surfers Paradise	\N	2015	2019-03-29 20:18:36.661824	2019-03-29 20:18:36.661824	\N	\N	\N
2147	2016-05-27 00:00:00	2016-05-29 00:00:00	Australia	Gold Coast, Queensland	Convention	2016	2016	c89a2067-c261-4659-9903-7a1d60af81b9	c8fac5fe-eb7d-4b5c-b105-ab5692d23678	The Mantra on View, Surfers Paradise	\N	2016	2019-03-29 20:18:36.679363	2019-03-29 20:18:36.679363	\N	\N	\N
2148	2017-05-05 00:00:00	2017-05-07 00:00:00	Australia	Gold Coast, Queensland	Convention	2017	2017	c89a2067-c261-4659-9903-7a1d60af81b9	84e8de22-8c0d-46bf-979c-43e378dedb18	The Mantra on View, Surfers Paradise	\N	2017	2019-03-29 20:18:36.698254	2019-03-29 20:18:36.698254	\N	\N	\N
2149	2018-05-04 00:00:00	2018-05-06 00:00:00	Australia	Gold Coast, Queensland	Convention	2018	2018	c89a2067-c261-4659-9903-7a1d60af81b9	369b2518-1a27-4fbe-bde0-ffcc47293938	The Mantra on View, Surfers Paradise	\N	2018	2019-03-29 20:18:36.714288	2019-03-29 20:18:36.714288	\N	\N	\N
2150	2019-05-31 00:00:00	2019-06-02 00:00:00	Australia	Gold Coast, Queensland	Convention	2019	2019	c89a2067-c261-4659-9903-7a1d60af81b9	ab5d316d-2b6b-46e7-ac64-9a74c7774a55	The Mantra on View, Surfers Paradise	\N	2019	2019-03-29 20:18:36.733527	2019-03-29 20:18:36.733527	\N	\N	\N
2151	2004-10-23 00:00:00	2004-10-24 00:00:00	United States	Windsor Locks, Connecticut	Convention	2004	2004	82c0e930-20b7-46e0-b7ae-bfcd72615361	37b354c7-d344-4f5a-bdf6-76d96971efcb	Sheraton Bradley Hotel	\N	2004	2019-03-29 20:18:36.750743	2019-03-29 20:18:36.750743	\N	\N	\N
2152	2005-10-28 00:00:00	2005-10-30 00:00:00	United States	Windsor Locks, Connecticut	Convention	2005	2005	82c0e930-20b7-46e0-b7ae-bfcd72615361	c6c5a9d0-ad2c-40a6-acc8-9f90815c3d49	Sheraton Bradley Hotel	\N	2005	2019-03-29 20:18:39.463536	2019-03-29 20:18:39.463536	\N	\N	\N
2153	2006-10-20 00:00:00	2006-10-22 00:00:00	United States	Windsor Locks, Connecticut	Convention	2006	2006	82c0e930-20b7-46e0-b7ae-bfcd72615361	4f7901ff-83d4-4a31-8460-4d4c7af2470d	Sheraton Bradley Hotel	\N	2006	2019-03-29 20:18:39.481626	2019-03-29 20:18:39.481626	\N	\N	\N
2154	2007-10-19 00:00:00	2007-10-21 00:00:00	United States	Waterbury, Connecticut	Convention	2007	2007	82c0e930-20b7-46e0-b7ae-bfcd72615361	6e94c393-5565-478f-9c2b-1a31f9b30a20	Connecticut Grand Hotel	\N	2007	2019-03-29 20:18:39.500727	2019-03-29 20:18:39.500727	\N	\N	\N
2155	2008-10-17 00:00:00	2008-10-19 00:00:00	United States	Waterbury, Connecticut	Convention	2008	2008	82c0e930-20b7-46e0-b7ae-bfcd72615361	6b12bc94-9c04-4f26-88bc-63c0d43a82b1	Connecticut Grand Hotel	\N	2008	2019-03-29 20:18:39.515962	2019-03-29 20:18:39.515962	\N	\N	\N
2156	2009-10-16 00:00:00	2009-10-18 00:00:00	United States	Waterbury, Connecticut	Convention	2009	2009	82c0e930-20b7-46e0-b7ae-bfcd72615361	92f975d0-ddf3-4f0b-a04a-c938c71a0bf3	Holiday Inn	\N	2009	2019-03-29 20:18:39.533419	2019-03-29 20:18:39.533419	\N	\N	\N
2157	2010-10-29 00:00:00	2010-10-31 00:00:00	United States	Cromwell, Connecticut	Convention	2010	2010	82c0e930-20b7-46e0-b7ae-bfcd72615361	234d3f51-8e91-4c37-8f76-6ed4ec21f909	Crowne Plaza Cromwell	\N	2010	2019-03-29 20:18:39.548803	2019-03-29 20:18:39.548803	\N	\N	\N
2158	2011-10-14 00:00:00	2011-10-16 00:00:00	United States	Cromwell, Connecticut	Convention	2011	2011	82c0e930-20b7-46e0-b7ae-bfcd72615361	c40482b4-d3af-44b2-a4d8-5be5dda4fb8e	Crowne Plaza Cromwell	\N	2011	2019-03-29 20:18:39.566871	2019-03-29 20:18:39.566871	\N	\N	\N
2159	2012-10-26 00:00:00	2012-10-28 00:00:00	United States	Cromwell, Connecticut	Convention	2012	2012	82c0e930-20b7-46e0-b7ae-bfcd72615361	38442b75-cf9e-48ec-9e53-aea3cf886aec	Crowne Plaza Cromwell	\N	2012	2019-03-29 20:18:39.582911	2019-03-29 20:18:39.582911	\N	\N	\N
2160	2013-10-25 00:00:00	2013-10-27 00:00:00	United States	Cromwell, Connecticut	Convention	2013	2013	82c0e930-20b7-46e0-b7ae-bfcd72615361	2e3a3733-3824-4da0-a259-30aea8e8380c	Crowne Plaza Cromwell	\N	2013	2019-03-29 20:18:39.601046	2019-03-29 20:18:39.601046	\N	\N	\N
2161	2004-09-17 00:00:00	2004-09-19 00:00:00	Australia	Sydney, New South Wales	Convention	2004	2004	74c63030-c3ff-4051-a0d0-97f4be5fb91e	eae75158-8814-41b2-95e7-89c4dc4b4333	Various Locations	\N	2004	2019-03-29 20:18:39.619218	2019-03-29 20:18:39.619218	\N	\N	\N
2162	2005-09-23 00:00:00	2005-09-25 00:00:00	Australia	Sydney, New South Wales	Convention	2005	2005	74c63030-c3ff-4051-a0d0-97f4be5fb91e	33f9ebed-75e4-468f-952d-ef95a8c8f2c3	Various Locations	\N	2005	2019-03-29 20:18:42.111112	2019-03-29 20:18:42.111112	\N	\N	\N
2163	2007-09-21 00:00:00	2007-09-23 00:00:00	Australia	Sydney, New South Wales	Convention	2007	2007	74c63030-c3ff-4051-a0d0-97f4be5fb91e	bcf69618-6367-42d9-a752-c144f67f150f	Various Locations	\N	2007	2019-03-29 20:18:42.139146	2019-03-29 20:18:42.139146	\N	\N	\N
2164	2008-09-26 00:00:00	2008-09-28 00:00:00	Australia	Sydney, New South Wales	Convention	2008	2008	74c63030-c3ff-4051-a0d0-97f4be5fb91e	5dad156c-c7e6-4989-bca5-b46d2ab5b176	Various Locations	\N	2008	2019-03-29 20:18:42.166811	2019-03-29 20:18:42.166811	\N	\N	\N
2165	2009-09-25 00:00:00	2009-09-27 00:00:00	Australia	Sydney, New South Wales	Convention	2009	2009	74c63030-c3ff-4051-a0d0-97f4be5fb91e	3c70ce6b-017b-495e-ada2-eb6c9428371f	Various Locations	\N	2009	2019-03-29 20:18:42.196412	2019-03-29 20:18:42.196412	\N	\N	\N
2166	2010-09-24 00:00:00	2010-09-26 00:00:00	Australia	Sydney, New South Wales	Convention	2010	2010	74c63030-c3ff-4051-a0d0-97f4be5fb91e	70bc78ce-5bbe-4566-be3a-7be0237b16a5	Docks Hotel in Darling Harbour	\N	2010	2019-03-29 20:18:42.22649	2019-03-29 20:18:42.22649	\N	\N	\N
2167	2011-10-07 00:00:00	2011-10-09 00:00:00	Australia	Sydney, New South Wales	Convention	2011	2011	74c63030-c3ff-4051-a0d0-97f4be5fb91e	1e1115c1-7b40-46e2-9e93-7bc2772f9b08	Forresters Hotel in Surry Hills	\N	2011	2019-03-29 20:18:42.252024	2019-03-29 20:18:42.252024	\N	\N	\N
2168	2012-09-14 00:00:00	2012-09-16 00:00:00	Australia	Sydney, New South Wales	Convention	2012	2012	74c63030-c3ff-4051-a0d0-97f4be5fb91e	7c4265cd-c0d1-4702-9065-315081552f31	The Helm Bar on Darling Harbour	\N	2012	2019-03-29 20:18:42.274479	2019-03-29 20:18:42.274479	\N	\N	\N
2169	2013-09-06 00:00:00	2013-09-08 00:00:00	Australia	Sydney, New South Wales	Convention	2013	2013	74c63030-c3ff-4051-a0d0-97f4be5fb91e	6c3aeb10-61c0-4436-b66d-51d5d66e1814	The Occidental	\N	2013	2019-03-29 20:18:42.29361	2019-03-29 20:18:42.29361	\N	\N	\N
2170	2014-09-19 00:00:00	2014-09-21 00:00:00	Australia	Sydney, New South Wales	Convention	2014	2014	74c63030-c3ff-4051-a0d0-97f4be5fb91e	b76a6b11-1eda-4eaf-9dca-cecdf9cfede5	The Palace Hotel	\N	2014	2019-03-29 20:18:42.319685	2019-03-29 20:18:42.319685	\N	\N	\N
2171	2015-09-18 00:00:00	2015-09-20 00:00:00	Australia	Sydney, New South Wales	Convention	2015	2015	74c63030-c3ff-4051-a0d0-97f4be5fb91e	e280c655-73b0-4919-8e25-22c45033e595	Mercure Sydney International Airport	\N	2015	2019-03-29 20:18:42.338805	2019-03-29 20:18:42.338805	\N	\N	\N
2172	2016-09-16 00:00:00	2016-09-18 00:00:00	Australia	Sydney, New South Wales	Convention	2016	2016	74c63030-c3ff-4051-a0d0-97f4be5fb91e	1dd6730a-b255-4996-8be2-56d27ada572a	Harlequinn Inn in Pyrmont	\N	2016	2019-03-29 20:18:42.358024	2019-03-29 20:18:42.358024	\N	\N	\N
2173	2017-09-22 00:00:00	2017-09-24 00:00:00	Australia	Sydney, New South Wales	Convention	2017	2017	74c63030-c3ff-4051-a0d0-97f4be5fb91e	68c78fc3-239b-443d-a1fc-1c1e3f4473ed	Harlequinn Inn in Pyrmont	\N	2017	2019-03-29 20:18:42.381148	2019-03-29 20:18:42.381148	\N	\N	\N
2174	2018-09-14 00:00:00	2018-09-16 00:00:00	Australia	Sydney, New South Wales	Convention	2018	2018	74c63030-c3ff-4051-a0d0-97f4be5fb91e	c1d6d1c7-5d18-403a-9ced-092526ad3a23	Harlequinn Inn in Pyrmont	\N	2018	2019-03-29 20:18:42.400058	2019-03-29 20:18:42.400058	\N	\N	\N
2175	2013-05-10 00:00:00	2013-05-12 00:00:00	United States	Portland, Oregon	Convention	2013	2013	4ba6a473-e570-41dc-a55b-cd93d96201ee	277518f6-1d6a-40a1-ad53-ef5facb78a21	University Place Hotel & Conference Center	\N	2013	2019-03-29 20:18:42.41947	2019-03-29 20:18:42.41947	\N	\N	\N
2176	2014-05-23 00:00:00	2014-05-25 00:00:00	United States	Portland, Oregon	Convention	2014	2014	4ba6a473-e570-41dc-a55b-cd93d96201ee	5bb3cdcb-201c-44b8-a6b1-8a4c9ce3d75e	Sheraton Portland Airport Hotel 	\N	2014	2019-03-29 20:18:45.15921	2019-03-29 20:18:45.15921	\N	\N	\N
2177	2015-05-22 00:00:00	2015-05-24 00:00:00	United States	Portland, Oregon	Convention	2015	2015	4ba6a473-e570-41dc-a55b-cd93d96201ee	2d7932a8-3221-40de-a7ba-79b6e3e5c514	Sheraton Portland Airport Hotel 	\N	2015	2019-03-29 20:18:45.187307	2019-03-29 20:18:45.187307	\N	\N	\N
2178	2016-05-27 00:00:00	2016-05-29 00:00:00	United States	Portland, Oregon	Convention	2016	2016	4ba6a473-e570-41dc-a55b-cd93d96201ee	b0b23545-ddff-45db-8d96-0cd86febab3d	Sheraton Portland Airport Hotel 	\N	2016	2019-03-29 20:18:45.226598	2019-03-29 20:18:45.226598	\N	\N	\N
2179	2017-05-26 00:00:00	2017-05-28 00:00:00	United States	Portland, Oregon	Convention	2017	2017	4ba6a473-e570-41dc-a55b-cd93d96201ee	a662747d-0b9b-4f66-a0cc-88499e6c2f99	Sheraton Portland Airport Hotel 	\N	2017	2019-03-29 20:18:45.248682	2019-03-29 20:18:45.248682	\N	\N	\N
2180	2018-05-27 00:00:00	2018-05-29 00:00:00	United States	Portland, Oregon	Convention	2018	2018	4ba6a473-e570-41dc-a55b-cd93d96201ee	92d13f29-bca2-47b3-a187-450835014306	Sheraton Portland Airport Hotel 	\N	2018	2019-03-29 20:18:45.269429	2019-03-29 20:18:45.269429	\N	\N	\N
2181	2019-05-24 00:00:00	2019-05-26 00:00:00	United States	Portland, Oregon	Convention	2019	2019	4ba6a473-e570-41dc-a55b-cd93d96201ee	39269dec-0109-4d07-9373-3e4904a4a607	Sheraton Portland Airport Hotel 	\N	2019	2019-03-29 20:18:45.290468	2019-03-29 20:18:45.290468	\N	\N	\N
2182	2012-09-28 00:00:00	2012-09-30 00:00:00	United States	Columbus, Ohio	Convention	2012	2012	3142d391-48bf-42e9-823d-f5ba141f0a6e	cf99181b-c509-4953-9ce1-cb3933d6ebd5	Ramada Plaza Inn and Conference Center	\N	2012	2019-03-29 20:18:45.308218	2019-03-29 20:18:45.308218	\N	\N	\N
2183	2013-09-06 00:00:00	2013-09-08 00:00:00	United States	Columbus, Ohio	Convention	2013	2013	3142d391-48bf-42e9-823d-f5ba141f0a6e	bc75db37-6ff7-4347-bb4c-1c3155685ccc	Ramada Plaza Inn and Conference Center	\N	2013	2019-03-29 20:18:48.015699	2019-03-29 20:18:48.015699	\N	\N	\N
2184	2014-09-12 00:00:00	2014-09-14 00:00:00	United States	Columbus, Ohio	Convention	2014	2014	3142d391-48bf-42e9-823d-f5ba141f0a6e	59b6deb5-48a2-4a0c-8d6d-bd9ba96b7418	Ramada Plaza Inn and Conference Center	\N	2014	2019-03-29 20:18:48.039359	2019-03-29 20:18:48.039359	\N	\N	\N
2185	1999-10-30 00:00:00	1999-10-31 00:00:00	United States	Orlando, Florida	Furmeet	1999	1999	cf39ec19-baee-426b-ab2c-7ed629b26ef0	8e1bfb98-3eb8-4c46-89d8-69d323a5fb01	Various Locations	\N	1999	2019-03-29 20:18:48.061343	2019-03-29 20:18:48.061343	\N	\N	\N
2186	2000-10-21 00:00:00	2000-10-22 00:00:00	United States	Orlando, Florida	Furmeet	2000	2000	cf39ec19-baee-426b-ab2c-7ed629b26ef0	3bd82cb8-033a-4ec7-b53b-3040369cebd1	Various Locations	\N	2000	2019-03-29 20:18:50.736957	2019-03-29 20:18:50.736957	\N	\N	\N
2187	2001-10-27 00:00:00	2001-10-28 00:00:00	United States	Orlando, Florida	Furmeet	2001	2001	cf39ec19-baee-426b-ab2c-7ed629b26ef0	ffc9aeb6-1d25-493d-b08d-d3535d4edd22	Various Locations	\N	2001	2019-03-29 20:18:50.752004	2019-03-29 20:18:50.752004	\N	\N	\N
2188	2002-10-19 00:00:00	2002-10-20 00:00:00	United States	Orlando, Florida	Furmeet	2002	2002	cf39ec19-baee-426b-ab2c-7ed629b26ef0	247c8997-8574-49f7-9a63-2a9259cd2b30	Various Locations	\N	2002	2019-03-29 20:18:50.769712	2019-03-29 20:18:50.769712	\N	\N	\N
2189	2003-11-01 00:00:00	2003-11-02 00:00:00	United States	Orlando, Florida	Furmeet	2003	2003	cf39ec19-baee-426b-ab2c-7ed629b26ef0	f1926964-dc3f-47a8-80fe-9b255dbac61f	Travelodge Colonial Plaza	\N	2003	2019-03-29 20:18:50.784926	2019-03-29 20:18:50.784926	\N	\N	\N
2190	2004-10-30 00:00:00	2004-10-31 00:00:00	United States	Orlando, Florida	Furmeet	2004	2004	cf39ec19-baee-426b-ab2c-7ed629b26ef0	698fd7ce-ecc1-4d68-9245-ad544313211b	Travelodge Orlando Downtown Centroplex	\N	2004	2019-03-29 20:18:50.803408	2019-03-29 20:18:50.803408	\N	\N	\N
2191	2005-10-29 00:00:00	2005-10-30 00:00:00	United States	Orlando, Florida	Furmeet	2005	2005	cf39ec19-baee-426b-ab2c-7ed629b26ef0	16e1f5fd-e2a5-4544-9186-458d985d1875	Best Western Orlando East Inn & Suites	\N	2005	2019-03-29 20:18:50.82047	2019-03-29 20:18:50.82047	\N	\N	\N
2192	2006-10-28 00:00:00	2006-10-29 00:00:00	United States	Orlando, Florida	Furmeet	2006	2006	cf39ec19-baee-426b-ab2c-7ed629b26ef0	c50cdb61-55d9-4f89-9ef0-1df9d1ad4c71	Best Western Orlando East Inn & Suites	\N	2006	2019-03-29 20:18:50.842449	2019-03-29 20:18:50.842449	\N	\N	\N
2193	2007-10-27 00:00:00	2007-10-28 00:00:00	United States	Orlando, Florida	Furmeet	2007	IX	cf39ec19-baee-426b-ab2c-7ed629b26ef0	8cf5a12c-09a9-47ed-a6b5-6f70d58da5bf	Best Western Orlando East Inn & Suites	\N	ix	2019-03-29 20:18:50.861704	2019-03-29 20:18:50.861704	\N	\N	\N
2194	2008-11-01 00:00:00	2008-11-01 00:00:00	United States	Orlando, Florida	Furmeet	2008	X	cf39ec19-baee-426b-ab2c-7ed629b26ef0	0621b9b4-46b1-4d97-9aea-089ef9dcdb55	Best Western Orlando East Inn & Suites	\N	x	2019-03-29 20:18:50.881161	2019-03-29 20:18:50.881161	\N	\N	\N
2195	2009-10-24 00:00:00	2009-10-25 00:00:00	United States	Orlando, Florida	Furmeet	2009	2009	cf39ec19-baee-426b-ab2c-7ed629b26ef0	0b547d14-454d-4f89-8b8a-91edec754aed	Best Western Orlando East Inn & Suites	\N	2009	2019-03-29 20:18:50.899903	2019-03-29 20:18:50.899903	\N	\N	\N
2196	2010-10-30 00:00:00	2010-10-31 00:00:00	United States	Orlando, Florida	Furmeet	2010	2010	cf39ec19-baee-426b-ab2c-7ed629b26ef0	91058b0a-d9c7-4740-b27c-784e5bb2352d	Best Western Orlando East Inn & Suites	\N	2010	2019-03-29 20:18:50.91648	2019-03-29 20:18:50.91648	\N	\N	\N
2197	2011-10-29 00:00:00	2011-10-30 00:00:00	United States	Orlando, Florida	Furmeet	2011	2011	cf39ec19-baee-426b-ab2c-7ed629b26ef0	7fb89f63-55a2-4bc5-a104-7b05e57d61ef	Orlando Elks' Lodge	\N	2011	2019-03-29 20:18:50.935941	2019-03-29 20:18:50.935941	\N	\N	\N
2198	2012-10-27 00:00:00	2012-10-28 00:00:00	United States	Orlando, Florida	Furmeet	2012	2012	cf39ec19-baee-426b-ab2c-7ed629b26ef0	75ed9d7d-dec9-453a-9333-8a40738e15a2	Orlando Elks' Lodge	\N	2012	2019-03-29 20:18:50.957063	2019-03-29 20:18:50.957063	\N	\N	\N
2199	2013-10-19 00:00:00	2013-10-20 00:00:00	United States	Orlando, Florida	Furmeet	2013	2013	cf39ec19-baee-426b-ab2c-7ed629b26ef0	6e13072d-08ed-44d1-bc90-879cce49802b	Orlando Elks' Lodge	\N	2013	2019-03-29 20:18:50.973489	2019-03-29 20:18:50.973489	\N	\N	\N
2200	2014-10-18 00:00:00	2014-10-19 00:00:00	United States	Orlando, Florida	Furmeet	2014	2014	cf39ec19-baee-426b-ab2c-7ed629b26ef0	e62ff3be-63f4-4d2c-b256-07298c02b71f	Orlando Elks' Lodge	\N	2014	2019-03-29 20:18:50.992906	2019-03-29 20:18:50.992906	\N	\N	\N
2201	2015-10-24 00:00:00	2015-10-25 00:00:00	United States	Orlando, Florida	Furmeet	2015	2015	cf39ec19-baee-426b-ab2c-7ed629b26ef0	9ec4bee6-976b-41a4-a660-a44be708a93d	Orlando Elks' Lodge	\N	2015	2019-03-29 20:18:51.011491	2019-03-29 20:18:51.011491	\N	\N	\N
2202	2016-10-22 00:00:00	2016-10-23 00:00:00	United States	Orlando, Florida	Furmeet	2016	2016	cf39ec19-baee-426b-ab2c-7ed629b26ef0	f7935215-f173-4ad7-865e-1dc2071bade7	Orlando Elks' Lodge	\N	2016	2019-03-29 20:18:51.029996	2019-03-29 20:18:51.029996	\N	\N	\N
2203	2017-10-28 00:00:00	2017-10-29 00:00:00	United States	Orlando, Florida	Furmeet	2017	2017	cf39ec19-baee-426b-ab2c-7ed629b26ef0	9cf232f5-1f88-4070-ba72-8acf723005f2	Orlando Elks' Lodge	\N	2017	2019-03-29 20:18:51.04493	2019-03-29 20:18:51.04493	\N	\N	\N
2204	2018-10-27 00:00:00	2018-10-28 00:00:00	United States	Orlando, Florida	Furmeet	2018	2018	cf39ec19-baee-426b-ab2c-7ed629b26ef0	0d3ab24c-e21f-486e-8f82-308f1ee6c21f	Orlando Elks' Lodge	\N	2018	2019-03-29 20:18:51.062281	2019-03-29 20:18:51.062281	\N	\N	\N
2205	2010-03-06 00:00:00	2010-03-07 00:00:00	Canada	Toronto, Ontario	Convention	2010	2010	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	f3e9ed29-b373-42ce-b9c8-f13d9e6a4d3e	Doubletree by Hilton Toronto Airport	\N	2010	2019-03-29 20:18:51.077853	2019-03-29 20:18:51.077853	\N	\N	\N
2206	2011-03-11 00:00:00	2011-03-13 00:00:00	Canada	Toronto, Ontario	Convention	2011	2011	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	a27424ed-ccb7-47c7-bc61-ba4ea0c57a62	Doubletree by Hilton Toronto Airport	\N	2011	2019-03-29 20:18:53.825743	2019-03-29 20:18:53.825743	\N	\N	\N
2207	2012-03-16 00:00:00	2012-03-18 00:00:00	Canada	Toronto, Ontario	Convention	2012	2012	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	0d08c71b-9041-4bc2-b6f5-a1f03a3fa2b7	Doubletree by Hilton Toronto Airport	\N	2012	2019-03-29 20:18:53.846103	2019-03-29 20:18:53.846103	\N	\N	\N
2208	2013-03-08 00:00:00	2013-03-10 00:00:00	Canada	Toronto, Ontario	Convention	2013	2013	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	0708d00b-6438-4a1e-abe1-0b473ab38c91	Sheraton Toronto Airport Hotel and Conference Centre 	\N	2013	2019-03-29 20:18:53.866401	2019-03-29 20:18:53.866401	\N	\N	\N
2209	2014-03-07 00:00:00	2014-03-09 00:00:00	Canada	Toronto, Ontario	Convention	2014	2014	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	a0712d6d-e285-437a-a226-19411503f94d	Sheraton Toronto Airport Hotel and Conference Centre 	\N	2014	2019-03-29 20:18:53.890775	2019-03-29 20:18:53.890775	\N	\N	\N
2210	2015-03-13 00:00:00	2015-03-15 00:00:00	Canada	Toronto, Ontario	Convention	2015	2015	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	d5c38619-5ab8-4150-900b-7981a25f9837	Sheraton Toronto Airport Hotel and Conference Centre 	\N	2015	2019-03-29 20:18:53.910156	2019-03-29 20:18:53.910156	\N	\N	\N
2211	2016-03-16 00:00:00	2016-03-20 00:00:00	Canada	Toronto, Ontario	Convention	2016	2016	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	f6188ad3-1273-4d15-8e2c-81819679fb37	Sheraton Toronto Airport Hotel and Conference Centre 	\N	2016	2019-03-29 20:18:53.930751	2019-03-29 20:18:53.930751	\N	\N	\N
2212	2017-03-17 00:00:00	2017-03-19 00:00:00	Canada	Toronto, Ontario	Convention	2017	2017	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	0d09f5c5-8176-4836-bdff-26ca4ece3e4b	Westin Harbour Castle Hotel	\N	2017	2019-03-29 20:18:53.956139	2019-03-29 20:18:53.956139	\N	\N	\N
2213	2018-03-16 00:00:00	2018-03-18 00:00:00	Canada	Toronto, Ontario	Convention	2018	2018	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	8400a7ec-78a7-45e0-9415-974f6b756d88	Westin Harbour Castle Hotel	\N	2018	2019-03-29 20:18:53.976158	2019-03-29 20:18:53.976158	\N	\N	\N
2214	2019-03-15 00:00:00	2019-03-17 00:00:00	Canada	Toronto, Ontario	Convention	2019	2019	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	db4a5d90-296d-436e-ad28-8b61dff1f247	Westin Harbour Castle Hotel	\N	2019	2019-03-29 20:18:53.995726	2019-03-29 20:18:53.995726	\N	\N	\N
2215	2020-03-20 00:00:00	2020-03-22 00:00:00	Canada	Toronto, Ontario	Convention	2020	2020	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	2fdd12f5-f454-4856-a0eb-d4a0ca444fad	Westin Harbour Castle Hotel	\N	2020	2019-03-29 20:18:54.016667	2019-03-29 20:18:54.016667	\N	\N	\N
2216	2009-07-24 00:00:00	2009-07-24 00:00:00	United States	Ohio	Convention	2009	2009	229f905d-2893-4531-9163-d76af5d29a46	8088a5ba-7765-41e8-88d3-166f65b56458	Various Locations	\N	2009	2019-03-29 20:18:54.035397	2019-03-29 20:18:54.035397	\N	\N	\N
2217	2014-10-31 00:00:00	2014-11-02 00:00:00	United States	Cromwell, Connecticut	Convention	2014	2014	00deba1c-47a7-4fc3-8809-1ac13007cce5	10b186b3-cdce-49fa-9f6b-0ceade54d7a9	Crowne Plaza Cromwell	\N	2014	2019-03-29 20:18:56.652474	2019-03-29 20:18:56.652474	\N	\N	\N
2218	2015-10-30 00:00:00	2015-11-01 00:00:00	United States	Cromwell, Connecticut	Convention	2015	2015	00deba1c-47a7-4fc3-8809-1ac13007cce5	bb44eccb-37d2-458a-abe3-e03fe294f47e	Crowne Plaza Cromwell	\N	2015	2019-03-29 20:18:59.270133	2019-03-29 20:18:59.270133	\N	\N	\N
2219	2016-10-28 00:00:00	2016-10-30 00:00:00	United States	Cromwell, Connecticut	Convention	2016	2016	00deba1c-47a7-4fc3-8809-1ac13007cce5	60495505-2bc9-43e8-a09c-7c1ca49703f8	Radisson Hotel Cromwell	\N	2016	2019-03-29 20:18:59.28663	2019-03-29 20:18:59.28663	\N	\N	\N
2220	2017-10-27 00:00:00	2017-10-29 00:00:00	United States	Cromwell, Connecticut	Convention	2017	2017	00deba1c-47a7-4fc3-8809-1ac13007cce5	36f6c96c-309f-4f77-8256-16ffcc551741	Radisson Hotel Cromwell	\N	2017	2019-03-29 20:18:59.305859	2019-03-29 20:18:59.305859	\N	\N	\N
2221	2018-10-26 00:00:00	2018-10-28 00:00:00	United States	Cromwell, Connecticut	Convention	2018	2018	00deba1c-47a7-4fc3-8809-1ac13007cce5	bda8c2cc-29ba-4f27-9c64-bc9a384a623d	Red Lion Hotel Cromwell	\N	2018	2019-03-29 20:18:59.325305	2019-03-29 20:18:59.325305	\N	\N	\N
2222	2019-10-25 00:00:00	2019-10-27 00:00:00	United States	Cromwell, Connecticut	Convention	2019	2019	00deba1c-47a7-4fc3-8809-1ac13007cce5	0e0c5f44-cdcc-403e-94b5-b75063aca4f8	Red Lion Hotel Cromwell	\N	2019	2019-03-29 20:18:59.343742	2019-03-29 20:18:59.343742	\N	\N	\N
2223	2012-12-20 00:00:00	2012-12-23 00:00:00	United States	New York	Convention	2012	2012	7b26a05b-51dd-4056-9e86-699b800eb13a	ec5bc8ea-b047-4abc-8008-3b510c6baa88	Rochester	\N	2012	2019-03-29 20:18:59.361341	2019-03-29 20:18:59.361341	\N	\N	\N
2224	2014-05-08 00:00:00	2014-05-11 00:00:00	United States	New York	Convention	2014	2014	7b26a05b-51dd-4056-9e86-699b800eb13a	539edead-c4fd-4747-91c8-e18902bc9f61	Rochester	\N	2014	2019-03-29 20:19:01.90867	2019-03-29 20:19:01.90867	\N	\N	\N
2225	2015-05-21 00:00:00	2015-05-25 00:00:00	United States	New York	Convention	2015	2015	7b26a05b-51dd-4056-9e86-699b800eb13a	80e14c47-8291-416d-a058-907d0815b1e3	Rochester	\N	2015	2019-03-29 20:19:01.925094	2019-03-29 20:19:01.925094	\N	\N	\N
2226	2016-09-15 00:00:00	2016-09-18 00:00:00	United States	New York	Convention	2016	2016	7b26a05b-51dd-4056-9e86-699b800eb13a	0ac26c75-91f0-488c-b596-962bd814203d	Rochester	\N	2016	2019-03-29 20:19:01.942232	2019-03-29 20:19:01.942232	\N	\N	\N
2227	2009-09-18 00:00:00	2009-09-20 00:00:00	Sweden	Karlstad	Furmeet	2009	2009	4a855adc-22c2-4743-aa61-a0cbb1d8199b	c4201233-21c4-4b8f-b606-a8b0b51b2177	Various Locations	\N	2009	2019-03-29 20:19:01.963293	2019-03-29 20:19:01.963293	\N	\N	\N
2228	2017-01-27 00:00:00	2017-01-29 00:00:00	Spain	Fuenlabrada, Madrid	Convention	2017	2017	96f5353b-9eb9-4e05-ae1a-0b66cfc0be55	b7838f4c-367d-4b9e-8c30-e2df6864e613	MC Las Provincias Hotel	\N	2017	2019-03-29 20:19:04.521282	2019-03-29 20:19:04.521282	\N	\N	\N
2229	2018-04-20 00:00:00	2018-04-22 00:00:00	Spain	Madrid	Convention	2018	2018	96f5353b-9eb9-4e05-ae1a-0b66cfc0be55	a6dc2909-8b75-4c4d-95d3-28a2dcdcae39	Melia Barajas Hotel	\N	2018	2019-03-29 20:19:07.710005	2019-03-29 20:19:07.710005	\N	\N	\N
2230	2019-10-17 00:00:00	2019-10-20 00:00:00	Spain	Madrid	Convention	2019	2019	96f5353b-9eb9-4e05-ae1a-0b66cfc0be55	515304f8-49a4-4738-9795-db1979b2813a	Melia Barajas Hotel	\N	2019	2019-03-29 20:19:07.727481	2019-03-29 20:19:07.727481	\N	\N	\N
2231	2013-01-19 00:00:00	2013-01-19 00:00:00	France	Maurepas	Convention	2013	1	9a6cefa7-d763-4fda-98fc-290c09908547	84fbd00b-5647-4577-b680-293687b2a1f1	Universal Circuit	\N	1	2019-03-29 20:19:07.75031	2019-03-29 20:19:07.75031	\N	\N	\N
2232	2013-12-19 00:00:00	2013-12-19 00:00:00	France	Maurepas	Convention	2013	2	9a6cefa7-d763-4fda-98fc-290c09908547	203d8816-f259-4d50-97da-68a9090e6455	Universal Circuit	\N	2	2019-03-29 20:19:10.241626	2019-03-29 20:19:10.241626	\N	\N	\N
2233	2014-11-01 00:00:00	2014-11-02 00:00:00	France	Maurepas	Convention	2014	3	9a6cefa7-d763-4fda-98fc-290c09908547	330e8657-fe88-457a-ba88-eb4ac8551577	Hotel Premiere Classe	\N	3	2019-03-29 20:19:10.260267	2019-03-29 20:19:10.260267	\N	\N	\N
2234	2015-10-31 00:00:00	2015-11-01 00:00:00	France	Maurepas	Convention	2015	4	9a6cefa7-d763-4fda-98fc-290c09908547	096caa0b-c0d0-4c0d-a5cc-5aa56d956b59	Hotel Premiere Classe	\N	4	2019-03-29 20:19:10.277118	2019-03-29 20:19:10.277118	\N	\N	\N
2235	2016-10-29 00:00:00	2016-10-31 00:00:00	France	Maurepas	Convention	2016	5	9a6cefa7-d763-4fda-98fc-290c09908547	25bcbb11-365a-4148-9197-e89cd5a91e79	Hotel Premiere Classe	\N	5	2019-03-29 20:19:10.296932	2019-03-29 20:19:10.296932	\N	\N	\N
2236	2017-10-27 00:00:00	2017-10-29 00:00:00	France	Maurepas	Convention	2017	6	9a6cefa7-d763-4fda-98fc-290c09908547	c26d46ec-a4c2-4afc-9dae-7b8558d43b55	Mercure Hotel	\N	6	2019-03-29 20:19:10.312888	2019-03-29 20:19:10.312888	\N	\N	\N
2237	2018-11-01 00:00:00	2018-11-04 00:00:00	France	Maurepas	Convention	2018	7	9a6cefa7-d763-4fda-98fc-290c09908547	01923719-26e5-48eb-b0ae-c68bcfc569eb	Mercure Hotel	\N	7	2019-03-29 20:19:10.331321	2019-03-29 20:19:10.331321	\N	\N	\N
2238	2019-10-31 00:00:00	2019-11-03 00:00:00	France	Roissy-en-France, Paris	Convention	2019	8	9a6cefa7-d763-4fda-98fc-290c09908547	be4f3fa8-6d2d-4ae3-a77c-9eb8ffd823c7	Hyatt Regency Paris Charles de Gaulle	\N	8	2019-03-29 20:19:10.349024	2019-03-29 20:19:10.349024	\N	\N	\N
2239	2008-04-11 00:00:00	2008-04-13 00:00:00	United States	Ann Arbor, Michigan	Convention	2008	2008	fb2a890a-0e96-4cdc-8df7-93377c817392	dbcb64bd-c539-44cb-8632-9048078eb5d9	Best Western Executive Plaza	\N	2008	2019-03-29 20:19:10.373726	2019-03-29 20:19:10.373726	\N	\N	\N
2240	2009-04-24 00:00:00	2009-04-26 00:00:00	United States	Novi, Michigan	Convention	2009	2009	fb2a890a-0e96-4cdc-8df7-93377c817392	2e998969-fa29-4bfe-a931-6507f2a364dd	Sheraton Detroit	\N	2009	2019-03-29 20:19:13.188309	2019-03-29 20:19:13.188309	\N	\N	\N
2241	2010-04-09 00:00:00	2010-04-11 00:00:00	United States	Novi, Michigan	Convention	2010	2010	fb2a890a-0e96-4cdc-8df7-93377c817392	8834b5a3-2e49-4352-840e-b7a8eb2bfb24	Sheraton Detroit	\N	2010	2019-03-29 20:19:13.213786	2019-03-29 20:19:13.213786	\N	\N	\N
2242	2011-04-08 00:00:00	2011-04-10 00:00:00	United States	Novi, Michigan	Convention	2011	2011	fb2a890a-0e96-4cdc-8df7-93377c817392	d59df880-8173-48b7-bbab-67fcb89cd619	Sheraton Detroit	\N	2011	2019-03-29 20:19:13.234477	2019-03-29 20:19:13.234477	\N	\N	\N
2243	2012-04-13 00:00:00	2012-04-15 00:00:00	United States	Novi, Michigan	Convention	2012	2012	fb2a890a-0e96-4cdc-8df7-93377c817392	c1058309-d328-4328-bc1f-87d97c5c5901	Sheraton Detroit	\N	2012	2019-03-29 20:19:13.261506	2019-03-29 20:19:13.261506	\N	\N	\N
2244	2013-04-12 00:00:00	2013-04-14 00:00:00	United States	Novi, Michigan	Convention	2013	2013	fb2a890a-0e96-4cdc-8df7-93377c817392	2341e390-947e-4a55-918f-afa0d664a68c	Sheraton Detroit	\N	2013	2019-03-29 20:19:13.27961	2019-03-29 20:19:13.27961	\N	\N	\N
2245	2005-12-05 00:00:00	2005-12-10 00:00:00	United States	Miami, Florida	Convention	2005	1	ebc75ead-2053-4140-a5d1-085aba2e7752	1767b20e-9c01-40a6-9ce4-995961e4251a	Majesty of the Seas	\N	1	2019-03-29 20:19:13.301999	2019-03-29 20:19:13.301999	\N	\N	\N
2246	2006-12-03 00:00:00	2006-12-09 00:00:00	United States	Fort Lauderdale, Florida	Convention	2006	2	ebc75ead-2053-4140-a5d1-085aba2e7752	7eaec720-e1ea-40ce-af71-da4591876a6b	Radiance of the Seas	\N	2	2019-03-29 20:19:16.161864	2019-03-29 20:19:16.161864	\N	\N	\N
2247	2008-12-01 00:00:00	2008-12-05 00:00:00	United States	Port Canaveral, Florida	Convention	2008	3	ebc75ead-2053-4140-a5d1-085aba2e7752	c3f1eb56-48a9-48d5-bdfc-8106cc7c8d3a	Monarch of the Seas	\N	3	2019-03-29 20:19:16.187392	2019-03-29 20:19:16.187392	\N	\N	\N
2248	2009-12-05 00:00:00	2009-12-10 00:00:00	United States	Miami, Florida	Convention	2009	4	ebc75ead-2053-4140-a5d1-085aba2e7752	5d76f0a5-47fb-4f9f-be95-94965485ca7c	Navigator of the Seas	\N	4	2019-03-29 20:19:16.220247	2019-03-29 20:19:16.220247	\N	\N	\N
2249	2010-12-04 00:00:00	2010-12-09 00:00:00	United States	Miami, Florida	Convention	2010	5	ebc75ead-2053-4140-a5d1-085aba2e7752	bbc9b9d1-a26c-43c1-9df5-7539fc9ecf3e	Navigator of the Seas	\N	5	2019-03-29 20:19:16.242134	2019-03-29 20:19:16.242134	\N	\N	\N
2250	2011-12-05 00:00:00	2011-12-10 00:00:00	United States	Fort Lauderdale, Florida	Convention	2011	6	ebc75ead-2053-4140-a5d1-085aba2e7752	96f5321d-30e9-47ba-90fe-b875676e0130	Liberty of the Seas	\N	6	2019-03-29 20:19:16.267721	2019-03-29 20:19:16.267721	\N	\N	\N
2251	2012-12-02 00:00:00	2012-12-07 00:00:00	United States	Port Canaveral, Florida	Convention	2012	7	ebc75ead-2053-4140-a5d1-085aba2e7752	361017d8-2ca5-4a13-bf10-5098cbfac2a4	Freedom of the Seas	\N	7	2019-03-29 20:19:16.291731	2019-03-29 20:19:16.291731	\N	\N	\N
2252	2013-12-01 00:00:00	2013-12-08 00:00:00	United States	Port Canaveral, Florida	Convention	2013	8	ebc75ead-2053-4140-a5d1-085aba2e7752	8e704c0a-7af1-4631-839c-4d0da551820e	Norwegian Pearl	\N	8	2019-03-29 20:19:16.312953	2019-03-29 20:19:16.312953	\N	\N	\N
2253	2014-11-09 00:00:00	2014-11-16 00:00:00	United States	Tampa, Florida	Convention	2014	9	ebc75ead-2053-4140-a5d1-085aba2e7752	ecadd56d-45d2-4222-ad83-67826d388dd5	Norwegian Sun	\N	9	2019-03-29 20:19:16.335077	2019-03-29 20:19:16.335077	\N	\N	\N
2254	2015-11-16 00:00:00	2015-11-22 00:00:00	United States	Miami, Florida	Convention	2015	10	ebc75ead-2053-4140-a5d1-085aba2e7752	57b0b990-3c36-42e1-af99-58dab925ac30	Norwegian Getaway	\N	10	2019-03-29 20:19:16.358656	2019-03-29 20:19:16.358656	\N	\N	\N
2255	2016-11-06 00:00:00	2016-11-12 00:00:00	United States	Miami, Florida	Convention	2016	11	ebc75ead-2053-4140-a5d1-085aba2e7752	ee95ff51-3862-4a8e-ba52-4f4135715c58	Norwegian Getaway	\N	11	2019-03-29 20:19:16.381346	2019-03-29 20:19:16.381346	\N	\N	\N
2256	2017-11-03 00:00:00	2017-11-12 00:00:00	United States	Boston, Massachusetts	Convention	2017	12	ebc75ead-2053-4140-a5d1-085aba2e7752	f2e958b1-a3e5-4136-adc5-6d002ba0d619	Norwegian Dawn	\N	12	2019-03-29 20:19:16.408474	2019-03-29 20:19:16.408474	\N	\N	\N
2257	2018-10-27 00:00:00	2018-11-03 00:00:00	United States	Los Angeles, California	Convention	2018	13	ebc75ead-2053-4140-a5d1-085aba2e7752	6499c1c6-4e83-4961-9227-23a514dbe0a6	Norwegian Bliss	\N	13	2019-03-29 20:19:16.430207	2019-03-29 20:19:16.430207	\N	\N	\N
2258	2019-11-03 00:00:00	2019-11-10 00:00:00	United States	New York City, New York	Convention	2019	14	ebc75ead-2053-4140-a5d1-085aba2e7752	84b8571b-8f8e-4135-83ce-556b9db016ca	Norwegian Escape	\N	14	2019-03-29 20:19:16.45755	2019-03-29 20:19:16.45755	\N	\N	\N
2259	2009-02-20 00:00:00	2009-02-22 00:00:00	United States	Dallas, Texas	Convention	2009	2009	302b87c1-aa5e-4943-81eb-43566e4e5b6e	fc74edb3-b554-46eb-9931-4e8923f1ab8d	Crowne Plaza Hotel	\N	2009	2019-03-29 20:19:16.48236	2019-03-29 20:19:16.48236	\N	\N	\N
2260	2010-02-19 00:00:00	2010-02-21 00:00:00	United States	Dallas, Texas	Convention	2010	2010	302b87c1-aa5e-4943-81eb-43566e4e5b6e	b0fa04c9-c63d-4544-855d-380e271fd8bf	Crowne Plaza Hotel	\N	2010	2019-03-29 20:19:19.12903	2019-03-29 20:19:19.12903	\N	\N	\N
2261	2011-02-25 00:00:00	2011-02-27 00:00:00	United States	Dallas, Texas	Convention	2011	2011	302b87c1-aa5e-4943-81eb-43566e4e5b6e	4335985d-397c-475e-a603-7344884a7188	Crowne Plaza Hotel	\N	2011	2019-03-29 20:19:19.151022	2019-03-29 20:19:19.151022	\N	\N	\N
2262	2012-02-24 00:00:00	2012-02-26 00:00:00	United States	Dallas, Texas	Convention	2012	2012	302b87c1-aa5e-4943-81eb-43566e4e5b6e	8d0a654b-c958-4a03-82f0-106f99483d96	Crowne Plaza Hotel	\N	2012	2019-03-29 20:19:19.177298	2019-03-29 20:19:19.177298	\N	\N	\N
2263	2013-02-22 00:00:00	2013-02-24 00:00:00	United States	Dallas, Texas	Convention	2013	2013	302b87c1-aa5e-4943-81eb-43566e4e5b6e	b5e6a070-6588-421c-94dd-4d75d3163145	Crowne Plaza Hotel	\N	2013	2019-03-29 20:19:19.20062	2019-03-29 20:19:19.20062	\N	\N	\N
2264	2014-02-21 00:00:00	2014-02-23 00:00:00	United States	Dallas, Texas	Convention	2014	2014	302b87c1-aa5e-4943-81eb-43566e4e5b6e	c8050d52-408b-4655-8810-bb14e719e7bf	InterContinental Dallas	\N	2014	2019-03-29 20:19:19.23609	2019-03-29 20:19:19.23609	\N	\N	\N
2265	2015-02-20 00:00:00	2015-02-22 00:00:00	United States	Dallas, Texas	Convention	2015	2015	302b87c1-aa5e-4943-81eb-43566e4e5b6e	1b460b27-4fce-4662-bc89-36b465c1f27d	InterContinental Dallas	\N	2015	2019-03-29 20:19:19.26313	2019-03-29 20:19:19.26313	\N	\N	\N
2266	2016-03-11 00:00:00	2016-03-13 00:00:00	United States	Dallas, Texas	Convention	2016	2016	302b87c1-aa5e-4943-81eb-43566e4e5b6e	e68e81a1-0ce6-4abf-965d-125408bf8d9d	InterContinental Dallas	\N	2016	2019-03-29 20:19:19.287944	2019-03-29 20:19:19.287944	\N	\N	\N
2267	2017-03-24 00:00:00	2017-03-26 00:00:00	United States	Dallas, Texas	Convention	2017	2017	302b87c1-aa5e-4943-81eb-43566e4e5b6e	faf159e3-08bc-4f5f-bc7e-71ee67330dae	InterContinental Dallas	\N	2017	2019-03-29 20:19:19.315823	2019-03-29 20:19:19.315823	\N	\N	\N
2268	2018-02-09 00:00:00	2018-02-11 00:00:00	United States	Dallas, Texas	Convention	2018	2018	302b87c1-aa5e-4943-81eb-43566e4e5b6e	3d77caf4-37cb-4408-b07a-f06312b23f48	Hyatt Regency Dallas (Reunion District)	\N	2018	2019-03-29 20:19:19.344255	2019-03-29 20:19:19.344255	\N	\N	\N
2269	2019-03-28 00:00:00	2019-03-31 00:00:00	United States	Dallas, Texas	Convention	2019	2019	302b87c1-aa5e-4943-81eb-43566e4e5b6e	44f9131e-b691-4bbd-9fab-8698c348560e	Hyatt Regency Dallas (Reunion District)	\N	2019	2019-03-29 20:19:19.380343	2019-03-29 20:19:19.380343	\N	\N	\N
2270	2014-09-12 00:00:00	2014-09-14 00:00:00	United States	Bloomington, Minnesota	Convention	2014	2014	313b5b51-1305-42ce-8b76-6de1d0d135d3	7cb7a4bf-944e-4c28-94d7-9deea517061e	Ramada Minneapolis Airport Hotel	\N	2014	2019-03-29 20:19:19.411195	2019-03-29 20:19:19.411195	\N	\N	\N
2271	2015-08-28 00:00:00	2015-08-30 00:00:00	United States	Minneapolis, Minnesota	Convention	2015	2015	313b5b51-1305-42ce-8b76-6de1d0d135d3	5721e234-d302-4a52-a52b-ba4188c33e81	Hyatt Regency Minneapolis	\N	2015	2019-03-29 20:19:22.300877	2019-03-29 20:19:22.300877	\N	\N	\N
2272	2016-09-09 00:00:00	2016-09-11 00:00:00	United States	Minneapolis, Minnesota	Convention	2016	2016	313b5b51-1305-42ce-8b76-6de1d0d135d3	a5c35ac1-5980-49a9-b1bf-1c62cd1855cf	Hyatt Regency Minneapolis	\N	2016	2019-03-29 20:19:22.31437	2019-03-29 20:19:22.31437	\N	\N	\N
2273	2017-08-25 00:00:00	2017-08-27 00:00:00	United States	Minneapolis, Minnesota	Convention	2017	2017	313b5b51-1305-42ce-8b76-6de1d0d135d3	bdad715e-30cc-4344-88a2-3a641b6e5ff6	Hyatt Regency Minneapolis	\N	2017	2019-03-29 20:19:22.333298	2019-03-29 20:19:22.333298	\N	\N	\N
2274	2018-09-07 00:00:00	2018-09-09 00:00:00	United States	Minneapolis, Minnesota	Convention	2018	2018	313b5b51-1305-42ce-8b76-6de1d0d135d3	ea849182-eddd-4874-b88e-6d35540a812e	Hyatt Regency Minneapolis	\N	2018	2019-03-29 20:19:22.351845	2019-03-29 20:19:22.351845	\N	\N	\N
2275	2019-09-06 00:00:00	2019-09-08 00:00:00	United States	Minneapolis, Minnesota	Convention	2019	2019	313b5b51-1305-42ce-8b76-6de1d0d135d3	d10392e9-0956-4329-9787-d71a985894bd	Hyatt Regency Minneapolis	\N	2019	2019-03-29 20:19:22.373581	2019-03-29 20:19:22.373581	\N	\N	\N
2276	2015-07-31 00:00:00	2015-08-01 00:00:00	United States	Addison, Texas	Convention	2015	2015	60f86895-7185-482f-8de4-2f6fb40e1c77	d5976192-5473-417d-bfa3-2de286b05ada	Crowne Plaza Dallas Near Galleria-Addison Hotel	\N	2015	2019-03-29 20:19:22.396453	2019-03-29 20:19:22.396453	\N	\N	\N
2277	2016-07-15 00:00:00	2016-07-16 00:00:00	United States	Addison, Texas	Convention	2016	2016	60f86895-7185-482f-8de4-2f6fb40e1c77	e1e56378-991d-4e57-b75c-8aebde1f9383	Crowne Plaza Dallas Near Galleria-Addison Hotel	\N	2016	2019-03-29 20:19:25.078648	2019-03-29 20:19:25.078648	\N	\N	\N
2278	2017-08-04 00:00:00	2017-08-05 00:00:00	United States	Dallas Fort Worth, Texas	Convention	2017	2017	60f86895-7185-482f-8de4-2f6fb40e1c77	2cff568e-0eae-49d1-855e-925897992286	Hyatt Regency DFW Hotel	\N	2017	2019-03-29 20:19:25.09755	2019-03-29 20:19:25.09755	\N	\N	\N
2279	2018-07-20 00:00:00	2018-07-21 00:00:00	United States	Richardson, Texas	Convention	2018	2018	60f86895-7185-482f-8de4-2f6fb40e1c77	0c7a1e06-b792-4ba6-af4d-708d552ea77f	Hyatt Regency North Dallas	\N	2018	2019-03-29 20:19:25.119636	2019-03-29 20:19:25.119636	\N	\N	\N
2280	2019-07-19 00:00:00	2019-07-20 00:00:00	United States	Richardson, Texas	Convention	2019	2019	60f86895-7185-482f-8de4-2f6fb40e1c77	3730d2f8-ccdb-43f7-a53b-66e79df9c800	Hyatt Regency North Dallas	\N	2019	2019-03-29 20:19:25.140582	2019-03-29 20:19:25.140582	\N	\N	\N
2281	2008-02-22 00:00:00	2008-02-25 00:00:00	United States	Copper Mountain, Colorado	Convention	2008	2008	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	f025ff30-6790-4b70-849b-b36c73fd7d8f	Copper Mountain	\N	2008	2019-03-29 20:19:25.158157	2019-03-29 20:19:25.158157	\N	\N	\N
2282	2008-02-21 00:00:00	2008-02-24 00:00:00	United States	Copper Mountain, Colorado	Convention	2008	2008	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	1d98a9ab-cd3b-449e-9e16-61a7656c8f9c	Copper Mountain	\N	2008-2	2019-03-29 20:19:27.751448	2019-03-29 20:19:27.751448	\N	\N	\N
2283	2009-02-19 00:00:00	2009-02-22 00:00:00	United States	Copper Mountain, Colorado	Convention	2009	2009	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	d54cc487-d244-4931-a0b5-9f0f779deb1e	Copper Mountain	\N	2009	2019-03-29 20:19:27.769097	2019-03-29 20:19:27.769097	\N	\N	\N
2284	2010-02-18 00:00:00	2010-02-21 00:00:00	United States	Copper Mountain, Colorado	Convention	2010	2010	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	3317bb1a-5292-43e2-8655-bc7d6ad62a37	Copper Mountain	\N	2010	2019-03-29 20:19:27.790418	2019-03-29 20:19:27.790418	\N	\N	\N
2285	2011-02-24 00:00:00	2011-02-27 00:00:00	United States	Copper Mountain, Colorado	Convention	2011	2011	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	bbb5d47d-8261-4468-b7af-9e0249dcdddc	Copper Mountain	\N	2011	2019-03-29 20:19:27.807955	2019-03-29 20:19:27.807955	\N	\N	\N
2286	2012-02-23 00:00:00	2012-02-26 00:00:00	United States	Copper Mountain, Colorado	Convention	2012	2012	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	1185402a-12ce-46e7-acba-1d37722b9195	Copper Mountain	\N	2012	2019-03-29 20:19:27.828577	2019-03-29 20:19:27.828577	\N	\N	\N
2287	2013-02-21 00:00:00	2013-02-24 00:00:00	United States	Copper Mountain, Colorado	Convention	2013	2013	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	08a60dc3-f6bf-46c3-9289-5467f5762a5b	Copper Mountain	\N	2013	2019-03-29 20:19:27.850794	2019-03-29 20:19:27.850794	\N	\N	\N
2288	2014-02-20 00:00:00	2014-02-23 00:00:00	United States	Copper Mountain, Colorado	Convention	2014	2014	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	ea9f98f6-a5f0-4b5c-86e2-f36ba2aae09a	Copper Mountain	\N	2014	2019-03-29 20:19:27.867516	2019-03-29 20:19:27.867516	\N	\N	\N
2289	2015-02-19 00:00:00	2015-02-20 00:00:00	United States	Copper Mountain, Colorado	Convention	2015	2015	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	18fd1a52-fc1d-4217-a562-10230bbf9c44	Copper Mountain	\N	2015	2019-03-29 20:19:27.888537	2019-03-29 20:19:27.888537	\N	\N	\N
2290	2016-02-25 00:00:00	2016-02-28 00:00:00	United States	Copper Mountain, Colorado	Convention	2016	2016	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	5bebd317-1cbc-40bf-9d8f-4d85ad648391	Copper Mountain	\N	2016	2019-03-29 20:19:27.913049	2019-03-29 20:19:27.913049	\N	\N	\N
2291	2017-02-09 00:00:00	2017-02-12 00:00:00	United States	Copper Mountain, Colorado	Convention	2017	2017	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	c7569277-1b3e-46bb-9d04-ac51180ad9af	Copper Mountain	\N	2017	2019-03-29 20:19:27.935594	2019-03-29 20:19:27.935594	\N	\N	\N
2292	2018-02-22 00:00:00	2018-02-25 00:00:00	United States	Copper Mountain, Colorado	Convention	2018	2018	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	c6f4c19a-8031-424c-a06c-ac4b0c919221	Copper Mountain	\N	2018	2019-03-29 20:19:27.954104	2019-03-29 20:19:27.954104	\N	\N	\N
2293	2019-02-21 00:00:00	2019-02-24 00:00:00	United States	Copper Mountain, Colorado	Convention	2019	2019	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	f904e63f-9e51-49b1-a5f0-f6bab14c973f	Copper Mountain	\N	2019	2019-03-29 20:19:27.972702	2019-03-29 20:19:27.972702	\N	\N	\N
2294	2001-03-02 00:00:00	2001-03-04 00:00:00	United States	Orlando, Florida	Convention	2001	2001	1b4c147b-c2a0-468b-a4c7-d56655220b4e	6c760a0d-b704-4487-90ba-80938c2abd1e	Unknown	\N	2001	2019-03-29 20:19:27.989286	2019-03-29 20:19:27.989286	\N	\N	\N
2295	2016-07-23 00:00:00	2016-07-23 00:00:00	China	Huangpu District, Shanghai	Convention	2016	2016	53072c4a-0bf3-49a6-8b61-a163a82e24d5	2b10426c-7131-44b8-bdb6-b77d27268610	Leopard Hotel	\N	2016	2019-03-29 20:19:31.014319	2019-03-29 20:19:31.014319	\N	\N	\N
2296	2017-07-22 00:00:00	2017-07-22 00:00:00	China	Tianhe, Guangzhou	Convention	2017	2017	53072c4a-0bf3-49a6-8b61-a163a82e24d5	8aa417e9-0722-4eae-8d7a-b8372b4cd3c6	Fashion Tianhe Plaza Underground Mall	\N	2017	2019-03-29 20:19:33.469752	2019-03-29 20:19:33.469752	\N	\N	\N
2297	2018-08-04 00:00:00	2018-08-04 00:00:00	China	Baiyun Qu, Guangzhou Shi	Convention	2018	2018	f34555de-e768-4cab-a3e0-8dbf067ef88a	62260631-45cd-4861-98a0-d3c78ecb364f	Guangzhou Baiyun International Convention Center	\N	2018	2019-03-29 20:19:33.486573	2019-03-29 20:19:33.486573	\N	\N	\N
2298	2014-08-01 00:00:00	2014-08-03 00:00:00	Mexico	Mexico City	Convention	2014	2014	f0a9821c-db95-449c-9dc0-2ffb10da3a7a	466772c8-9360-4f06-a170-bfbf876a9a8b	Various Locations	\N	2014	2019-03-29 20:19:35.899832	2019-03-29 20:19:35.899832	\N	\N	\N
2299	2015-07-17 00:00:00	2015-07-19 00:00:00	Mexico	Mexico City	Convention	2015	2015	f0a9821c-db95-449c-9dc0-2ffb10da3a7a	959b1ecf-2195-4f03-a33b-20c05cb77bfa	Various Locations	\N	2015	2019-03-29 20:19:38.533825	2019-03-29 20:19:38.533825	\N	\N	\N
2300	2016-07-22 00:00:00	2016-07-24 00:00:00	Mexico	Mexico City	Convention	2016	2016	f0a9821c-db95-449c-9dc0-2ffb10da3a7a	790fc62d-3358-4502-9ede-75f5521b2c64	Various Locations	\N	2016	2019-03-29 20:19:38.550378	2019-03-29 20:19:38.550378	\N	\N	\N
2301	2017-07-29 00:00:00	2017-07-30 00:00:00	Mexico	Mexico City	Convention	2017	2017	f0a9821c-db95-449c-9dc0-2ffb10da3a7a	f2040b74-58b3-45c7-bcf9-9bae29f79346	Various Locations	\N	2017	2019-03-29 20:19:38.567736	2019-03-29 20:19:38.567736	\N	\N	\N
2302	2018-07-27 00:00:00	2018-07-29 00:00:00	Mexico	Mexico City	Convention	2018	2018	f0a9821c-db95-449c-9dc0-2ffb10da3a7a	7a945eab-a6d5-49c1-969a-c3895bbfdc41	Various Locations	\N	2018	2019-03-29 20:19:38.583202	2019-03-29 20:19:38.583202	\N	\N	\N
2303	2004-02-13 00:00:00	2004-02-15 00:00:00	United States	Atlanta, Georgia	Convention	2004	FWA 2004	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	d7b5f9e6-547a-47a8-a195-c16d326acdb8	Holiday Inn Atlanta Airport North	270	fwa-2004	2019-03-29 20:19:38.606392	2019-03-29 20:19:38.606392	\N	\N	\N
2304	2005-02-11 00:00:00	2005-02-13 00:00:00	United States	Atlanta, Georgia	Convention	2005	FWA 2005	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	fbe2dd29-da04-4fb7-849d-3ef93cefccb3	Holiday Inn Atlanta Airport North	500	fwa-2005	2019-03-29 20:19:41.492786	2019-03-29 20:19:41.492786	\N	\N	\N
2305	2006-02-17 00:00:00	2006-02-19 00:00:00	United States	Atlanta, Georgia	Convention	2006	FWA 2006	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	540ed9a4-9a72-4265-96e2-2bdba6ef3a7d	Holiday Inn Atlanta Airport North	563	fwa-2006	2019-03-29 20:19:41.519885	2019-03-29 20:19:41.519885	\N	\N	\N
2306	2007-02-16 00:00:00	2007-02-18 00:00:00	United States	Atlanta, Georgia	Convention	2007	FWA 2007	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	7363486e-818e-483f-beda-21b497665986	Sheraton Atlanta Airport Hotel	762	fwa-2007	2019-03-29 20:19:41.545931	2019-03-29 20:19:41.545931	\N	\N	\N
2307	2008-02-15 00:00:00	2008-02-17 00:00:00	United States	Atlanta, Georgia	Convention	2008	FWA 2008	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	ad6eccfa-a85b-46aa-9767-617cce3a00ce	Sheraton Atlanta Airport Hotel	1	fwa-2008	2019-03-29 20:19:41.567691	2019-03-29 20:19:41.567691	\N	\N	\N
2308	2009-03-19 00:00:00	2009-03-22 00:00:00	United States	Atlanta, Georgia	Convention	2009	FWA 2009	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	b9e3bfa6-6f1f-4f4f-a6f0-427a6c186cef	Hilton Atlanta Downtown	1	fwa-2009	2019-03-29 20:19:41.584352	2019-03-29 20:19:41.584352	\N	\N	\N
2309	2010-03-25 00:00:00	2010-03-28 00:00:00	United States	Atlanta, Georgia	Convention	2010	FWA 2010	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	986e99a2-3bde-4906-936e-21e0ead6389d	Hilton Atlanta Downtown	1	fwa-2010	2019-03-29 20:19:41.608796	2019-03-29 20:19:41.608796	\N	\N	\N
2310	2011-03-17 00:00:00	2011-03-21 00:00:00	United States	Atlanta, Georgia	Convention	2011	FWA 2011	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	3c72f38f-5476-44f8-a5cc-8dfa5240d4d7	Sheraton Atlanta Hotel	1	fwa-2011	2019-03-29 20:19:41.628059	2019-03-29 20:19:41.628059	\N	\N	\N
2311	2012-03-15 00:00:00	2012-03-19 00:00:00	United States	Atlanta, Georgia	Convention	2012	FWA 2012	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	aa78e102-7b22-43ef-9131-879c80f74de4	Sheraton Atlanta Hotel	1	fwa-2012	2019-03-29 20:19:41.648053	2019-03-29 20:19:41.648053	\N	\N	\N
2312	2013-03-14 00:00:00	2013-03-17 00:00:00	United States	Atlanta, Georgia	Convention	2013	FWA 2013	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	f1b0a56e-cb3a-4217-9df6-b61df1530520	Westin Peachtree Plaza	1	fwa-2013	2019-03-29 20:19:41.671499	2019-03-29 20:19:41.671499	\N	\N	\N
2313	2014-03-20 00:00:00	2014-03-23 00:00:00	United States	Atlanta, Georgia	Convention	2014	FWA 2014	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	be85a59e-7571-4092-a441-21442fc4db6a	Westin Peachtree Plaza	1	fwa-2014	2019-03-29 20:19:41.694697	2019-03-29 20:19:41.694697	\N	\N	\N
2314	2015-04-09 00:00:00	2015-04-12 00:00:00	United States	Atlanta, Georgia	Convention	2015	FWA 2015	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	1b59e4b1-f66a-4c49-a8d2-837e490b9d10	Atlanta Marriott Marquis	2	fwa-2015	2019-03-29 20:19:41.725324	2019-03-29 20:19:41.725324	\N	\N	\N
2315	2016-03-31 00:00:00	2016-04-03 00:00:00	United States	Atlanta, Georgia	Convention	2016	FWA 2016	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	6a7b39fd-152c-40da-910a-6ff27fc7ede5	Atlanta Marriott Marquis	3	fwa-2016	2019-03-29 20:19:41.749913	2019-03-29 20:19:41.749913	\N	\N	\N
2316	2017-04-06 00:00:00	2017-04-09 00:00:00	United States	Atlanta, Georgia	Convention	2017	FWA 2017	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	6e038dce-8788-464e-a8a2-e21337a3e771	Atlanta Marriott Marquis	4	fwa-2017	2019-03-29 20:19:41.778854	2019-03-29 20:19:41.778854	\N	\N	\N
2317	2018-04-05 00:00:00	2018-04-08 00:00:00	United States	Atlanta, Georgia	Convention	2018	FWA 2018	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	8c3f8da6-8d9d-418b-837d-c0f135ed4d1e	Atlanta Marriott Marquis	5	fwa-2018	2019-03-29 20:19:41.797585	2019-03-29 20:19:41.797585	\N	\N	\N
2318	2019-05-09 00:00:00	2019-05-13 00:00:00	United States	Atlanta, Georgia	Convention	2019	FWA 2019	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	f14d921e-2298-4af2-8e73-344b38c8745a	Atlanta Marriott Marquis Hotel	6	fwa-2019	2019-03-29 20:19:41.815871	2019-03-29 20:19:41.815871	\N	\N	\N
2319	2013-08-30 00:00:00	2013-09-01 00:00:00	United States	Salt Lake City, Utah	Convention	2013	2013	731c2764-b885-437e-9ed3-8b21391cad54	7e2683cb-977a-42c6-b7a3-968418762bc0	Salt Lake City Radisson Hotel	\N	2013	2019-03-29 20:19:41.831902	2019-03-29 20:19:41.831902	\N	\N	\N
2320	2014-10-31 00:00:00	2014-11-02 00:00:00	United States	Salt Lake City, Utah	Convention	2014	2014	731c2764-b885-437e-9ed3-8b21391cad54	2d65fa87-5d36-4e3c-baa2-d6aa2575984b	Salt Lake City Radisson Hotel	\N	2014	2019-03-29 20:19:44.489656	2019-03-29 20:19:44.489656	\N	\N	\N
2321	2015-10-30 00:00:00	2015-11-01 00:00:00	United States	Salt Lake City, Utah	Convention	2015	2015	731c2764-b885-437e-9ed3-8b21391cad54	00d506ff-922c-4124-8dfb-d74bc6a50601	Salt Lake City Radisson Hotel	\N	2015	2019-03-29 20:19:44.511681	2019-03-29 20:19:44.511681	\N	\N	\N
2322	2017-08-17 00:00:00	2017-08-20 00:00:00	United States	King of Prussia, Pennsylvania	Convention	2017	2017	73dc92e7-49bc-4df3-93bf-79fffc93e925	e7c087e7-1fdc-439d-a986-2f1b08260a4b	DoubleTree Valley Forge Hotel	903	2017	2019-03-29 20:19:44.539808	2019-03-29 20:19:44.539808	\N	\N	\N
2323	2018-08-10 00:00:00	2018-08-12 00:00:00	United States	King of Prussia, Pennsylvania	Convention	2018	2018	73dc92e7-49bc-4df3-93bf-79fffc93e925	adfe3a53-c87f-43d1-813b-2aaf5e49d0e9	DoubleTree Valley Forge Hotel	\N	2018	2019-03-29 20:19:47.350758	2019-03-29 20:19:47.350758	\N	\N	\N
2324	2019-08-16 00:00:00	2019-08-18 00:00:00	United States	King of Prussia, Pennsylvania	Convention	2019	2019	73dc92e7-49bc-4df3-93bf-79fffc93e925	a5d6ac9e-3bb7-4624-b791-546bd7f000e5	Valley Forge Casino Resort Radisson Hotel	\N	2019	2019-03-29 20:19:47.371928	2019-03-29 20:19:47.371928	\N	\N	\N
2325	2018-05-19 00:00:00	2018-05-20 00:00:00	Philippines	Manila, Philippines	Convention	2018	2018	1c563c78-0ae0-43b8-a9b7-7565bcb0ee37	9ee8945c-748f-40a5-a51c-60079f406a88	SMX Convention Center	1	2018	2019-03-29 20:19:47.390737	2019-03-29 20:19:47.390737	\N	\N	\N
2326	2019-06-08 00:00:00	2019-06-09 00:00:00	Philippines	Manila, Philippines	Convention	2019	2019	1c563c78-0ae0-43b8-a9b7-7565bcb0ee37	90341efc-ec73-4592-a2c6-567061b0e942	Bayanihan Center	\N	2019	2019-03-29 20:19:50.291049	2019-03-29 20:19:50.291049	\N	\N	\N
2327	2008-12-30 00:00:00	2009-01-01 00:00:00	Netherlands	Geel	Convention	2009	2008	5a85bfab-ed93-474a-ba2c-041f985154bb	1cf341c6-fc50-4658-8665-de75dba9bbca	Various Locations	28	2008	2019-03-29 20:19:50.321077	2019-03-29 20:19:50.321077	\N	\N	\N
2328	2009-12-30 00:00:00	2010-01-01 00:00:00	Netherlands	Evertsoord	Convention	2010	2009	c4cdc2c6-4189-485c-bcfa-b17a5acaeed6	d4c91967-4380-4894-9eea-847a5b3c6d08	Various Locations	39	2009	2019-03-29 20:19:53.004457	2019-03-29 20:19:53.004457	\N	\N	\N
2329	2010-12-30 00:00:00	2011-01-01 00:00:00	Netherlands	Evertsoord	Convention	2011	2010	c4cdc2c6-4189-485c-bcfa-b17a5acaeed6	7ed20163-19c9-4b60-b1b2-dbe135047f88	Various Locations	53	2010	2019-03-29 20:19:55.543734	2019-03-29 20:19:55.543734	\N	\N	\N
2330	2011-12-30 00:00:00	2012-01-01 00:00:00	Netherlands	Evertsoord	Convention	2012	2011	c4cdc2c6-4189-485c-bcfa-b17a5acaeed6	ec755333-10c2-46d5-abdd-ee3fd13b2efa	Various Locations	66	2011	2019-03-29 20:19:55.560918	2019-03-29 20:19:55.560918	\N	\N	\N
2331	2012-12-30 00:00:00	2013-01-01 00:00:00	Netherlands	Evertsoord	Convention	2013	2012	c4cdc2c6-4189-485c-bcfa-b17a5acaeed6	516c7d96-e873-41a0-af35-550a7be50380	Various Locations	\N	2012	2019-03-29 20:19:55.587277	2019-03-29 20:19:55.587277	\N	\N	\N
2332	2015-12-19 00:00:00	2015-12-20 00:00:00	Malaysia	Balakong, Selangor	Convention	2015	2015	340265a6-a517-4324-afc3-9db4d401c474	43b12020-a781-46be-a28d-fa489b5ba07f	Mines Wellness Hotel	\N	2015	2019-03-29 20:19:55.606586	2019-03-29 20:19:55.606586	\N	\N	\N
2333	2016-12-10 00:00:00	2016-12-11 00:00:00	Malaysia	Petaling Jaya, Selangor	Convention	2016	2016	340265a6-a517-4324-afc3-9db4d401c474	b9b84b09-4568-4dd9-a6ef-677729079957	Shah's Village Hotel	\N	2016	2019-03-29 20:19:58.346008	2019-03-29 20:19:58.346008	\N	\N	\N
2334	2017-12-09 00:00:00	2017-12-10 00:00:00	Malaysia	Petaling Jaya, Selangor	Convention	2017	2017	340265a6-a517-4324-afc3-9db4d401c474	daaa0a57-026a-475a-b182-107614b78e9a	Hotel Armada	\N	2017	2019-03-29 20:19:58.365772	2019-03-29 20:19:58.365772	\N	\N	\N
2335	2018-12-08 00:00:00	2018-12-09 00:00:00	Malaysia	Petaling Jaya, Selangor	Convention	2018	2018	340265a6-a517-4324-afc3-9db4d401c474	0dfb7243-53d9-4879-a2e4-d71d478854b7	Hotel Armada	\N	2018	2019-03-29 20:19:58.383785	2019-03-29 20:19:58.383785	\N	\N	\N
2336	2019-12-14 00:00:00	2019-12-15 00:00:00	Malaysia	Petaling Jaya, Selangor	Convention	2019	2019	340265a6-a517-4324-afc3-9db4d401c474	f9a36d34-7ed1-45fa-9974-fb752bcaf5e2	Hotel Armada	\N	2019	2019-03-29 20:19:58.407309	2019-03-29 20:19:58.407309	\N	\N	\N
2337	2016-03-18 00:00:00	2016-03-20 00:00:00	United States	Hampton, Virginia	Convention	2016	2016	af17d66f-5459-422b-98cf-7b42ffa656df	2599d8d5-9cfd-4589-a306-faadcbb83059	Hampton Roads Convention Center	\N	2016	2019-03-29 20:19:58.431344	2019-03-29 20:19:58.431344	\N	\N	\N
2338	2017-10-12 00:00:00	2017-10-15 00:00:00	United States	Virginia Beach, Virginia	Convention	2017	2017	af17d66f-5459-422b-98cf-7b42ffa656df	274af74e-4562-450d-ac2a-c483b62373c3	Holiday Inn Virginia Beach/Norfolk	\N	2017	2019-03-29 20:20:01.098667	2019-03-29 20:20:01.098667	\N	\N	\N
2339	2018-09-06 00:00:00	2018-09-09 00:00:00	United States	Virginia Beach, Virginia	Convention	2018	2018	af17d66f-5459-422b-98cf-7b42ffa656df	a6733b38-85d3-4176-b300-d91ae2a912ec	Holiday Inn Virginia Beach Norfolk Hotel and Conference Center	\N	2018	2019-03-29 20:20:01.13593	2019-03-29 20:20:01.13593	\N	\N	\N
2340	2019-09-05 00:00:00	2019-09-08 00:00:00	United States	Virginia Beach, Virginia	Convention	2019	2019	af17d66f-5459-422b-98cf-7b42ffa656df	12acd527-6b66-4b9a-bfe4-1c8b417a63b3	Holiday Inn Virginia Beach Norfolk Hotel and Conference Center	\N	2019	2019-03-29 20:20:01.18194	2019-03-29 20:20:01.18194	\N	\N	\N
2341	2018-09-08 00:00:00	2018-09-08 00:00:00	Thailand	Bangkok	Furmeet	2018	2018	f4abc6b6-300a-4eed-a823-10dc307eee6b	7f157ace-4ee1-4779-a27d-ca63eeafbc96	Market	\N	2018	2019-03-29 20:20:01.218728	2019-03-29 20:20:01.218728	\N	\N	\N
2342	2019-09-07 00:00:00	2019-09-07 00:00:00	Thailand	Bangkok	Furmeet	2019	2019	f4abc6b6-300a-4eed-a823-10dc307eee6b	502268bf-1b59-4bd2-9b76-515c7e58bf09	Market	\N	2019	2019-03-29 20:20:03.99646	2019-03-29 20:20:03.99646	\N	\N	\N
2343	2011-03-20 00:00:00	2011-03-20 00:00:00	Japan	Minato	Furmeet	2011	1	0b6493ff-2b54-4227-99de-96c752b0cecf	24c06137-1b9c-41bd-993e-d3bc6b767ef9	Tokyo Oroshishou (Wholesaler) Center 3F	\N	1	2019-03-29 20:20:04.01006	2019-03-29 20:20:04.01006	\N	\N	\N
2344	2011-10-09 00:00:00	2011-10-09 00:00:00	Japan	Minato	Furmeet	2011	2	0b6493ff-2b54-4227-99de-96c752b0cecf	99cc777f-d056-42ba-b606-7f1e9ea86f1a	Ota City Industrial Plaza "Pio" 	\N	2	2019-03-29 20:20:06.819676	2019-03-29 20:20:06.819676	\N	\N	\N
2345	2012-03-20 00:00:00	2012-03-20 00:00:00	Japan	Minato	Furmeet	2012	3	0b6493ff-2b54-4227-99de-96c752b0cecf	79096efa-94a8-450f-87f6-1ddec74a3e2a	Tokyo Metropol. Indust. Trade Center (Hamamatsuchou) 4F	\N	3	2019-03-29 20:20:06.839042	2019-03-29 20:20:06.839042	\N	\N	\N
2346	2012-10-06 00:00:00	2012-10-06 00:00:00	Japan	Minato	Furmeet	2012	4	0b6493ff-2b54-4227-99de-96c752b0cecf	5bef81cb-f34d-444e-b465-b456cbc9b4ba	Ota City Industrial Plaza "Pio" 	\N	4	2019-03-29 20:20:06.856714	2019-03-29 20:20:06.856714	\N	\N	\N
2347	2013-03-23 00:00:00	2013-03-23 00:00:00	Japan	Minato	Furmeet	2013	5	0b6493ff-2b54-4227-99de-96c752b0cecf	151df76e-ea50-414b-a4f9-8e40b526e568	Ota City Industrial Plaza "Pio" 	\N	5	2019-03-29 20:20:06.878428	2019-03-29 20:20:06.878428	\N	\N	\N
2348	2013-09-23 00:00:00	2013-09-23 00:00:00	Japan	Minato	Furmeet	2013	6	0b6493ff-2b54-4227-99de-96c752b0cecf	531e7a30-69c8-44e2-815a-7e48af52fa47	Tokyo Metropol. Indust. Trade Center (Taitou) 7F	\N	6	2019-03-29 20:20:06.900563	2019-03-29 20:20:06.900563	\N	\N	\N
2349	2014-03-01 00:00:00	2014-03-01 00:00:00	Japan	Minato	Furmeet	2014	7	0b6493ff-2b54-4227-99de-96c752b0cecf	f7520a76-6824-4825-acb9-ef68e87c9ec4	Ota City Industrial Plaza "Pio" 	\N	7	2019-03-29 20:20:06.919133	2019-03-29 20:20:06.919133	\N	\N	\N
2350	2014-10-18 00:00:00	2014-10-18 00:00:00	Japan	Minato	Furmeet	2014	8	0b6493ff-2b54-4227-99de-96c752b0cecf	b55a6995-f75f-4cf7-9170-37cba2d87831	Tokyo Oroshishou (Wholesaler) Center 3F	\N	8	2019-03-29 20:20:06.938642	2019-03-29 20:20:06.938642	\N	\N	\N
2351	2015-03-22 00:00:00	2015-03-22 00:00:00	Japan	Minato	Furmeet	2015	9	0b6493ff-2b54-4227-99de-96c752b0cecf	ffee54d5-0b07-481e-886c-087cced02941	Tokyo Oroshishou (Wholesaler) Center 3F	\N	9	2019-03-29 20:20:06.955562	2019-03-29 20:20:06.955562	\N	\N	\N
2352	2015-10-31 00:00:00	2015-10-31 00:00:00	Japan	Minato	Furmeet	2015	10	0b6493ff-2b54-4227-99de-96c752b0cecf	113d3919-a97c-4ead-939f-daa0df2eb118	Kawaguchi Frendia	\N	10	2019-03-29 20:20:06.977945	2019-03-29 20:20:06.977945	\N	\N	\N
2353	2016-03-21 00:00:00	2016-03-21 00:00:00	Japan	Minato	Furmeet	2016	11	0b6493ff-2b54-4227-99de-96c752b0cecf	9153b420-9587-49ee-8de6-f8c639eebcb6	Kawaguchi Frendia	\N	11	2019-03-29 20:20:06.994286	2019-03-29 20:20:06.994286	\N	\N	\N
2354	2016-10-29 00:00:00	2016-10-29 00:00:00	Japan	Minato	Furmeet	2016	12	0b6493ff-2b54-4227-99de-96c752b0cecf	d56fb801-0097-40f5-97e0-1fb6dc369d5c	Kawaguchi Frendia	\N	12	2019-03-29 20:20:07.010619	2019-03-29 20:20:07.010619	\N	\N	\N
2355	2017-03-18 00:00:00	2017-03-18 00:00:00	Japan	Minato	Furmeet	2017	13	0b6493ff-2b54-4227-99de-96c752b0cecf	b673c66f-a8fb-4f59-baca-4f4bdae7cb6f	Tokyo Metropol. Indust. Trade Center (Taitou) 7F	\N	13	2019-03-29 20:20:07.029701	2019-03-29 20:20:07.029701	\N	\N	\N
2356	2017-10-08 00:00:00	2017-10-08 00:00:00	Japan	Minato	Furmeet	2017	14	0b6493ff-2b54-4227-99de-96c752b0cecf	3b104a0e-3324-428d-9a7e-f1fdaafc6d8c	Tokyo Metropol. Indust. Trade Center (Taitou) 9F	\N	14	2019-03-29 20:20:07.046286	2019-03-29 20:20:07.046286	\N	\N	\N
2357	2011-12-30 00:00:00	2012-01-01 00:00:00	United States	Pennsylvania	Furmeet	2012	2011	5fb75a08-d3dc-4c76-a090-7e6400880e66	f7a217fe-6817-4d48-b00d-02ad6dcbf205	Philadelphia	\N	2011	2019-03-29 20:20:07.066955	2019-03-29 20:20:07.066955	\N	\N	\N
2358	2005-08-05 00:00:00	2005-08-06 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2005	2005	18b036ea-2171-4187-a586-0986f263ab96	9d2c4e1c-729d-4f52-a81c-8bf345de69f7	Kostrzyn nad Odrą	\N	2005	2019-03-29 20:20:09.860252	2019-03-29 20:20:09.860252	\N	\N	\N
2359	2006-07-28 00:00:00	2006-07-29 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2006	2006	18b036ea-2171-4187-a586-0986f263ab96	e8b73ab5-ea19-4220-b7af-2bc48c51a6d8	Kostrzyn nad Odrą	\N	2006	2019-03-29 20:20:13.431318	2019-03-29 20:20:13.431318	\N	\N	\N
2360	2007-08-03 00:00:00	2007-08-04 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2007	2007	18b036ea-2171-4187-a586-0986f263ab96	00033388-439c-45e1-b563-a102ab8caaee	Kostrzyn nad Odrą	\N	2007	2019-03-29 20:20:13.452086	2019-03-29 20:20:13.452086	\N	\N	\N
2361	2008-08-01 00:00:00	2008-08-03 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2008	2008	18b036ea-2171-4187-a586-0986f263ab96	2fb74b32-9bd2-4ac5-80cd-26c9962b4087	Kostrzyn nad Odrą	\N	2008	2019-03-29 20:20:13.472919	2019-03-29 20:20:13.472919	\N	\N	\N
2362	2009-07-31 00:00:00	2009-08-02 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2009	2009	18b036ea-2171-4187-a586-0986f263ab96	2514c302-0f4b-44f9-bc96-2fc7f29f8e9a	Kostrzyn nad Odrą	\N	2009	2019-03-29 20:20:13.491124	2019-03-29 20:20:13.491124	\N	\N	\N
2363	2010-07-30 00:00:00	2010-08-01 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2010	2010	18b036ea-2171-4187-a586-0986f263ab96	69dc2ce8-245b-4622-91a8-6420d0308878	Kostrzyn nad Odrą	\N	2010	2019-03-29 20:20:13.509581	2019-03-29 20:20:13.509581	\N	\N	\N
2364	2011-08-04 00:00:00	2011-08-06 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2011	2011	18b036ea-2171-4187-a586-0986f263ab96	6cb5959d-da7f-44a5-bdbe-81a5d7210704	Kostrzyn nad Odrą	\N	2011	2019-03-29 20:20:13.529011	2019-03-29 20:20:13.529011	\N	\N	\N
2365	2012-08-02 00:00:00	2012-08-04 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2012	2012	18b036ea-2171-4187-a586-0986f263ab96	e1a9780c-55e2-4523-9f94-51e32ab4d06b	Kostrzyn nad Odrą	\N	2012	2019-03-29 20:20:13.549891	2019-03-29 20:20:13.549891	\N	\N	\N
2366	2013-08-01 00:00:00	2013-08-03 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2013	2013	18b036ea-2171-4187-a586-0986f263ab96	ef8ef7b2-0a78-48c7-984c-ee902d1c8644	Kostrzyn nad Odrą	\N	2013	2019-03-29 20:20:13.572532	2019-03-29 20:20:13.572532	\N	\N	\N
2367	2014-07-31 00:00:00	2014-08-02 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2014	2014	18b036ea-2171-4187-a586-0986f263ab96	d214de12-a27c-4fc2-ba3e-901706e5f979	Kostrzyn nad Odrą	\N	2014	2019-03-29 20:20:13.592652	2019-03-29 20:20:13.592652	\N	\N	\N
2368	2015-07-30 00:00:00	2015-08-03 00:00:00	Poland	Gorzów County, Lubusz Voivodeship	Convention	2015	2015	18b036ea-2171-4187-a586-0986f263ab96	a713ef0f-fae8-443d-91ce-7f805dc2327d	Kostrzyn nad Odrą	\N	2015	2019-03-29 20:20:13.61201	2019-03-29 20:20:13.61201	\N	\N	\N
2369	2015-06-20 00:00:00	2015-06-20 00:00:00	Brazil	Rio de Janeiro, Rio de Janeiro	Furmeet	2015	1	47bd69b9-7455-425a-ac72-f06e922b26b1	f22fee60-118a-490c-921c-768231afc943	Boliche Social Club, Norte Shopping	14	1	2019-03-29 20:20:13.641697	2019-03-29 20:20:13.641697	\N	\N	\N
2370	2017-02-25 00:00:00	2017-02-25 00:00:00	Brazil	Rio de Janeiro, Rio de Janeiro	Furmeet	2017	2	47bd69b9-7455-425a-ac72-f06e922b26b1	63f0dee0-46dd-4f98-8a0b-f4392f6e7639	Boliche Social Club, Norte Shopping	30	2	2019-03-29 20:20:16.370709	2019-03-29 20:20:16.370709	\N	\N	\N
2371	2017-12-02 00:00:00	2017-12-02 00:00:00	Brazil	Rio de Janeiro, Rio de Janeiro	Furmeet	2017	3	47bd69b9-7455-425a-ac72-f06e922b26b1	53fc30e6-1e49-4f79-8738-ed56db6ca384	Boliche Social Club, Norte Shopping	93	3	2019-03-29 20:20:16.389162	2019-03-29 20:20:16.389162	\N	\N	\N
2372	2018-05-05 00:00:00	2018-05-05 00:00:00	Brazil	Rio de Janeiro, Rio de Janeiro	Furmeet	2018	4	47bd69b9-7455-425a-ac72-f06e922b26b1	7de19b61-5931-4ed2-9b7a-0d8af8f0603f	Boliche Social Club, Norte Shopping	107	4	2019-03-29 20:20:16.404413	2019-03-29 20:20:16.404413	\N	\N	\N
2373	2018-10-13 00:00:00	2018-10-13 00:00:00	Brazil	Rio de Janeiro, Rio de Janeiro	Furmeet	2018	5	47bd69b9-7455-425a-ac72-f06e922b26b1	07efcfc0-61ef-4379-a9f5-50b0b368e0c5	Boliche Social Club, Norte Shopping	0	5	2019-03-29 20:20:16.421399	2019-03-29 20:20:16.421399	\N	\N	\N
2374	2011-07-07 00:00:00	2011-07-11 00:00:00	Denmark	Aalborg	Convention	2011	2011	a65b89ad-31ef-4460-b78e-c7bbc06578df	c581ab41-0e83-4ffa-957e-f5472adf7da9	Scout Hut	\N	2011	2019-03-29 20:20:16.439731	2019-03-29 20:20:16.439731	\N	\N	\N
2375	2012-07-12 00:00:00	2012-07-16 00:00:00	Denmark	Aalborg	Convention	2012	2012	a65b89ad-31ef-4460-b78e-c7bbc06578df	1abcdf44-d899-482a-9fcb-2ea8b6468028	Scout Hut	\N	2012	2019-03-29 20:20:19.223398	2019-03-29 20:20:19.223398	\N	\N	\N
2376	2013-07-04 00:00:00	2013-07-08 00:00:00	Denmark	Aalborg	Convention	2013	2013	a65b89ad-31ef-4460-b78e-c7bbc06578df	06558b3d-f271-49e8-a4b5-13717f028e76	Scout Hut	\N	2013	2019-03-29 20:20:19.245667	2019-03-29 20:20:19.245667	\N	\N	\N
2377	2014-07-10 00:00:00	2014-07-13 00:00:00	Denmark	Aalborg	Convention	2014	2014	a65b89ad-31ef-4460-b78e-c7bbc06578df	26d796bb-ad9f-4cb7-bf4a-f669c5e273ce	Scout Hut	\N	2014	2019-03-29 20:20:19.277968	2019-03-29 20:20:19.277968	\N	\N	\N
2378	2015-07-22 00:00:00	2015-07-25 00:00:00	Denmark	Hundslund	Convention	2015	2015	a65b89ad-31ef-4460-b78e-c7bbc06578df	c8c36896-fecc-4f3e-bbba-db982c58a724	Camp of Olufsborg	\N	2015	2019-03-29 20:20:19.301726	2019-03-29 20:20:19.301726	\N	\N	\N
2379	2016-07-04 00:00:00	2016-07-07 00:00:00	Denmark	Hundslund	Convention	2016	2016	a65b89ad-31ef-4460-b78e-c7bbc06578df	bad177ec-aab7-4f18-bc9e-9baa4572a975	Camp of Olufsborg	\N	2016	2019-03-29 20:20:19.315618	2019-03-29 20:20:19.315618	\N	\N	\N
2380	2017-07-10 00:00:00	2017-07-13 00:00:00	Denmark	Hundslund	Convention	2017	2017	a65b89ad-31ef-4460-b78e-c7bbc06578df	1208411d-f934-4887-b06a-8d5dc3d7ac63	Camp of Olufsborg	\N	2017	2019-03-29 20:20:19.335363	2019-03-29 20:20:19.335363	\N	\N	\N
2381	2018-07-09 00:00:00	2018-07-13 00:00:00	Denmark	Hundslund	Convention	2018	2018	a65b89ad-31ef-4460-b78e-c7bbc06578df	b023f6b4-68c2-438b-b579-b2d0a5110b9c	Camp of Olufsborg	\N	2018	2019-03-29 20:20:19.35371	2019-03-29 20:20:19.35371	\N	\N	\N
2382	2019-07-08 00:00:00	2019-07-12 00:00:00	Denmark	Jutland	Convention	2019	2019	a65b89ad-31ef-4460-b78e-c7bbc06578df	dc0e1717-4373-4816-b513-4ade35ea143f	Fjeldholmlejren	\N	2019	2019-03-29 20:20:19.37124	2019-03-29 20:20:19.37124	\N	\N	\N
2383	1994-11-18 00:00:00	1994-11-20 00:00:00	United States	Philadelphia, Pennsylvania	Convention	1994	1994	dc914c2b-9912-48bc-8696-2180e2e80bb7	0c60a91e-9c68-4c90-8b74-a87f46193b30	Holiday Inn (Next to Adam's Mark Hotel)	\N	1994	2019-03-29 20:20:19.388438	2019-03-29 20:20:19.388438	\N	\N	\N
2384	1999-01-14 00:00:00	1999-01-17 00:00:00	United States	Santa Clara, California	Convention	1999	1999	11e2c53b-bac8-4c7b-a881-03d31d9e6345	fdb0055e-f1fc-4da1-96ef-3ae75c0fab78	Hyatt Regency	\N	1999	2019-03-29 20:20:22.040943	2019-03-29 20:20:22.040943	\N	\N	\N
2385	2000-01-27 00:00:00	2000-01-30 00:00:00	United States	San Mateo, California	Convention	2000	2000	11e2c53b-bac8-4c7b-a881-03d31d9e6345	085ec07a-828c-4348-9bbf-f9ae849cf9a2	Marriott Hotel	\N	2000	2019-03-29 20:20:24.972645	2019-03-29 20:20:24.972645	\N	\N	\N
2386	2001-01-25 00:00:00	2001-01-28 00:00:00	United States	San Mateo, California	Convention	2001	2001	11e2c53b-bac8-4c7b-a881-03d31d9e6345	d9afc198-42cc-41a7-aff2-f96dbefa8233	Marriott Hotel	\N	2001	2019-03-29 20:20:24.996412	2019-03-29 20:20:24.996412	\N	\N	\N
2387	2002-01-24 00:00:00	2002-01-27 00:00:00	United States	San Mateo, California	Convention	2002	2002	11e2c53b-bac8-4c7b-a881-03d31d9e6345	898279b0-53d2-45e8-b9e7-9823f8461305	Marriott Hotel	\N	2002	2019-03-29 20:20:25.01869	2019-03-29 20:20:25.01869	\N	\N	\N
2388	2003-01-23 00:00:00	2003-01-27 00:00:00	United States	San Jose, California	Convention	2003	2003	11e2c53b-bac8-4c7b-a881-03d31d9e6345	fe299f1d-6cac-44c4-a3d0-7aa338b99c82	Doubletree Hotel	\N	2003	2019-03-29 20:20:25.040157	2019-03-29 20:20:25.040157	\N	\N	\N
2389	2004-01-22 00:00:00	2004-01-26 00:00:00	United States	San Jose, California	Convention	2004	2004	11e2c53b-bac8-4c7b-a881-03d31d9e6345	a772b9b5-b336-4b0a-af45-8496bbddea13	Doubletree Hotel	\N	2004	2019-03-29 20:20:25.064109	2019-03-29 20:20:25.064109	\N	\N	\N
2390	2005-01-13 00:00:00	2005-01-17 00:00:00	United States	San Jose, California	Convention	2005	2005	11e2c53b-bac8-4c7b-a881-03d31d9e6345	2b646485-2607-48b1-a750-1e2778aac005	Doubletree Hotel	\N	2005	2019-03-29 20:20:25.087144	2019-03-29 20:20:25.087144	\N	\N	\N
2391	2006-01-19 00:00:00	2006-01-23 00:00:00	United States	San Jose, California	Convention	2006	2006	11e2c53b-bac8-4c7b-a881-03d31d9e6345	0cfa959a-d381-4883-9827-0084ae0d5dc1	Doubletree Hotel	\N	2006	2019-03-29 20:20:25.107505	2019-03-29 20:20:25.107505	\N	\N	\N
2392	2007-01-18 00:00:00	2007-01-22 00:00:00	United States	San Jose, California	Convention	2007	2007	11e2c53b-bac8-4c7b-a881-03d31d9e6345	b858520a-1ba0-4c44-b424-e49b79dd78db	Doubletree Hotel	\N	2007	2019-03-29 20:20:25.127551	2019-03-29 20:20:25.127551	\N	\N	\N
2393	2008-01-24 00:00:00	2008-01-28 00:00:00	United States	San Jose, California	Convention	2008	2008	11e2c53b-bac8-4c7b-a881-03d31d9e6345	cb48b198-ca28-4c11-858a-308816f0f0e4	Doubletree Hotel	\N	2008	2019-03-29 20:20:25.150247	2019-03-29 20:20:25.150247	\N	\N	\N
2394	2009-01-22 00:00:00	2009-01-26 00:00:00	United States	San Jose, California	Convention	2009	2009	11e2c53b-bac8-4c7b-a881-03d31d9e6345	7261cb1e-59b7-4ad6-a58a-75768b77222b	Doubletree Hotel	\N	2009	2019-03-29 20:20:25.17238	2019-03-29 20:20:25.17238	\N	\N	\N
2395	2010-01-21 00:00:00	2010-01-25 00:00:00	United States	San Jose, California	Convention	2010	2010	11e2c53b-bac8-4c7b-a881-03d31d9e6345	a9bf094c-014e-442c-8c62-479d7430f8e4	Fairmont San Jose hotel	\N	2010	2019-03-29 20:20:25.192712	2019-03-29 20:20:25.192712	\N	\N	\N
2396	2011-01-13 00:00:00	2011-01-17 00:00:00	United States	San Jose, California	Convention	2011	2011	11e2c53b-bac8-4c7b-a881-03d31d9e6345	573db939-0bb2-4b8a-b770-1826612decca	Fairmont San Jose hotel	\N	2011	2019-03-29 20:20:25.219179	2019-03-29 20:20:25.219179	\N	\N	\N
2397	2012-01-12 00:00:00	2012-01-16 00:00:00	United States	San Jose, California	Convention	2012	2012	11e2c53b-bac8-4c7b-a881-03d31d9e6345	de4c95e7-29d6-4316-a5c4-65aed419857d	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2012	2019-03-29 20:20:25.263693	2019-03-29 20:20:25.263693	\N	\N	\N
2398	2013-01-17 00:00:00	2013-01-21 00:00:00	United States	San Jose, California	Convention	2013	2013	11e2c53b-bac8-4c7b-a881-03d31d9e6345	09efd24d-4775-4340-8d9b-4bb683f81e72	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2013	2019-03-29 20:20:25.286257	2019-03-29 20:20:25.286257	\N	\N	\N
2399	2014-01-16 00:00:00	2014-01-20 00:00:00	United States	San Jose, California	Convention	2014	2014	11e2c53b-bac8-4c7b-a881-03d31d9e6345	94138491-9f76-409b-b968-07c4ae88d745	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2014	2019-03-29 20:20:25.30837	2019-03-29 20:20:25.30837	\N	\N	\N
2400	2015-01-15 00:00:00	2015-01-19 00:00:00	United States	San Jose, California	Convention	2015	2015	11e2c53b-bac8-4c7b-a881-03d31d9e6345	f35afbbc-ef61-4f5a-8fd3-053cbe4534d6	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2015	2019-03-29 20:20:25.337702	2019-03-29 20:20:25.337702	\N	\N	\N
2401	2016-01-14 00:00:00	2016-01-18 00:00:00	United States	San Jose, California	Convention	2016	2016	11e2c53b-bac8-4c7b-a881-03d31d9e6345	ccdb1703-e7d5-434b-ab4a-59d4e014349b	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2016	2019-03-29 20:20:25.355372	2019-03-29 20:20:25.355372	\N	\N	\N
2402	2017-01-12 00:00:00	2017-01-16 00:00:00	United States	San Jose, California	Convention	2017	2017	11e2c53b-bac8-4c7b-a881-03d31d9e6345	e998ec9e-c406-4a53-b483-5f57cfc906ce	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2017	2019-03-29 20:20:25.371454	2019-03-29 20:20:25.371454	\N	\N	\N
2403	2018-01-11 00:00:00	2018-01-15 00:00:00	United States	San Jose, California	Convention	2018	2018	11e2c53b-bac8-4c7b-a881-03d31d9e6345	c00bab9f-9e34-4240-8670-ebef8da5cd9a	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2018	2019-03-29 20:20:25.390367	2019-03-29 20:20:25.390367	\N	\N	\N
2404	2019-01-17 00:00:00	2019-01-21 00:00:00	United States	San Jose, California	Convention	2019	2019	11e2c53b-bac8-4c7b-a881-03d31d9e6345	e73452d2-5831-4a16-a075-9eb6d6a72808	Convention Center (and Linked Mariott and Hilton Hotels)	\N	2019	2019-03-29 20:20:25.414441	2019-03-29 20:20:25.414441	\N	\N	\N
2405	2002-08-31 00:00:00	2002-09-02 00:00:00	Canada	Alberta	Furmeet	2002	2002	86d2defc-85d8-4778-8694-bd9bde8980e2	5454db38-a023-44fc-9793-3f6199fbfacd	Deer Creek Provincial Recreation Area	\N	2002	2019-03-29 20:20:25.447594	2019-03-29 20:20:25.447594	\N	\N	\N
2406	2003-08-02 00:00:00	2003-08-04 00:00:00	Canada	Alberta	Furmeet	2003	2003	86d2defc-85d8-4778-8694-bd9bde8980e2	316dab81-aa4c-4a50-a122-c9db097b4d34	Wildhay River Provincial Recreation Area	\N	2003	2019-03-29 20:20:28.159467	2019-03-29 20:20:28.159467	\N	\N	\N
2407	2004-03-27 00:00:00	2004-03-28 00:00:00	Canada	Alberta	Furmeet	2004	2004	86d2defc-85d8-4778-8694-bd9bde8980e2	e6766104-1568-42df-a8b0-3df149e3025c	Beauty Creek Wilderness Hostel, Jasper National Park	\N	2004	2019-03-29 20:20:28.175469	2019-03-29 20:20:28.175469	\N	\N	\N
2408	2004-07-31 00:00:00	2004-08-02 00:00:00	Canada	Hinton, Alberta	Furmeet	2004	2004	86d2defc-85d8-4778-8694-bd9bde8980e2	23448e17-fe49-47f4-af38-020c432f1d6d	Blue Lake Adventure Lodge	\N	2004-2	2019-03-29 20:20:28.195362	2019-03-29 20:20:28.195362	\N	\N	\N
2409	2005-03-25 00:00:00	2005-03-27 00:00:00	Canada	Jasper, Alberta	Furmeet	2005	2005	86d2defc-85d8-4778-8694-bd9bde8980e2	b2b073c9-7ad7-4216-8f0a-023037c19933	Athabasca Falls Hostel	\N	2005	2019-03-29 20:20:28.212258	2019-03-29 20:20:28.212258	\N	\N	\N
2410	2005-07-30 00:00:00	2005-08-01 00:00:00	Canada	Alberta	Furmeet	2005	2005	86d2defc-85d8-4778-8694-bd9bde8980e2	c5465586-16d9-4100-a173-0a5dfa20c596	Prairie Creek Provincial Recreation Area	\N	2005-2	2019-03-29 20:20:28.231788	2019-03-29 20:20:28.231788	\N	\N	\N
2411	2006-02-18 00:00:00	2006-02-20 00:00:00	Canada	Alberta	Furmeet	2006	2006	86d2defc-85d8-4778-8694-bd9bde8980e2	828cc92a-6e17-45fc-8db4-e1b0372b1031	Beauty Creek Wilderness Hostel, Jasper National Park	\N	2006	2019-03-29 20:20:28.251077	2019-03-29 20:20:28.251077	\N	\N	\N
2412	2006-08-05 00:00:00	2006-08-07 00:00:00	Canada	Alberta	Furmeet	2006	2006	86d2defc-85d8-4778-8694-bd9bde8980e2	9f82e5cc-ba59-46ba-b7a4-d232b544fdac	Deer Creek Provincial Recreation Area	\N	2006-2	2019-03-29 20:20:28.276875	2019-03-29 20:20:28.276875	\N	\N	\N
2413	2007-08-04 00:00:00	2007-08-06 00:00:00	Canada	Alberta	Furmeet	2007	2007	86d2defc-85d8-4778-8694-bd9bde8980e2	96cbae9e-f971-4425-9918-6dd429deeabf	Wild Horse Campsite	\N	2007	2019-03-29 20:20:28.297996	2019-03-29 20:20:28.297996	\N	\N	\N
2414	2008-02-16 00:00:00	2008-02-18 00:00:00	Canada	Alberta	Furmeet	2008	2008	86d2defc-85d8-4778-8694-bd9bde8980e2	792d7860-2540-429e-b855-b380fad19a2b	Beauty Creek Wilderness Hostel, Jasper National Park	\N	2008	2019-03-29 20:20:28.314004	2019-03-29 20:20:28.314004	\N	\N	\N
2415	2008-08-02 00:00:00	2008-08-04 00:00:00	Canada	Alberta	Furmeet	2008	2008	86d2defc-85d8-4778-8694-bd9bde8980e2	734cc4a7-4694-4466-84e8-a8ef18c8ff31	Deer Creek Provincial Recreation Area	\N	2008-2	2019-03-29 20:20:28.333345	2019-03-29 20:20:28.333345	\N	\N	\N
2416	2009-09-04 00:00:00	2009-09-06 00:00:00	Canada	Alberta	Furmeet	2009	2009	86d2defc-85d8-4778-8694-bd9bde8980e2	ebe27d44-b2b9-4652-b8f6-920a9c16a624	Wildhay River Provincial Recreation Area	\N	2009	2019-03-29 20:20:28.348267	2019-03-29 20:20:28.348267	\N	\N	\N
2417	2010-02-12 00:00:00	2010-02-15 00:00:00	Canada	Alberta	Furmeet	2010	2010	86d2defc-85d8-4778-8694-bd9bde8980e2	ab67805e-784f-4f39-a402-81625817bd52	Beauty Creek Wilderness Hostel, Jasper National Park	\N	2010	2019-03-29 20:20:28.366424	2019-03-29 20:20:28.366424	\N	\N	\N
2418	2010-07-30 00:00:00	2010-08-02 00:00:00	Canada	Alberta	Furmeet	2010	2010	86d2defc-85d8-4778-8694-bd9bde8980e2	0a11362c-27f3-46d5-b575-423a63933e00	Wildhay River Provincial Recreation Area	\N	2010-2	2019-03-29 20:20:28.382335	2019-03-29 20:20:28.382335	\N	\N	\N
2419	2011-09-02 00:00:00	2011-09-05 00:00:00	Canada	Alberta	Furmeet	2011	2011	86d2defc-85d8-4778-8694-bd9bde8980e2	3a679e31-4774-4e15-a1cc-8a99b30f78c9	Wildhay River Provincial Recreation Area	\N	2011	2019-03-29 20:20:28.401072	2019-03-29 20:20:28.401072	\N	\N	\N
2420	2012-08-03 00:00:00	2012-08-06 00:00:00	Canada	Alberta	Furmeet	2012	2012	86d2defc-85d8-4778-8694-bd9bde8980e2	e1766cc2-b5ee-433d-bcc0-73604eab0427	Deer Creek Provincial Recreation Area	\N	2012	2019-03-29 20:20:28.416882	2019-03-29 20:20:28.416882	\N	\N	\N
2421	2013-02-15 00:00:00	2013-02-18 00:00:00	Canada	Alberta	Furmeet	2013	2013	86d2defc-85d8-4778-8694-bd9bde8980e2	ed817e85-1611-4dc3-92d8-23bcb3aa8988	Beauty Creek Wilderness Hostel, Jasper National Park	\N	2013	2019-03-29 20:20:28.433658	2019-03-29 20:20:28.433658	\N	\N	\N
2422	2013-08-02 00:00:00	2013-08-05 00:00:00	Canada	Alberta	Furmeet	2013	2013	86d2defc-85d8-4778-8694-bd9bde8980e2	d4738460-605c-4c26-9e50-00c352f4c4b5	Wild Horse Campsite	\N	2013-2	2019-03-29 20:20:28.456286	2019-03-29 20:20:28.456286	\N	\N	\N
2423	2014-02-14 00:00:00	2014-02-17 00:00:00	Canada	Alberta	Furmeet	2014	2014	86d2defc-85d8-4778-8694-bd9bde8980e2	ad2da336-3fc2-4644-8d50-229d9fc21201	Beauty Creek Wilderness Hostel, Jasper National Park	\N	2014	2019-03-29 20:20:28.475619	2019-03-29 20:20:28.475619	\N	\N	\N
2424	2015-09-04 00:00:00	2015-09-07 00:00:00	Canada	Alberta	Furmeet	2015	2015	86d2defc-85d8-4778-8694-bd9bde8980e2	fe8dd4f0-1e57-40ff-a515-e5a5c870bd93	Wildhay River Provincial Recreation Area	\N	2015	2019-03-29 20:20:28.495298	2019-03-29 20:20:28.495298	\N	\N	\N
2425	2018-08-02 00:00:00	2018-08-06 00:00:00	Canada	Clearwater County, Alberta	Furmeet	2018	2018	86d2defc-85d8-4778-8694-bd9bde8980e2	a50c4b1f-bb8d-4032-b7bc-47d923814e75	Snow Creek Group Campground	\N	2018	2019-03-29 20:20:28.516481	2019-03-29 20:20:28.516481	\N	\N	\N
2426	2017-12-30 00:00:00	2018-01-01 00:00:00	Germany	Stuttgart	Convention	2018	2017	ff6bd515-d593-4266-8044-4609e06c6509	e5191486-022e-486d-9dcd-88cf9d1ca5ba	Jugendherberge Stuttgart Neckarpark	126	2017	2019-03-29 20:20:28.534154	2019-03-29 20:20:28.534154	\N	\N	\N
2427	2018-12-29 00:00:00	2019-01-01 00:00:00	Germany	Reutlingen	Convention	2019	2018	ff6bd515-d593-4266-8044-4609e06c6509	982cd8f0-31f8-43ff-b3d0-7b94572f7e63	Hotel Fortuna Reutlingen/Tübingen	212	2018	2019-03-29 20:20:37.166408	2019-03-29 20:20:37.166408	\N	\N	\N
2428	2019-12-28 00:00:00	2020-01-01 00:00:00	Germany	Reutlingen	Convention	2020	2019	ff6bd515-d593-4266-8044-4609e06c6509	b74bd1ae-69f1-4c03-a19b-8605b6ea267d	Hotel Fortuna Reutlingen/Tübingen	0	2019	2019-03-29 20:20:37.187385	2019-03-29 20:20:37.187385	\N	\N	\N
2429	2012-08-08 00:00:00	2012-08-11 00:00:00	Poland	Dzierzazna	Convention	2012	2012	19e783ee-b327-492a-926b-2318f878e179	b9fe4efa-9ced-4f64-8264-244432a86196	Training and Recreation Centre	\N	2012	2019-03-29 20:20:37.213189	2019-03-29 20:20:37.213189	\N	\N	\N
2430	2013-08-07 00:00:00	2013-08-10 00:00:00	Poland	Dzierzazna	Convention	2013	2013	19e783ee-b327-492a-926b-2318f878e179	ddb753d2-1fba-4235-8042-9d7f4ac1fc45	Training and Recreation Centre	\N	2013	2019-03-29 20:20:40.02191	2019-03-29 20:20:40.02191	\N	\N	\N
2431	2014-08-20 00:00:00	2014-08-23 00:00:00	Poland	Dzierzazna	Convention	2014	2014	19e783ee-b327-492a-926b-2318f878e179	b39cf568-55df-4383-952b-d24d8e19b978	Municipal Cultural Center	\N	2014	2019-03-29 20:20:40.039453	2019-03-29 20:20:40.039453	\N	\N	\N
2432	2015-08-05 00:00:00	2015-08-08 00:00:00	Poland	Bełchatów, Łódź Voivodeship	Convention	2015	2015	19e783ee-b327-492a-926b-2318f878e179	1c3f8d1b-0815-49a9-bc7a-958d1100a61d	Wawrzkowizna Sport and Recreation Facility	\N	2015	2019-03-29 20:20:40.054014	2019-03-29 20:20:40.054014	\N	\N	\N
2433	2016-08-10 00:00:00	2016-08-14 00:00:00	Poland	Bocheniec	Convention	2016	2016	19e783ee-b327-492a-926b-2318f878e179	c15f0e8f-a479-47ea-898a-70751f5e29b5	Ptaszyniec Recreation Centre	\N	2016	2019-03-29 20:20:40.070128	2019-03-29 20:20:40.070128	\N	\N	\N
2434	2017-08-09 00:00:00	2017-08-13 00:00:00	Poland	Bocheniec	Convention	2017	2017	19e783ee-b327-492a-926b-2318f878e179	492b43ac-8939-49b4-9671-e7581911b686	Ptaszyniec Recreation Centre	\N	2017	2019-03-29 20:20:40.08494	2019-03-29 20:20:40.08494	\N	\N	\N
2435	2018-08-15 00:00:00	2018-08-19 00:00:00	Poland	Bocheniec	Convention	2018	2018	19e783ee-b327-492a-926b-2318f878e179	80fe5aae-d65e-422f-aaac-e7a8b20d1014	Ptaszyniec Recreation Centre	\N	2018	2019-03-29 20:20:40.102138	2019-03-29 20:20:40.102138	\N	\N	\N
2436	2019-08-07 00:00:00	2019-08-11 00:00:00	Poland	Bocheniec	Convention	2019	2019	19e783ee-b327-492a-926b-2318f878e179	543adcd6-29bc-47f1-82bb-b3a0fd4774ec	Ptaszyniec Recreation Centre	\N	2019	2019-03-29 20:20:40.119949	2019-03-29 20:20:40.119949	\N	\N	\N
2437	2013-10-04 00:00:00	2013-10-06 00:00:00	Australia	Perth	Convention	2013	2013	7b5eb241-6c7d-4fd9-a07d-76c49d6afd92	344e334d-2a3c-4ffb-9a70-c3db7dfe6747	Rendezvous Studio Hotel	\N	2013	2019-03-29 20:20:40.138676	2019-03-29 20:20:40.138676	\N	\N	\N
2438	2014-10-03 00:00:00	2014-10-05 00:00:00	Australia	Perth	Convention	2014	2014	7b5eb241-6c7d-4fd9-a07d-76c49d6afd92	4721e1c6-bdd0-4d83-bb93-eee569507b7a	Ibis Styles Hotel	\N	2014	2019-03-29 20:20:42.721718	2019-03-29 20:20:42.721718	\N	\N	\N
2439	2015-10-02 00:00:00	2015-10-04 00:00:00	Australia	Perth	Convention	2015	2015	7b5eb241-6c7d-4fd9-a07d-76c49d6afd92	2b4ded1b-cb09-40da-8565-fd1ba6e8fb94	Ibis Styles Hotel	\N	2015	2019-03-29 20:20:42.74535	2019-03-29 20:20:42.74535	\N	\N	\N
2440	2016-09-30 00:00:00	2016-10-02 00:00:00	Australia	Perth	Convention	2016	2016	7b5eb241-6c7d-4fd9-a07d-76c49d6afd92	f3042ed1-eaf7-494b-857f-d544d951b79a	Great Southern Hotel	\N	2016	2019-03-29 20:20:42.76811	2019-03-29 20:20:42.76811	\N	\N	\N
2441	2008-09-26 00:00:00	2008-09-28 00:00:00	Poland	Łódź	Convention	2008	1	054198d6-e492-4810-a58b-bc3d820dbeb6	1f406090-abcc-4cd8-b8fa-145273bed43c	Dzierżązna	37	1	2019-03-29 20:20:42.787631	2019-03-29 20:20:42.787631	\N	\N	\N
2442	2009-08-13 00:00:00	2009-08-16 00:00:00	Poland	Łódź	Convention	2009	2	054198d6-e492-4810-a58b-bc3d820dbeb6	866d800b-130b-4b77-9d03-e6f2f54f0d30	Dzierżązna	\N	2	2019-03-29 20:20:46.872042	2019-03-29 20:20:46.872042	\N	\N	\N
2443	2010-08-11 00:00:00	2010-08-14 00:00:00	Poland	Łódź	Convention	2010	3	054198d6-e492-4810-a58b-bc3d820dbeb6	0d8eba0c-5078-4cdf-b755-7713f37b0a25	Dzierżązna	\N	3	2019-03-29 20:20:46.896106	2019-03-29 20:20:46.896106	\N	\N	\N
2444	2011-08-10 00:00:00	2011-08-13 00:00:00	Poland	Wawrzkowizna	Convention	2011	4	054198d6-e492-4810-a58b-bc3d820dbeb6	8e62002c-2bed-46ae-9687-c56325b051b0	Various Locations	\N	4	2019-03-29 20:20:46.918145	2019-03-29 20:20:46.918145	\N	\N	\N
2445	2018-03-10 00:00:00	2018-03-10 00:00:00	United States	Alameda, California	Convention	2018	2018	a347d087-7287-4a6f-ae0f-d4a939cbd998	c4b65277-e64b-472c-bb62-aea8fd43eba7	Faction Brewing	\N	2018	2019-03-29 20:20:46.939755	2019-03-29 20:20:46.939755	\N	\N	\N
2446	2019-02-23 00:00:00	2019-02-23 00:00:00	United States	Alameda, California	Convention	2019	2019	a347d087-7287-4a6f-ae0f-d4a939cbd998	ad4237f7-3403-4f68-a61d-ceb7319f412a	USS Hornet	\N	2019	2019-03-29 20:20:49.65379	2019-03-29 20:20:49.65379	\N	\N	\N
2447	2014-04-18 00:00:00	2014-04-20 00:00:00	United States	St. Louis, Missouri	Convention	2014	2014	b22011fc-b6a8-424e-8384-6a1479d61130	aceb7e60-e023-4db6-a72b-8c7a4521018d	Hampton Inn – Gateway Arch	\N	2014	2019-03-29 20:20:49.687218	2019-03-29 20:20:49.687218	\N	\N	\N
2448	2015-05-08 00:00:00	2015-05-10 00:00:00	United States	St. Louis, Missouri	Convention	2015	2015	b22011fc-b6a8-424e-8384-6a1479d61130	5c3daa54-dfa7-4495-aa34-1e8b34a3c833	Hotel Lumiere	\N	2015	2019-03-29 20:20:52.474175	2019-03-29 20:20:52.474175	\N	\N	\N
2449	2016-05-13 00:00:00	2016-05-15 00:00:00	United States	St. Louis, Missouri	Convention	2016	2016	b22011fc-b6a8-424e-8384-6a1479d61130	4594c753-6ff5-4ede-9d3b-936d882adb01	Hotel Lumiere	\N	2016	2019-03-29 20:20:52.51886	2019-03-29 20:20:52.51886	\N	\N	\N
2450	2017-09-16 00:00:00	2017-09-16 00:00:00	United States	Kirkwood, Kansas	Furmeet	2017	2017	b22011fc-b6a8-424e-8384-6a1479d61130	bf863f23-e373-437d-b481-eb2b18ec15f7	Greentree Park	\N	2017	2019-03-29 20:20:52.557138	2019-03-29 20:20:52.557138	\N	\N	\N
2451	2018-03-09 00:00:00	2018-03-11 00:00:00	United States	St. Louis, Missouri	Convention	2018	2018	b22011fc-b6a8-424e-8384-6a1479d61130	23285bee-4633-4bd9-ae1b-5ed2f6e3e1d6	DoubleTree Hotel	\N	2018	2019-03-29 20:20:52.585776	2019-03-29 20:20:52.585776	\N	\N	\N
2452	2019-03-01 00:00:00	2019-03-03 00:00:00	United States	St. Louis, Missouri	Convention	2019	2019	b22011fc-b6a8-424e-8384-6a1479d61130	be219ef0-d951-459d-9bc0-c5df4349769d	DoubleTree Hotel	\N	2019	2019-03-29 20:20:52.609757	2019-03-29 20:20:52.609757	\N	\N	\N
2453	2011-01-27 00:00:00	2011-01-30 00:00:00	Poland	Gdańsk	Convention	2011	2011	bc0736de-7986-435a-b5e7-d45f2cf77dda	f4caeb2f-83e8-457f-bd68-e7c27135b634	Hostel Bursztynek, Gdańsk	0	2011	2019-03-29 20:20:52.634625	2019-03-29 20:20:52.634625	\N	\N	\N
2454	2012-02-23 00:00:00	2012-02-26 00:00:00	Poland	Gdańsk	Convention	2012	2012	bc0736de-7986-435a-b5e7-d45f2cf77dda	7d09e3ce-9a3d-4dea-b108-bb7909367194	Hostel Bursztynek, Gdańsk	59	2012	2019-03-29 20:20:55.276355	2019-03-29 20:20:55.276355	\N	\N	\N
2455	2013-02-14 00:00:00	2013-02-17 00:00:00	Poland	Gdańsk	Convention	2013	2013	bc0736de-7986-435a-b5e7-d45f2cf77dda	e2102cfc-aa48-4fae-8150-e91d359934f1	Hostel Bursztynek, Gdańsk	74	2013	2019-03-29 20:20:55.29299	2019-03-29 20:20:55.29299	\N	\N	\N
2456	2014-02-20 00:00:00	2014-02-23 00:00:00	Poland	Gdańsk	Convention	2014	2014	bc0736de-7986-435a-b5e7-d45f2cf77dda	20a2c421-f5e9-4213-868e-e30c0bec93ec	Hotel Amber, Gdańsk	121	2014	2019-03-29 20:20:55.310956	2019-03-29 20:20:55.310956	\N	\N	\N
2457	2015-03-05 00:00:00	2015-03-08 00:00:00	Poland	Gdańsk	Convention	2015	2015	bc0736de-7986-435a-b5e7-d45f2cf77dda	0dcde66a-af5a-42f0-a8ce-17218808bccf	Hotel Amber, Gdańsk	157	2015	2019-03-29 20:20:55.327591	2019-03-29 20:20:55.327591	\N	\N	\N
2458	2016-03-09 00:00:00	2016-03-13 00:00:00	Poland	Gdańsk	Convention	2016	2016	bc0736de-7986-435a-b5e7-d45f2cf77dda	aa8c736a-1e0f-463f-943d-1c87848ccaf0	Hotel Amber, Gdańsk	178	2016	2019-03-29 20:20:55.347365	2019-03-29 20:20:55.347365	\N	\N	\N
2459	2017-03-01 00:00:00	2017-03-05 00:00:00	Poland	Gdańsk	Convention	2017	2017	bc0736de-7986-435a-b5e7-d45f2cf77dda	3a8c344d-932b-4f0f-8838-a24441691984	Hotel Amber, Gdańsk	252	2017	2019-03-29 20:20:55.363157	2019-03-29 20:20:55.363157	\N	\N	\N
2460	2018-02-21 00:00:00	2018-02-25 00:00:00	Poland	Rumia	Convention	2018	2018	bc0736de-7986-435a-b5e7-d45f2cf77dda	0e1d30fe-18b5-459a-af60-ea093744112f	Hotel Faltom, Rumia (near Gdańsk)	247	2018	2019-03-29 20:20:55.380312	2019-03-29 20:20:55.380312	\N	\N	\N
2461	2019-03-06 00:00:00	2019-03-10 00:00:00	Poland	Rumia	Convention	2019	2019	bc0736de-7986-435a-b5e7-d45f2cf77dda	7eb986cb-bcfb-42d8-afeb-dbc0a07503b3	Hotel Faltom, Rumia (near Gdańsk)	0	2019	2019-03-29 20:20:55.396076	2019-03-29 20:20:55.396076	\N	\N	\N
2462	2010-11-04 00:00:00	2010-11-07 00:00:00	Switzerland	Langenbruck	Convention	2010	2010	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	06e9e044-60dd-4bb7-b0a4-97eaa65ca12d	Baselbieter Chinderhus	\N	2010	2019-03-29 20:20:55.412632	2019-03-29 20:20:55.412632	\N	\N	\N
2463	2011-11-03 00:00:00	2011-11-06 00:00:00	Switzerland	Langenbruck	Convention	2011	2011	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	96e49f15-a016-4c8d-834a-d4a7f945dcd0	Chinderhus	\N	2011	2019-03-29 20:20:58.12753	2019-03-29 20:20:58.12753	\N	\N	\N
2464	2012-11-15 00:00:00	2012-11-18 00:00:00	Switzerland	Langenbruck	Convention	2012	2012	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	cb846fed-4bb2-4456-a57e-0f5a65fff13b	Chinderhus	\N	2012	2019-03-29 20:20:58.148805	2019-03-29 20:20:58.148805	\N	\N	\N
2465	2013-11-14 00:00:00	2013-11-17 00:00:00	Switzerland	Bernese Oberland	Convention	2013	2013	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	5cdd96ac-59d1-4715-a95d-e1db9075776b	Gruppenhaus Bärgsunne	\N	2013	2019-03-29 20:20:58.166495	2019-03-29 20:20:58.166495	\N	\N	\N
2466	2014-11-13 00:00:00	2014-11-16 00:00:00	Switzerland	Hasliberg	Convention	2014	2014	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	3b3ed2fc-90eb-4d68-926a-1b52da13ed53	Gruppenhaus C'est la Vie	\N	2014	2019-03-29 20:20:58.184718	2019-03-29 20:20:58.184718	\N	\N	\N
2467	2015-10-29 00:00:00	2015-11-01 00:00:00	Switzerland	Hasliberg	Convention	2015	2015	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	5ef2d5b9-466d-4a1c-a648-8179114f626e	Gruppenhaus C'est la Vie	\N	2015	2019-03-29 20:20:58.20425	2019-03-29 20:20:58.20425	\N	\N	\N
2468	2016-11-03 00:00:00	2016-11-06 00:00:00	Switzerland	Hasliberg	Convention	2016	2016	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	0c4bbba1-1e6a-42e1-b434-5b3a32ea828b	Gruppenhaus C'est la Vie	\N	2016	2019-03-29 20:20:58.223401	2019-03-29 20:20:58.223401	\N	\N	\N
2469	2017-11-02 00:00:00	2017-11-05 00:00:00	Switzerland	Hasliberg	Convention	2017	2017	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	a792a60f-d3a0-489b-8ccd-c04549221637	Panorama Hotel and the C'est la Vie Guesthouse	\N	2017	2019-03-29 20:20:58.242272	2019-03-29 20:20:58.242272	\N	\N	\N
2470	2018-10-24 00:00:00	2018-10-28 00:00:00	Switzerland	Hasliberg	Convention	2018	2018	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	c34f2c55-1a66-4081-9ac8-21916fb066a8	Panorama Hotel and the C'est la Vie Guesthouse	\N	2018	2019-03-29 20:20:58.265698	2019-03-29 20:20:58.265698	\N	\N	\N
2471	2019-10-30 00:00:00	2019-11-03 00:00:00	Switzerland	Hasliberg	Convention	2019	2019	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	e9fa9ffa-3286-4f75-b29b-92ae7b1f45e4	Panorama Hotel and the C'est la Vie Guesthouse	\N	2019	2019-03-29 20:20:58.294549	2019-03-29 20:20:58.294549	\N	\N	\N
2472	2014-02-07 00:00:00	2014-02-09 00:00:00	United States	Grand Rapids, Michigan	Convention	2014	2014	d0d24ed0-93ae-481d-bee7-89ae8d13bb90	b83ae8c9-8ff3-4cf9-8b3a-3161ccb6710c	Ramada Plaza	\N	2014	2019-03-29 20:20:58.316826	2019-03-29 20:20:58.316826	\N	\N	\N
2473	2015-05-22 00:00:00	2015-05-24 00:00:00	United States	Grand Rapids, Michigan	Convention	2015	2015	d0d24ed0-93ae-481d-bee7-89ae8d13bb90	997c9ac9-aa51-4bc7-a026-fccde38d3f8a	Holiday Inn Express South	\N	2015	2019-03-29 20:21:01.095745	2019-03-29 20:21:01.095745	\N	\N	\N
2474	2016-05-27 00:00:00	2016-05-29 00:00:00	United States	Grand Rapids, Michigan	Convention	2016	2016	d0d24ed0-93ae-481d-bee7-89ae8d13bb90	f3cd6310-2434-4e86-94d7-a1f8d4a122ad	Holiday Inn Express South	\N	2016	2019-03-29 20:21:01.124218	2019-03-29 20:21:01.124218	\N	\N	\N
2475	2005-10-21 00:00:00	2005-10-24 00:00:00	Germany	Grasellenbach, Hessen	Convention	2005	1	4e7d876b-a19c-4d43-abd7-5b79646f649b	5c42b3a0-5088-45ee-a314-e6cbda81986d	Gerhart-Hauptmann-Haus	\N	1	2019-03-29 20:21:01.154798	2019-03-29 20:21:01.154798	\N	\N	\N
2476	2006-09-29 00:00:00	2006-10-03 00:00:00	Germany	Grasellenbach, Hessen	Convention	2006	2	4e7d876b-a19c-4d43-abd7-5b79646f649b	cc3999b9-cb71-4ed1-bacd-a825a488da3b	Gerhart-Hauptmann-Haus	\N	2	2019-03-29 20:21:03.644737	2019-03-29 20:21:03.644737	\N	\N	\N
2477	2007-10-04 00:00:00	2007-10-08 00:00:00	Germany	Grasellenbach, Hessen	Convention	2007	3	4e7d876b-a19c-4d43-abd7-5b79646f649b	dd5a3624-eaf0-4bd4-ab81-f9d445220e5a	Gerhart-Hauptmann-Haus	\N	3	2019-03-29 20:21:03.674713	2019-03-29 20:21:03.674713	\N	\N	\N
2478	2008-10-02 00:00:00	2008-10-05 00:00:00	Germany	Grasellenbach, Hessen	Convention	2008	4	4e7d876b-a19c-4d43-abd7-5b79646f649b	9fd6bb46-3dc4-4a9b-a05e-0a5077dd157f	Gerhart-Hauptmann-Haus	\N	4	2019-03-29 20:21:03.700474	2019-03-29 20:21:03.700474	\N	\N	\N
2479	2009-10-01 00:00:00	2009-10-04 00:00:00	Germany	Stromberg, Rheinland-Pfalz	Convention	2009	5	4e7d876b-a19c-4d43-abd7-5b79646f649b	7d07949a-fd7c-48e6-9129-2552c568d345	Schullandheim des Burggymnasiums	\N	5	2019-03-29 20:21:03.719879	2019-03-29 20:21:03.719879	\N	\N	\N
2480	2010-09-30 00:00:00	2010-10-03 00:00:00	Germany	Bühl-Neusatzeck	Convention	2010	6	4e7d876b-a19c-4d43-abd7-5b79646f649b	7251ce99-2570-4ef1-b0a7-327943460484	Black Forrest	\N	6	2019-03-29 20:21:03.740304	2019-03-29 20:21:03.740304	\N	\N	\N
2481	2011-10-29 00:00:00	2011-11-02 00:00:00	Germany	Bühl-Neusatzeck	Convention	2011	7	4e7d876b-a19c-4d43-abd7-5b79646f649b	4e27998e-1f0d-4043-b233-26efaa1da85b	Black Forrest	\N	7	2019-03-29 20:21:03.770534	2019-03-29 20:21:03.770534	\N	\N	\N
2482	2012-10-03 00:00:00	2012-10-07 00:00:00	Germany	Bühl-Neusatzeck	Convention	2012	8	4e7d876b-a19c-4d43-abd7-5b79646f649b	c897f8de-d41c-40d6-8fd1-89279d6ed5ae	Black Forrest	\N	8	2019-03-29 20:21:03.795862	2019-03-29 20:21:03.795862	\N	\N	\N
2483	2013-10-09 00:00:00	2013-10-13 00:00:00	Germany	Erbuch	Convention	2013	9	4e7d876b-a19c-4d43-abd7-5b79646f649b	cfb2a6b5-5e94-47dd-ac05-e7d7cd38788d	Erbach	\N	9	2019-03-29 20:21:03.815065	2019-03-29 20:21:03.815065	\N	\N	\N
2484	2014-10-01 00:00:00	2014-10-05 00:00:00	Germany	Erbuch	Convention	2014	10	4e7d876b-a19c-4d43-abd7-5b79646f649b	b6789fa3-a081-4923-b136-a2eac746c05b	Erbach	\N	10	2019-03-29 20:21:03.835769	2019-03-29 20:21:03.835769	\N	\N	\N
2485	2015-09-30 00:00:00	2015-10-04 00:00:00	Germany	Erbuch	Convention	2015	11	4e7d876b-a19c-4d43-abd7-5b79646f649b	8c07b6a8-94dc-404e-a977-17cda5fbe0d0	Erbach	\N	11	2019-03-29 20:21:03.865539	2019-03-29 20:21:03.865539	\N	\N	\N
2486	2016-09-28 00:00:00	2016-10-02 00:00:00	Germany	Erbuch	Convention	2016	12	4e7d876b-a19c-4d43-abd7-5b79646f649b	e5d7a67b-7d80-472e-b2c8-7284c82cf842	Erbach	\N	12	2019-03-29 20:21:03.88369	2019-03-29 20:21:03.88369	\N	\N	\N
2487	2017-10-03 00:00:00	2017-10-08 00:00:00	Germany	Erbuch	Convention	2017	13	4e7d876b-a19c-4d43-abd7-5b79646f649b	85320479-c47d-4104-96ba-7819ffcfc767	Erbach	\N	13	2019-03-29 20:21:03.904202	2019-03-29 20:21:03.904202	\N	\N	\N
2488	2018-10-03 00:00:00	2018-10-07 00:00:00	Germany	Erbuch	Convention	2018	14	4e7d876b-a19c-4d43-abd7-5b79646f649b	29bd7398-3359-4fc9-bfcf-7daac3e06db7	Erbach	\N	14	2019-03-29 20:21:03.920397	2019-03-29 20:21:03.920397	\N	\N	\N
2489	2018-10-02 00:00:00	2018-10-06 00:00:00	Germany	Bühl-Neusatzeck	Convention	2018	15	4e7d876b-a19c-4d43-abd7-5b79646f649b	6fb613a0-288c-47fc-98ef-758f407f71f5	Black Forrest	\N	15	2019-03-29 20:21:03.9408	2019-03-29 20:21:03.9408	\N	\N	\N
2490	2007-11-01 00:00:00	2007-11-04 00:00:00	Germany	Darmstadt, Hesse	Convention	2007	2007	a2390f55-6ac5-4de7-9592-f51d74da8cbc	ff3467cf-b1b1-47de-b178-c1aa7bb6ae49	Falken Youth Center Club House	\N	2007	2019-03-29 20:21:03.959034	2019-03-29 20:21:03.959034	\N	\N	\N
2491	2009-10-29 00:00:00	2009-11-01 00:00:00	Germany	Darmstadt, Hesse	Convention	2009	2009	a2390f55-6ac5-4de7-9592-f51d74da8cbc	66f62406-e2c3-42f1-8c25-400a7ce5d9b3	Falken Youth Center Club House	\N	2009	2019-03-29 20:21:06.541773	2019-03-29 20:21:06.541773	\N	\N	\N
2492	2012-10-11 00:00:00	2012-10-14 00:00:00	Germany	Darmstadt, Hesse	Convention	2012	2012	a2390f55-6ac5-4de7-9592-f51d74da8cbc	b7959b3c-374a-4788-a104-75a5020fcd2f	Falken Youth Center Club House	\N	2012	2019-03-29 20:21:06.559605	2019-03-29 20:21:06.559605	\N	\N	\N
2493	2013-10-03 00:00:00	2013-10-06 00:00:00	Germany	Darmstadt, Hesse	Convention	2013	2013	a2390f55-6ac5-4de7-9592-f51d74da8cbc	a6976aa8-c76c-4537-bcb8-13ca8988a1a9	Falken Youth Center Club House	\N	2013	2019-03-29 20:21:06.577756	2019-03-29 20:21:06.577756	\N	\N	\N
2494	2014-10-02 00:00:00	2014-10-05 00:00:00	Germany	Darmstadt, Hesse	Convention	2014	2014	a2390f55-6ac5-4de7-9592-f51d74da8cbc	baece100-2f31-467e-b65e-e3dd1df4cf29	Falken Youth Center Club House	\N	2014	2019-03-29 20:21:06.591848	2019-03-29 20:21:06.591848	\N	\N	\N
2495	2015-10-01 00:00:00	2015-10-04 00:00:00	Germany	Darmstadt, Hesse	Convention	2015	2015	a2390f55-6ac5-4de7-9592-f51d74da8cbc	a15905d6-9eed-4b03-b4df-4c003a036d43	Falken Youth Center Club House	\N	2015	2019-03-29 20:21:06.612158	2019-03-29 20:21:06.612158	\N	\N	\N
2496	2016-09-30 00:00:00	2016-10-03 00:00:00	Germany	Darmstadt, Hesse	Convention	2016	2016	a2390f55-6ac5-4de7-9592-f51d74da8cbc	c7893e3f-ed04-431f-b206-4e9ecd7652b4	Falken Youth Center Club House	\N	2016	2019-03-29 20:21:06.63532	2019-03-29 20:21:06.63532	\N	\N	\N
2497	2017-09-30 00:00:00	2017-10-03 00:00:00	Germany	Darmstadt, Hesse	Convention	2017	2017	a2390f55-6ac5-4de7-9592-f51d74da8cbc	b8f4e58c-6936-4daf-8f16-bc1ab4bf3b2f	Falken Youth Center Club House	\N	2017	2019-03-29 20:21:06.655883	2019-03-29 20:21:06.655883	\N	\N	\N
2498	2017-10-27 00:00:00	2017-10-29 00:00:00	United States	Raleigh, North Carolina	Convention	2017	2017	fb3ce730-f47e-4340-96ea-6f82bbba504e	08f37b9b-1fdb-47e4-b06b-7480e56a084e	Hampton Inn and Suites, Crabtree Valley	124	2017	2019-03-29 20:21:06.673424	2019-03-29 20:21:06.673424	\N	\N	\N
2499	2018-10-26 00:00:00	2018-10-28 00:00:00	United States	Raleigh, North Carolina	Convention	2018	2018	fb3ce730-f47e-4340-96ea-6f82bbba504e	6c24b657-19b3-4684-8fd0-582064e0938a	Hampton Inn and Suites, Crabtree Valley	\N	2018	2019-03-29 20:21:09.356178	2019-03-29 20:21:09.356178	\N	\N	\N
2500	2002-11-09 00:00:00	2002-11-09 00:00:00	Canada	Burnaby, British Columbia	Convention	2002	2002	efe695eb-1e5a-4968-aed6-56768214a17c	473d6b90-3570-4c66-b4e4-c0024448181e	House Party	\N	2002	2019-03-29 20:21:09.377709	2019-03-29 20:21:09.377709	\N	\N	\N
2501	2003-11-08 00:00:00	2003-11-08 00:00:00	Canada	Coquitlam, British Columbia	Convention	2003	2003	efe695eb-1e5a-4968-aed6-56768214a17c	5f059ced-f7fb-479b-9cee-af7e014f816c	Best Western Coquitlam Inn & Convention Centre	\N	2003	2019-03-29 20:21:11.969902	2019-03-29 20:21:11.969902	\N	\N	\N
2502	2004-10-29 00:00:00	2004-10-30 00:00:00	Canada	Coquitlam, British Columbia	Convention	2004	2004	efe695eb-1e5a-4968-aed6-56768214a17c	27021e95-c0df-4809-aa5d-3ddf47dbca23	Best Western Coquitlam Inn & Convention Centre	\N	2004	2019-03-29 20:21:11.988688	2019-03-29 20:21:11.988688	\N	\N	\N
2503	2005-10-29 00:00:00	2005-10-29 00:00:00	Canada	Coquitlam, British Columbia	Convention	2005	2005	efe695eb-1e5a-4968-aed6-56768214a17c	3bc6f05c-4923-4144-a44d-942662c593f2	Best Western Coquitlam Inn & Convention Centre	\N	2005	2019-03-29 20:21:12.009419	2019-03-29 20:21:12.009419	\N	\N	\N
2504	2006-10-28 00:00:00	2006-10-28 00:00:00	Canada	Coquitlam, British Columbia	Convention	2006	2006	efe695eb-1e5a-4968-aed6-56768214a17c	680fa3c9-b3a6-4b64-b21a-5d9c4334fb09	Best Western Coquitlam Inn & Convention Centre	\N	2006	2019-03-29 20:21:12.031106	2019-03-29 20:21:12.031106	\N	\N	\N
2505	2007-09-08 00:00:00	2007-09-08 00:00:00	Canada	Surrey, British Columbia	Convention	2007	2007	efe695eb-1e5a-4968-aed6-56768214a17c	1e8e7bc5-fbf3-4c7e-932e-bfd03fe1b292	Private Residence	\N	2007	2019-03-29 20:21:12.052008	2019-03-29 20:21:12.052008	\N	\N	\N
2506	2008-11-08 00:00:00	2008-11-08 00:00:00	Canada	Surrey, British Columbia	Convention	2008	2008	efe695eb-1e5a-4968-aed6-56768214a17c	f25cf29e-65f6-42bd-bf22-530bd438ba13	Compass Point Inn	\N	2008	2019-03-29 20:21:12.076237	2019-03-29 20:21:12.076237	\N	\N	\N
2507	2009-11-07 00:00:00	2009-11-07 00:00:00	Canada	Surrey, British Columbia	Convention	2009	2009	efe695eb-1e5a-4968-aed6-56768214a17c	c462c8e6-b0fa-4c66-8311-de81a881ced5	Compass Point Inn	\N	2009	2019-03-29 20:21:12.094047	2019-03-29 20:21:12.094047	\N	\N	\N
2508	2010-11-07 00:00:00	2010-11-07 00:00:00	Canada	Surrey, British Columbia	Convention	2010	2010	efe695eb-1e5a-4968-aed6-56768214a17c	c5bb75ab-9688-4f56-a7cf-bbe011c802e5	Compass Point Inn	\N	2010	2019-03-29 20:21:12.112662	2019-03-29 20:21:12.112662	\N	\N	\N
2509	2011-11-05 00:00:00	2011-11-06 00:00:00	Canada	Burnaby, British Columbia	Convention	2011	2011	efe695eb-1e5a-4968-aed6-56768214a17c	4980ae42-1a36-4d35-9411-205a65453201	Executive Hotel & Conference Centre	\N	2011	2019-03-29 20:21:12.132243	2019-03-29 20:21:12.132243	\N	\N	\N
2510	2012-11-10 00:00:00	2012-11-10 00:00:00	Canada	Burnaby, British Columbia	Convention	2012	2012	efe695eb-1e5a-4968-aed6-56768214a17c	31d58442-a087-4946-a212-0d0cc2c3fa45	Executive Hotel & Conference Centre	\N	2012	2019-03-29 20:21:12.15146	2019-03-29 20:21:12.15146	\N	\N	\N
2511	2013-11-02 00:00:00	2013-11-02 00:00:00	Canada	Burnaby, British Columbia	Convention	2013	2013	efe695eb-1e5a-4968-aed6-56768214a17c	329d4951-862a-443f-b050-a78b845a6817	Executive Hotel & Conference Centre	\N	2013	2019-03-29 20:21:12.166996	2019-03-29 20:21:12.166996	\N	\N	\N
2512	2014-11-08 00:00:00	2014-11-08 00:00:00	Canada	Burnaby, British Columbia	Convention	2014	2014	efe695eb-1e5a-4968-aed6-56768214a17c	6e8c8909-db40-4fb8-ab89-9f79b681289f	Executive Hotel & Conference Centre	\N	2014	2019-03-29 20:21:12.185909	2019-03-29 20:21:12.185909	\N	\N	\N
2513	2015-11-07 00:00:00	2015-11-07 00:00:00	Canada	Burnaby, British Columbia	Convention	2015	2015	efe695eb-1e5a-4968-aed6-56768214a17c	6c2f5889-04d2-4c41-b1c1-523027a92483	Executive Hotel & Conference Centre	\N	2015	2019-03-29 20:21:12.203374	2019-03-29 20:21:12.203374	\N	\N	\N
2514	2016-11-05 00:00:00	2016-11-05 00:00:00	Canada	Burnaby, British Columbia	Convention	2016	2016	efe695eb-1e5a-4968-aed6-56768214a17c	88db12d7-1aca-4a0a-b870-c0b9c9421965	Executive Hotel & Conference Centre	\N	2016	2019-03-29 20:21:12.222216	2019-03-29 20:21:12.222216	\N	\N	\N
2515	2017-11-04 00:00:00	2017-11-05 00:00:00	Canada	Burnaby, British Columbia	Convention	2017	2017	efe695eb-1e5a-4968-aed6-56768214a17c	a4824aeb-c5ad-4b3e-a27c-217747b2c6d3	Executive Hotel & Conference Centre	\N	2017	2019-03-29 20:21:12.242838	2019-03-29 20:21:12.242838	\N	\N	\N
2516	2018-11-10 00:00:00	2018-11-11 00:00:00	Canada	Burnaby, British Columbia	Convention	2018	2018	efe695eb-1e5a-4968-aed6-56768214a17c	81e28e96-cf96-4f67-bd9e-6cde97c99108	Executive Hotel & Conference Centre	\N	2018	2019-03-29 20:21:12.262684	2019-03-29 20:21:12.262684	\N	\N	\N
2517	2010-08-13 00:00:00	2010-08-15 00:00:00	United States	Indianapolis, Indiana	Convention	2010	2010	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	2c80de8f-8d49-4064-970e-cad56995e6a6	Hilton Indianapolis North	\N	2010	2019-03-29 20:21:12.287851	2019-03-29 20:21:12.287851	\N	\N	\N
2518	2011-08-12 00:00:00	2011-08-14 00:00:00	United States	Indianapolis, Indiana	Convention	2011	2011	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	2ec1f39b-9b3a-4d4c-81ef-a8c55c321fca	Hilton Indianapolis North	\N	2011	2019-03-29 20:21:15.089924	2019-03-29 20:21:15.089924	\N	\N	\N
2519	2012-08-10 00:00:00	2012-08-12 00:00:00	United States	Indianapolis, Indiana	Convention	2012	2012	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	b329773c-c5d9-44d3-90f4-9d4013b06411	Sheraton Indianapolis Hotel (Keystone Crossing)	\N	2012	2019-03-29 20:21:15.12544	2019-03-29 20:21:15.12544	\N	\N	\N
2520	2013-08-09 00:00:00	2013-08-11 00:00:00	United States	Indianapolis, Indiana	Convention	2013	2013	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	5c1c7258-2eca-43df-9f7f-766283db2a89	Sheraton Indianapolis Hotel (Keystone Crossing)	\N	2013	2019-03-29 20:21:15.186689	2019-03-29 20:21:15.186689	\N	\N	\N
2521	2014-08-29 00:00:00	2014-08-31 00:00:00	United States	Indianapolis, Indiana	Convention	2014	2014	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	bb66e3b3-60c9-42eb-8b04-7064b8ea519d	Sheraton Indianapolis Hotel (Keystone Crossing)	\N	2014	2019-03-29 20:21:15.270715	2019-03-29 20:21:15.270715	\N	\N	\N
2522	2015-08-14 00:00:00	2015-08-16 00:00:00	United States	Indianapolis, Indiana	Convention	2015	2015	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	671876ec-30d4-48df-9c72-7b49e41bcdd2	Indianapolis Marriott East	\N	2015	2019-03-29 20:21:15.376387	2019-03-29 20:21:15.376387	\N	\N	\N
2523	2016-08-26 00:00:00	2016-08-28 00:00:00	United States	Indianapolis, Indiana	Convention	2016	2016	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	11ee7d3e-ebc1-4cbe-b496-d2095ad2178f	Indianapolis Marriott East	\N	2016	2019-03-29 20:21:15.436464	2019-03-29 20:21:15.436464	\N	\N	\N
2524	2017-08-11 00:00:00	2017-08-13 00:00:00	United States	Indianapolis, Indiana	Convention	2017	2017	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	9a24291c-1b50-4276-bd13-a68185a4d2d6	Indianapolis Marriott East	\N	2017	2019-03-29 20:21:15.456391	2019-03-29 20:21:15.456391	\N	\N	\N
2525	2018-08-24 00:00:00	2018-08-26 00:00:00	United States	Indianapolis, Indiana	Convention	2018	2018	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	d455b81c-6264-4e9c-9572-47c2f4a31379	Indianapolis Marriott East	\N	2018	2019-03-29 20:21:15.480884	2019-03-29 20:21:15.480884	\N	\N	\N
2526	2019-08-23 00:00:00	2019-08-25 00:00:00	United States	Indianapolis, Indiana	Convention	2019	2019	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	f301c8f0-51a8-4072-b2f7-0fbdab1b256d	Indianapolis Marriott East	\N	2019	2019-03-29 20:21:15.50368	2019-03-29 20:21:15.50368	\N	\N	\N
2527	2015-10-31 00:00:00	2015-10-31 00:00:00	Taiwan	Taipei	Furmeet	2015	1	d26e7131-935b-4d86-96a1-8283cd676482	596fba1d-d9f0-4353-93fb-6fdc9ffeb5c2	SMAJO House	\N	1	2019-03-29 20:21:15.522385	2019-03-29 20:21:15.522385	\N	\N	\N
2528	2016-12-24 00:00:00	2016-12-24 00:00:00	Taiwan	Taipei	Furmeet	2016	2	d26e7131-935b-4d86-96a1-8283cd676482	c0cee1dc-770d-4048-96a4-3c5b99ef8f9a	PCBC Conference Center	\N	2	2019-03-29 20:21:18.222987	2019-03-29 20:21:18.222987	\N	\N	\N
2529	2017-10-28 00:00:00	2017-10-28 00:00:00	Taiwan	Taoyuan	Furmeet	2017	3	d26e7131-935b-4d86-96a1-8283cd676482	e24347a3-3202-4e52-b14e-4031a13dcd33	Freedom Hotel	\N	3	2019-03-29 20:21:18.238343	2019-03-29 20:21:18.238343	\N	\N	\N
2530	2018-10-27 00:00:00	2018-10-28 00:00:00	Taiwan	Taoyuan	Convention	2018	4	d26e7131-935b-4d86-96a1-8283cd676482	2b871da2-3c4c-4cbf-ac55-d54399940cef	Freedom Hotel	\N	4	2019-03-29 20:21:18.257407	2019-03-29 20:21:18.257407	\N	\N	\N
2531	2019-10-26 00:00:00	2019-10-27 00:00:00	Taiwan	Taoyuan	Convention	2019	5	d26e7131-935b-4d86-96a1-8283cd676482	738159f5-4c0e-46ef-b771-cc7b7516879f	Freedom Hotel	\N	5	2019-03-29 20:21:18.278317	2019-03-29 20:21:18.278317	\N	\N	\N
2532	2014-05-01 00:00:00	2014-05-04 00:00:00	Italy	Reggio Emilia	Convention	2014	2014	23c31cb8-d43b-4dd6-8d47-61a01d360939	7cfff0de-7262-4df4-9b9e-1d57c9b22dd8	Castelnovo ne' Monti	\N	2014	2019-03-29 20:21:18.302418	2019-03-29 20:21:18.302418	\N	\N	\N
2533	2014-10-04 00:00:00	2014-10-05 00:00:00	Italy	Emilia-Romagna	Convention	2014	2014	23c31cb8-d43b-4dd6-8d47-61a01d360939	7c7fc933-d31f-4424-ac2e-e0f2ea9ee521	Colombaro di Formigine, province of Modena	\N	2014-2	2019-03-29 20:21:21.685803	2019-03-29 20:21:21.685803	\N	\N	\N
2534	2017-07-22 00:00:00	2017-07-23 00:00:00	United States	Mesa, Arizona	Convention	2017	2017	9b7a5988-fe86-4641-b924-599bb0c3732e	ec138db0-88a5-4d57-909e-f89ac47674e2	Mesa Convention Center	\N	2017	2019-03-29 20:21:21.701073	2019-03-29 20:21:21.701073	\N	\N	\N
2535	2018-07-21 00:00:00	2018-07-22 00:00:00	United States	Mesa, Arizona	Convention	2018	2018	9b7a5988-fe86-4641-b924-599bb0c3732e	26172fdf-323c-4dfa-b555-edf12c3da6a5	Mesa Convention Center	\N	2018	2019-03-29 20:21:24.371329	2019-03-29 20:21:24.371329	\N	\N	\N
2536	2019-07-20 00:00:00	2019-07-21 00:00:00	United States	Mesa, Arizona	Convention	2019	2019	9b7a5988-fe86-4641-b924-599bb0c3732e	63df17ed-3567-4c1b-9e7f-887ea1680dcd	Mesa Convention Center	\N	2019	2019-03-29 20:21:24.392722	2019-03-29 20:21:24.392722	\N	\N	\N
2537	2014-01-11 00:00:00	2014-01-12 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2014	2014	6c79f835-09b9-4719-b649-29b08d1905b7	d859840d-85ec-466d-b0d3-fc29c11064d2	Loisir Hotel	\N	2014	2019-03-29 20:21:24.415145	2019-03-29 20:21:24.415145	\N	\N	\N
2538	2015-01-10 00:00:00	2015-01-11 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2015	2015	6c79f835-09b9-4719-b649-29b08d1905b7	f26976ea-23f1-441e-8d9b-7c027b6213c2	Loisir Hotel	\N	2015	2019-03-29 20:21:26.954476	2019-03-29 20:21:26.954476	\N	\N	\N
2539	2013-01-12 00:00:00	2013-01-14 00:00:00	Japan	Hikone, Shiga	Convention	2013	2013	6c79f835-09b9-4719-b649-29b08d1905b7	d1e3c862-74d6-4b3a-991e-7d5ea0cee37d	Various Locations	\N	2013	2019-03-29 20:21:26.982308	2019-03-29 20:21:26.982308	\N	\N	\N
2540	2016-01-08 00:00:00	2016-01-10 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2016	2016	6c79f835-09b9-4719-b649-29b08d1905b7	d788a5ca-1617-4fe0-ae21-79dc3325c1dd	Loisir Hotel	\N	2016	2019-03-29 20:21:27.003522	2019-03-29 20:21:27.003522	\N	\N	\N
2541	2017-01-06 00:00:00	2017-01-08 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2017	2017	6c79f835-09b9-4719-b649-29b08d1905b7	25d16c15-10a8-48f5-9c75-ee6453b8040c	Loisir Hotel	\N	2017	2019-03-29 20:21:27.021772	2019-03-29 20:21:27.021772	\N	\N	\N
2542	2018-01-05 00:00:00	2018-01-07 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2018	2018	6c79f835-09b9-4719-b649-29b08d1905b7	aba8df89-cdb3-4de4-a78c-a1c3bd939cd8	Loisir Hotel	\N	2018	2019-03-29 20:21:27.042233	2019-03-29 20:21:27.042233	\N	\N	\N
2543	2019-01-11 00:00:00	2019-01-13 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2019	2019	6c79f835-09b9-4719-b649-29b08d1905b7	f0aae60c-1710-4e2a-bbbb-75cb25b52b30	Loisir Hotel	\N	2019	2019-03-29 20:21:27.057626	2019-03-29 20:21:27.057626	\N	\N	\N
2544	2020-01-10 00:00:00	2020-01-12 00:00:00	Japan	Toyohashi, Aichi Prefecture	Convention	2020	2020	6c79f835-09b9-4719-b649-29b08d1905b7	3935a007-b144-463f-86f6-5dd970a8d279	Loisir Hotel	\N	2020	2019-03-29 20:21:27.076608	2019-03-29 20:21:27.076608	\N	\N	\N
2545	2002-03-30 00:00:00	2002-03-30 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2002	2002	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	7ff6be7e-fb39-473b-8745-2b5eeefe8429	Kathryn Abby Hanna Park	\N	2002	2019-03-29 20:21:27.094223	2019-03-29 20:21:27.094223	\N	\N	\N
2546	2003-05-24 00:00:00	2003-05-24 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2003	2003	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	d6ae8593-c4d5-4619-9910-afa7f064078a	Kathryn Abby Hanna Park	\N	2003	2019-03-29 20:21:29.800756	2019-03-29 20:21:29.800756	\N	\N	\N
2547	2004-04-24 00:00:00	2004-04-24 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2004	2004	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	199f95e7-5654-4dae-8ba6-d14cb1ab1de3	Kathryn Abby Hanna Park	\N	2004	2019-03-29 20:21:29.819301	2019-03-29 20:21:29.819301	\N	\N	\N
2548	2005-04-23 00:00:00	2005-04-23 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2005	2005	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	62bb2e4e-f234-4a7d-9008-7bb2861b7090	Kathryn Abby Hanna Park	\N	2005	2019-03-29 20:21:29.836143	2019-03-29 20:21:29.836143	\N	\N	\N
2549	2006-04-22 00:00:00	2006-04-22 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2006	2006	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	b454c984-20cb-48e0-865a-64b26054fcf6	Kathryn Abby Hanna Park	\N	2006	2019-03-29 20:21:29.854696	2019-03-29 20:21:29.854696	\N	\N	\N
2550	2007-04-21 00:00:00	2007-04-21 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2007	2007	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	6c53aa3b-6fad-4b7b-a967-a3b547c5e97a	Kathryn Abby Hanna Park	\N	2007	2019-03-29 20:21:29.871595	2019-03-29 20:21:29.871595	\N	\N	\N
2551	2008-04-19 00:00:00	2008-04-19 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2008	2008	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	ab88b7c7-862c-4396-8cdd-fec2a6aead21	Kathryn Abby Hanna Park	\N	2008	2019-03-29 20:21:29.890428	2019-03-29 20:21:29.890428	\N	\N	\N
2552	2009-04-18 00:00:00	2009-04-18 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2009	2009	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	fcf883df-529c-4018-862d-c588bdd538cc	Kathryn Abby Hanna Park	\N	2009	2019-03-29 20:21:29.905149	2019-03-29 20:21:29.905149	\N	\N	\N
2553	2010-04-17 00:00:00	2010-04-17 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2010	2010	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	1ac658aa-3fa9-4f7f-96df-8905af5c603d	Kathryn Abby Hanna Park	\N	2010	2019-03-29 20:21:29.923081	2019-03-29 20:21:29.923081	\N	\N	\N
2554	2011-04-16 00:00:00	2011-04-16 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2011	2011	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	3c0dcff0-dfc1-4f02-b350-0489563c3617	Kathryn Abby Hanna Park	\N	2011	2019-03-29 20:21:29.938744	2019-03-29 20:21:29.938744	\N	\N	\N
2555	2012-04-21 00:00:00	2012-04-21 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2012	2012	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	06ffebb2-6ece-41b3-b11f-9089806d21af	Kathryn Abby Hanna Park	\N	2012	2019-03-29 20:21:29.955761	2019-03-29 20:21:29.955761	\N	\N	\N
2556	2013-04-20 00:00:00	2013-04-20 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2013	2013	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	2bbb2f41-0377-4622-8e04-4734bfe14f6d	Kathryn Abby Hanna Park	\N	2013	2019-03-29 20:21:29.969791	2019-03-29 20:21:29.969791	\N	\N	\N
2557	2014-04-12 00:00:00	2014-04-12 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2014	2014	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	1e99276b-198d-4aee-b76a-0bad41673754	Kathryn Abby Hanna Park	\N	2014	2019-03-29 20:21:29.985577	2019-03-29 20:21:29.985577	\N	\N	\N
2558	2015-04-18 00:00:00	2015-04-18 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2015	2015	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	f6ed6801-23da-4ecf-bf5f-f4076e343c21	Kathryn Abby Hanna Park	\N	2015	2019-03-29 20:21:30.001872	2019-03-29 20:21:30.001872	\N	\N	\N
2559	2017-04-22 00:00:00	2017-04-22 00:00:00	United States	Atlantic Beach, Florida	Furmeet	2017	2017	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	83cb4bb9-e1e2-4c21-9865-df3831b5b5da	Kathryn Abby Hanna Park	\N	2017	2019-03-29 20:21:30.019632	2019-03-29 20:21:30.019632	\N	\N	\N
2560	2017-04-14 00:00:00	2017-04-16 00:00:00	United Kingdom	Bristol, England	Convention	2017	2017	31a2486a-eefc-445f-9f15-aaf716b95b2b	23b576cd-4fc7-4a22-a175-427a988941d4	Holiday Inn Bristol-Filton[	\N	2017	2019-03-29 20:21:30.036548	2019-03-29 20:21:30.036548	\N	\N	\N
2561	2018-03-30 00:00:00	2018-04-01 00:00:00	United Kingdom	Bristol, England	Convention	2018	2018	31a2486a-eefc-445f-9f15-aaf716b95b2b	d8957a67-febd-4330-b328-40a7e85a3d72	Holiday Inn Bristol-Filton[	\N	2018	2019-03-29 20:21:33.177123	2019-03-29 20:21:33.177123	\N	\N	\N
2562	2019-04-19 00:00:00	2019-04-21 00:00:00	United Kingdom	Bristol, England	Convention	2019	2019	31a2486a-eefc-445f-9f15-aaf716b95b2b	9bf2529e-2dfe-4368-b96e-bc620ebb3672	Holiday Inn Bristol-Filton[	\N	2019	2019-03-29 20:21:33.198008	2019-03-29 20:21:33.198008	\N	\N	\N
2563	2008-11-30 00:00:00	2008-11-30 00:00:00	Japan	Kawasaki, Kanagawa Prefecture	Convention	2008	1	45298af2-a245-4383-bf74-aabd8a51c12c	9a854a65-ff40-4d19-abb0-7633107c61bc	Kawasaki City Industrial Promotion Hall	180	1	2019-03-29 20:21:33.219583	2019-03-29 20:21:33.219583	\N	\N	\N
2564	2009-11-28 00:00:00	2009-11-28 00:00:00	Japan	Kawasaki, Kanagawa Prefecture	Convention	2009	2	45298af2-a245-4383-bf74-aabd8a51c12c	ee05c793-5c54-4c94-a74f-3e08a719149e	Kawasaki City Industrial Promotion Hall	220	2	2019-03-29 20:21:35.752837	2019-03-29 20:21:35.752837	\N	\N	\N
2565	2010-11-20 00:00:00	2010-11-20 00:00:00	Japan	Kawasaki, Kanagawa Prefecture	Convention	2010	3	45298af2-a245-4383-bf74-aabd8a51c12c	1800a18b-d840-49f4-af71-0e4f949b9f74	Kawasaki City Industrial Promotion Hall	390	3	2019-03-29 20:21:35.771451	2019-03-29 20:21:35.771451	\N	\N	\N
2566	2011-11-19 00:00:00	2011-11-19 00:00:00	Japan	Sumida, Tokyo	Convention	2011	4	45298af2-a245-4383-bf74-aabd8a51c12c	9ab147fc-91b6-4720-8051-7add1ac4ccf3	Sumida Industrial Centre	412	4	2019-03-29 20:21:35.796334	2019-03-29 20:21:35.796334	\N	\N	\N
2567	2012-12-01 00:00:00	2012-12-01 00:00:00	Japan	Sumida, Tokyo	Convention	2012	5	45298af2-a245-4383-bf74-aabd8a51c12c	7a6f57d2-cde1-47d1-8671-f7dee3877776	Sumida Industrial Centre	420	5	2019-03-29 20:21:35.81857	2019-03-29 20:21:35.81857	\N	\N	\N
2568	2013-12-07 00:00:00	2013-12-07 00:00:00	Japan	Sumida, Tokyo	Convention	2013	6	45298af2-a245-4383-bf74-aabd8a51c12c	700f167a-b903-4eb4-bf6e-84fcc82cd656	Sumida Industrial Centre	412	6	2019-03-29 20:21:35.845406	2019-03-29 20:21:35.845406	\N	\N	\N
2569	2014-11-22 00:00:00	2014-11-23 00:00:00	Japan	Kisarazu, Chiba Prefecture	Convention	2014	7	45298af2-a245-4383-bf74-aabd8a51c12c	b953ce45-9d1e-49f8-9fc8-dbe3588956b3	Kazusa Academia Hall	380	7	2019-03-29 20:21:35.870926	2019-03-29 20:21:35.870926	\N	\N	\N
2570	2015-11-21 00:00:00	2015-11-22 00:00:00	Japan	Kisarazu, Chiba Prefecture	Convention	2015	8	45298af2-a245-4383-bf74-aabd8a51c12c	dcecf4cd-22fe-49da-a6bc-99a9cac6b2ef	Kazusa Academia Hall	380	8	2019-03-29 20:21:35.897005	2019-03-29 20:21:35.897005	\N	\N	\N
2571	2016-11-19 00:00:00	2016-11-20 00:00:00	Japan	Kisarazu, Chiba Prefecture	Convention	2016	9	45298af2-a245-4383-bf74-aabd8a51c12c	99f092a6-fc2e-4292-ac51-8f4ccc34bfc4	Kazusa Academia Hall	330	9	2019-03-29 20:21:35.922626	2019-03-29 20:21:35.922626	\N	\N	\N
2572	2017-11-11 00:00:00	2017-11-12 00:00:00	Japan	Kisarazu, Chiba Prefecture	Convention	2017	10	45298af2-a245-4383-bf74-aabd8a51c12c	285b6132-766d-43e4-acc0-c171db7290a9	Kazusa Academia Hall	380	10	2019-03-29 20:21:35.944372	2019-03-29 20:21:35.944372	\N	\N	\N
2573	2018-11-03 00:00:00	2018-11-04 00:00:00	Japan	Osanbashi, Yokohama	Convention	2018	11	45298af2-a245-4383-bf74-aabd8a51c12c	5e09525b-66c1-47c0-8838-415417512685	International Passenger Terminal	454	11	2019-03-29 20:21:35.961347	2019-03-29 20:21:35.961347	\N	\N	\N
2574	2019-11-30 00:00:00	2019-12-01 00:00:00	Japan	Osanbashi, Yokohama	Convention	2019	12	45298af2-a245-4383-bf74-aabd8a51c12c	6df48c54-9d09-4a01-8e7a-fdd2df2d4f69	International Passenger Terminal	\N	12	2019-03-29 20:21:35.983857	2019-03-29 20:21:35.983857	\N	\N	\N
2575	2012-05-03 00:00:00	2012-05-03 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2012	1	96d7c5b6-14b7-4177-a812-2ea01033b61e	f3145faf-004c-4085-96b7-3590eb7291ce	Watshou Kaikan (Cotton Trade Center) 1/4/5/6F	134	1	2019-03-29 20:21:36.00476	2019-03-29 20:21:36.00476	\N	\N	\N
2576	2013-05-04 00:00:00	2013-05-04 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2013	2	96d7c5b6-14b7-4177-a812-2ea01033b61e	7b23a5cc-7115-42ca-9ac7-c499a8c707e4	Tokyo Metropol. Indust. Trade Center (Hamamatsuchou) 4F	210	2	2019-03-29 20:21:38.453338	2019-03-29 20:21:38.453338	\N	\N	\N
2577	2014-04-29 00:00:00	2014-04-29 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2014	3	96d7c5b6-14b7-4177-a812-2ea01033b61e	39b1de14-293b-4458-aa99-912d3a22efa1	Tokyo Metropol. Indust. Trade Center (Hamamatsuchou) 3/4F	259	3	2019-03-29 20:21:38.467541	2019-03-29 20:21:38.467541	\N	\N	\N
2578	2015-05-04 00:00:00	2015-05-04 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2015	4	96d7c5b6-14b7-4177-a812-2ea01033b61e	10332f7f-c6b6-4350-add4-56ec449af775	Yokohama Oosanbashi Hall	372	4	2019-03-29 20:21:38.489474	2019-03-29 20:21:38.489474	\N	\N	\N
2579	2016-05-03 00:00:00	2016-05-03 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2016	5	96d7c5b6-14b7-4177-a812-2ea01033b61e	e5f8692a-6843-4e04-b7f1-857a2eac9ab5	Yokohama Oosanbashi Hall	438	5	2019-03-29 20:21:38.511113	2019-03-29 20:21:38.511113	\N	\N	\N
2580	2017-05-06 00:00:00	2017-05-06 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2017	6	96d7c5b6-14b7-4177-a812-2ea01033b61e	42ddb434-22dd-45ed-af7f-15fa6f850aad	Tokyo Trade Center B/C/D	604	6	2019-03-29 20:21:38.529707	2019-03-29 20:21:38.529707	\N	\N	\N
2581	2019-04-29 00:00:00	2019-04-29 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2019	8	96d7c5b6-14b7-4177-a812-2ea01033b61e	86d8b51a-998b-4d21-819c-7c0a104898d5	Tokyo Trade Center B/C/D	\N	8	2019-03-29 20:21:38.547234	2019-03-29 20:21:38.547234	\N	\N	\N
2582	2012-09-16 00:00:00	2012-09-16 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2012	Kansai 1	96d7c5b6-14b7-4177-a812-2ea01033b61e	e81325f9-afc6-4b8b-8c24-22c916dbdb66	Kyousera Dome Sky Hall D	114	kansai-1	2019-03-29 20:21:38.566936	2019-03-29 20:21:38.566936	\N	\N	\N
2583	2013-10-13 00:00:00	2013-10-13 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2013	Kansai 2	96d7c5b6-14b7-4177-a812-2ea01033b61e	7dfb2777-ce4f-43a6-9f0f-a08b9d976f9f	Kyousera Dome Sky Hall E/F	219	kansai-2	2019-03-29 20:21:38.588981	2019-03-29 20:21:38.588981	\N	\N	\N
2584	2014-10-13 00:00:00	2014-10-13 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2014	Kansai 3	96d7c5b6-14b7-4177-a812-2ea01033b61e	7cde9e89-be44-4c3e-b4a5-0d8aec8b78db	Kyousera Dome Sky Hall B/C	278	kansai-3	2019-03-29 20:21:38.60696	2019-03-29 20:21:38.60696	\N	\N	\N
2585	2015-10-11 00:00:00	2015-10-11 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2015	Kansai 4	96d7c5b6-14b7-4177-a812-2ea01033b61e	e622a03f-9a5d-418e-870b-52c6908a17d9	Kyousera Dome Sky Hall B/C	300	kansai-4	2019-03-29 20:21:38.627697	2019-03-29 20:21:38.627697	\N	\N	\N
2586	2016-10-09 00:00:00	2016-10-09 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2016	Kansai 5	96d7c5b6-14b7-4177-a812-2ea01033b61e	d19af93b-f609-4f19-90c0-b18e05df8e7d	Kyousera Dome Sky Hall B/C/D	402	kansai-5	2019-03-29 20:21:38.646455	2019-03-29 20:21:38.646455	\N	\N	\N
2587	2017-10-08 00:00:00	2017-10-08 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2017	Kansai 6	96d7c5b6-14b7-4177-a812-2ea01033b61e	9be34af2-2e1b-42b0-ab69-9a2dc5ff494e	Kōbe Convention Center	470	kansai-6	2019-03-29 20:21:38.662855	2019-03-29 20:21:38.662855	\N	\N	\N
2588	2018-09-23 00:00:00	2018-09-23 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2018	Kansai 7	96d7c5b6-14b7-4177-a812-2ea01033b61e	b8595c1a-59c6-4268-9210-de880b46632f	Kyocera Dome Osaka SKY Hall	500	kansai-7	2019-03-29 20:21:38.680644	2019-03-29 20:21:38.680644	\N	\N	\N
2589	2015-01-18 00:00:00	2015-01-18 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2015	Shinshun  1	96d7c5b6-14b7-4177-a812-2ea01033b61e	e591836a-7eba-4525-9ce4-3d77a81fefad	Tokyo Wholesaler Center 3F	124	shinshun-1	2019-03-29 20:21:38.699499	2019-03-29 20:21:38.699499	\N	\N	\N
2590	2016-01-17 00:00:00	2016-01-17 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2016	Shinshun  2	96d7c5b6-14b7-4177-a812-2ea01033b61e	e76ed400-542a-41c5-ab2a-6660f2283809	Kawaguchi Frendia	172	shinshun-2	2019-03-29 20:21:38.724122	2019-03-29 20:21:38.724122	\N	\N	\N
2591	2017-01-28 00:00:00	2017-01-28 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2017	Shinshun  3	96d7c5b6-14b7-4177-a812-2ea01033b61e	3796d1e8-b910-4e3f-a598-eba4b72dff98	Kawaguchi Frendia	194	shinshun-3	2019-03-29 20:21:38.74586	2019-03-29 20:21:38.74586	\N	\N	\N
2592	2019-01-27 00:00:00	2019-01-27 00:00:00	Japan	Naka-ku, Yokohama	Furmeet	2019	Shinshun  4	96d7c5b6-14b7-4177-a812-2ea01033b61e	122ae24a-e00b-4b7d-b199-ff09e5650512	Kawaguchi Frendia	\N	shinshun-4	2019-03-29 20:21:38.763763	2019-03-29 20:21:38.763763	\N	\N	\N
2593	2012-06-09 00:00:00	2012-06-09 00:00:00	Japan	Shizuoka, Shizuoka Prefecture	Furmeet	2012	1	1a284f7d-2317-4d00-a676-7b84673b45e0	0b8fdeb4-b677-417c-8a94-833f7a797b6f	"Granship" Shizuoka Convention & Arts Center	\N	1	2019-03-29 20:21:38.783906	2019-03-29 20:21:38.783906	\N	\N	\N
2594	2013-06-08 00:00:00	2013-06-08 00:00:00	Japan	Shizuoka, Shizuoka Prefecture	Furmeet	2013	2	1a284f7d-2317-4d00-a676-7b84673b45e0	314ef95c-6659-43be-a530-cd2f7de00d58	"Granship" Shizuoka Convention & Arts Center	\N	2	2019-03-29 20:21:41.496535	2019-03-29 20:21:41.496535	\N	\N	\N
2595	2014-06-07 00:00:00	2014-06-07 00:00:00	Japan	Shizuoka, Shizuoka Prefecture	Furmeet	2014	3	1a284f7d-2317-4d00-a676-7b84673b45e0	33c1d8f6-b52f-4e28-ae45-549d965bb2e6	"Granship" Shizuoka Convention & Arts Center	\N	3	2019-03-29 20:21:41.531196	2019-03-29 20:21:41.531196	\N	\N	\N
2596	2015-06-06 00:00:00	2015-06-06 00:00:00	Japan	Shizuoka, Shizuoka Prefecture	Furmeet	2015	4	1a284f7d-2317-4d00-a676-7b84673b45e0	2b2a66fb-49e2-48ad-883b-26f12cf70658	"Granship" Shizuoka Convention & Arts Center	\N	4	2019-03-29 20:21:41.554723	2019-03-29 20:21:41.554723	\N	\N	\N
2597	2016-06-04 00:00:00	2016-06-04 00:00:00	Japan	Shizuoka, Shizuoka Prefecture	Furmeet	2016	5	1a284f7d-2317-4d00-a676-7b84673b45e0	d2c70676-68fd-4f0f-b86d-8760a7790976	"Granship" Shizuoka Convention & Arts Center	\N	5	2019-03-29 20:21:41.573414	2019-03-29 20:21:41.573414	\N	\N	\N
2598	2017-07-15 00:00:00	2017-07-15 00:00:00	Japan	Shizuoka, Shizuoka Prefecture	Furmeet	2017	6	1a284f7d-2317-4d00-a676-7b84673b45e0	00fa6ab3-3e25-4ce7-a351-3112025df92a	"Granship" Shizuoka Convention & Arts Center	\N	6	2019-03-29 20:21:41.593265	2019-03-29 20:21:41.593265	\N	\N	\N
2599	1997-12-31 00:00:00	1998-01-01 00:00:00	United States	Grayslake, Illinois	Convention	1998	1997	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	7609369d-1292-40d1-b8c6-dbddeb7c75a1	PosiCat and DataHawk's Apartment	\N	1997	2019-03-29 20:21:41.607764	2019-03-29 20:21:41.607764	\N	\N	\N
2600	1998-12-31 00:00:00	1999-01-01 00:00:00	United States	Bristol, Wsconsin	Convention	1999	1998	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	0fff1241-86db-463d-8d32-339735898c8a	Days Inn	\N	1998	2019-03-29 20:21:44.19042	2019-03-29 20:21:44.19042	\N	\N	\N
2601	1999-12-31 00:00:00	2000-01-01 00:00:00	United States	Bristol, Wsconsin	Convention	2000	1999	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	ecf8ea2e-675d-41b1-b7ee-1ef511ca1cc4	Days Inn	\N	1999	2019-03-29 20:21:44.211753	2019-03-29 20:21:44.211753	\N	\N	\N
2602	2000-12-31 00:00:00	2001-01-01 00:00:00	United States	Mt Pleasant, Wisconsin	Convention	2001	2000	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	aab3349b-8326-492d-a190-cf97119bb9cf	Knights Inn	\N	2000	2019-03-29 20:21:44.23452	2019-03-29 20:21:44.23452	\N	\N	\N
2603	2002-12-31 00:00:00	2003-01-01 00:00:00	United States	Elgin, Illinois	Convention	2003	2002	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	b917fb1d-8fd4-4ff4-933f-b81810a32b28	Days Inn	\N	2002	2019-03-29 20:21:44.255551	2019-03-29 20:21:44.255551	\N	\N	\N
2604	2003-12-31 00:00:00	2004-01-01 00:00:00	United States	Elgin, Illinois	Convention	2004	2003	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	7b41df36-3a6f-4b8e-924a-a3026925ebcb	Days Inn	\N	2003	2019-03-29 20:21:44.277123	2019-03-29 20:21:44.277123	\N	\N	\N
2605	2004-12-31 00:00:00	2005-01-01 00:00:00	United States	Gurnee, Illinois	Convention	2005	2004	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	8457c666-d1ec-4d46-a130-59be84a5b336	Country Inn & Suites	\N	2004	2019-03-29 20:21:44.298725	2019-03-29 20:21:44.298725	\N	\N	\N
2606	2005-12-31 00:00:00	2006-01-01 00:00:00	United States	Gurnee, Illinois	Convention	2006	2005	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	27bb2568-63d4-406c-9b9c-ce440e4aabbb	Country Inn & Suites	\N	2005	2019-03-29 20:21:44.318211	2019-03-29 20:21:44.318211	\N	\N	\N
2607	2006-12-31 00:00:00	2007-01-01 00:00:00	United States	Gurnee, Illinois	Convention	2007	2006	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	f86651b5-e3c1-41a4-a31a-6726cd7e075e	Country Inn & Suites	\N	2006	2019-03-29 20:21:44.337037	2019-03-29 20:21:44.337037	\N	\N	\N
2608	2007-12-31 00:00:00	2008-01-01 00:00:00	United States	Glen Ellyn, Illinois	Convention	2008	2007	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	4d293c36-c455-4272-ab81-2d5ab8237ca1	Super 8	\N	2007	2019-03-29 20:21:44.353138	2019-03-29 20:21:44.353138	\N	\N	\N
2609	2008-12-31 00:00:00	2009-01-01 00:00:00	United States	Gurnee, Illinois	Convention	2009	2008	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	fbc58829-9a97-4b98-a68b-2f1a0227c92d	Blazger and Frost Cat's Apartment	\N	2008	2019-03-29 20:21:44.371411	2019-03-29 20:21:44.371411	\N	\N	\N
2610	2009-12-31 00:00:00	2010-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2010	2009	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	f438342c-4fe2-40eb-99df-6114f2cc84be	Residence Inn Chicago Oak Brook	\N	2009	2019-03-29 20:21:44.386055	2019-03-29 20:21:44.386055	\N	\N	\N
2611	2010-12-31 00:00:00	2011-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2011	2010	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	d70ebb52-14c7-433b-92b3-8226ec471de4	Residence Inn Chicago Oak Brook	\N	2010	2019-03-29 20:21:44.40894	2019-03-29 20:21:44.40894	\N	\N	\N
2612	2011-12-31 00:00:00	2012-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2012	2011	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	2f53c56a-4ba5-40f3-a333-7b1d7f31e213	Residence Inn Chicago Oak Brook	\N	2011	2019-03-29 20:21:44.430178	2019-03-29 20:21:44.430178	\N	\N	\N
2613	2012-12-31 00:00:00	2013-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2013	2012	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	168ba7bd-03a2-412b-aa0e-85254abc61c9	Residence Inn Chicago Oak Brook	\N	2012	2019-03-29 20:21:44.449151	2019-03-29 20:21:44.449151	\N	\N	\N
2614	2013-12-31 00:00:00	2014-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2014	2013	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	af257522-b198-4d85-ac9f-eb8dc77a514e	Residence Inn Chicago Oak Brook	\N	2013	2019-03-29 20:21:44.467833	2019-03-29 20:21:44.467833	\N	\N	\N
2615	2014-12-31 00:00:00	2015-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2015	2014	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	2e68e9fe-51f2-4285-97bc-1b356675227b	Residence Inn Chicago Oak Brook	\N	2014	2019-03-29 20:21:44.485023	2019-03-29 20:21:44.485023	\N	\N	\N
2616	2015-12-31 00:00:00	2016-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2016	2015	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	d49ed6e5-3db7-4fd3-9eaa-95444b2722d8	Residence Inn Chicago Oak Brook	\N	2015	2019-03-29 20:21:44.504977	2019-03-29 20:21:44.504977	\N	\N	\N
2617	2016-12-31 00:00:00	2017-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2017	2016	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	920ed38b-f058-4253-ae41-330b5442f572	Residence Inn Chicago Oak Brook	\N	2016	2019-03-29 20:21:44.519563	2019-03-29 20:21:44.519563	\N	\N	\N
2618	2017-12-31 00:00:00	2018-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2018	2017	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	bf03fec5-d02a-4943-9dc7-125b562e6356	Residence Inn Chicago Oak Brook	\N	2017	2019-03-29 20:21:44.539503	2019-03-29 20:21:44.539503	\N	\N	\N
2619	2018-12-31 00:00:00	2019-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2019	2018	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	e654aab5-1390-4722-899d-e275dace14de	Residence Inn Chicago Oak Brook	\N	2018	2019-03-29 20:21:44.57002	2019-03-29 20:21:44.57002	\N	\N	\N
2620	2019-12-31 00:00:00	2020-01-01 00:00:00	United States	Oak Brook, Illinois	Convention	2020	2019	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	ede9a440-40bf-43f7-b849-a1cb61aa136d	Residence Inn Chicago Oak Brook	\N	2019	2019-03-29 20:21:44.586223	2019-03-29 20:21:44.586223	\N	\N	\N
2621	2007-07-20 00:00:00	2007-07-22 00:00:00	Austria	Grundlsee	Convention	2007	2007	1394c8d3-9dfb-4999-b9e0-79219f01d68c	9df3049c-96de-4a77-b898-8b6d6ea604ce	Grundlsee Youth & Family Guesthouse	\N	2007	2019-03-29 20:21:44.605691	2019-03-29 20:21:44.605691	\N	\N	\N
2622	2008-07-24 00:00:00	2008-07-27 00:00:00	Austria	Grundlsee	Convention	2008	2008	1394c8d3-9dfb-4999-b9e0-79219f01d68c	f4d941d8-b88f-485e-b5e4-1bc686e5e599	Grundlsee Youth & Family Guesthouse	\N	2008	2019-03-29 20:21:47.205875	2019-03-29 20:21:47.205875	\N	\N	\N
2623	2009-08-06 00:00:00	2009-08-09 00:00:00	Austria	Seckau	Convention	2009	2009	1394c8d3-9dfb-4999-b9e0-79219f01d68c	f51e1469-2fe3-43a2-9d31-1bf8091a9681	JUFA Seckau	\N	2009	2019-03-29 20:21:47.236997	2019-03-29 20:21:47.236997	\N	\N	\N
2624	2010-07-31 00:00:00	2010-08-07 00:00:00	Austria	Salzburg	Convention	2010	2010	1394c8d3-9dfb-4999-b9e0-79219f01d68c	8be7c6a9-e539-49d2-bb03-00a469247e0b	Pension Stoffenhof, Zell am See	\N	2010	2019-03-29 20:21:47.265575	2019-03-29 20:21:47.265575	\N	\N	\N
2625	2011-07-30 00:00:00	2011-08-06 00:00:00	Austria	Salzburg	Convention	2011	2011	1394c8d3-9dfb-4999-b9e0-79219f01d68c	dd17e988-e88b-4c0e-aa8d-94dcde27bcd7	Pension Stoffenhof, Zell am See	\N	2011	2019-03-29 20:21:47.283528	2019-03-29 20:21:47.283528	\N	\N	\N
2626	2012-08-11 00:00:00	2012-08-18 00:00:00	Austria	Salzburg	Convention	2012	2012	1394c8d3-9dfb-4999-b9e0-79219f01d68c	31ed4fc1-19a8-4b88-a43f-16a256d23ffe	Pension Stoffenhof, Zell am See	\N	2012	2019-03-29 20:21:47.309172	2019-03-29 20:21:47.309172	\N	\N	\N
2627	2013-07-20 00:00:00	2013-07-27 00:00:00	Austria	Salzburg	Convention	2013	2013	1394c8d3-9dfb-4999-b9e0-79219f01d68c	4fd8d822-3dd5-4df3-a091-ee012d078330	Pension Stoffenhof, Zell am See	\N	2013	2019-03-29 20:21:47.335413	2019-03-29 20:21:47.335413	\N	\N	\N
2628	2014-07-19 00:00:00	2014-07-26 00:00:00	Austria	Embach	Convention	2014	2014	1394c8d3-9dfb-4999-b9e0-79219f01d68c	5bcd6917-b637-4549-aa26-258dfdacbd8c	Forellenhof in Angerberg, Tyrol	\N	2014	2019-03-29 20:21:47.362238	2019-03-29 20:21:47.362238	\N	\N	\N
2629	2015-07-11 00:00:00	2015-07-18 00:00:00	Austria	Embach	Convention	2015	2015	1394c8d3-9dfb-4999-b9e0-79219f01d68c	970e99e3-1c62-4757-9ef2-0221ca7d663a	Forellenhof in Angerberg, Tyrol	\N	2015	2019-03-29 20:21:47.381832	2019-03-29 20:21:47.381832	\N	\N	\N
2630	2016-07-09 00:00:00	2016-07-16 00:00:00	Austria	Carinthia	Convention	2016	2016	1394c8d3-9dfb-4999-b9e0-79219f01d68c	932c44d0-7179-446b-a166-ed27f27c3989	Faak am See	\N	2016	2019-03-29 20:21:47.405856	2019-03-29 20:21:47.405856	\N	\N	\N
2631	2017-07-01 00:00:00	2017-07-08 00:00:00	Austria	Carinthia	Convention	2017	2017	1394c8d3-9dfb-4999-b9e0-79219f01d68c	ed8007c1-7fe7-41eb-a921-79e69bc3420c	Faaker See, Villach	\N	2017	2019-03-29 20:21:47.43423	2019-03-29 20:21:47.43423	\N	\N	\N
2632	2018-07-14 00:00:00	2018-07-21 00:00:00	Austria	Embach	Convention	2018	2018	1394c8d3-9dfb-4999-b9e0-79219f01d68c	a64e066a-86aa-4a83-933e-5024fe58f95f	Lermoos, Tyrol	\N	2018	2019-03-29 20:21:47.464093	2019-03-29 20:21:47.464093	\N	\N	\N
2633	2019-07-22 00:00:00	2019-07-29 00:00:00	Austria	Wald im Pinzgau, Salzburg	Convention	2019	2019	1394c8d3-9dfb-4999-b9e0-79219f01d68c	20bad677-defa-4425-afe1-6fe5b4b34e6d	Chalet Bergerblick	\N	2019	2019-03-29 20:21:47.494213	2019-03-29 20:21:47.494213	\N	\N	\N
2634	2007-08-31 00:00:00	2007-09-02 00:00:00	Austria	Grundlsee	Convention	2007	2007	c723ed71-bcf4-4d9e-beef-4c4a07f4cb79	671438aa-b414-4a9e-ab3d-364418eedfb7	Grundlsee Youth & Family Guesthouse	\N	2007	2019-03-29 20:21:47.524192	2019-03-29 20:21:47.524192	\N	\N	\N
2635	2002-03-08 00:00:00	2002-03-10 00:00:00	United States	Orlando, Florida	Convention	2002	Pawpet	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	3bb3d469-dbf1-4051-9128-42b76f6f4e7b	Ramada Resort and Convention Center	126	pawpet	2019-03-29 20:21:50.035734	2019-03-29 20:21:50.035734	\N	\N	\N
2636	2003-03-21 00:00:00	2003-03-23 00:00:00	United States	Orlando, Florida	Convention	2003	Pawpet 2	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	dc236781-37d9-45c2-a68d-23744dd3b7a9	Sheraton Studio City Resort	197	pawpet-2	2019-03-29 20:21:53.009849	2019-03-29 20:21:53.009849	\N	\N	\N
2637	2004-03-19 00:00:00	2004-03-21 00:00:00	United States	Orlando, Florida	Convention	2004	3	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	c0ad9f61-9593-4b10-8720-78926de3434b	Sheraton Studio City Resort	357	3	2019-03-29 20:21:53.028298	2019-03-29 20:21:53.028298	\N	\N	\N
2638	2005-03-11 00:00:00	2005-03-16 00:00:00	United States	Orlando, Florida	Convention	2005	4	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	9cb584d8-0f0b-43e3-97e7-be64029ebeaa	Sheraton World Resort	387	4	2019-03-29 20:21:53.056316	2019-03-29 20:21:53.056316	\N	\N	\N
2639	2006-03-17 00:00:00	2006-03-19 00:00:00	United States	Orlando, Florida	Convention	2006	5	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	4469917d-9143-4b52-b8b4-2c51cca1f264	Sheraton World Resort	257	5	2019-03-29 20:21:53.084705	2019-03-29 20:21:53.084705	\N	\N	\N
2640	2007-03-02 00:00:00	2007-03-04 00:00:00	United States	Jacksonville, Florida	Convention	2007	6	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	859aaebe-bf92-4e08-906c-d491b0c068fe	Wyndham Jacksonville Riverfront	185	6	2019-03-29 20:21:53.111278	2019-03-29 20:21:53.111278	\N	\N	\N
2641	2008-03-28 00:00:00	2008-03-30 00:00:00	United States	Jacksonville, Florida	Convention	2008	7	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	303d4127-5a0a-4669-b499-eb4d86192586	Wyndham Jacksonville Riverfront	255	7	2019-03-29 20:21:53.139872	2019-03-29 20:21:53.139872	\N	\N	\N
2642	2009-07-24 00:00:00	2009-07-26 00:00:00	United States	Kissimmee, Florida	Convention	2009	8	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	7d40fb4b-83a5-4da5-8035-85b4180f07e9	Radisson Worldgate Resort	425	8	2019-03-29 20:21:53.158195	2019-03-29 20:21:53.158195	\N	\N	\N
2643	2010-07-23 00:00:00	2010-07-25 00:00:00	United States	Kissimmee, Florida	Convention	2010	9	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	eb7df9a1-0095-4ef9-a458-2acf907c47aa	Radisson Worldgate Resort	410	9	2019-03-29 20:21:53.188368	2019-03-29 20:21:53.188368	\N	\N	\N
2644	2011-07-29 00:00:00	2011-07-31 00:00:00	United States	Kissimmee, Florida	Convention	2011	10	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	46e7e812-c2a1-4966-865c-2eb5ac9f02ea	Worldgate Resort	553	10	2019-03-29 20:21:53.212819	2019-03-29 20:21:53.212819	\N	\N	\N
2645	2012-07-27 00:00:00	2012-07-29 00:00:00	United States	Kissimmee, Florida	Convention	2012	XI	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	1f2a6d7d-cf6d-4d7b-8915-803bcc48d8fc	Worldgate Resort	625	xi	2019-03-29 20:21:53.24379	2019-03-29 20:21:53.24379	\N	\N	\N
2646	2013-07-26 00:00:00	2013-07-28 00:00:00	United States	Orlando, Florida	Convention	2013	XII	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	fbaac4dd-4dc5-47d9-9073-e3d8b59630e1	Marriott Orlando Airport	821	xii	2019-03-29 20:21:53.270244	2019-03-29 20:21:53.270244	\N	\N	\N
2647	2014-07-25 00:00:00	2014-07-27 00:00:00	United States	Orlando, Florida	Convention	2014	XIII	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	8fa1e53e-885e-4d29-baa5-322f948d4f38	Marriott Orlando Airport	1	xiii	2019-03-29 20:21:53.315196	2019-03-29 20:21:53.315196	\N	\N	\N
2648	2015-07-31 00:00:00	2015-08-02 00:00:00	United States	Orlando, Florida	Convention	2015	XIV	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	aa01e0f3-5dbe-4ae2-84a5-f42ae7ca10f8	Marriott Orlando Airport	1	xiv	2019-03-29 20:21:53.349638	2019-03-29 20:21:53.349638	\N	\N	\N
2649	2016-08-05 00:00:00	2016-08-07 00:00:00	United States	Orlando, Florida	Convention	2016	XV	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	7fc867cc-8f1f-40e2-ba78-5b395645539b	Embassy Suites - Lake Buena Vista South	1	xv	2019-03-29 20:21:53.381077	2019-03-29 20:21:53.381077	\N	\N	\N
2650	2017-08-04 00:00:00	2017-08-06 00:00:00	United States	Orlando, Florida	Convention	2017	XVI	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	f9525e53-aea0-414d-9378-365d053e846f	Seaworld DoubleTree	2	xvi	2019-03-29 20:21:53.466183	2019-03-29 20:21:53.466183	\N	\N	\N
2651	2018-08-03 00:00:00	2018-08-05 00:00:00	United States	Orlando, Florida	Convention	2018	XVII	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	813486ab-166c-4814-b613-1d46adeff7f7	SeaWorld DoubleTree	2	xvii	2019-03-29 20:21:53.615937	2019-03-29 20:21:53.615937	\N	\N	\N
2652	2019-08-09 00:00:00	2019-08-11 00:00:00	United States	Orlando, Florida	Convention	2019	XVIII	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	7b4b777e-7616-45c5-83fa-11bbb102d54a	SeaWorld DoubleTree	\N	xviii	2019-03-29 20:21:53.676972	2019-03-29 20:21:53.676972	\N	\N	\N
2653	2018-02-23 00:00:00	2018-02-24 00:00:00	Australia	Melbourne, Victoria	Convention	2018	2018	69863a0c-1326-4c74-a98c-4333c843ed65	aad716ad-6598-4d88-b4a9-bcbd55e2f59b	Scouts Victoria, Carlton North	\N	2018	2019-03-29 20:21:53.710497	2019-03-29 20:21:53.710497	\N	\N	\N
2654	2019-02-21 00:00:00	2019-02-23 00:00:00	Australia	Melbourne, Victoria	Convention	2019	2019	69863a0c-1326-4c74-a98c-4333c843ed65	48d67526-bd51-4a72-86e1-85850d9080c2	Ibis Melbourne Hotel and Apartments	\N	2019	2019-03-29 20:21:56.429505	2019-03-29 20:21:56.429505	\N	\N	\N
2655	1997-08-29 00:00:00	1997-09-03 00:00:00	United States	Memphis, Tennessee	Convention	1997	1997	85b072c1-5a40-4c8e-8d27-5f7202d89fde	260839a9-5174-4791-876e-dba884eca1c2	Howard Johnson Inn	\N	1997	2019-03-29 20:21:56.445934	2019-03-29 20:21:56.445934	\N	\N	\N
2656	1998-09-04 00:00:00	1998-09-07 00:00:00	United States	Memphis, Tennessee	Convention	1998	1998	85b072c1-5a40-4c8e-8d27-5f7202d89fde	8b242131-17ea-4bfd-ac35-f80434ef7fed	Holiday Inn Select Memphis East	\N	1998	2019-03-29 20:21:59.08205	2019-03-29 20:21:59.08205	\N	\N	\N
2657	1999-09-03 00:00:00	1999-09-06 00:00:00	United States	Memphis, Tennessee	Convention	1999	1999	85b072c1-5a40-4c8e-8d27-5f7202d89fde	881560dd-9091-4247-8bb7-72126bd55588	Holiday Inn Select Memphis East	\N	1999	2019-03-29 20:21:59.102499	2019-03-29 20:21:59.102499	\N	\N	\N
2658	2000-09-01 00:00:00	2000-09-04 00:00:00	United States	Memphis, Tennessee	Convention	2000	2000	85b072c1-5a40-4c8e-8d27-5f7202d89fde	7f10a872-fbdd-41bd-9066-e4ad9a9ba607	Holiday Inn Select Memphis East	\N	2000	2019-03-29 20:21:59.12198	2019-03-29 20:21:59.12198	\N	\N	\N
2659	2001-08-31 00:00:00	2001-09-03 00:00:00	United States	Memphis, Tennessee	Convention	2001	2001	85b072c1-5a40-4c8e-8d27-5f7202d89fde	101f854b-0a53-4113-8852-ccb27b15c060	Holiday Inn Select at Memphis International Airport	\N	2001	2019-03-29 20:21:59.138237	2019-03-29 20:21:59.138237	\N	\N	\N
2660	2002-08-30 00:00:00	2002-09-02 00:00:00	United States	Memphis, Tennessee	Convention	2002	2002	85b072c1-5a40-4c8e-8d27-5f7202d89fde	b3ca0f02-d75f-4155-8149-a6b61ca0af81	Holiday Inn Select at Memphis International Airport	\N	2002	2019-03-29 20:21:59.157469	2019-03-29 20:21:59.157469	\N	\N	\N
2661	2003-08-29 00:00:00	2003-09-01 00:00:00	United States	Memphis, Tennessee	Convention	2003	2003	85b072c1-5a40-4c8e-8d27-5f7202d89fde	2f133077-88fa-4cb7-a1d8-95155ff03389	Holiday Inn Select at Memphis International Airport	\N	2003	2019-03-29 20:21:59.179776	2019-03-29 20:21:59.179776	\N	\N	\N
2662	2004-09-03 00:00:00	2004-09-06 00:00:00	United States	Memphis, Tennessee	Convention	2004	2004	85b072c1-5a40-4c8e-8d27-5f7202d89fde	66c9886c-eff1-4dc6-a3b2-7b3c5a32dddd	Holiday Inn Select at Memphis International Airport	\N	2004	2019-03-29 20:21:59.198194	2019-03-29 20:21:59.198194	\N	\N	\N
2663	2005-09-02 00:00:00	2005-09-04 00:00:00	United States	Memphis, Tennessee	Convention	2005	2005	85b072c1-5a40-4c8e-8d27-5f7202d89fde	733b4f33-fdae-45dc-b59a-a9211d0a67d6	Holiday Inn Select at Memphis International Airport	\N	2005	2019-03-29 20:21:59.217024	2019-03-29 20:21:59.217024	\N	\N	\N
2664	2006-09-01 00:00:00	2006-09-03 00:00:00	United States	Memphis, Tennessee	Convention	2006	2006	85b072c1-5a40-4c8e-8d27-5f7202d89fde	b9197062-2294-4d57-9dac-cf74858a2507	Holiday Inn Select at Memphis International Airport	\N	2006	2019-03-29 20:21:59.234521	2019-03-29 20:21:59.234521	\N	\N	\N
2665	2007-08-31 00:00:00	2007-09-02 00:00:00	United States	Memphis, Tennessee	Convention	2007	2007	85b072c1-5a40-4c8e-8d27-5f7202d89fde	650836d9-a5bb-48de-8b1a-d1534d054840	Holiday Inn Select at Memphis International Airport	\N	2007	2019-03-29 20:21:59.259307	2019-03-29 20:21:59.259307	\N	\N	\N
2666	2008-08-29 00:00:00	2008-08-31 00:00:00	United States	Memphis, Tennessee	Convention	2008	2008	85b072c1-5a40-4c8e-8d27-5f7202d89fde	b22fa42a-345b-4358-bdf3-060c5d01dbd6	Holiday Inn Select at Memphis International Airport	\N	2008	2019-03-29 20:21:59.280162	2019-03-29 20:21:59.280162	\N	\N	\N
2667	2009-09-04 00:00:00	2009-09-06 00:00:00	United States	Memphis, Tennessee	Convention	2009	2009	85b072c1-5a40-4c8e-8d27-5f7202d89fde	b801086a-2c9e-4a6f-9285-50ac5b3bb3f1	Holiday Inn Select at Memphis International Airport	\N	2009	2019-03-29 20:21:59.298289	2019-03-29 20:21:59.298289	\N	\N	\N
2668	2010-09-03 00:00:00	2010-09-05 00:00:00	United States	Olive Branch, Mississippi	Convention	2010	2010	85b072c1-5a40-4c8e-8d27-5f7202d89fde	a9e0e2c1-d7c4-4378-9ede-54ae8d627351	Whispering Woods Hotel & Conference Center	\N	2010	2019-03-29 20:21:59.321075	2019-03-29 20:21:59.321075	\N	\N	\N
2669	2011-09-02 00:00:00	2011-09-04 00:00:00	United States	Olive Branch, Mississippi	Convention	2011	2011	85b072c1-5a40-4c8e-8d27-5f7202d89fde	44baff84-beb4-4605-9ffc-cb6f5daae063	Whispering Woods Hotel & Conference Center	\N	2011	2019-03-29 20:21:59.338513	2019-03-29 20:21:59.338513	\N	\N	\N
2670	2012-08-31 00:00:00	2012-09-02 00:00:00	United States	Olive Branch, Mississippi	Convention	2012	2012	85b072c1-5a40-4c8e-8d27-5f7202d89fde	5b4112fe-9510-4720-a9e6-82f96b20e298	Whispering Woods Hotel & Conference Center	\N	2012	2019-03-29 20:21:59.357572	2019-03-29 20:21:59.357572	\N	\N	\N
2671	2013-08-30 00:00:00	2013-09-01 00:00:00	United States	Olive Branch, Mississippi	Convention	2013	2013	85b072c1-5a40-4c8e-8d27-5f7202d89fde	78977083-7bef-47fb-a5c0-6ea069163d5e	Whispering Woods Hotel & Conference Center	\N	2013	2019-03-29 20:21:59.381948	2019-03-29 20:21:59.381948	\N	\N	\N
2672	2014-08-28 00:00:00	2014-08-31 00:00:00	United States	Olive Branch, Mississippi	Convention	2014	2014	85b072c1-5a40-4c8e-8d27-5f7202d89fde	a403a81f-05c6-49b2-b23f-b86ac523b1ff	Whispering Woods Hotel & Conference Center	\N	2014	2019-03-29 20:21:59.39915	2019-03-29 20:21:59.39915	\N	\N	\N
2673	2015-09-04 00:00:00	2015-09-06 00:00:00	United States	Olive Branch, Mississippi	Convention	2015	2015	85b072c1-5a40-4c8e-8d27-5f7202d89fde	82d8f01c-4b72-4816-8c79-6b1009880de8	Whispering Woods Hotel & Conference Center	\N	2015	2019-03-29 20:21:59.416344	2019-03-29 20:21:59.416344	\N	\N	\N
2674	2016-09-02 00:00:00	2016-09-04 00:00:00	United States	Olive Branch, Mississippi	Convention	2016	2016	85b072c1-5a40-4c8e-8d27-5f7202d89fde	45b120c7-433b-43b6-8edc-957d09925cf3	Whispering Woods Hotel & Conference Center	\N	2016	2019-03-29 20:21:59.432257	2019-03-29 20:21:59.432257	\N	\N	\N
2675	2017-09-01 00:00:00	2017-09-03 00:00:00	United States	Olive Branch, Mississippi	Convention	2017	2017	85b072c1-5a40-4c8e-8d27-5f7202d89fde	fa713b13-b857-40a1-8029-c80b9155027a	Whispering Woods Hotel & Conference Center	\N	2017	2019-03-29 20:21:59.450761	2019-03-29 20:21:59.450761	\N	\N	\N
2676	2018-08-31 00:00:00	2018-09-02 00:00:00	United States	Olive Branch, Mississippi	Convention	2018	2018	85b072c1-5a40-4c8e-8d27-5f7202d89fde	8fa440e4-5cdc-4b89-8b1e-102f7ae53a77	Whispering Woods Hotel & Conference Center	\N	2018	2019-03-29 20:21:59.468757	2019-03-29 20:21:59.468757	\N	\N	\N
2677	2019-08-30 00:00:00	2019-09-01 00:00:00	United States	Olive Branch, Mississippi	Convention	2019	2019	85b072c1-5a40-4c8e-8d27-5f7202d89fde	d129fcdf-06fc-4f7c-b9fa-5337e8f911bd	Whispering Woods Hotel & Conference Center	\N	2019	2019-03-29 20:21:59.488962	2019-03-29 20:21:59.488962	\N	\N	\N
2678	1998-04-30 00:00:00	1998-05-03 00:00:00	Germany	Rüsselsheim, Hesse	Convention	1998	1998	708165cb-6572-48f0-b0f6-1a30699640b9	987cd966-adf2-4181-a9f9-0530e80917b2	Private Apartment	\N	1998	2019-03-29 20:21:59.514593	2019-03-29 20:21:59.514593	\N	\N	\N
2679	1999-04-29 00:00:00	1999-05-02 00:00:00	Germany	Seeheim, Hesse	Convention	1999	1999	708165cb-6572-48f0-b0f6-1a30699640b9	be8f8f22-1a09-4651-9100-71284eff46ae	Falken Jugendheim	\N	1999	2019-03-29 20:22:02.097897	2019-03-29 20:22:02.097897	\N	\N	\N
2680	2000-04-27 00:00:00	2000-05-01 00:00:00	Germany	Seeheim, Hesse	Convention	2000	2000	708165cb-6572-48f0-b0f6-1a30699640b9	35cd1194-0ab1-4d0e-a10a-361460a81472	Falken Jugendheim	\N	2000	2019-03-29 20:22:02.120715	2019-03-29 20:22:02.120715	\N	\N	\N
2681	2001-05-03 00:00:00	2001-05-06 00:00:00	Germany	Seeheim, Hesse	Convention	2001	2001	708165cb-6572-48f0-b0f6-1a30699640b9	da1a1273-ef8a-411d-aace-53831d6c64d3	Falken Jugendheim	\N	2001	2019-03-29 20:22:02.140975	2019-03-29 20:22:02.140975	\N	\N	\N
2682	2002-04-25 00:00:00	2002-04-28 00:00:00	Germany	Sankt Goarshausen, Rhineland-Palatinate	Convention	2002	2002	708165cb-6572-48f0-b0f6-1a30699640b9	8210c8c3-166e-4f31-b0e2-a2f3b7240fda	Lorelei Rock	\N	2002	2019-03-29 20:22:02.170011	2019-03-29 20:22:02.170011	\N	\N	\N
2683	2003-05-01 00:00:00	2003-05-04 00:00:00	Germany	Sankt Goarshausen, Rhineland-Palatinate	Convention	2003	2003	708165cb-6572-48f0-b0f6-1a30699640b9	7da5ffb5-0a21-468b-8ef1-efa94c868229	Lorelei Rock	\N	2003	2019-03-29 20:22:02.192622	2019-03-29 20:22:02.192622	\N	\N	\N
2684	2004-05-06 00:00:00	2004-05-09 00:00:00	Germany	Sankt Goarshausen, Rhineland-Palatinate	Convention	2004	2004	708165cb-6572-48f0-b0f6-1a30699640b9	6e6a68cb-e0fe-4c38-ad1a-6f240fa2b14b	Lorelei Rock	\N	2004	2019-03-29 20:22:02.212837	2019-03-29 20:22:02.212837	\N	\N	\N
2685	2005-05-19 00:00:00	2005-05-22 00:00:00	Germany	Sankt Goarshausen, Rhineland-Palatinate	Convention	2005	2005	708165cb-6572-48f0-b0f6-1a30699640b9	f80f2dd7-f5c7-49c3-b9d0-41f131252725	Lorelei Rock	\N	2005	2019-03-29 20:22:02.23606	2019-03-29 20:22:02.23606	\N	\N	\N
2686	2006-05-04 00:00:00	2006-05-07 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2006	2006	708165cb-6572-48f0-b0f6-1a30699640b9	e88c8c95-1739-47d7-8110-a4019ea4ca89	Freusburg Castle	\N	2006	2019-03-29 20:22:02.264395	2019-03-29 20:22:02.264395	\N	\N	\N
2687	2007-05-17 00:00:00	2007-05-20 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2007	2007	708165cb-6572-48f0-b0f6-1a30699640b9	cad1e7f4-8a9c-4282-ac93-2076e56df953	Freusburg Castle	\N	2007	2019-03-29 20:22:02.281243	2019-03-29 20:22:02.281243	\N	\N	\N
2688	2008-05-08 00:00:00	2008-05-11 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2008	2008	708165cb-6572-48f0-b0f6-1a30699640b9	6d57d2f8-c184-40e8-be6b-d28ecd405ffc	Freusburg Castle	\N	2008	2019-03-29 20:22:02.303505	2019-03-29 20:22:02.303505	\N	\N	\N
2689	2009-04-30 00:00:00	2009-05-03 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2009	2009	708165cb-6572-48f0-b0f6-1a30699640b9	6c762204-9dbf-496a-9293-c37013ebed74	Freusburg Castle	\N	2009	2019-03-29 20:22:02.322838	2019-03-29 20:22:02.322838	\N	\N	\N
2690	2010-05-13 00:00:00	2010-05-16 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2010	2010	708165cb-6572-48f0-b0f6-1a30699640b9	c4e2f1e2-148a-4da2-9b3f-06295e3de4fa	Freusburg Castle	\N	2010	2019-03-29 20:22:02.337622	2019-03-29 20:22:02.337622	\N	\N	\N
2691	2011-04-28 00:00:00	2011-05-01 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2011	2011	708165cb-6572-48f0-b0f6-1a30699640b9	def814ef-f4c4-4aef-903f-3e388f99e0f6	Freusburg Castle	\N	2011	2019-03-29 20:22:02.35491	2019-03-29 20:22:02.35491	\N	\N	\N
2692	2012-05-17 00:00:00	2012-05-20 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2012	2012	708165cb-6572-48f0-b0f6-1a30699640b9	5bd8ef9a-2073-4234-84d7-c880c30b1473	Freusburg Castle	\N	2012	2019-03-29 20:22:02.372403	2019-03-29 20:22:02.372403	\N	\N	\N
2693	2013-05-09 00:00:00	2013-05-12 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2013	2013	708165cb-6572-48f0-b0f6-1a30699640b9	042fb274-1805-4d22-ae94-e69dcb9bd625	Freusburg Castle	\N	2013	2019-03-29 20:22:02.3898	2019-03-29 20:22:02.3898	\N	\N	\N
2694	2014-05-01 00:00:00	2014-05-04 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2014	2014	708165cb-6572-48f0-b0f6-1a30699640b9	3300c2b1-e449-4f75-908c-20aaffcd8414	Freusburg Castle	\N	2014	2019-03-29 20:22:02.404831	2019-03-29 20:22:02.404831	\N	\N	\N
2695	2015-04-30 00:00:00	2015-05-03 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2015	2015	708165cb-6572-48f0-b0f6-1a30699640b9	5f77c5d3-dc50-4782-b1a6-1c783a70ba9b	Freusburg Castle	\N	2015	2019-03-29 20:22:02.422226	2019-03-29 20:22:02.422226	\N	\N	\N
2696	2016-05-12 00:00:00	2016-05-16 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2016	2016	708165cb-6572-48f0-b0f6-1a30699640b9	38ddf770-296f-4b50-89b4-4f3e4b667a4e	Freusburg Castle	\N	2016	2019-03-29 20:22:02.438483	2019-03-29 20:22:02.438483	\N	\N	\N
2697	2017-05-25 00:00:00	2017-05-28 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2017	2017	708165cb-6572-48f0-b0f6-1a30699640b9	6efdc780-cbb7-479e-a3c5-d62a6d41a028	Freusburg Castle	\N	2017	2019-03-29 20:22:02.456268	2019-03-29 20:22:02.456268	\N	\N	\N
2698	2018-05-10 00:00:00	2018-05-13 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2018	2018	708165cb-6572-48f0-b0f6-1a30699640b9	4b2ed5f1-5f3b-482f-b50f-48dc2e9572a0	Freusburg Castle	\N	2018	2019-03-29 20:22:02.477623	2019-03-29 20:22:02.477623	\N	\N	\N
2699	2019-06-06 00:00:00	2019-06-10 00:00:00	Germany	Kirchen, Rhineland-Palatinate	Convention	2019	2019	708165cb-6572-48f0-b0f6-1a30699640b9	f7c36bc5-2c6a-45ec-a7cd-2c0af5b3aff9	Freusburg Castle	\N	2019	2019-03-29 20:22:02.495567	2019-03-29 20:22:02.495567	\N	\N	\N
2700	2016-03-05 00:00:00	2016-03-05 00:00:00	United States	Northborough, Massachusetts	Convention	2016	2016	a9aa3b5b-7a0b-4560-93db-4d86f90b543c	72102d1f-5b24-4b5e-b1bd-94524d21046b	Sawyer's Bowladrome Bowling Alley	\N	2016	2019-03-29 20:22:02.511664	2019-03-29 20:22:02.511664	\N	\N	\N
2701	2016-06-11 00:00:00	2016-06-11 00:00:00	United States	Northborough, Massachusetts	Convention	2016	2016	a9aa3b5b-7a0b-4560-93db-4d86f90b543c	b42d07d1-31ad-434a-8e6c-8fce5bb7ac5f	Sawyer's Bowladrome Bowling Alley	\N	2016-2	2019-03-29 20:22:05.072364	2019-03-29 20:22:05.072364	\N	\N	\N
2702	2016-08-13 00:00:00	2016-08-13 00:00:00	United States	Northborough, Massachusetts	Convention	2016	2016	a9aa3b5b-7a0b-4560-93db-4d86f90b543c	8bcafde6-c736-4735-8edd-e2f0da05709e	Sawyer's Bowladrome Bowling Alley	\N	2016-3	2019-03-29 20:22:05.090497	2019-03-29 20:22:05.090497	\N	\N	\N
2703	2017-04-01 00:00:00	2017-04-01 00:00:00	United States	Northborough, Massachusetts	Convention	2017	2017	a9aa3b5b-7a0b-4560-93db-4d86f90b543c	9fd53a63-3c0d-4086-a5bd-7aa8b781e235	Sawyer's Bowladrome Bowling Alley	\N	2017	2019-03-29 20:22:05.109408	2019-03-29 20:22:05.109408	\N	\N	\N
2704	2006-12-15 00:00:00	2006-12-17 00:00:00	Australia	Melbourne, Victoria	Convention	2006	2006	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	3c0a994e-6f2c-473f-a9d5-a4fd924610c0	Various Locations	\N	2006	2019-03-29 20:22:05.134032	2019-03-29 20:22:05.134032	\N	\N	\N
2705	2007-12-14 00:00:00	2007-12-16 00:00:00	Australia	Melbourne, Victoria	Convention	2007	2007	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	361573c9-cc89-4243-948d-fcd9679be3b6	Various Locations	\N	2007	2019-03-29 20:22:07.753358	2019-03-29 20:22:07.753358	\N	\N	\N
2706	2008-12-12 00:00:00	2008-12-15 00:00:00	Australia	Melbourne, Victoria	Convention	2008	X	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	e3fcbd93-ff5b-41ec-895b-a0f3b8412a15	Various Locations	\N	x	2019-03-29 20:22:07.770353	2019-03-29 20:22:07.770353	\N	\N	\N
2707	2009-12-03 00:00:00	2009-12-06 00:00:00	Australia	Melbourne, Victoria	Convention	2009	11	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	b7927c3c-52bf-47c3-9763-eae82af44790	Various Locations	\N	11	2019-03-29 20:22:07.794424	2019-03-29 20:22:07.794424	\N	\N	\N
2708	2010-12-02 00:00:00	2010-12-05 00:00:00	Australia	Melbourne, Victoria	Convention	2010	12	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	1bc8dce3-02a9-402a-a214-6c5c12822008	Rydges Hotel	\N	12	2019-03-29 20:22:07.815465	2019-03-29 20:22:07.815465	\N	\N	\N
2709	2012-01-04 00:00:00	2012-01-07 00:00:00	Australia	Melbourne, Victoria	Convention	2012	13	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	6d8a26ee-5c36-430f-a376-aef5556a33ee	Arrow on Swanston	\N	13	2019-03-29 20:22:07.833657	2019-03-29 20:22:07.833657	\N	\N	\N
2710	2012-12-04 00:00:00	2012-12-08 00:00:00	Australia	Melbourne, Victoria	Convention	2012	14	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	a8d200be-75c6-4323-b132-e67672cec5d2	Arrow on Swanston	\N	14	2019-03-29 20:22:07.854872	2019-03-29 20:22:07.854872	\N	\N	\N
2711	2001-11-16 00:00:00	2001-11-18 00:00:00	United States	Arlington Heights, Illinois	Convention	2001	2	39a68baf-2aca-496a-9159-0489b5973de4	74c539dc-e376-4a7d-9466-78ad85fba0f8	Sheraton Chicago Northwest	511	2	2019-03-29 20:22:07.871659	2019-03-29 20:22:07.871659	\N	\N	\N
2712	2002-11-22 00:00:00	2002-11-24 00:00:00	United States	Schaumburg, Illinois	Convention	2002	3	39a68baf-2aca-496a-9159-0489b5973de4	96e53fb0-2b12-45d2-a8e2-e91f48e5c107	Hyatt Regency Woodfield	685	3	2019-03-29 20:22:10.576066	2019-03-29 20:22:10.576066	\N	\N	\N
2713	2003-11-21 00:00:00	2003-11-23 00:00:00	United States	Schaumburg, Illinois	Convention	2003	4	39a68baf-2aca-496a-9159-0489b5973de4	0f6767b8-fd38-4317-b84b-22698430d10d	Hyatt Regency Woodfield	800	4	2019-03-29 20:22:10.608661	2019-03-29 20:22:10.608661	\N	\N	\N
2714	2004-11-19 00:00:00	2004-11-21 00:00:00	United States	Schaumburg, Illinois	Convention	2004	5	39a68baf-2aca-496a-9159-0489b5973de4	be31de55-782a-48a8-9551-728b616f8547	Hyatt Regency Woodfield	959	5	2019-03-29 20:22:10.641904	2019-03-29 20:22:10.641904	\N	\N	\N
2715	2005-11-18 00:00:00	2005-11-20 00:00:00	United States	Schaumburg, Illinois	Convention	2005	6	39a68baf-2aca-496a-9159-0489b5973de4	1c9f07c8-3673-45b7-98db-c9a69bf82797	Hyatt Regency Woodfield	1066	6	2019-03-29 20:22:10.684254	2019-03-29 20:22:10.684254	\N	\N	\N
2716	2006-11-17 00:00:00	2006-11-19 00:00:00	United States	Schaumburg, Illinois	Convention	2006	7	39a68baf-2aca-496a-9159-0489b5973de4	6a6201fd-be86-4a80-80be-1d832785e8c0	Hyatt Regency Woodfield	1422	7	2019-03-29 20:22:10.74959	2019-03-29 20:22:10.74959	\N	\N	\N
2717	2007-11-16 00:00:00	2007-11-18 00:00:00	United States	Schaumburg, Illinois	Convention	2007	8	39a68baf-2aca-496a-9159-0489b5973de4	6efba5c6-2d8f-4c36-ac86-beb786a0edc5	Hyatt Regency Woodfield	1690	8	2019-03-29 20:22:10.782162	2019-03-29 20:22:10.782162	\N	\N	\N
2718	2008-11-21 00:00:00	2008-11-23 00:00:00	United States	Wheeling, Illinois	Convention	2008	9	39a68baf-2aca-496a-9159-0489b5973de4	e6660725-0561-48e5-9211-d6c53c485676	Westin Chicago North Shore	1992	9	2019-03-29 20:22:10.803565	2019-03-29 20:22:10.803565	\N	\N	\N
2719	2009-11-20 00:00:00	2009-11-22 00:00:00	United States	Wheeling, Illinois	Convention	2009	10	39a68baf-2aca-496a-9159-0489b5973de4	a78a149a-56b1-4a74-85ee-7f0f5a923d89	Westin Chicago North Shore	2040	10	2019-03-29 20:22:10.824435	2019-03-29 20:22:10.824435	\N	\N	\N
2720	2010-11-19 00:00:00	2010-11-21 00:00:00	United States	Rosemont, Illinois	Convention	2010	11	39a68baf-2aca-496a-9159-0489b5973de4	4b5821b8-a061-4e1c-a3c5-91bb2c1cac8a	Hyatt Regency O'Hare	2285	11	2019-03-29 20:22:10.853959	2019-03-29 20:22:10.853959	\N	\N	\N
2721	2011-11-18 00:00:00	2011-11-20 00:00:00	United States	Rosemont, Illinois	Convention	2011	12	39a68baf-2aca-496a-9159-0489b5973de4	8f93a563-193c-46f9-b151-d40aab028730	Hyatt Regency O'Hare	2600	12	2019-03-29 20:22:10.89142	2019-03-29 20:22:10.89142	\N	\N	\N
2722	2012-11-16 00:00:00	2012-11-18 00:00:00	United States	Rosemont, Illinois	Convention	2012	13	39a68baf-2aca-496a-9159-0489b5973de4	cf2e739e-d2d2-4af6-9c51-10205a9f3f4e	Hyatt Regency O'Hare	3216	13	2019-03-29 20:22:10.928502	2019-03-29 20:22:10.928502	\N	\N	\N
2723	2013-11-22 00:00:00	2013-11-24 00:00:00	United States	Rosemont, Illinois	Convention	2013	14	39a68baf-2aca-496a-9159-0489b5973de4	281d08fa-843f-4b44-89ed-70c60be1047d	Hyatt Regency O'Hare	3904	14	2019-03-29 20:22:10.968871	2019-03-29 20:22:10.968871	\N	\N	\N
2724	2014-12-05 00:00:00	2014-12-07 00:00:00	United States	Rosemont, Illinois	Convention	2014	15	39a68baf-2aca-496a-9159-0489b5973de4	78c3a58c-8705-4d8b-aa4a-e1f054572669	Hyatt Regency O'Hare	4571	15	2019-03-29 20:22:10.998988	2019-03-29 20:22:10.998988	\N	\N	\N
2725	2015-12-04 00:00:00	2015-12-06 00:00:00	United States	Rosemont, Illinois	Convention	2015	16	39a68baf-2aca-496a-9159-0489b5973de4	193bd62b-7171-41c2-9567-ce2bf9dc895e	Hyatt Regency O'Hare	5606	16	2019-03-29 20:22:11.029944	2019-03-29 20:22:11.029944	\N	\N	\N
2726	2016-12-01 00:00:00	2016-12-04 00:00:00	United States	Rosemont, Illinois	Convention	2016	17	39a68baf-2aca-496a-9159-0489b5973de4	37464d77-edfb-4753-bed9-84f3b809cd62	Hyatt Regency O'Hare	7075	17	2019-03-29 20:22:11.056623	2019-03-29 20:22:11.056623	\N	\N	\N
2727	2017-11-30 00:00:00	2017-12-03 00:00:00	United States	Rosemont, Illinois	Convention	2017	18	39a68baf-2aca-496a-9159-0489b5973de4	1be2ded7-e4ae-4af6-9e2b-93ee8a51886c	Hyatt Regency O'Hare	8771	18	2019-03-29 20:22:11.073792	2019-03-29 20:22:11.073792	\N	\N	\N
2728	2018-11-29 00:00:00	2018-12-02 00:00:00	United States	Rosemont, Illinois	Convention	2018	18	39a68baf-2aca-496a-9159-0489b5973de4	ce87ce2d-d84e-4787-be50-3ff8c28c6e21	Hyatt Regency O'Hare	10989	18-2	2019-03-29 20:22:11.097657	2019-03-29 20:22:11.097657	\N	\N	\N
2729	2019-12-05 00:00:00	2019-12-08 00:00:00	United States	Rosemont, Illinois	Convention	2019	18	39a68baf-2aca-496a-9159-0489b5973de4	e6c0ce7a-1cef-4f19-9261-d5ec3c5827c7	Hyatt Regency O'Hare	10989	18-3	2019-03-29 20:22:11.138052	2019-03-29 20:22:11.138052	\N	\N	\N
2730	2004-06-25 00:00:00	2004-06-27 00:00:00	United States	Columbus, Ohio	Convention	2004	2004	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	845adb3f-f4bd-4f80-8877-29417c89dcbd	Clarion Hotel	\N	2004	2019-03-29 20:22:11.169408	2019-03-29 20:22:11.169408	\N	\N	\N
2731	2005-05-06 00:00:00	2005-05-08 00:00:00	United States	Columbus, Ohio	Convention	2005	2005	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	0eb1acfb-7fc9-4433-80ac-e90a8b9442bf	Radisson Hotel	\N	2005	2019-03-29 20:22:13.990823	2019-03-29 20:22:13.990823	\N	\N	\N
2732	2006-05-05 00:00:00	2006-05-07 00:00:00	United States	Columbus, Ohio	Convention	2006	2006	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	a76e951f-77ba-45db-8731-0f3e256f8a91	Radisson Hotel	\N	2006	2019-03-29 20:22:14.014095	2019-03-29 20:22:14.014095	\N	\N	\N
2733	2007-05-18 00:00:00	2007-05-20 00:00:00	United States	Columbus, Ohio	Convention	2007	2007	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	8d32f565-df71-4f1d-9f37-0d459183c9a1	Radisson Hotel	\N	2007	2019-03-29 20:22:14.038623	2019-03-29 20:22:14.038623	\N	\N	\N
2734	2008-05-16 00:00:00	2008-05-18 00:00:00	United States	Columbus, Ohio	Convention	2008	2008	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	70dd43de-8253-4ff8-a5bb-cddab8583930	Worthington Holiday Inn	\N	2008	2019-03-29 20:22:14.070209	2019-03-29 20:22:14.070209	\N	\N	\N
2735	2009-05-15 00:00:00	2009-05-17 00:00:00	United States	Columbus, Ohio	Convention	2009	2009	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	acea6dc7-d857-47dd-8cb6-88243868c007	Worthington Holiday Inn	\N	2009	2019-03-29 20:22:14.098652	2019-03-29 20:22:14.098652	\N	\N	\N
2736	2010-05-13 00:00:00	2010-05-16 00:00:00	United States	Columbus, Ohio	Convention	2010	2010	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	1a506150-d5b2-4d91-a232-54f4827da040	Worthington Holiday Inn	\N	2010	2019-03-29 20:22:14.119365	2019-03-29 20:22:14.119365	\N	\N	\N
2737	2011-05-12 00:00:00	2011-05-15 00:00:00	United States	Columbus, Ohio	Convention	2011	2011	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	d3222ce9-6e4e-459b-984d-c71f29770b59	Worthington Holiday Inn	\N	2011	2019-03-29 20:22:14.147782	2019-03-29 20:22:14.147782	\N	\N	\N
2738	2012-05-03 00:00:00	2012-05-06 00:00:00	United States	Columbus, Ohio	Convention	2012	2012	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	cb1bc7b2-0d6a-4195-a241-3a37c2eb5a42	Worthington Holiday Inn	\N	2012	2019-03-29 20:22:14.177431	2019-03-29 20:22:14.177431	\N	\N	\N
2739	2013-05-02 00:00:00	2013-05-05 00:00:00	United States	Columbus, Ohio	Convention	2013	2013	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	a3f15320-7c25-4f28-b3e5-ce8a4112fdd0	Worthington Holiday Inn	\N	2013	2019-03-29 20:22:14.201826	2019-03-29 20:22:14.201826	\N	\N	\N
2740	2014-05-01 00:00:00	2014-05-04 00:00:00	United States	Columbus, Ohio	Convention	2014	2014	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	beb372c3-c532-421c-a927-fc23ba9c88aa	Worthington Holiday Inn	\N	2014	2019-03-29 20:22:14.219766	2019-03-29 20:22:14.219766	\N	\N	\N
2741	2015-04-30 00:00:00	2015-05-03 00:00:00	United States	Columbus, Ohio	Convention	2015	2015	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	da378805-0577-43b2-aea4-e44f3ac8a2eb	Worthington Holiday Inn	\N	2015	2019-03-29 20:22:14.242623	2019-03-29 20:22:14.242623	\N	\N	\N
2742	2014-04-11 00:00:00	2014-04-13 00:00:00	United States	Novi, Michigan	Convention	2014	2014	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	4b4f6817-ad03-4f1e-bbee-8374a9211073	Sheraton Detroit Novi Hotel	\N	2014	2019-03-29 20:22:14.266373	2019-03-29 20:22:14.266373	\N	\N	\N
2743	2015-03-27 00:00:00	2015-03-29 00:00:00	United States	Novi, Michigan	Convention	2015	2015	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	5d9b69b4-f770-4508-81b5-21a96336c85f	Sheraton Detroit Novi Hotel	\N	2015	2019-03-29 20:22:17.104936	2019-03-29 20:22:17.104936	\N	\N	\N
2744	2016-04-08 00:00:00	2016-04-10 00:00:00	United States	Novi, Michigan	Convention	2016	2016	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	be955b09-518b-4173-8a01-833ff50bdb7e	Sheraton Detroit Novi Hotel	\N	2016	2019-03-29 20:22:17.138371	2019-03-29 20:22:17.138371	\N	\N	\N
2745	2017-04-07 00:00:00	2017-04-09 00:00:00	United States	Novi, Michigan	Convention	2017	2017	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	dd4d17ce-6a7a-4f48-a319-500f3669c451	Sheraton Detroit Novi Hotel	\N	2017	2019-03-29 20:22:17.167897	2019-03-29 20:22:17.167897	\N	\N	\N
2746	2018-04-06 00:00:00	2018-04-08 00:00:00	United States	Novi, Michigan	Convention	2018	2018	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	e2395c41-8618-4086-996a-c147a0784838	Sheraton Detroit Novi Hotel	\N	2018	2019-03-29 20:22:17.195402	2019-03-29 20:22:17.195402	\N	\N	\N
2747	2019-04-12 00:00:00	2019-04-14 00:00:00	United States	Southfield, Michigan	Convention	2019	2019	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	42011c53-605b-4aac-b3d3-8d2e31f8e8e6	The Westin Detroit-Southfield Hotel	\N	2019	2019-03-29 20:22:17.219015	2019-03-29 20:22:17.219015	\N	\N	\N
2748	2010-05-27 00:00:00	2010-05-31 00:00:00	United States	Madison, Wisconsin	Convention	2010	2010	349d9602-763c-4523-982e-b05c788e4977	bd83ca18-5ac9-4dc7-88d0-7549da6f9cb3	Raddison Hotel Madison	390	2010	2019-03-29 20:22:17.238575	2019-03-29 20:22:17.238575	\N	\N	\N
2749	2007-07-27 00:00:00	2007-07-30 00:00:00	Germany	Solingen	Convention	2007	2007	a8157c77-a991-4a7f-8ae8-1cc23e734470	8ce33e3e-1355-44cf-9a7d-452b097ebb79	GlüderCamping	\N	2007	2019-03-29 20:22:19.982056	2019-03-29 20:22:19.982056	\N	\N	\N
2750	2008-07-24 00:00:00	2008-07-27 00:00:00	Germany	Solingen	Convention	2008	2008	a8157c77-a991-4a7f-8ae8-1cc23e734470	78fdf7d2-8153-40a1-b777-aebd33d987e3	GlüderCamping	\N	2008	2019-03-29 20:22:22.742794	2019-03-29 20:22:22.742794	\N	\N	\N
2751	1997-12-31 00:00:00	1998-01-01 00:00:00	United States	Grayslake, Illinois	Furmeet	1998	1997	d5804303-4f47-4d7e-b299-514c120ac384	b1b18efb-4f78-403c-b52a-0791b1c4e37e	Private Apartment	\N	1997	2019-03-29 20:22:22.762735	2019-03-29 20:22:22.762735	\N	\N	\N
2752	1998-12-31 00:00:00	1999-01-01 00:00:00	United States	Bristol, Wisconsin	Furmeet	1999	1998	d5804303-4f47-4d7e-b299-514c120ac384	7ef974ea-6b36-4951-b17f-ee5f81af45bf	Days Inn	\N	1998	2019-03-29 20:22:25.787306	2019-03-29 20:22:25.787306	\N	\N	\N
2753	1999-12-31 00:00:00	2000-01-01 00:00:00	United States	Bristol, Wisconsin	Furmeet	2000	1999	d5804303-4f47-4d7e-b299-514c120ac384	a6a63613-1188-4f20-98bf-d68df38d47fe	Days Inn	\N	1999	2019-03-29 20:22:25.812514	2019-03-29 20:22:25.812514	\N	\N	\N
2754	2000-12-31 00:00:00	2001-01-01 00:00:00	United States	Mt Pleasant, Wisconsin	Furmeet	2001	2000	d5804303-4f47-4d7e-b299-514c120ac384	c5ffc691-0687-4992-bf56-60e6591fd53f	Knights Inn	\N	2000	2019-03-29 20:22:25.872553	2019-03-29 20:22:25.872553	\N	\N	\N
2755	2002-12-31 00:00:00	2003-01-01 00:00:00	United States	Elgin, Illinois	Furmeet	2003	2002	d5804303-4f47-4d7e-b299-514c120ac384	db5c807c-e37c-4e89-815a-fbbb673099af	Days Inn	\N	2002	2019-03-29 20:22:25.898567	2019-03-29 20:22:25.898567	\N	\N	\N
2756	2003-12-31 00:00:00	2004-01-01 00:00:00	United States	Elgin, Illinois	Furmeet	2004	2003	d5804303-4f47-4d7e-b299-514c120ac384	58322c99-feaf-4b05-8e9f-cfd000ebdcc3	Days Inn	\N	2003	2019-03-29 20:22:25.933333	2019-03-29 20:22:25.933333	\N	\N	\N
2757	2004-12-31 00:00:00	2005-01-01 00:00:00	United States	Gurnee, Illinois	Furmeet	2005	2004	d5804303-4f47-4d7e-b299-514c120ac384	7e2678c2-904b-4a93-9c7f-41b71d1d40f2	Country Inn & Suites	\N	2004	2019-03-29 20:22:25.958963	2019-03-29 20:22:25.958963	\N	\N	\N
2758	2005-12-31 00:00:00	2006-01-01 00:00:00	United States	Gurnee, Illinois	Furmeet	2006	2005	d5804303-4f47-4d7e-b299-514c120ac384	97620885-0633-4b2d-9aaa-d4bc6685f67f	Country Inn & Suites	\N	2005	2019-03-29 20:22:25.991569	2019-03-29 20:22:25.991569	\N	\N	\N
2759	2006-12-31 00:00:00	2007-01-01 00:00:00	United States	Gurnee, Illinois	Furmeet	2007	2006	d5804303-4f47-4d7e-b299-514c120ac384	548d2565-f2db-4943-ad67-b3e2d98db27e	Country Inn & Suites	\N	2006	2019-03-29 20:22:26.020736	2019-03-29 20:22:26.020736	\N	\N	\N
2760	2007-12-31 00:00:00	2008-01-01 00:00:00	United States	Gurnee, Illinois	Furmeet	2008	2007	d5804303-4f47-4d7e-b299-514c120ac384	5295fe9b-8150-487f-b6bb-d37f3f3e21d4	Country Inn & Suites	\N	2007	2019-03-29 20:22:26.041944	2019-03-29 20:22:26.041944	\N	\N	\N
2761	2008-12-31 00:00:00	2009-01-01 00:00:00	United States	Gurnee, Illinois	Furmeet	2009	2008	d5804303-4f47-4d7e-b299-514c120ac384	f8007315-9dd5-4263-8ada-682eedbb2ec0	Private Apartment	\N	2008	2019-03-29 20:22:26.066163	2019-03-29 20:22:26.066163	\N	\N	\N
2762	2009-12-31 00:00:00	2010-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2010	2009	d5804303-4f47-4d7e-b299-514c120ac384	813ca5c6-e3db-4be0-94e5-836a2748e291	Residence Inn Chicago Oak Brook	\N	2009	2019-03-29 20:22:26.093114	2019-03-29 20:22:26.093114	\N	\N	\N
2763	2010-12-31 00:00:00	2011-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2011	2010	d5804303-4f47-4d7e-b299-514c120ac384	ef601739-ce51-421f-b505-ad9e80959c1d	Residence Inn Chicago Oak Brook	\N	2010	2019-03-29 20:22:26.129416	2019-03-29 20:22:26.129416	\N	\N	\N
2764	2011-12-31 00:00:00	2012-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2012	2011	d5804303-4f47-4d7e-b299-514c120ac384	338591bd-d353-4e9e-bb21-9718828afe1a	Residence Inn Chicago Oak Brook	\N	2011	2019-03-29 20:22:26.181654	2019-03-29 20:22:26.181654	\N	\N	\N
2765	2012-12-31 00:00:00	2013-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2013	2012	d5804303-4f47-4d7e-b299-514c120ac384	22fa50c0-43c9-465a-b99a-2f79563f7c4c	Residence Inn Chicago Oak Brook	\N	2012	2019-03-29 20:22:26.22928	2019-03-29 20:22:26.22928	\N	\N	\N
2766	2013-12-31 00:00:00	2014-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2014	2013	d5804303-4f47-4d7e-b299-514c120ac384	bea1f9b2-1f9f-4da4-adb6-21ac22e424c1	Residence Inn Chicago Oak Brook	\N	2013	2019-03-29 20:22:26.299385	2019-03-29 20:22:26.299385	\N	\N	\N
2767	2014-12-31 00:00:00	2015-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2015	2014	d5804303-4f47-4d7e-b299-514c120ac384	423e6429-c9ad-4468-bc6e-3571ad51e6ca	Residence Inn Chicago Oak Brook	\N	2014	2019-03-29 20:22:26.447988	2019-03-29 20:22:26.447988	\N	\N	\N
2768	2015-12-31 00:00:00	2016-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2016	2015	d5804303-4f47-4d7e-b299-514c120ac384	128324e4-7333-4b3a-aaab-d64014b0230a	Residence Inn Chicago Oak Brook	\N	2015	2019-03-29 20:22:26.507844	2019-03-29 20:22:26.507844	\N	\N	\N
2769	2016-12-31 00:00:00	2017-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2017	2016	d5804303-4f47-4d7e-b299-514c120ac384	ad8280ec-6b39-4d28-8326-1f264738a2ef	Residence Inn Chicago Oak Brook	\N	2016	2019-03-29 20:22:26.53158	2019-03-29 20:22:26.53158	\N	\N	\N
2770	2017-12-31 00:00:00	2018-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2018	2017	d5804303-4f47-4d7e-b299-514c120ac384	6fb8eba2-fdc6-4b8b-adb7-4e95c0b8b258	Residence Inn Chicago Oak Brook	\N	2017	2019-03-29 20:22:26.569548	2019-03-29 20:22:26.569548	\N	\N	\N
2771	2018-12-31 00:00:00	2019-01-01 00:00:00	United States	Oak Brook, Illinois	Furmeet	2019	2018	d5804303-4f47-4d7e-b299-514c120ac384	a2947f46-6a5d-4e65-a081-0745c74d3763	Residence Inn Chicago Oak Brook	\N	2018	2019-03-29 20:22:26.600997	2019-03-29 20:22:26.600997	\N	\N	\N
2772	2013-03-28 00:00:00	2013-03-31 00:00:00	Sweden	Stockholm	Convention	2013	1	a30af9e2-0304-42c7-ba45-e4df8f737381	34cc7e01-cbca-4407-9e4f-d32afaa3ebb0	Quality Hotel Winn Haninge	172	1	2019-03-29 20:22:26.633091	2019-03-29 20:22:26.633091	\N	\N	\N
2773	2014-02-27 00:00:00	2014-03-02 00:00:00	Sweden	Stockholm	Convention	2014	2	a30af9e2-0304-42c7-ba45-e4df8f737381	5b536495-cb7f-489a-94c5-c7c8efdd6a64	Quality Hotel Winn Haninge	268	2	2019-03-29 20:22:29.668604	2019-03-29 20:22:29.668604	\N	\N	\N
2774	2015-02-26 00:00:00	2015-03-01 00:00:00	Sweden	Nynäshamn	Convention	2015	3	a30af9e2-0304-42c7-ba45-e4df8f737381	c5be55ea-a687-433b-88ce-7b4c44332c37	Utsikten Meetings	392	3	2019-03-29 20:22:29.69364	2019-03-29 20:22:29.69364	\N	\N	\N
2775	2016-03-03 00:00:00	2016-03-06 00:00:00	Sweden	Nynäshamn	Convention	2016	4	a30af9e2-0304-42c7-ba45-e4df8f737381	a1303d52-eceb-47c5-914d-11b438de379a	Utsikten Meetings	513	4	2019-03-29 20:22:29.726419	2019-03-29 20:22:29.726419	\N	\N	\N
2776	2017-03-09 00:00:00	2017-03-12 00:00:00	Sweden	Upplands Väsby	Convention	2017	5	a30af9e2-0304-42c7-ba45-e4df8f737381	7f151e3c-8097-4553-97dc-8137bcd5a778	Scandic Infra City	814	5	2019-03-29 20:22:29.75272	2019-03-29 20:22:29.75272	\N	\N	\N
2777	2018-02-28 00:00:00	2018-03-04 00:00:00	Sweden	Upplands Väsby	Convention	2018	6	a30af9e2-0304-42c7-ba45-e4df8f737381	8f1492d4-0144-4c68-96c6-502d703b821b	Scandic Infra City	918	6	2019-03-29 20:22:29.791108	2019-03-29 20:22:29.791108	\N	\N	\N
2778	2019-02-27 00:00:00	2019-03-03 00:00:00	Sweden	Upplands Väsby	Convention	2019	6	a30af9e2-0304-42c7-ba45-e4df8f737381	10a8d3a2-d2fb-4ac4-ba0b-8076bc67fa9f	Scandic Infra City	1149	6-2	2019-03-29 20:22:29.819763	2019-03-29 20:22:29.819763	\N	\N	\N
2779	2020-02-19 00:00:00	2020-02-23 00:00:00	Sweden	Malmö	Convention	2020	6	a30af9e2-0304-42c7-ba45-e4df8f737381	d412c8db-8520-4ac3-99b4-99fca5ee4d3e	Clarion Hotel & Congress Live	\N	6-3	2019-03-29 20:22:29.854152	2019-03-29 20:22:29.854152	\N	\N	\N
2780	2004-10-28 00:00:00	2004-10-31 00:00:00	United States	Watonga, Oklahoma	Convention	2004	2004	9aa89210-a787-413e-98e3-7a7c8a4dfc04	d9f4d7fa-acc1-4423-84b3-130349551595	Roman Nose State Park	\N	2004	2019-03-29 20:22:29.88324	2019-03-29 20:22:29.88324	\N	\N	\N
2781	2005-10-27 00:00:00	2005-10-30 00:00:00	United States	Watonga, Oklahoma	Convention	2005	2005	9aa89210-a787-413e-98e3-7a7c8a4dfc04	a097466f-f377-47fd-b6e2-906b2cc4d40f	Roman Nose State Park	\N	2005	2019-03-29 20:22:33.562569	2019-03-29 20:22:33.562569	\N	\N	\N
2782	2006-10-27 00:00:00	2006-10-29 00:00:00	United States	Watonga, Oklahoma	Convention	2006	2006	9aa89210-a787-413e-98e3-7a7c8a4dfc04	2119c269-4f62-4cf7-81f5-90663c5e9319	Roman Nose State Park	\N	2006	2019-03-29 20:22:33.634002	2019-03-29 20:22:33.634002	\N	\N	\N
2783	2007-10-25 00:00:00	2007-10-29 00:00:00	United States	Watonga, Oklahoma	Convention	2007	2007	9aa89210-a787-413e-98e3-7a7c8a4dfc04	3a45fd2c-504c-4a07-988f-a9619a22098a	Roman Nose State Park	\N	2007	2019-03-29 20:22:33.691504	2019-03-29 20:22:33.691504	\N	\N	\N
2784	2008-10-23 00:00:00	2008-10-27 00:00:00	United States	Watonga, Oklahoma	Convention	2008	2008	9aa89210-a787-413e-98e3-7a7c8a4dfc04	f0c022e1-e4f3-4737-bb56-5391cf844aaf	Roman Nose State Park	\N	2008	2019-03-29 20:22:33.709094	2019-03-29 20:22:33.709094	\N	\N	\N
2785	2009-10-22 00:00:00	2009-10-26 00:00:00	United States	Watonga, Oklahoma	Convention	2009	2009	9aa89210-a787-413e-98e3-7a7c8a4dfc04	6b84a5a4-3621-49e9-8837-8e63c85f8d7d	Roman Nose State Park	\N	2009	2019-03-29 20:22:33.735378	2019-03-29 20:22:33.735378	\N	\N	\N
2786	2010-10-27 00:00:00	2010-11-01 00:00:00	United States	Watonga, Oklahoma	Convention	2010	2010	9aa89210-a787-413e-98e3-7a7c8a4dfc04	24b53f9c-ddac-4730-b6ca-377b91817feb	Roman Nose State Park	\N	2010	2019-03-29 20:22:33.802179	2019-03-29 20:22:33.802179	\N	\N	\N
2787	2011-10-19 00:00:00	2011-10-24 00:00:00	United States	Watonga, Oklahoma	Convention	2011	2011	9aa89210-a787-413e-98e3-7a7c8a4dfc04	06b6054f-efa1-4bca-9417-7ab04944bdaf	Roman Nose State Park	\N	2011	2019-03-29 20:22:33.831448	2019-03-29 20:22:33.831448	\N	\N	\N
2788	2012-10-17 00:00:00	2012-10-22 00:00:00	United States	Watonga, Oklahoma	Convention	2012	2012	9aa89210-a787-413e-98e3-7a7c8a4dfc04	44046e59-5901-4fde-ad21-08fa48c050b5	Roman Nose State Park	\N	2012	2019-03-29 20:22:33.869033	2019-03-29 20:22:33.869033	\N	\N	\N
2789	2013-10-24 00:00:00	2013-10-27 00:00:00	United States	Watonga, Oklahoma	Convention	2013	2013	9aa89210-a787-413e-98e3-7a7c8a4dfc04	604d0afa-6211-4d11-91a7-b5c4cb9d3b46	Roman Nose State Park	\N	2013	2019-03-29 20:22:33.911223	2019-03-29 20:22:33.911223	\N	\N	\N
2790	2014-10-23 00:00:00	2014-10-26 00:00:00	United States	Watonga, Oklahoma	Convention	2014	2014	9aa89210-a787-413e-98e3-7a7c8a4dfc04	5f7a4c89-6881-4b13-968b-890eb50e1a42	Roman Nose State Park	\N	2014	2019-03-29 20:22:33.949719	2019-03-29 20:22:33.949719	\N	\N	\N
2791	2014-11-14 00:00:00	2014-11-16 00:00:00	United States	San Jose, California	Convention	2014	2014	fffde663-722f-4818-9a40-f1843b02d565	cc5aab6d-cae1-466b-ae96-de014380149f	San José Airport Garden Hotel	\N	2014	2019-03-29 20:22:33.99968	2019-03-29 20:22:33.99968	\N	\N	\N
2792	2015-10-30 00:00:00	2015-11-01 00:00:00	United States	San Jose, California	Convention	2015	2015	fffde663-722f-4818-9a40-f1843b02d565	a4c4f1d6-c265-4494-8553-100ebf4b0408	DoubleTree Hotel	\N	2015	2019-03-29 20:22:37.081811	2019-03-29 20:22:37.081811	\N	\N	\N
2793	2016-11-04 00:00:00	2016-11-07 00:00:00	United States	San Jose, California	Convention	2016	2016	fffde663-722f-4818-9a40-f1843b02d565	fbd1f257-7d62-4a33-a031-e048bc155417	DoubleTree Hotel	\N	2016	2019-03-29 20:22:37.106762	2019-03-29 20:22:37.106762	\N	\N	\N
2794	2017-11-03 00:00:00	2017-11-05 00:00:00	United States	San Jose, California	Convention	2017	2017	fffde663-722f-4818-9a40-f1843b02d565	549af593-0ae7-46e0-982e-d45e22579c8f	DoubleTree Hotel	\N	2017	2019-03-29 20:22:37.137931	2019-03-29 20:22:37.137931	\N	\N	\N
2795	2018-11-02 00:00:00	2018-11-04 00:00:00	United States	San Jose, California	Convention	2018	2018	fffde663-722f-4818-9a40-f1843b02d565	e52e27f5-94a5-4e2b-a369-09617afee4a0	DoubleTree Hotel	\N	2018	2019-03-29 20:22:37.169194	2019-03-29 20:22:37.169194	\N	\N	\N
2796	2019-11-01 00:00:00	2019-11-03 00:00:00	United States	San Jose, California	Convention	2019	2019	fffde663-722f-4818-9a40-f1843b02d565	f8320460-c747-4552-aa84-dcb29ccdf2ea	DoubleTree Hotel	\N	2019	2019-03-29 20:22:37.201779	2019-03-29 20:22:37.201779	\N	\N	\N
2797	2018-08-11 00:00:00	2018-08-11 00:00:00	Indonesia	Jakarta	Convention	2018	2018	f0981818-358e-416c-bd3d-9e312780d044	f764c731-9120-4916-a8c9-d643702f05cd	Yello Hotel Manggarai	\N	2018	2019-03-29 20:22:37.237252	2019-03-29 20:22:37.237252	\N	\N	\N
2798	2019-07-27 00:00:00	2019-07-27 00:00:00	Indonesia	Jakarta	Convention	2019	2019	f0981818-358e-416c-bd3d-9e312780d044	7bd94622-997b-48eb-8c99-bd2172049e2a	Yello Hotel Manggarai	\N	2019	2019-03-29 20:22:39.854972	2019-03-29 20:22:39.854972	\N	\N	\N
2799	2014-05-17 00:00:00	2014-05-17 00:00:00	Philippines	Metro Manila	Convention	2014	2014	6474e0ce-c864-4d6a-8da2-42a3841c67f2	3c2f66b3-2541-4a09-ab79-1c2d6224bbb9	SM Megamall Conference Center	\N	2014	2019-03-29 20:22:39.880047	2019-03-29 20:22:39.880047	\N	\N	\N
2800	2015-10-17 00:00:00	2015-10-17 00:00:00	Philippines	Mandaluyong	Convention	2015	2015	6474e0ce-c864-4d6a-8da2-42a3841c67f2	8b147fa2-218e-4e07-b2b3-7e6ed39c397a	SM Megatrade Conference Center	\N	2015	2019-03-29 20:22:42.891646	2019-03-29 20:22:42.891646	\N	\N	\N
2801	2018-04-27 00:00:00	2018-04-29 00:00:00	United States	South Portland, Maine	Convention	2018	2018	434d721d-8436-470f-8bd4-a2b01cfc8ae4	35158d2c-689c-4530-b1db-945d5d43b3cb	DoubleTree Hotel	406	2018	2019-03-29 20:22:42.920286	2019-03-29 20:22:42.920286	\N	\N	\N
2802	2019-04-05 00:00:00	2019-04-07 00:00:00	United States	South Portland, Maine	Convention	2019	2019	434d721d-8436-470f-8bd4-a2b01cfc8ae4	307a7a55-8618-4790-8c66-c87e62fabb0f	DoubleTree Hotel	\N	2019	2019-03-29 20:22:45.667565	2019-03-29 20:22:45.667565	\N	\N	\N
2803	2007-08-24 00:00:00	2007-08-26 00:00:00	United States	Seattle, Washington	Convention	2007	2007	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	bee51835-ffb8-4423-a402-c5a9d5d19803	Holiday Inn Express & Suites	\N	2007	2019-03-29 20:22:45.7021	2019-03-29 20:22:45.7021	\N	\N	\N
2804	2008-09-24 00:00:00	2008-09-26 00:00:00	United States	Seattle, Washington	Convention	2008	2008	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	befba0ac-5f4b-4cc0-a4e0-4923305b0151	Seattle Airport Marriott	\N	2008	2019-03-29 20:22:48.795439	2019-03-29 20:22:48.795439	\N	\N	\N
2805	2009-09-26 00:00:00	2009-09-28 00:00:00	United States	Seattle, Washington	Convention	2009	2009	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	5fccc78f-b8ad-4d1d-a1b9-33030fca4295	Seattle Airport Marriott	\N	2009	2019-03-29 20:22:48.818463	2019-03-29 20:22:48.818463	\N	\N	\N
2806	2010-09-18 00:00:00	2010-09-20 00:00:00	United States	Seattle, Washington	Convention	2010	2010	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	6da23089-2726-4d4a-b38b-1e280cfdc0b0	Seattle Airport Marriott	\N	2010	2019-03-29 20:22:48.852578	2019-03-29 20:22:48.852578	\N	\N	\N
2807	2011-09-24 00:00:00	2011-09-27 00:00:00	United States	Seattle, Washington	Convention	2011	2011	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	9238d09d-df82-42cb-838a-7d1feed561b8	Hilton Seattle Airport & Conference Center	\N	2011	2019-03-29 20:22:48.884588	2019-03-29 20:22:48.884588	\N	\N	\N
2808	2012-09-25 00:00:00	2012-09-28 00:00:00	United States	Seattle, Washington	Convention	2012	2012	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	244d1476-ad8a-42a5-9bab-aa41e8118016	Hilton Seattle Airport & Conference Center	\N	2012	2019-03-29 20:22:48.911922	2019-03-29 20:22:48.911922	\N	\N	\N
2809	2013-09-26 00:00:00	2013-09-29 00:00:00	United States	Seattle, Washington	Convention	2013	2013	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	7ef7ff7f-eb18-400c-8e39-6041e4792753	Hilton Seattle Airport & Conference Center	\N	2013	2019-03-29 20:22:48.938304	2019-03-29 20:22:48.938304	\N	\N	\N
2810	2014-09-27 00:00:00	2014-09-30 00:00:00	United States	Seattle, Washington	Convention	2014	2014	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	dfff4749-214f-4463-89a3-e73349c622ca	Hilton Seattle Airport & Conference Center	\N	2014	2019-03-29 20:22:48.966716	2019-03-29 20:22:48.966716	\N	\N	\N
2811	2015-09-22 00:00:00	2015-09-25 00:00:00	United States	Seattle, Washington	Convention	2015	2015	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	a5fcbce5-d745-488a-b587-8e9b61f18801	Seattle Airport Marriott	\N	2015	2019-03-29 20:22:48.99363	2019-03-29 20:22:48.99363	\N	\N	\N
2812	2006-12-03 00:00:00	2006-12-03 00:00:00	United Kingdom	London	Convention	2006	2006	146064cd-d251-4443-9959-08f92121f90f	466bf820-1993-46a1-a08a-95e511200477	River Thames (Party Boat)	\N	2006	2019-03-29 20:22:49.018012	2019-03-29 20:22:49.018012	\N	\N	\N
2813	2007-12-01 00:00:00	2007-12-02 00:00:00	United Kingdom	London	Convention	2007	2007	146064cd-d251-4443-9959-08f92121f90f	30d03eee-1598-4249-9884-3806f0a52c5b	Royal National Hotel (Calico Bar)	\N	2007	2019-03-29 20:22:51.915605	2019-03-29 20:22:51.915605	\N	\N	\N
2814	2008-11-27 00:00:00	2008-11-30 00:00:00	United Kingdom	London	Convention	2008	2008	146064cd-d251-4443-9959-08f92121f90f	9d001736-84bc-4855-9291-0617efb1c660	Royal National Hotel (The Erasmus Party Boat)	\N	2008	2019-03-29 20:22:51.940027	2019-03-29 20:22:51.940027	\N	\N	\N
2815	2009-10-30 00:00:00	2009-11-01 00:00:00	United Kingdom	London	Convention	2009	2009	146064cd-d251-4443-9959-08f92121f90f	82eeabeb-b669-475e-87ef-10e57e0c04f3	Britannia International Hotel (Party Boat)	\N	2009	2019-03-29 20:22:51.962607	2019-03-29 20:22:51.962607	\N	\N	\N
2816	2010-11-05 00:00:00	2010-11-07 00:00:00	United Kingdom	London	Convention	2010	2010	146064cd-d251-4443-9959-08f92121f90f	7f42fa76-ec0c-424a-b12c-572a119692c2	Britannia International Hotel (Party Boat)	\N	2010	2019-03-29 20:22:51.999074	2019-03-29 20:22:51.999074	\N	\N	\N
2817	2007-07-06 00:00:00	2007-07-09 00:00:00	Australia	Brisbane, Queensland	Furmeet	2007	2007	f8f38505-9f4c-4a26-8636-75123463dc84	a0b51365-3067-4d2c-be94-a12f2228ffa0	Various Locations	\N	2007	2019-03-29 20:22:52.058914	2019-03-29 20:22:52.058914	\N	\N	\N
2818	2008-07-04 00:00:00	2008-07-06 00:00:00	Australia	Brisbane, Queensland	Furmeet	2008	2008	f8f38505-9f4c-4a26-8636-75123463dc84	4cefc9a8-ec8f-465a-ab74-2b0bb5629fa4	Various Locations	\N	2008	2019-03-29 20:22:54.840601	2019-03-29 20:22:54.840601	\N	\N	\N
2819	2009-07-17 00:00:00	2009-07-19 00:00:00	Australia	Brisbane, Queensland	Furmeet	2009	2009	f8f38505-9f4c-4a26-8636-75123463dc84	bd18f8d1-d734-4042-a94c-e1a2cea97881	Various Locations	\N	2009	2019-03-29 20:22:54.890848	2019-03-29 20:22:54.890848	\N	\N	\N
2820	2010-07-09 00:00:00	2010-07-11 00:00:00	Australia	Brisbane, Queensland	Furmeet	2010	2010	f8f38505-9f4c-4a26-8636-75123463dc84	ae2be349-ff98-4e1a-b3e1-808c4215beb6	Various Locations	\N	2010	2019-03-29 20:22:54.926645	2019-03-29 20:22:54.926645	\N	\N	\N
2821	2011-07-08 00:00:00	2011-07-10 00:00:00	Australia	Brisbane, Queensland	Furmeet	2011	2011	f8f38505-9f4c-4a26-8636-75123463dc84	1e5cc95b-8136-435c-8fb8-e86ffee61b48	Various Locations	\N	2011	2019-03-29 20:22:54.956748	2019-03-29 20:22:54.956748	\N	\N	\N
2822	2012-06-29 00:00:00	2012-07-01 00:00:00	Australia	Brisbane, Queensland	Furmeet	2012	2012	f8f38505-9f4c-4a26-8636-75123463dc84	91ead0d0-9404-49e8-9442-15b2a2dbba70	Various Locations	\N	2012	2019-03-29 20:22:54.993794	2019-03-29 20:22:54.993794	\N	\N	\N
2823	2013-08-02 00:00:00	2013-08-05 00:00:00	Australia	Brisbane, Queensland	Furmeet	2013	2013	f8f38505-9f4c-4a26-8636-75123463dc84	27215349-a37d-4b1b-9a63-f95c879b8167	Mercure Hotel	\N	2013	2019-03-29 20:22:55.033106	2019-03-29 20:22:55.033106	\N	\N	\N
2824	2014-08-08 00:00:00	2014-08-10 00:00:00	Australia	Brisbane, Queensland	Furmeet	2014	2014	f8f38505-9f4c-4a26-8636-75123463dc84	28591491-5a31-4f87-a28f-c46227d7b744	Hotel Grand Chancellor	\N	2014	2019-03-29 20:22:55.063075	2019-03-29 20:22:55.063075	\N	\N	\N
2825	2015-08-07 00:00:00	2015-08-09 00:00:00	Australia	Brisbane, Queensland	Furmeet	2015	2015	f8f38505-9f4c-4a26-8636-75123463dc84	95aff2ff-3151-4f82-bffe-b74b896a3531	Hotel Grand Chancellor	\N	2015	2019-03-29 20:22:55.091637	2019-03-29 20:22:55.091637	\N	\N	\N
2826	2016-07-29 00:00:00	2016-07-31 00:00:00	Australia	Brisbane, Queensland	Furmeet	2016	2016	f8f38505-9f4c-4a26-8636-75123463dc84	9e8cc27e-5e8e-4a29-be2f-94ff8891b720	Hotel Grand Chancellor	\N	2016	2019-03-29 20:22:55.120631	2019-03-29 20:22:55.120631	\N	\N	\N
2827	2003-05-23 00:00:00	2003-05-25 00:00:00	United States	Huntsville, Alabama	Convention	2003	2003	386967df-3425-4547-9201-0870f6b1dd82	8506d3e9-1e7e-4207-82df-2b127db2f6d2	Radisson Hotel	\N	2003	2019-03-29 20:22:55.159679	2019-03-29 20:22:55.159679	\N	\N	\N
2828	2004-05-28 00:00:00	2004-05-30 00:00:00	United States	Huntsville, Alabama	Convention	2004	2004	386967df-3425-4547-9201-0870f6b1dd82	61b444a5-afe8-4eac-b07d-9bf2c32a1202	Radisson Hotel	\N	2004	2019-03-29 20:22:58.448784	2019-03-29 20:22:58.448784	\N	\N	\N
2829	2005-05-27 00:00:00	2005-05-29 00:00:00	United States	Huntsville, Alabama	Convention	2005	2005	386967df-3425-4547-9201-0870f6b1dd82	cd4d5458-a4be-4496-9604-53786778456b	Radisson Hotel	\N	2005	2019-03-29 20:22:58.556725	2019-03-29 20:22:58.556725	\N	\N	\N
2830	2006-05-26 00:00:00	2006-05-28 00:00:00	United States	Huntsville, Alabama	Convention	2006	2006	386967df-3425-4547-9201-0870f6b1dd82	9c92f78d-62ea-4b9d-8426-a99855deda57	Radisson Hotel	\N	2006	2019-03-29 20:22:58.597424	2019-03-29 20:22:58.597424	\N	\N	\N
2831	2007-05-25 00:00:00	2007-05-27 00:00:00	United States	Huntsville, Alabama	Convention	2007	2007	386967df-3425-4547-9201-0870f6b1dd82	b12f3d38-7f42-407a-a594-b80ebc3bc9b8	Radisson Hotel	\N	2007	2019-03-29 20:22:58.633157	2019-03-29 20:22:58.633157	\N	\N	\N
2832	2008-05-23 00:00:00	2008-05-25 00:00:00	United States	Huntsville, Alabama	Convention	2008	2008	386967df-3425-4547-9201-0870f6b1dd82	347f6d77-6898-4ff2-9cc9-13cbf9407c31	Radisson Hotel	\N	2008	2019-03-29 20:22:58.671461	2019-03-29 20:22:58.671461	\N	\N	\N
2833	2009-05-22 00:00:00	2009-05-24 00:00:00	United States	Huntsville, Alabama	Convention	2009	2009	386967df-3425-4547-9201-0870f6b1dd82	46afaff8-68fb-496e-a7ed-950c9dc5ba20	Embassy Suites	\N	2009	2019-03-29 20:22:58.709073	2019-03-29 20:22:58.709073	\N	\N	\N
2834	2010-05-28 00:00:00	2010-05-30 00:00:00	United States	Huntsville, Alabama	Convention	2010	2010	386967df-3425-4547-9201-0870f6b1dd82	e5c01d5d-155c-4fd2-bf09-caf0b3b26b18	Embassy Suites	\N	2010	2019-03-29 20:22:58.741637	2019-03-29 20:22:58.741637	\N	\N	\N
2835	2011-05-27 00:00:00	2011-05-29 00:00:00	United States	Huntsville, Alabama	Convention	2011	2011	386967df-3425-4547-9201-0870f6b1dd82	1d758d4f-4905-44ca-964b-4813446bafb1	Embassy Suites	\N	2011	2019-03-29 20:22:58.772655	2019-03-29 20:22:58.772655	\N	\N	\N
2836	2012-05-25 00:00:00	2012-05-27 00:00:00	United States	Huntsville, Alabama	Convention	2012	2012	386967df-3425-4547-9201-0870f6b1dd82	2275a358-cc61-4d8c-9a27-5054b765ff2a	Hilton Garden Inn	\N	2012	2019-03-29 20:22:58.802118	2019-03-29 20:22:58.802118	\N	\N	\N
2837	2013-06-14 00:00:00	2013-06-16 00:00:00	United States	Huntsville, Alabama	Convention	2013	2013	386967df-3425-4547-9201-0870f6b1dd82	f2df9564-c77e-4d78-9df7-4ca849d7875b	Four Points by Sheraton	\N	2013	2019-03-29 20:22:58.84214	2019-03-29 20:22:58.84214	\N	\N	\N
2838	2014-06-13 00:00:00	2014-06-15 00:00:00	United States	Decatur, Alabama	Convention	2014	2014	386967df-3425-4547-9201-0870f6b1dd82	0375365e-3795-4e88-bb6d-939f468a588c	Amberley Suites Hotel	\N	2014	2019-03-29 20:22:58.883952	2019-03-29 20:22:58.883952	\N	\N	\N
2839	2007-06-01 00:00:00	2007-06-03 00:00:00	United States	Denver, Colorado	Convention	2007	2007	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	a7f84f38-69fd-4aaa-9d08-9085a9126c4b	Adam's Mark Hotel	\N	2007	2019-03-29 20:22:58.91838	2019-03-29 20:22:58.91838	\N	\N	\N
2840	2008-08-02 00:00:00	2008-08-04 00:00:00	United States	Denver, Colorado	Convention	2008	2008	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	18d10ffe-9370-4f13-93f3-b1f5bdbddad2	Doubletree Hotel	\N	2008	2019-03-29 20:23:02.030348	2019-03-29 20:23:02.030348	\N	\N	\N
2841	2009-08-06 00:00:00	2009-08-08 00:00:00	United States	Denver, Colorado	Convention	2009	2009	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	efbb8bd0-53c0-4a73-987f-5687807b625a	Doubletree Hotel	\N	2009	2019-03-29 20:23:02.065377	2019-03-29 20:23:02.065377	\N	\N	\N
2842	2010-08-07 00:00:00	2010-08-09 00:00:00	United States	Denver, Colorado	Convention	2010	2010	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	7b29d6e9-c53c-40bc-bb0b-651cf9c34629	Crowne Plaza Hotel	\N	2010	2019-03-29 20:23:02.0926	2019-03-29 20:23:02.0926	\N	\N	\N
2843	2011-08-07 00:00:00	2011-08-09 00:00:00	United States	Denver, Colorado	Convention	2011	2011	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	e4e42b1d-4bd8-4aad-9c43-106f7b5ce567	Marriott Denver Tech Center	\N	2011	2019-03-29 20:23:02.12791	2019-03-29 20:23:02.12791	\N	\N	\N
2844	2012-08-08 00:00:00	2012-08-10 00:00:00	United States	Denver, Colorado	Convention	2012	2012	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	a5ec6044-611a-423b-b2f0-16917c3e4f27	Marriott Denver Tech Center	\N	2012	2019-03-29 20:23:02.185616	2019-03-29 20:23:02.185616	\N	\N	\N
2845	2013-08-10 00:00:00	2013-08-12 00:00:00	United States	Denver, Colorado	Convention	2013	2013	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	2ac160b0-8b1f-47e2-ab5b-f016f2b9de0c	Doubletree Hotel	\N	2013	2019-03-29 20:23:02.21962	2019-03-29 20:23:02.21962	\N	\N	\N
2846	2014-08-12 00:00:00	2014-08-14 00:00:00	United States	Denver, Colorado	Convention	2014	2014	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	6d1edca5-2334-4997-9432-47bfcac60aa7	Doubletree Hotel	\N	2014	2019-03-29 20:23:02.249696	2019-03-29 20:23:02.249696	\N	\N	\N
2847	2015-08-12 00:00:00	2015-08-14 00:00:00	United States	Denver, Colorado	Convention	2015	2015	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	20566a90-abf1-47cc-8fc6-8f7a933d8a0c	Crowne Plaza Denver Airport	\N	2015	2019-03-29 20:23:02.299891	2019-03-29 20:23:02.299891	\N	\N	\N
2848	2016-05-23 00:00:00	2016-05-25 00:00:00	United States	Denver, Colorado	Convention	2016	2016	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	2b902188-b965-48c1-89f4-0fa1896b7782	Hyatt Regency in Denver	\N	2016	2019-03-29 20:23:02.334675	2019-03-29 20:23:02.334675	\N	\N	\N
2849	2014-02-05 00:00:00	2014-02-09 00:00:00	Russia	Moscow	Convention	2014	2014	d0976f30-2c95-4c1c-b258-f77a6e12e234	9f16460c-d21a-4a66-8df3-e59d3627d4d1	Zvenigorodskiy boarding house	\N	2014	2019-03-29 20:23:02.370168	2019-03-29 20:23:02.370168	\N	\N	\N
2850	2015-02-04 00:00:00	2015-02-08 00:00:00	Russia	Moscow	Convention	2015	2015	d0976f30-2c95-4c1c-b258-f77a6e12e234	9c5f0084-5690-4dad-af81-b0765073e525	Zvenigorodskiy boarding house	\N	2015	2019-03-29 20:23:05.720992	2019-03-29 20:23:05.720992	\N	\N	\N
2851	2016-02-03 00:00:00	2016-02-07 00:00:00	Russia	Moscow	Convention	2016	2016	d0976f30-2c95-4c1c-b258-f77a6e12e234	4bf1e60e-001f-4aa7-891c-2f784a9a370e	Zvenigorodskiy boarding house	\N	2016	2019-03-29 20:23:05.748841	2019-03-29 20:23:05.748841	\N	\N	\N
2852	2017-02-01 00:00:00	2017-02-05 00:00:00	Russia	Zvenigorod	Convention	2017	2017	d0976f30-2c95-4c1c-b258-f77a6e12e234	382a29e9-9389-448d-a977-7aad702c705c	Hotel Heliopark Thalasso	\N	2017	2019-03-29 20:23:05.779419	2019-03-29 20:23:05.779419	\N	\N	\N
2853	2018-01-31 00:00:00	2018-02-04 00:00:00	Russia	Zvenigorod	Convention	2018	2018	d0976f30-2c95-4c1c-b258-f77a6e12e234	38e1a07e-a691-4264-8399-53700143ad7f	Hotel Heliopark Thalasso	\N	2018	2019-03-29 20:23:05.802157	2019-03-29 20:23:05.802157	\N	\N	\N
2854	2019-08-28 00:00:00	2019-09-01 00:00:00	Russia	Zvenigorod	Convention	2019	2019	d0976f30-2c95-4c1c-b258-f77a6e12e234	eec24688-da8b-4a75-9faa-75ca40b6fc78	Hotel Heliopark Thalasso	\N	2019	2019-03-29 20:23:05.837348	2019-03-29 20:23:05.837348	\N	\N	\N
2855	2011-07-15 00:00:00	2011-07-17 00:00:00	United Kingdom	Inverness, Scotland	Convention	2011	2011	3826b7dc-d5d6-4dd5-b939-d6402951b456	a7bc8b51-a3a7-468f-aa28-56acc1bc6979	Ramada Jarvis Hotel	\N	2011	2019-03-29 20:23:05.864234	2019-03-29 20:23:05.864234	\N	\N	\N
2856	2012-07-27 00:00:00	2012-07-30 00:00:00	United Kingdom	Inverness, Scotland	Convention	2012	2012	3826b7dc-d5d6-4dd5-b939-d6402951b456	41c8f328-273e-4a3d-a221-0fe77e18f9de	Mercure Inverness	\N	2012	2019-03-29 20:23:08.855004	2019-03-29 20:23:08.855004	\N	\N	\N
2857	2013-08-02 00:00:00	2013-08-05 00:00:00	United Kingdom	Inverness, Scotland	Convention	2013	2013	3826b7dc-d5d6-4dd5-b939-d6402951b456	fd384e11-2eb0-4196-8b55-fb8c1c4934d4	Mercure Inverness	\N	2013	2019-03-29 20:23:08.883773	2019-03-29 20:23:08.883773	\N	\N	\N
2858	2014-11-07 00:00:00	2014-11-09 00:00:00	United Kingdom	Livingston, West Lothian, Scotland	Convention	2014	2014	3826b7dc-d5d6-4dd5-b939-d6402951b456	953d2232-5cce-446a-954d-d553dc35819e	Mercure Livingston	\N	2014	2019-03-29 20:23:08.909587	2019-03-29 20:23:08.909587	\N	\N	\N
2859	2015-11-06 00:00:00	2015-11-08 00:00:00	United Kingdom	Livingston, West Lothian, Scotland	Convention	2015	2015	3826b7dc-d5d6-4dd5-b939-d6402951b456	dd924b84-3aec-4d66-a94c-6233a0058fb9	Mercure Livingston	\N	2015	2019-03-29 20:23:08.940326	2019-03-29 20:23:08.940326	\N	\N	\N
2860	2016-11-04 00:00:00	2016-11-06 00:00:00	United Kingdom	Livingston, West Lothian, Scotland	Convention	2016	2016	3826b7dc-d5d6-4dd5-b939-d6402951b456	b094ad2f-2a69-4277-a8e9-0b87eb4283d8	Mercure Livingston	\N	2016	2019-03-29 20:23:08.963974	2019-03-29 20:23:08.963974	\N	\N	\N
2861	2017-11-03 00:00:00	2017-11-05 00:00:00	United Kingdom	Livingston, West Lothian, Scotland	Convention	2017	2017	3826b7dc-d5d6-4dd5-b939-d6402951b456	a248a4b8-de65-4991-b99d-19b4d5656604	Mercure Livingston	\N	2017	2019-03-29 20:23:08.992439	2019-03-29 20:23:08.992439	\N	\N	\N
2862	2018-11-02 00:00:00	2018-11-04 00:00:00	United Kingdom	Livingston, West Lothian, Scotland	Convention	2018	2018	3826b7dc-d5d6-4dd5-b939-d6402951b456	e6cc5a7c-6bab-4da1-81a7-9430a2a9eaf6	Mercure Livingston	\N	2018	2019-03-29 20:23:09.022383	2019-03-29 20:23:09.022383	\N	\N	\N
2863	2019-11-15 00:00:00	2019-11-17 00:00:00	United Kingdom	Livingston, West Lothian, Scotland	Convention	2019	2019	3826b7dc-d5d6-4dd5-b939-d6402951b456	7b421f99-4508-43e8-842a-0d22c685e153	Mercure Livingston	\N	2019	2019-03-29 20:23:09.055971	2019-03-29 20:23:09.055971	\N	\N	\N
2864	2017-07-14 00:00:00	2017-07-17 00:00:00	South Africa	Magaliesburg	Convention	2017	2017	0275a19c-f71c-4365-a505-27b3f814296d	466880a5-4ff7-44c3-9206-86040928a0d6	Magalies Retreat	\N	2017	2019-03-29 20:23:09.083257	2019-03-29 20:23:09.083257	\N	\N	\N
2865	2018-07-13 00:00:00	2018-07-16 00:00:00	South Africa	Pretoria	Convention	2018	2018	0275a19c-f71c-4365-a505-27b3f814296d	a900914d-2e6c-475a-af5b-b87e48b34ee9	Getaway Coaches	\N	2018	2019-03-29 20:23:11.732692	2019-03-29 20:23:11.732692	\N	\N	\N
2866	2019-07-12 00:00:00	2019-07-15 00:00:00	South Africa	Muldersdrift	Convention	2019	2019	0275a19c-f71c-4365-a505-27b3f814296d	9b48232c-6078-4104-910c-1b53d0574941	Ekudeni Exclusive Country Venue	\N	2019	2019-03-29 20:23:11.756895	2019-03-29 20:23:11.756895	\N	\N	\N
2867	2018-07-29 00:00:00	2018-07-29 00:00:00	China	Zhabei Qu, Shanghai Shi	Convention	2018	2018	5f9f7384-ee7f-4bbc-9691-bdd28e9809e4	18034ab7-c321-4603-b318-b408ded6cf62	Grand New Palace Banquet & Conbention Centre	\N	2018	2019-03-29 20:23:11.781263	2019-03-29 20:23:11.781263	\N	\N	\N
2868	2016-06-03 00:00:00	2016-06-07 00:00:00	Canada	Alberni-Clayoquot Regional District D, British Columbia	Convention	2016	2016	d737c274-fa0e-4cec-a358-470ccb7e1d6a	c43b2cec-0341-4ae9-b4d5-6cda7d2f3604	Taylor Arm Provincial Park (Sproat Lake)	\N	2016	2019-03-29 20:23:14.492034	2019-03-29 20:23:14.492034	\N	\N	\N
2869	2017-07-07 00:00:00	2017-07-11 00:00:00	Canada	Alberni-Clayoquot Regional District D, British Columbia	Convention	2017	2017	d737c274-fa0e-4cec-a358-470ccb7e1d6a	3d2007d4-28c4-47d5-a24a-81c66b49da1f	Taylor Arm Provincial Park (Sproat Lake)	\N	2017	2019-03-29 20:23:17.418748	2019-03-29 20:23:17.418748	\N	\N	\N
2870	2018-06-22 00:00:00	2018-06-26 00:00:00	Canada	Alberni-Clayoquot Regional District D, British Columbia	Convention	2018	2018	d737c274-fa0e-4cec-a358-470ccb7e1d6a	1363718b-3e5c-4c22-8e4e-7be8b6aed1af	Taylor Arm Provincial Park (Sproat Lake)	\N	2018	2019-03-29 20:23:17.434503	2019-03-29 20:23:17.434503	\N	\N	\N
2871	2017-05-19 00:00:00	2017-05-21 00:00:00	United States	Raleigh, North Carolina	Convention	2017	2017	022dfee6-034d-4030-a3b2-2d5e68794ffd	5583186e-6f66-48d0-9dba-37a58e02cd79	Hampton Inn and Suites, Crabtree Valley	141	2017	2019-03-29 20:23:17.456846	2019-03-29 20:23:17.456846	\N	\N	\N
2872	2004-03-19 00:00:00	2004-03-20 00:00:00	United States	Austin, Texas	Convention	2004	2004	4bd2be98-2e99-4969-ba29-b739d4bfffec	7f12d9f7-c92d-41ea-8122-54beaf8ad3c0	Various Locations	\N	2004	2019-03-29 20:23:20.227782	2019-03-29 20:23:20.227782	\N	\N	\N
2873	2016-01-30 00:00:00	2016-01-30 00:00:00	Thailand	Bangkok	Convention	2016	2016	b1dab780-6f8e-42a8-ab0a-b394889d08d1	bbe36612-1fa9-4c71-afea-ca385237bb71	SCB Asok Towers	125	2016	2019-03-29 20:23:23.387442	2019-03-29 20:23:23.387442	\N	\N	\N
2874	2017-03-04 00:00:00	2017-03-04 00:00:00	Thailand	Bangkok	Convention	2017	2017	b1dab780-6f8e-42a8-ab0a-b394889d08d1	62322585-9049-400f-91ee-49a5be9d5108	AVANI Atrium	154	2017	2019-03-29 20:23:26.074081	2019-03-29 20:23:26.074081	\N	\N	\N
2875	2018-03-24 00:00:00	2018-03-24 00:00:00	Thailand	Bangkok	Convention	2018	2018	b1dab780-6f8e-42a8-ab0a-b394889d08d1	1ce9bfba-aed2-4cd1-add0-40dd85dda5d9	The Bazaar Hotel	234	2018	2019-03-29 20:23:26.094214	2019-03-29 20:23:26.094214	\N	\N	\N
2876	2019-03-23 00:00:00	2019-03-24 00:00:00	Thailand	Bangkok	Convention	2019	2019	b1dab780-6f8e-42a8-ab0a-b394889d08d1	29a71299-d0ad-42f3-b457-1293e15c7e50	Arnoma Grand Hotel	\N	2019	2019-03-29 20:23:26.12533	2019-03-29 20:23:26.12533	\N	\N	\N
2877	2014-08-01 00:00:00	2014-08-03 00:00:00	United States	Boston, Massachusetts	Convention	2014	2014	3b22013b-58f0-400a-92d1-9fa3b26e3aa2	7c385ebd-2cd4-42b4-8537-6c503b128243	Boston Logan Hilton Hotel	\N	2014	2019-03-29 20:23:26.154108	2019-03-29 20:23:26.154108	\N	\N	\N
2878	2015-08-14 00:00:00	2015-08-16 00:00:00	United States	Waltham, Massachusetts	Convention	2015	2015	3b22013b-58f0-400a-92d1-9fa3b26e3aa2	b0c33782-b735-4075-9d6e-c1d37284a0cd	Embassy Suites	\N	2015	2019-03-29 20:23:28.857593	2019-03-29 20:23:28.857593	\N	\N	\N
2879	2017-05-10 00:00:00	2017-05-10 00:00:00	United States	Louisville, Kentucky	Furmeet	2017	2017	6374bd49-a625-4865-a01f-c0889f5f8f51	ff984ad7-d2ba-47d6-91f6-d2b29b5578d5	Triple Crown Pavilion, Ramada Plaza	\N	2017	2019-03-29 20:23:28.876211	2019-03-29 20:23:28.876211	\N	\N	\N
2880	2018-06-02 00:00:00	2018-06-03 00:00:00	United States	Louisville, Kentucky	Convention	2018	2018	6374bd49-a625-4865-a01f-c0889f5f8f51	d5578687-3a37-4f38-acb7-28a4c2452e1b	Triple Crown Pavilion, Ramada Plaza	\N	2018	2019-03-29 20:23:31.876399	2019-03-29 20:23:31.876399	\N	\N	\N
2881	2005-05-07 00:00:00	2005-05-07 00:00:00	Japan	Tokyo	Convention	2005	2005	ff9d375e-aa3a-4a80-bf6d-572c9fe390da	06067241-4afa-4603-960d-626095521284	BumB Sports and Culture Hotel	\N	2005	2019-03-29 20:23:31.89792	2019-03-29 20:23:31.89792	\N	\N	\N
2882	2005-12-03 00:00:00	2005-12-03 00:00:00	Japan	Kanagawa	Convention	2005	2005	ff9d375e-aa3a-4a80-bf6d-572c9fe390da	1560a3b0-38bd-4620-acfe-7533900dfd27	Kawasaki	\N	2005-2	2019-03-29 20:23:34.462896	2019-03-29 20:23:34.462896	\N	\N	\N
2883	2006-05-04 00:00:00	2006-05-04 00:00:00	Japan	Kanagawa	Convention	2006	2006	ff9d375e-aa3a-4a80-bf6d-572c9fe390da	c2238a5e-e7ad-423e-aef1-7650b412f8a3	Kawasaki City Industrial Promotion Hall	\N	2006	2019-03-29 20:23:34.482256	2019-03-29 20:23:34.482256	\N	\N	\N
2884	2006-12-03 00:00:00	2006-12-03 00:00:00	Japan	Kanagawa	Convention	2006	2006	ff9d375e-aa3a-4a80-bf6d-572c9fe390da	af7ac67d-17fc-4767-a5c1-4e96fab1465a	Kawasaki City Industrial Promotion Hall	\N	2006-2	2019-03-29 20:23:34.511163	2019-03-29 20:23:34.511163	\N	\N	\N
2885	2007-12-15 00:00:00	2007-12-15 00:00:00	Japan	Kanagawa	Convention	2007	2007	ff9d375e-aa3a-4a80-bf6d-572c9fe390da	46a24102-f96e-40a7-815c-407cdc400744	Kawasaki City Industrial Promotion Hall	\N	2007	2019-03-29 20:23:34.536648	2019-03-29 20:23:34.536648	\N	\N	\N
2886	2003-01-17 00:00:00	2003-01-19 00:00:00	Netherlands	Zandvoort	Furmeet	2003	2003	015c6398-df30-42c0-b2d7-49b864020253	f0fb7906-2f0d-481c-aae4-6fda24adc85b	Hotel Triton	\N	2003	2019-03-29 20:23:34.578593	2019-03-29 20:23:34.578593	\N	\N	\N
2887	2006-07-14 00:00:00	2006-07-16 00:00:00	Germany	Köpenick, Berlin	Convention	2006	2006	39834343-fb23-4e45-ba4b-f69b22d83a63	ba9c8204-3413-49e9-ac27-b68d6fb80e09	Entenwall Island	\N	2006	2019-03-29 20:23:37.303447	2019-03-29 20:23:37.303447	\N	\N	\N
2888	2007-07-27 00:00:00	2007-07-29 00:00:00	Germany	Köpenick, Berlin	Convention	2007	2007	39834343-fb23-4e45-ba4b-f69b22d83a63	761d699a-d4cd-4742-a0e3-b48849c76c32	Entenwall Island	\N	2007	2019-03-29 20:23:40.787936	2019-03-29 20:23:40.787936	\N	\N	\N
2889	2008-07-18 00:00:00	2008-07-20 00:00:00	Germany	Köpenick, Berlin	Convention	2008	2008	39834343-fb23-4e45-ba4b-f69b22d83a63	e3b01415-82ba-4d9f-b2b1-b3f038ffcea3	Entenwall Island	\N	2008	2019-03-29 20:23:40.806903	2019-03-29 20:23:40.806903	\N	\N	\N
2890	2009-07-03 00:00:00	2009-07-05 00:00:00	Germany	Köpenick, Berlin	Convention	2009	2009	39834343-fb23-4e45-ba4b-f69b22d83a63	9a2ffaa9-cc67-455a-b3ee-6979038e5a90	Entenwall Island	\N	2009	2019-03-29 20:23:40.827882	2019-03-29 20:23:40.827882	\N	\N	\N
2891	2012-03-09 00:00:00	2012-03-11 00:00:00	Canada	Burnaby, British Columbia	Convention	2012	2012	63c22eba-f032-42d9-bb5c-937e919cb9e4	0e35ec59-d9af-4d87-8d2e-fc332f72977d	The Executive Hotel & Conference Centre	347	2012	2019-03-29 20:23:40.850298	2019-03-29 20:23:40.850298	\N	\N	\N
2892	2013-03-01 00:00:00	2013-03-03 00:00:00	Canada	Burnaby, British Columbia	Convention	2013	2013	63c22eba-f032-42d9-bb5c-937e919cb9e4	9d20cb51-33bb-4aa9-ac62-7bfd491c74b7	The Executive Hotel & Conference Centre	483	2013	2019-03-29 20:23:43.621013	2019-03-29 20:23:43.621013	\N	\N	\N
2893	2014-02-27 00:00:00	2014-03-02 00:00:00	Canada	Burnaby, British Columbia	Convention	2014	2014	63c22eba-f032-42d9-bb5c-937e919cb9e4	b0a602fc-6d24-4be3-a555-2dc54fd14dff	The Executive Hotel & Conference Centre	602	2014	2019-03-29 20:23:43.637265	2019-03-29 20:23:43.637265	\N	\N	\N
2894	2015-03-05 00:00:00	2015-03-08 00:00:00	Canada	Burnaby, British Columbia	Convention	2015	2015	63c22eba-f032-42d9-bb5c-937e919cb9e4	4454e509-7145-40f4-9c60-04fb5bd41552	The Executive Hotel & Conference Centre	724	2015	2019-03-29 20:23:43.656312	2019-03-29 20:23:43.656312	\N	\N	\N
2895	2016-03-03 00:00:00	2016-03-06 00:00:00	Canada	Richmond, British Columbia	Convention	2016	2016	63c22eba-f032-42d9-bb5c-937e919cb9e4	d8264044-dca3-4b6d-bd7c-4aa330f2a49d	The Executive Airport Plaza Hotel	810	2016	2019-03-29 20:23:43.670526	2019-03-29 20:23:43.670526	\N	\N	\N
2896	2017-03-09 00:00:00	2017-03-12 00:00:00	Canada	Richmond, British Columbia	Convention	2017	2017	63c22eba-f032-42d9-bb5c-937e919cb9e4	21c5259f-dbfb-44cc-9e6d-519f0ee97bb9	The Executive Airport Plaza Hotel	941	2017	2019-03-29 20:23:43.687494	2019-03-29 20:23:43.687494	\N	\N	\N
2897	2018-03-08 00:00:00	2018-03-11 00:00:00	Canada	Richmond, British Columbia	Convention	2018	2018	63c22eba-f032-42d9-bb5c-937e919cb9e4	47974ff4-1ccd-458c-a5cb-98a908321654	The Executive Airport Plaza Hotel	1012	2018	2019-03-29 20:23:43.703433	2019-03-29 20:23:43.703433	\N	\N	\N
2898	2019-03-07 00:00:00	2019-03-10 00:00:00	Canada	Richmond, British Columbia	Convention	2019	2019	63c22eba-f032-42d9-bb5c-937e919cb9e4	79a35bf3-c930-4895-b850-c1e188957b23	Sheraton Vancouver Airport	1121	2019	2019-03-29 20:23:43.720806	2019-03-29 20:23:43.720806	\N	\N	\N
2899	2019-03-12 00:00:00	2019-03-15 00:00:00	Canada	Richmond, British Columbia	Convention	2019	2019	63c22eba-f032-42d9-bb5c-937e919cb9e4	845ff807-7248-422e-8a7a-77f83fdc010f	Sheraton Vancouver Airport	\N	2019-2	2019-03-29 20:23:43.736661	2019-03-29 20:23:43.736661	\N	\N	\N
2900	2006-10-06 00:00:00	2006-10-08 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2006	2006	b1b605d2-eae8-48da-8771-a54b37e40298	b55b3738-de58-443c-9980-546de54e4a7b	Aspinwall Fireman's Memorial Park	\N	2006	2019-03-29 20:23:43.75247	2019-03-29 20:23:43.75247	\N	\N	\N
2901	2007-10-05 00:00:00	2007-10-07 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2007	2007	b1b605d2-eae8-48da-8771-a54b37e40298	5cfd98f5-3072-4172-985c-39a727e25a61	Aspinwall Fireman's Memorial Park	\N	2007	2019-03-29 20:23:46.392446	2019-03-29 20:23:46.392446	\N	\N	\N
2902	2008-10-10 00:00:00	2008-10-12 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2008	2008	b1b605d2-eae8-48da-8771-a54b37e40298	2d555dbf-7d2b-459e-852d-3788bea441f4	Aspinwall Fireman's Memorial Park	\N	2008	2019-03-29 20:23:46.448007	2019-03-29 20:23:46.448007	\N	\N	\N
2903	2009-10-09 00:00:00	2009-10-11 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2009	2009	b1b605d2-eae8-48da-8771-a54b37e40298	9adf3d05-5e9f-4c2f-89e9-7e59fc8b1d9e	Aspinwall Fireman's Memorial Park	\N	2009	2019-03-29 20:23:46.466666	2019-03-29 20:23:46.466666	\N	\N	\N
2904	2010-10-08 00:00:00	2010-10-10 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2010	2010	b1b605d2-eae8-48da-8771-a54b37e40298	052175d4-84e3-4c74-a91a-6c75a11cc1ca	Aspinwall Fireman's Memorial Park	\N	2010	2019-03-29 20:23:46.482317	2019-03-29 20:23:46.482317	\N	\N	\N
2905	2011-10-07 00:00:00	2011-10-09 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2011	2011	b1b605d2-eae8-48da-8771-a54b37e40298	ec0307f2-16b5-42f9-a629-223274f8d899	Aspinwall Fireman's Memorial Park	\N	2011	2019-03-29 20:23:46.500347	2019-03-29 20:23:46.500347	\N	\N	\N
2906	2012-10-05 00:00:00	2012-10-07 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2012	2012	b1b605d2-eae8-48da-8771-a54b37e40298	79e4eab0-8ec9-4c05-9cf5-12fc282b41b0	Aspinwall Fireman's Memorial Park	\N	2012	2019-03-29 20:23:46.517286	2019-03-29 20:23:46.517286	\N	\N	\N
2907	2013-10-04 00:00:00	2013-10-06 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2013	2013	b1b605d2-eae8-48da-8771-a54b37e40298	3327f006-1d18-4cd8-9b2c-cd9a9292c26b	Aspinwall Fireman's Memorial Park	\N	2013	2019-03-29 20:23:46.530998	2019-03-29 20:23:46.530998	\N	\N	\N
2908	2014-10-10 00:00:00	2014-10-12 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2014	2014	b1b605d2-eae8-48da-8771-a54b37e40298	f253425e-e28d-4ce5-8705-8a9f010c9ed2	Boyce Park Four Seasons Activity Center	\N	2014	2019-03-29 20:23:46.545959	2019-03-29 20:23:46.545959	\N	\N	\N
2909	2015-10-09 00:00:00	2015-10-11 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2015	2015	b1b605d2-eae8-48da-8771-a54b37e40298	00cce6ee-23dd-4f4a-bc04-7b896ecb2c46	Comfort Inn Pittsburgh North	\N	2015	2019-03-29 20:23:46.563124	2019-03-29 20:23:46.563124	\N	\N	\N
2910	2016-10-07 00:00:00	2016-10-09 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2016	2016	b1b605d2-eae8-48da-8771-a54b37e40298	5435e83f-7fff-4724-9876-4e305543d3b9	Comfort Inn Pittsburgh North	\N	2016	2019-03-29 20:23:46.577474	2019-03-29 20:23:46.577474	\N	\N	\N
2911	2017-10-06 00:00:00	2017-10-08 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2017	2017	b1b605d2-eae8-48da-8771-a54b37e40298	f6fa9cd8-5ba7-40d9-a041-d2af9487b30f	Comfort Inn Pittsburgh North	\N	2017	2019-03-29 20:23:46.594266	2019-03-29 20:23:46.594266	\N	\N	\N
2912	2018-10-05 00:00:00	2018-10-07 00:00:00	United States	Pittsburgh, Pennsylvania	Convention	2018	2018	b1b605d2-eae8-48da-8771-a54b37e40298	17a50f5f-0aa6-4302-9332-c8a07a0b3491	Comfort Inn Pittsburgh North	\N	2018	2019-03-29 20:23:46.608517	2019-03-29 20:23:46.608517	\N	\N	\N
2913	2010-06-04 00:00:00	2010-06-06 00:00:00	Canada	Montreal, Quebec	Convention	2010	2010	b4179290-47af-4ff5-8363-d62f7608fcf2	0090cf9e-e869-47de-b4de-46e3f6a97b77	Espresso Hotel	\N	2010	2019-03-29 20:23:46.626217	2019-03-29 20:23:46.626217	\N	\N	\N
2914	2011-06-03 00:00:00	2011-06-05 00:00:00	Canada	Montreal, Quebec	Convention	2011	2011	b4179290-47af-4ff5-8363-d62f7608fcf2	d2f5fa22-810e-4985-aedd-863039233c9b	Espresso Hotel	\N	2011	2019-03-29 20:23:49.446702	2019-03-29 20:23:49.446702	\N	\N	\N
2915	2012-06-01 00:00:00	2012-06-03 00:00:00	Canada	Montreal, Quebec	Convention	2012	2012	b4179290-47af-4ff5-8363-d62f7608fcf2	f5f8f6b9-cabf-41bb-9901-7d2c69800700	Espresso Hotel	\N	2012	2019-03-29 20:23:49.462284	2019-03-29 20:23:49.462284	\N	\N	\N
2916	2013-05-17 00:00:00	2013-05-19 00:00:00	Canada	Montreal, Quebec	Convention	2013	2013	b4179290-47af-4ff5-8363-d62f7608fcf2	016e65f0-eea6-4009-a994-e5546bf0f566	Delta Centre-Ville	\N	2013	2019-03-29 20:23:49.481566	2019-03-29 20:23:49.481566	\N	\N	\N
2917	2014-05-23 00:00:00	2014-05-25 00:00:00	Canada	Dorval, Quebec	Convention	2014	2014	b4179290-47af-4ff5-8363-d62f7608fcf2	e4229a85-7623-4d73-847c-e400f6d38812	Sheraton Montreal Airport	\N	2014	2019-03-29 20:23:49.49734	2019-03-29 20:23:49.49734	\N	\N	\N
2918	2015-05-22 00:00:00	2015-05-24 00:00:00	Canada	Pointe-Claire, Quebec	Convention	2015	2015	b4179290-47af-4ff5-8363-d62f7608fcf2	7bf5d89a-20dd-4ef3-a467-dd2d76285e70	Holiday Inn Hotel & Suites Pointe-Claire Montreal Airport Hotel	\N	2015	2019-03-29 20:23:49.515441	2019-03-29 20:23:49.515441	\N	\N	\N
2919	2016-05-20 00:00:00	2016-05-22 00:00:00	Canada	Pointe-Claire, Quebec	Convention	2016	2016	b4179290-47af-4ff5-8363-d62f7608fcf2	447067e6-88fc-4489-b7eb-d48b8820c11a	Holiday Inn Hotel & Suites Pointe-Claire Montreal Airport Hotel	\N	2016	2019-03-29 20:23:49.530325	2019-03-29 20:23:49.530325	\N	\N	\N
2920	2017-07-28 00:00:00	2017-07-30 00:00:00	Canada	Pointe-Claire, Quebec	Convention	2017	2017	b4179290-47af-4ff5-8363-d62f7608fcf2	25c3657e-1bdf-4e96-ac3f-dce89a896616	Holiday Inn Hotel & Suites Pointe-Claire Montreal Airport Hotel	\N	2017	2019-03-29 20:23:49.54707	2019-03-29 20:23:49.54707	\N	\N	\N
2921	2009-04-23 00:00:00	2009-04-27 00:00:00	United States	Oklahoma	Convention	2009	2009	6ebca54a-045a-41a9-a28c-3ed794136611	90b41826-a570-4d98-bbfa-725a3a0fd1be	Robbers Cave State Park	\N	2009	2019-03-29 20:23:49.562936	2019-03-29 20:23:49.562936	\N	\N	\N
2922	2010-04-22 00:00:00	2010-04-26 00:00:00	United States	Oklahoma	Convention	2010	2010	6ebca54a-045a-41a9-a28c-3ed794136611	ef127767-44f0-43a3-b69f-956d33111edf	Robbers Cave State Park	\N	2010	2019-03-29 20:23:52.184249	2019-03-29 20:23:52.184249	\N	\N	\N
2923	2011-04-21 00:00:00	2011-04-25 00:00:00	United States	Oklahoma	Convention	2011	2011	6ebca54a-045a-41a9-a28c-3ed794136611	b1744b90-cab4-4806-8326-5ac5f554f9ce	Robbers Cave State Park	\N	2011	2019-03-29 20:23:52.201998	2019-03-29 20:23:52.201998	\N	\N	\N
2924	2012-04-26 00:00:00	2012-04-30 00:00:00	United States	Oklahoma	Convention	2012	2012	6ebca54a-045a-41a9-a28c-3ed794136611	75ea9a9b-d5fd-4db2-bc48-b95040b24b02	Robbers Cave State Park	\N	2012	2019-03-29 20:23:52.222804	2019-03-29 20:23:52.222804	\N	\N	\N
2925	2013-04-25 00:00:00	2013-04-29 00:00:00	United States	Oklahoma	Convention	2013	2013	6ebca54a-045a-41a9-a28c-3ed794136611	67fd04e1-3d33-4660-93d2-1b13502b076f	Robbers Cave State Park	\N	2013	2019-03-29 20:23:52.237838	2019-03-29 20:23:52.237838	\N	\N	\N
2926	2014-04-24 00:00:00	2014-04-28 00:00:00	United States	Oklahoma	Convention	2014	2014	6ebca54a-045a-41a9-a28c-3ed794136611	7caaaf03-2602-4c3b-b18a-7c09270f51e3	Robbers Cave State Park	\N	2014	2019-03-29 20:23:52.2554	2019-03-29 20:23:52.2554	\N	\N	\N
2927	2015-04-23 00:00:00	2015-04-28 00:00:00	United States	Oklahoma	Convention	2015	2015	6ebca54a-045a-41a9-a28c-3ed794136611	027ec190-77ba-4240-9b37-f39ad2dcce2f	Robbers Cave State Park	\N	2015	2019-03-29 20:23:52.270798	2019-03-29 20:23:52.270798	\N	\N	\N
2928	2016-04-21 00:00:00	2016-04-26 00:00:00	United States	Oklahoma	Convention	2016	2016	6ebca54a-045a-41a9-a28c-3ed794136611	05a73e1b-23f4-4b12-897f-755e9d40864b	Robbers Cave State Park	\N	2016	2019-03-29 20:23:52.287662	2019-03-29 20:23:52.287662	\N	\N	\N
2929	2017-04-27 00:00:00	2017-05-02 00:00:00	United States	Oklahoma	Convention	2017	2017	6ebca54a-045a-41a9-a28c-3ed794136611	b5640ac9-4dc5-4a7c-830c-dacbb5427fb5	Robbers Cave State Park	\N	2017	2019-03-29 20:23:52.301433	2019-03-29 20:23:52.301433	\N	\N	\N
2930	2018-04-26 00:00:00	2018-05-01 00:00:00	United States	Oklahoma	Convention	2018	2018	6ebca54a-045a-41a9-a28c-3ed794136611	503eb68b-19bb-4ee4-8b25-35c84ccaa023	Robbers Cave State Park	\N	2018	2019-03-29 20:23:52.316386	2019-03-29 20:23:52.316386	\N	\N	\N
2931	2019-04-25 00:00:00	2019-04-30 00:00:00	United States	Oklahoma	Convention	2019	2019	6ebca54a-045a-41a9-a28c-3ed794136611	4adb3337-834d-4471-8c1f-7b877188a420	Robbers Cave State Park	\N	2019	2019-03-29 20:23:52.333104	2019-03-29 20:23:52.333104	\N	\N	\N
2932	2018-08-11 00:00:00	2018-08-12 00:00:00	Canada	Winnipeg, Manitoba	Convention	2018	2018	9a09fd73-3a7a-45fd-80a8-451743533a88	6e421740-a54b-4be1-9c95-9ee41603820d	Canad Inns Destination Centre Polo Park	181	2018	2019-03-29 20:23:52.349224	2019-03-29 20:23:52.349224	\N	\N	\N
2933	2019-08-09 00:00:00	2019-08-11 00:00:00	Canada	Winnipeg, Manitoba	Convention	2019	2019	9a09fd73-3a7a-45fd-80a8-451743533a88	6fab2f1b-4b8d-40af-b8cb-df13afff3932	Radisson Hotel Winnipeg Downtown	\N	2019	2019-03-29 20:23:54.926238	2019-03-29 20:23:54.926238	\N	\N	\N
2934	2015-05-06 00:00:00	2015-05-10 00:00:00	Ukraine	Kiev, Ukraine	Convention	2015	2015	99048fd7-c966-4174-8b79-cea97484fe65	89b5e8d7-9fe4-43da-939b-93792d7d7cbc	Gintama-Briz Hotel	\N	2015	2019-03-29 20:23:54.94723	2019-03-29 20:23:54.94723	\N	\N	\N
2935	2016-05-04 00:00:00	2016-05-08 00:00:00	Ukraine	Kiev, Ukraine	Convention	2016	2016	99048fd7-c966-4174-8b79-cea97484fe65	e121c687-1f7b-4e02-995f-56cbae5d59ed	Sofiyevsky Posad Hotel	\N	2016	2019-03-29 20:23:57.400087	2019-03-29 20:23:57.400087	\N	\N	\N
2936	2017-05-03 00:00:00	2017-05-07 00:00:00	Ukraine	Kiev, Ukraine	Convention	2017	2017	99048fd7-c966-4174-8b79-cea97484fe65	353b96d4-bc2f-4d96-95b5-0e84ea50c67a	Sofiyevsky Posad Hotel	\N	2017	2019-03-29 20:23:57.412928	2019-03-29 20:23:57.412928	\N	\N	\N
2937	2018-05-08 00:00:00	2018-05-12 00:00:00	Ukraine	Kiev, Ukraine	Convention	2018	2018	99048fd7-c966-4174-8b79-cea97484fe65	3705d888-f092-4591-ad99-137e04a69643	Platium Hotel	\N	2018	2019-03-29 20:23:57.43125	2019-03-29 20:23:57.43125	\N	\N	\N
2938	2019-05-07 00:00:00	2019-05-11 00:00:00	Ukraine	Kiev, Ukraine	Convention	2019	2019	99048fd7-c966-4174-8b79-cea97484fe65	0f0abad6-7aec-4055-879a-7e0e9f9423b4	Pushcha Hotel	\N	2019	2019-03-29 20:23:57.453699	2019-03-29 20:23:57.453699	\N	\N	\N
2939	2012-12-29 00:00:00	2013-01-01 00:00:00	Italy	Bologna	Convention	2013	2012	0509c04c-3484-4a19-9eeb-260a5ab3ca92	5f2331fa-34ca-4642-9827-c9e1e6dfe9ab	Due Torri Youth Hostel, San Sisto	\N	2012	2019-03-29 20:23:57.480802	2019-03-29 20:23:57.480802	\N	\N	\N
2940	2013-09-04 00:00:00	2013-09-08 00:00:00	Italy	Rimini	Convention	2013	2013	0509c04c-3484-4a19-9eeb-260a5ab3ca92	bbb9d2b8-eaeb-48ae-9cf7-c16123fe301e	Maria Gabriella Hotel	\N	2013	2019-03-29 20:24:00.026455	2019-03-29 20:24:00.026455	\N	\N	\N
2941	2014-09-03 00:00:00	2014-09-07 00:00:00	Italy	Bellaria-Igea Marina	Convention	2014	2014	0509c04c-3484-4a19-9eeb-260a5ab3ca92	7e80b06f-eb71-4057-8fde-3d4d6d40c751	Morri Oceania Hotel	\N	2014	2019-03-29 20:24:00.054831	2019-03-29 20:24:00.054831	\N	\N	\N
2942	2015-09-02 00:00:00	2015-09-06 00:00:00	Italy	Bellaria-Igea Marina	Convention	2015	2015	0509c04c-3484-4a19-9eeb-260a5ab3ca92	d5681367-96d8-4e4f-a004-862ae742be4a	Morri Oceania Hotel	\N	2015	2019-03-29 20:24:00.085838	2019-03-29 20:24:00.085838	\N	\N	\N
2943	2016-09-02 00:00:00	2016-09-06 00:00:00	Italy	Bellaria-Igea Marina	Convention	2016	2016	0509c04c-3484-4a19-9eeb-260a5ab3ca92	1d1aaa70-6d83-417e-929f-ebd8e88b24d3	Morri Oceania Hotel	\N	2016	2019-03-29 20:24:00.116616	2019-03-29 20:24:00.116616	\N	\N	\N
2944	2017-09-01 00:00:00	2017-09-05 00:00:00	Italy	Bellaria-Igea Marina	Convention	2017	2017	0509c04c-3484-4a19-9eeb-260a5ab3ca92	ec240929-2567-4d8d-948c-66b36023e097	Morri Oceania Hotel	\N	2017	2019-03-29 20:24:00.140024	2019-03-29 20:24:00.140024	\N	\N	\N
2945	2001-01-12 00:00:00	2001-01-14 00:00:00	Austria	Tyrol, Mayrhofen	Convention	2001	1	a01d639e-4822-4440-8671-6e437011d3ec	bcfa837a-8a8c-41d0-b756-a07e51b05790	Zillertal	\N	1	2019-03-29 20:24:00.160536	2019-03-29 20:24:00.160536	\N	\N	\N
2946	2002-01-11 00:00:00	2002-01-13 00:00:00	Austria	Valais	Convention	2002	2	a01d639e-4822-4440-8671-6e437011d3ec	132cbe59-04d0-4f6c-8fc7-f15359deb793	Saas Balen	\N	2	2019-03-29 20:24:02.800942	2019-03-29 20:24:02.800942	\N	\N	\N
2947	2003-01-10 00:00:00	2003-01-12 00:00:00	Austria	Tyrol, Mayrhofen	Convention	2003	3	a01d639e-4822-4440-8671-6e437011d3ec	71ed8e19-9937-42a5-960c-ae8550473ebe	Zillertal	\N	3	2019-03-29 20:24:02.815355	2019-03-29 20:24:02.815355	\N	\N	\N
2948	2004-01-17 00:00:00	2004-01-24 00:00:00	Austria	Tyrol, Mayrhofen	Convention	2004	4	a01d639e-4822-4440-8671-6e437011d3ec	5cd61ebd-4a00-4975-b26e-cf9a5c9d47b0	Zillertal	\N	4	2019-03-29 20:24:02.832298	2019-03-29 20:24:02.832298	\N	\N	\N
2949	2005-01-23 00:00:00	2005-01-30 00:00:00	Austria	Tyrol, Mayrhofen	Convention	2005	5	a01d639e-4822-4440-8671-6e437011d3ec	ef6973f2-ff11-4f4f-9e2f-db886b443564	Zillertal	\N	5	2019-03-29 20:24:02.849479	2019-03-29 20:24:02.849479	\N	\N	\N
2950	2006-01-28 00:00:00	2006-02-04 00:00:00	Austria	Pitztal	Convention	2006	6	a01d639e-4822-4440-8671-6e437011d3ec	88ff9975-be11-465e-af01-d98666c14738	Wenns and the Hochzeiger	\N	6	2019-03-29 20:24:02.867586	2019-03-29 20:24:02.867586	\N	\N	\N
2951	2007-01-27 00:00:00	2007-02-03 00:00:00	Austria	Tyrol, Mayrhofen	Convention	2007	7	a01d639e-4822-4440-8671-6e437011d3ec	15c59b77-1820-4e07-ac15-bec8a6c358ab	Wildschönau in the Kitzbühel Alps	\N	7	2019-03-29 20:24:02.882417	2019-03-29 20:24:02.882417	\N	\N	\N
2952	2008-01-26 00:00:00	2008-02-02 00:00:00	Austria	Salzburg	Convention	2008	8	a01d639e-4822-4440-8671-6e437011d3ec	676d0400-be7d-4780-9e49-727c6d94246d	Mühlbach am Hochkönig	\N	8	2019-03-29 20:24:02.898869	2019-03-29 20:24:02.898869	\N	\N	\N
2953	2009-01-31 00:00:00	2009-02-07 00:00:00	Austria	Holzgau	Convention	2009	9	a01d639e-4822-4440-8671-6e437011d3ec	697b23a9-a6b0-4586-aadf-1b9d11efb6f9	Holzgau	\N	9	2019-03-29 20:24:02.913304	2019-03-29 20:24:02.913304	\N	\N	\N
2954	2010-01-23 00:00:00	2010-01-30 00:00:00	Austria	Holzgau	Convention	2010	10	a01d639e-4822-4440-8671-6e437011d3ec	cdec32e6-4fee-4b0c-a071-8ef42396f91c	Holzgau	\N	10	2019-03-29 20:24:02.928769	2019-03-29 20:24:02.928769	\N	\N	\N
2955	2011-01-22 00:00:00	2011-01-29 00:00:00	Austria	Holzgau	Convention	2011	11	a01d639e-4822-4440-8671-6e437011d3ec	53514158-2d98-4306-a555-b37818a5d262	Holzgau	\N	11	2019-03-29 20:24:02.943849	2019-03-29 20:24:02.943849	\N	\N	\N
2956	2012-01-21 00:00:00	2012-01-28 00:00:00	Austria	Wörgl (Embach)	Convention	2012	12	a01d639e-4822-4440-8671-6e437011d3ec	2bd0cbd7-374d-4a76-b2c4-32c6777013f3	Wörgl (Embach)	\N	12	2019-03-29 20:24:02.959287	2019-03-29 20:24:02.959287	\N	\N	\N
2957	2013-01-26 00:00:00	2013-02-02 00:00:00	Austria	Wörgl (Embach)	Convention	2013	13	a01d639e-4822-4440-8671-6e437011d3ec	2a355a3b-252f-4a87-a3a0-9f0fc9d900fe	Wörgl (Embach)	\N	13	2019-03-29 20:24:02.974686	2019-03-29 20:24:02.974686	\N	\N	\N
2958	2014-01-25 00:00:00	2014-02-01 00:00:00	Austria	Wörgl (Embach)	Convention	2014	14	a01d639e-4822-4440-8671-6e437011d3ec	30ecab0b-2d36-4050-b1a0-540d6d178840	Wörgl (Embach)	\N	14	2019-03-29 20:24:02.989209	2019-03-29 20:24:02.989209	\N	\N	\N
2959	2015-01-24 00:00:00	2015-01-31 00:00:00	Austria	Hopfgarten	Convention	2015	15	a01d639e-4822-4440-8671-6e437011d3ec	b5ee50fe-d3c8-466b-a6de-62b95a8a8e08	Hopfgarten	\N	15	2019-03-29 20:24:03.004851	2019-03-29 20:24:03.004851	\N	\N	\N
2960	2016-01-23 00:00:00	2016-01-30 00:00:00	Austria	Lermoos	Convention	2016	16	a01d639e-4822-4440-8671-6e437011d3ec	a22536f1-5616-4a20-a44d-4a012c351bba	Lermoos	\N	16	2019-03-29 20:24:03.019966	2019-03-29 20:24:03.019966	\N	\N	\N
2961	2011-05-20 00:00:00	2011-05-22 00:00:00	Czech Republic	Tanvald	Convention	2011	2011	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	e8f59f66-196c-4f29-bd05-f0b128cae542	Various Locations	\N	2011	2019-03-29 20:24:03.03687	2019-03-29 20:24:03.03687	\N	\N	\N
2962	2012-05-05 00:00:00	2012-05-08 00:00:00	Czech Republic	Pardubice	Convention	2012	2012	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	e71451c4-60aa-40f4-91b5-92d3d2483446	ŠARZ Vršov Hotel	\N	2012	2019-03-29 20:24:05.442867	2019-03-29 20:24:05.442867	\N	\N	\N
2963	2013-05-16 00:00:00	2013-05-19 00:00:00	Czech Republic	Pardubice	Convention	2013	2013	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	bd51d31e-98f2-40f6-9963-5a48e788a533	ŠARZ Vršov Hotel	\N	2013	2019-03-29 20:24:05.460514	2019-03-29 20:24:05.460514	\N	\N	\N
2964	2014-05-30 00:00:00	2014-06-02 00:00:00	Czech Republic	Pardubice	Convention	2014	2014	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	6cebd9d2-ca05-41f6-9419-70706e0437b9	ŠARZ Vršov Hotel	\N	2014	2019-03-29 20:24:05.474965	2019-03-29 20:24:05.474965	\N	\N	\N
2965	2015-05-29 00:00:00	2015-06-01 00:00:00	Czech Republic	Pardubice	Convention	2015	2015	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	3bc71862-a320-41cf-8c27-8feb850a01a7	ŠARZ Vršov Hotel	\N	2015	2019-03-29 20:24:05.491951	2019-03-29 20:24:05.491951	\N	\N	\N
2966	2016-05-26 00:00:00	2016-05-29 00:00:00	Czech Republic	Pardubice	Convention	2016	2016	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	26ac4824-adf6-4f42-b797-044b4055fbb7	Vršovská Brána Hotel	\N	2016	2019-03-29 20:24:05.507541	2019-03-29 20:24:05.507541	\N	\N	\N
2967	2017-06-08 00:00:00	2017-06-12 00:00:00	Czech Republic	Pardubice	Convention	2017	2017	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	f29dbb97-30c4-4d38-a208-0b868bfee612	Vršovská Brána Hotel	\N	2017	2019-03-29 20:24:05.522113	2019-03-29 20:24:05.522113	\N	\N	\N
2968	2018-05-24 00:00:00	2018-05-28 00:00:00	Czech Republic	Pardubice	Convention	2018	2018	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	c6fa6e59-2ac5-415b-8cef-78b30835fcc5	Vršovská Brána Hotel	\N	2018	2019-03-29 20:24:05.538701	2019-03-29 20:24:05.538701	\N	\N	\N
2969	2019-06-19 00:00:00	2019-06-23 00:00:00	Czech Republic	Pardubice	Convention	2019	2019	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	6a945747-623a-4587-aed6-1acfd24bb8a1	Vršovská Brána Hotel	\N	2019	2019-03-29 20:24:05.552576	2019-03-29 20:24:05.552576	\N	\N	\N
1629	2016-02-06 00:00:00	2016-02-09 00:00:00	Brazil	São Roque, São Paulo	Convention	2016	2016	55075b5b-3e37-4310-96ea-83fbc216d77c	ee8a3fc2-707a-4ed4-bf74-cc8b5a894bad	Monjolinho School Camp	87	2016	2019-03-29 20:15:08.630642	2019-04-10 06:39:52.478165	\N	stuff	charirty
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.events (id, name, uuid, slug, created_at, updated_at, avatar, web) FROM stdin;
411	All Fur Fun	396c2e03-4fe7-4fd1-b953-5aed860ff3a2	all-fur-fun	2019-03-29 19:55:20.909041	2019-03-29 20:15:11.983237	e59cca59-63dd-4d21-924b-796cc172ea6c.png	\N
412	Antheria	94f383ef-265a-4cc3-887f-7e177276014f	antheria	2019-03-29 19:55:20.921643	2019-03-29 20:15:14.801314	bcd1ffc2-fa13-48b3-8107-8f46b3caa715.png	http://www.antheria.org/
414	Anthro New England	0b6fc7aa-f6c5-4bac-9cee-a366ca14c24f	anthro-new-england	2019-03-29 19:55:20.946429	2019-03-29 20:15:20.425763	28c7ef95-c928-4b76-84fb-a89ee758cf0f.png	https://www.anthronewengland.com/
415	Anthro Northwest	88b1a474-dda0-4d8c-a4a0-31c71dfa8372	anthro-northwest	2019-03-29 19:55:20.958006	2019-03-29 20:15:23.448139	dbae6cc1-2d48-40d4-92f4-22b7b26be716.png	http://www.anthronw.com/
416	Anthro Southeast (ASE)	86547dcf-610f-4eef-8db4-e5fce44c88bb	anthro-southeast-ase	2019-03-29 19:55:20.969523	2019-03-29 20:15:27.493502	f5a25b8b-0220-46b1-b7b7-23ca92986326.png	https://www.anthrose.com/
417	Anthro Weekend Utah	fc341f19-98ca-4a9a-89fb-e3d53a906de1	anthro-weekend-utah	2019-03-29 19:55:20.980767	2019-03-29 20:15:30.320423	8007628b-0fd8-4661-9008-f2775634ec65.png	https://anthroweekendutah.org/
418	Anthrocon	e23e5efc-54d5-4b72-9f45-2e6342f256c3	anthrocon	2019-03-29 19:55:20.993146	2019-03-29 20:15:33.038883	2152cf03-3fac-463c-ab51-2005bdbc6c09.png	http://www.anthrocon.org/
420	AnthrOhio	ae250ec9-bcf5-416c-9386-425c2af701bd	anthrohio	2019-03-29 19:55:21.015733	2019-03-29 20:15:38.904744	d9333bce-3b7b-4d8b-9c7a-e07ef512405f.png	http://anthrohio.org/
421	AquatiFur	99361cbc-2fb9-404a-a182-c1d49de76952	aquatifur	2019-03-29 19:55:21.027288	2019-03-29 20:15:41.667181	f28d6963-6688-4dae-87a8-ac276666a4ee.png	https://aquatifur.com/
423	ArkConsas	4f82b857-c4fa-4e80-871f-8ca6ce75cd49	arkconsas	2019-03-29 19:55:21.04979	2019-03-29 20:15:47.723798	b8380fb6-4332-461b-9067-6ee4c1a0fbb6.png	http://www.arkconsas.com/
424	Aussie Gather (AusGather)	52aaf331-4758-4572-8495-810eb3271cff	aussie-gather-ausgather	2019-03-29 19:55:21.062561	2019-03-29 20:15:50.547405	19b8cb77-d2d2-4f60-b434-d27abf993b70.png	\N
425	Berlicon	9648fa4c-3fc9-4e7b-a600-6b84050b2854	berlicon	2019-03-29 19:55:21.091694	2019-03-29 20:15:53.330832	8576c2f4-ed1b-4944-8a91-288dd698f0fa.png	http://www.berlicon.org/
427	Biggest Little Fur Con	6e29608d-6a87-4430-8d27-d4361fbb2f78	biggest-little-fur-con	2019-03-29 19:55:21.115111	2019-03-29 20:15:59.23725	1ecfabe2-8b06-4e36-ab13-79c88255fa53.png	https://www.goblfc.org/
428	Brasil FurFest	b259392d-7879-49da-acdb-8fdb5a35efce	brasil-furfest	2019-03-29 19:55:21.128263	2019-03-29 20:16:02.045511	19788491-7da9-4668-a973-d67ea4d167e2.png	https://www.brasilfurfest.com.br/
429	Califur	b8f21967-5fd1-4530-b508-a52f162d1817	califur	2019-03-29 19:55:21.143444	2019-03-29 20:16:04.928926	071c19ed-c9dd-46e8-b1d4-7798eba21e6f.png	https://califur.com/
431	Camp Furst State	be1ef2c6-e510-4239-865a-08d5ed7e7ece	camp-furst-state	2019-03-29 19:55:21.175424	2019-03-29 20:16:10.966483	9b8df12c-36ef-4a99-a260-2eb448215d08.png	\N
432	Camp Tiny Paws	14dd5dd0-a976-40f3-a926-61db4d63a8a6	camp-tiny-paws	2019-03-29 19:55:21.188657	2019-03-29 20:16:13.625289	61903d68-6961-423e-8f12-2864980d66cf.png	https://tinypawscon.org/
434	Camping Paws	9eeaac7e-003d-4564-b68d-ef052e8553cf	camping-paws	2019-03-29 19:55:21.215466	2019-03-29 20:16:19.346604	84623829-e9d3-41d5-b1d8-91e1f9a5c267.png	https://twitter.com/CapitalFurr
435	Canadian Anthro and Cartooning Expo (C-ACE)	a60df996-cb3c-4d49-a6e7-9d36e43fb5ea	canadian-anthro-and-cartooning-expo-c-ace	2019-03-29 19:55:21.229357	2019-03-29 20:16:22.064178	d5b18b6b-10f5-4ad9-8108-341913bcd921.png	http://www.c-ace.org/
436	CanFURence	a97acdc0-6725-4ad0-8f03-63cd81d8b5a8	canfurence	2019-03-29 19:55:21.242319	2019-03-29 20:16:24.938501	e1251208-0a10-4975-8b6d-a34f26e8d3bd.png	https://www.canfurence.ca/
438	CastleCon	f178c0f9-a315-46fe-b26d-397e4af7cd91	castlecon	2019-03-29 19:55:21.271384	2019-03-29 20:16:30.620303	4ec962b1-df78-4979-aea2-7f10ca8b2aca.png	http://www.castlecon.de/
439	Central Midwest Furmeet	f87f937a-e330-4e01-8171-dbbbeba8f2c1	central-midwest-furmeet	2019-03-29 19:55:21.284964	2019-03-29 20:16:33.270963	adc4eff8-529e-459a-9308-f0901609c09f.png	http://cmfurmeet.webs.com/
440	Central Plains Fur Con	64977fe8-7bcc-4f99-8b38-5030d835c1e1	central-plains-fur-con	2019-03-29 19:55:21.297875	2019-03-29 20:16:35.960474	325a525b-b2f2-4055-9521-0576aab8aad6.png	http://www.cpfurcon.com/
441	ČeSFuR	c08c43ea-9e45-4a4b-98b9-664d532d81c8	cesfur	2019-03-29 19:55:21.310597	2019-03-29 20:16:38.674041	89def649-b111-4ffa-957b-500438854eba.png	https://www.cesfur.org/
443	ConFurence	bdb6f819-4ce6-4ec0-b300-3ddad933238b	confurence	2019-03-29 19:55:21.338992	2019-03-29 20:16:44.240052	15592aa0-5032-4725-bc40-9fbb0ee64d25.png	http://www.confurence.com/
444	ConFurence East (MoreFurCon)	408e01ee-4ea5-44ee-aa96-d759ae114ecb	confurence-east-morefurcon	2019-03-29 19:55:21.353059	2019-03-29 20:16:47.081252	afdc6226-1782-4d9f-a1f9-57b70eb1019c.png	\N
445	Confurgence	84a3b67e-7ee6-448f-b854-be83ac7616d3	confurgence	2019-03-29 19:55:21.368424	2019-03-29 20:16:49.763789	62109510-64ee-45f3-b496-9f067003df07.png	https://confurgence.com/
447	Confurtiva	da0c15b1-3bc2-40e9-9c28-e965b6849fae	confurtiva	2019-03-29 19:55:21.391499	2019-03-29 20:16:55.303629	8a342229-5f3c-4cc1-8ddf-2ddbd77effef.png	http://confurtiva.furrymx.org/home/
448	ConFuzzled	9c4914fc-6bd9-4057-93fe-5356e76e7a02	confuzzled	2019-03-29 19:55:21.402854	2019-03-29 20:16:57.982832	d37b943b-ef0d-4409-939b-c8aafbeab20b.png	http://www.confuzzled.org.uk/
450	ConWild	2af32865-53ba-478e-be94-4ad8e081958f	conwild	2019-03-29 19:55:21.424143	2019-03-29 20:17:03.668409	9e3a4ef1-7cde-400b-932f-f2f86f945620.png	http://www.nlwolf.com/calfur.html
451	Delaware Furbowl	834b5a8f-15db-4a47-992f-fd007144a983	delaware-furbowl	2019-03-29 19:55:21.434572	2019-03-29 20:17:06.623942	c97712fc-74af-4fd8-ae35-60a9bf30f650.png	https://thefurststate.com/index.php/events/delaware-furbowl
452	Delaware Furcade	738bce12-5284-40d8-a709-db50ca069a1e	delaware-furcade	2019-03-29 19:55:21.444512	2019-03-29 20:17:10.327163	1a708ec5-ed1e-425e-ab62-a262f790277b.png	http://thefurststate.com/index.php/events/arcade-meet
453	DenFur	5e0f8985-fd4d-4b6a-bd1d-e09e6ed31d63	denfur	2019-03-29 19:55:21.453909	2019-03-29 20:17:13.084602	d8f5b753-17f7-401b-b48b-f8deb44028c8.png	https://www.denfur.co/
455	Dutch Furcon	6e25f519-d5a1-48ae-918c-84bce0f3bd0e	dutch-furcon	2019-03-29 19:55:21.473234	2019-03-29 20:17:18.459455	8f3c0126-a9d2-4d68-af85-b798ac2ad90c.png	https://www.dutchfurcon.com/
456	EAST	53927c89-619d-4fcb-a3a2-11fd3865deff	east	2019-03-29 19:55:21.484402	2019-03-29 20:17:20.91799	eb575573-4114-4d4c-b158-754dc4ba1532.png	https://sachsenfurs.de/en/east
458	Elliott's Summer Celebration	db136ced-5e29-4b05-878d-5b89bf1cb83b	elliott-s-summer-celebration	2019-03-29 19:55:21.505969	2019-03-29 20:17:26.431969	f1e49f8d-59c3-4082-8a3c-8bb621e01646.png	https://twitter.com/ElliottsEvents/
459	Elliott's Winter Carnival	107883b9-256a-4640-9d91-e30830af811a	elliott-s-winter-carnival	2019-03-29 19:55:21.515364	2019-03-29 20:17:29.101975	f5804511-13c3-4789-9899-e41cbedf4061.png	https://twitter.com/ElliottsEvents/
460	Elliott's Fall Festival	8d2466b1-1c67-45f1-bb8a-76334ac21719	elliott-s-fall-festival	2019-03-29 19:55:21.524572	2019-03-29 20:17:31.894518	90fc21c2-0271-4b39-8cb2-cf09bd4a5a88.png	https://twitter.com/ElliottsEvents/
462	Eurofurence	c4254aea-194b-4afc-8016-9d9f817b16b0	eurofurence	2019-03-29 19:55:21.543969	2019-03-29 20:17:37.447462	ed704f81-4dab-494f-a2ca-7bfc746495ce.png	https://www.eurofurence.org/
463	F3 Convention (F3con)	da95bb9a-0ba9-48f7-ab82-533e44d94b9b	f3-convention-f3con	2019-03-29 19:55:21.553574	2019-03-29 20:17:40.32976	ca26fef7-e540-464a-b781-670d6fe68113.png	http://f3convention.wix.com/f3con
464	FA United	3655f19d-5377-4428-8e7e-2f530f3edf39	fa-united	2019-03-29 19:55:21.563392	2019-03-29 20:17:42.99173	6c4f2ffc-718d-4d7a-87fa-3c670556ee1a.png	http://www.faunited.org/
465	Fangcon	ae9c6850-1b47-4a19-84bd-c651413643cd	fangcon	2019-03-29 19:55:21.573032	2019-03-29 20:17:45.912913	4f806358-0504-4662-ae57-f920b4898144.png	http://fangcon.org/
467	FinFur Animus	4d9686d0-21e1-43c7-8072-008589d006ed	finfur-animus	2019-03-29 19:55:21.592781	2019-03-29 20:17:51.382112	66c0440f-b29d-4f3d-8c1a-f66beda04e01.png	https://animus.finfur.net/
468	Flüüfff	d7aa76d9-3e79-400f-9e0d-9c3e5549851b	fluufff	2019-03-29 19:55:21.60258	2019-03-29 20:17:53.943807	1960ade9-9352-4e26-8101-b882ffe97fbb.png	https://fluufff.org/
469	FranFurence	1ea54f4f-58dc-4304-b608-ac2de0753d0e	franfurence	2019-03-29 19:55:21.613028	2019-03-29 20:17:56.510229	e31b8adc-5666-471c-a08f-0e4cf48e01ed.png	\N
471	Fur Squared	82f15ed4-2e3c-4076-bc14-7ddee58e450b	fur-squared	2019-03-29 19:55:21.63435	2019-03-29 20:18:02.916719	a4597ea9-072e-47ce-a5da-4163eb8a9661.png	https://fursquared.com/
473	Fur Weekend Camping & BBQ	66dcb318-3a39-4901-b30c-37cdf2a88bca	fur-weekend-camping-bbq	2019-03-29 19:55:21.656834	2019-03-29 20:18:08.829724	b626ac48-01b0-42cc-bf21-1d3b1d8a6b11.png	\N
474	Fur-Eh!	8b3590cd-8093-4614-90e8-1936e08cf1e2	fur-eh	2019-03-29 19:55:21.66798	2019-03-29 20:18:11.619902	875695a1-dc99-4c10-aa55-f12ebac66b60.png	https://www.fureh.ca/
475	Fur-Xoticon	4db2255a-022a-4fb8-8fa9-f393c21cb8c4	fur-xoticon	2019-03-29 19:55:21.678788	2019-03-29 20:18:14.581657	b2631272-ab97-4772-b496-0eec40f2abf3.png	http://fur-xoticon.org/
477	FurCan	a82bb83a-dcac-4fe9-8f38-df88e6f1f84b	furcan	2019-03-29 19:55:21.700042	2019-03-29 20:18:20.193895	68a12b9b-10b2-40ad-8adb-7f4f40a96f25.png	https://twitter.com/FurCan19/
478	Furcation	29a40ccd-33a1-4518-ac0a-279d9c96c107	furcation	2019-03-29 19:55:21.710283	2019-03-29 20:18:23.04549	89d9aaf2-544b-4d3d-8fc8-0b83cb221102.png	https://furcation.org.uk/
479	FURconsin	63a6c417-68a1-4297-a820-b1101f7644ed	furconsin	2019-03-29 19:55:21.72004	2019-03-29 20:18:25.777774	e0bf2148-fb8b-47db-9c20-6b947c6299bd.png	http://www.furconsin.com/
481	FurIdaho	0aec6c19-4a6e-43b7-9c99-d7cd61c0d027	furidaho	2019-03-29 19:55:21.740728	2019-03-29 20:18:31.701381	d76795f0-8dc8-4e84-8445-67dbdb931b9b.png	http://furidaho.com/
482	FurDU	c89a2067-c261-4659-9903-7a1d60af81b9	furdu	2019-03-29 19:55:21.751278	2019-03-29 20:18:34.567622	831ab827-25de-4f7d-aedc-2dc07bc53518.png	http://www.furdu.com.au/
484	FurJAM	74c63030-c3ff-4051-a0d0-97f4be5fb91e	furjam	2019-03-29 19:55:21.772926	2019-03-29 20:18:40.045359	347b87c8-9b57-4944-8c7e-277a6fb3030f.png	http://www.furjam.org/
485	Furlandia	4ba6a473-e570-41dc-a55b-cd93d96201ee	furlandia	2019-03-29 19:55:21.78436	2019-03-29 20:18:42.885865	45e63183-b402-4335-b985-681b0275f17c.png	https://furlandia.org/
486	Furlaxation	3142d391-48bf-42e9-823d-f5ba141f0a6e	furlaxation	2019-03-29 19:55:21.801545	2019-03-29 20:18:45.806862	fb830da6-2b00-45b2-988d-72270677128f.png	http://furlaxation.boards.net/
488	Furnal Equinox	5b7e1c36-136b-43a1-8bfe-12cc5f22627e	furnal-equinox	2019-03-29 19:55:21.825662	2019-03-29 20:18:51.558562	622805d4-82c0-4551-b615-701ebd281937.png	https://www.furnalequinox.com/
489	Furnival	229f905d-2893-4531-9163-d76af5d29a46	furnival	2019-03-29 19:55:21.840149	2019-03-29 20:18:54.437381	0e6c83f5-d484-4749-899b-65cf215d92b0.png	http://www.furrycarnival.com/
490	Furpocalypse	00deba1c-47a7-4fc3-8809-1ac13007cce5	furpocalypse	2019-03-29 19:55:21.853487	2019-03-29 20:18:57.051409	896529fc-8b94-4e26-907c-01f5709bfed0.png	https://www.furpocalypse.org/
491	FurryCon	7b26a05b-51dd-4056-9e86-699b800eb13a	furrycon	2019-03-29 19:55:21.864029	2019-03-29 20:18:59.754489	55cad532-5c2f-459a-81e9-d86b3b9365b6.png	http://www.furrycon.com/
493	Furrnion	96f5353b-9eb9-4e05-ae1a-0b66cfc0be55	furrnion	2019-03-29 19:55:21.882577	2019-03-29 20:19:04.96393	f3e6d629-4381-40a6-8d1b-924f9179ad42.png	https://www.furrnion.org/en/
494	Furry BlackLight (FBL)	9a6cefa7-d763-4fda-98fc-290c09908547	furry-blacklight-fbl	2019-03-29 19:55:21.892071	2019-03-29 20:19:08.173236	19a24b35-8ef0-47e4-ad6f-a7c0013d416d.png	http://fblacklight.org/
496	Furry Cruise	ebc75ead-2053-4140-a5d1-085aba2e7752	furry-cruise	2019-03-29 19:55:21.914008	2019-03-29 20:19:13.813318	429301f4-03dc-4bfe-a9e3-1c8337d21035.png	http://my.furrycruise.com/
497	Furry Fiesta	302b87c1-aa5e-4943-81eb-43566e4e5b6e	furry-fiesta	2019-03-29 19:55:21.923497	2019-03-29 20:19:16.950894	ff4bbc07-4919-4644-89e6-115c3d926d0d.png	http://www.furryfiesta.org/
498	Furry Migration	313b5b51-1305-42ce-8b76-6de1d0d135d3	furry-migration	2019-03-29 19:55:21.93465	2019-03-29 20:19:19.820928	78dbb3c2-c8af-4588-8e54-a01ea9797b17.png	https://www.furrymigration.org/
499	Furry Siesta	60f86895-7185-482f-8de4-2f6fb40e1c77	furry-siesta	2019-03-29 19:55:21.945963	2019-03-29 20:19:22.833982	00ee8af2-f502-42e5-b072-ae60a21e4a09.png	https://www.furrysiesta.org/
501	Furry Spring Break	1b4c147b-c2a0-468b-a4c7-d56655220b4e	furry-spring-break	2019-03-29 19:55:21.969567	2019-03-29 20:19:28.412058	0a049724-f2bb-460f-a1fa-12555a5388e7.png	\N
502	Furry Summer Festival (FEC)	53072c4a-0bf3-49a6-8b61-a163a82e24d5	furry-summer-festival-fec	2019-03-29 19:55:21.981126	2019-03-29 20:19:31.418861	d58e9fd3-b5ac-4bbd-a11d-041e6687f143.png	http://furryeventchina.top/
504	Furry Summer Mexico	f0a9821c-db95-449c-9dc0-2ffb10da3a7a	furry-summer-mexico	2019-03-29 19:55:22.004325	2019-03-29 20:19:36.334247	aac36e2e-7371-4b71-bbe3-d188356fbc5e.png	https://twitter.com/FurrySummerMx
505	Furry Weekend Atlanta	c2dbb3cd-4171-4669-b1f1-78f18cd15c83	furry-weekend-atlanta	2019-03-29 19:55:22.015856	2019-03-29 20:19:39.074275	0ee02087-0bba-49e3-b4c2-3cfe1dd34c7c.png	https://www.furryweekend.com/
506	Furry Unlocked	731c2764-b885-437e-9ed3-8b21391cad54	furry-unlocked	2019-03-29 19:55:22.028468	2019-03-29 20:19:42.281061	11ccb062-fcac-4cf7-9cfc-ed450198b40b.png	https://www.furryunlocked.org/
507	Furrydelphia	73dc92e7-49bc-4df3-93bf-79fffc93e925	furrydelphia	2019-03-29 19:55:22.040212	2019-03-29 20:19:45.058158	5d6c9af2-0442-4f68-be90-3c3fd41775b4.png	http://twitter.com/Furrydelphia
508	FurryPinas	1c563c78-0ae0-43b8-a9b7-7565bcb0ee37	furrypinas	2019-03-29 19:55:22.051029	2019-03-29 20:19:48.048446	353e8618-d222-4738-89fc-ed103a81d93c.png	https://furrypinas.com/en/
510	Furs on Fire	c4cdc2c6-4189-485c-bcfa-b17a5acaeed6	furs-on-fire	2019-03-29 19:55:22.079133	2019-03-29 20:19:53.524745	fa4128ac-b4e2-4187-82cd-54f94f9a0e9d.png	http://www.fursonfire.eu/
511	Furs Upon Malaysia	340265a6-a517-4324-afc3-9db4d401c474	furs-upon-malaysia	2019-03-29 19:55:22.089035	2019-03-29 20:19:56.128308	646db89d-6914-4bd8-8fe1-6ea0561b741f.png	http://www.furum.org/
512	FursonaCon	af17d66f-5459-422b-98cf-7b42ffa656df	fursonacon	2019-03-29 19:55:22.098993	2019-03-29 20:19:58.860718	e5db116f-d7f5-4377-8772-a82434fe4624.png	http://www.fursonacon.com/
513	Fursquare	f4abc6b6-300a-4eed-a823-10dc307eee6b	fursquare	2019-03-29 19:55:22.109497	2019-03-29 20:20:01.916557	26c54d40-a623-49b2-b4a5-0829f24a23d7.png	https://anthro.ltd
514	Furst	0b6493ff-2b54-4227-99de-96c752b0cecf	furst	2019-03-29 19:55:22.120323	2019-03-29 20:20:04.507695	f95772f0-ee6b-41a4-8ccf-d548abdef1d6.png	http://staffblog.fur-st.com/
516	Furstock	18b036ea-2171-4187-a586-0986f263ab96	furstock	2019-03-29 19:55:22.143868	2019-03-29 20:20:10.26994	dbddbf86-26e0-4371-8da8-bf342eba7400.png	http://polfurs.deviantart.com/
517	Furstrike	47bd69b9-7455-425a-ac72-f06e922b26b1	furstrike	2019-03-29 19:55:22.160784	2019-03-29 20:20:14.063958	974ee964-17e2-4bd0-8b64-cefff0316995.png	https://www.facebook.com/FurStrike/
519	Furtasticon (MoreFurCon)	dc914c2b-9912-48bc-8696-2180e2e80bb7	furtasticon-morefurcon	2019-03-29 19:55:22.186474	2019-03-29 20:20:19.780512	ffbd1a02-9aa6-494f-a866-86028e385f9b.png	\N
520	Further Confusion	11e2c53b-bac8-4c7b-a881-03d31d9e6345	further-confusion	2019-03-29 19:55:22.198771	2019-03-29 20:20:22.591838	0057f6b2-6812-46b6-affb-9246cd9be46b.png	http://www.furtherconfusion.org/
521	Furthest North	86d2defc-85d8-4778-8694-bd9bde8980e2	furthest-north	2019-03-29 19:55:22.210351	2019-03-29 20:20:25.890839	5d856309-4ac9-4fa7-bff8-eaee5372045b.png	http://furthestnorth.ca/
523	Futerkon	19e783ee-b327-492a-926b-2318f878e179	futerkon	2019-03-29 19:55:22.231953	2019-03-29 20:20:37.876386	5fe1be70-4fe2-438e-9a3b-96fdfa9abd19.png	http://www.futerkon.pl/
524	FurWAG	7b5eb241-6c7d-4fd9-a07d-76c49d6afd92	furwag	2019-03-29 19:55:22.242454	2019-03-29 20:20:40.672603	db0839e3-2979-4807-ac19-82d09af87fc4.png	http://www.furwag.com.au/
525	Futrzakon	054198d6-e492-4810-a58b-bc3d820dbeb6	futrzakon	2019-03-29 19:55:22.252139	2019-03-29 20:20:43.309109	96acecd1-90a3-48af-aca4-f3233ff3d53d.png	http://www.futrzakon.org/
527	Gateway FurMeet	b22011fc-b6a8-424e-8384-6a1479d61130	gateway-furmeet	2019-03-29 19:55:22.271115	2019-03-29 20:20:50.074066	70c9153d-841f-45b5-afa7-c25d070921fe.png	https://gatewayfurmeet.org/
528	Gdakon	bc0736de-7986-435a-b5e7-d45f2cf77dda	gdakon	2019-03-29 19:55:22.287169	2019-03-29 20:20:53.156012	395ab18d-a3f5-4040-9cf9-7a3e3a6eccc2.png	http://gdakon.org/
529	Golden Leaves Con	2ac7f68b-34ba-4896-a2d7-6eda79ea28a5	golden-leaves-con	2019-03-29 19:55:22.29761	2019-03-29 20:20:55.921263	74a55b56-bb6b-416f-aac2-286c7a3e4ac9.png	http://glc.furry.ch/
533	Howler's Eve	fb3ce730-f47e-4340-96ea-6f82bbba504e	howler-s-eve	2019-03-29 19:55:22.339041	2019-03-29 20:21:07.083868	05494350-7813-46d1-9043-450906ab7e12.png	https://www.howlerseve.com/
534	Howloween	efe695eb-1e5a-4968-aed6-56768214a17c	howloween	2019-03-29 19:55:22.349136	2019-03-29 20:21:09.761229	f241ea68-01b4-42c5-90a2-806157014736.png	https://www.howloween.ca/
536	Infurnity	d26e7131-935b-4d86-96a1-8283cd676482	infurnity	2019-03-29 19:55:22.372217	2019-03-29 20:21:16.130826	5f41aa83-5d57-4e6a-b66a-ef9296820db9.png	infurnity.com/en/
537	Italian Fur Haven	23c31cb8-d43b-4dd6-8d47-61a01d360939	italian-fur-haven	2019-03-29 19:55:22.385266	2019-03-29 20:21:18.741526	b1414250-1b06-4b1b-bf25-7ef70b572d06.png	\N
539	Japan Meeting of Furries	6c79f835-09b9-4719-b649-29b08d1905b7	japan-meeting-of-furries	2019-03-29 19:55:22.416603	2019-03-29 20:21:24.911114	9175deea-67ef-4d87-a163-ceb3b840b23e.png	http://www.j-mof.org/en
540	JaxFurs Spring Picnic	cb0a89f7-34d0-427b-a8e7-87da1ea17ce5	jaxfurs-spring-picnic	2019-03-29 19:55:22.429267	2019-03-29 20:21:27.570206	678bf115-c9f2-4447-8aa0-774808332d0f.png	http://www.jaxfurspicnic.com/
542	Kemocon	45298af2-a245-4383-bf74-aabd8a51c12c	kemocon	2019-03-29 19:55:22.451431	2019-03-29 20:21:33.659148	2f1e316a-2789-4397-9edd-27be37e0944d.png	http://www.kemocon.com/
543	Kemoket	96d7c5b6-14b7-4177-a812-2ea01033b61e	kemoket	2019-03-29 19:55:22.463544	2019-03-29 20:21:36.41556	76278146-8ad0-4600-a222-46994588210d.png	http://skypalette.jp/kemoket/
544	Kemono Square	1a284f7d-2317-4d00-a676-7b84673b45e0	kemono-square	2019-03-29 19:55:22.474034	2019-03-29 20:21:39.255731	4c0a81dd-075f-470b-93af-405d6081d8c4.png	http://kemono-square.com/
545	LAFF New Year's Eve	00e2ef4d-aa83-4ced-928a-7ff5d0149f45	laff-new-year-s-eve	2019-03-29 19:55:22.485732	2019-03-29 20:21:41.976649	7cba7a74-bdad-4b2b-b777-b82331ae88a9.png	http://newyearsevecon.com/
547	Lakeside Furs Underwater (LSF)	c723ed71-bcf4-4d9e-beef-4c4a07f4cb79	lakeside-furs-underwater-lsf	2019-03-29 19:55:22.50801	2019-03-29 20:21:47.963107	414ef459-aeed-4147-8e8b-e61046a517e5.png	http://www.lakesidefurs.at/
548	Megaplex	a26e49cb-a5e4-49ba-86ee-77817cdbbf5a	megaplex	2019-03-29 19:55:22.520089	2019-03-29 20:21:50.580253	3c206696-66b1-499b-ac43-104920499118.png	https://www.megaplexcon.org/
550	Mephit Fur Meet	85b072c1-5a40-4c8e-8d27-5f7202d89fde	mephit-fur-meet	2019-03-29 19:55:22.544775	2019-03-29 20:21:56.866168	eef9e532-7530-435d-9d4c-5e2697f74eaf.png	http://www.mephitfurmeet.org/
551	Mephit Mini Con	708165cb-6572-48f0-b0f6-1a30699640b9	mephit-mini-con	2019-03-29 19:55:22.555223	2019-03-29 20:22:00.075348	1f00e36d-34ab-468d-ac6c-4949d14683a7.png	http://mmc.furcon.eu/
552	Micro Fur Con	a9aa3b5b-7a0b-4560-93db-4d86f90b543c	micro-fur-con	2019-03-29 19:55:22.565588	2019-03-29 20:22:02.879061	3f61842e-2dd3-4c2f-a18b-b26159cbdcea.png	https://twitter.com/microfurcon
553	MIDfur (Confurgence)	0165f8e7-ab5b-42e3-bfc9-ef75f5b58d00	midfur-confurgence	2019-03-29 19:55:22.576458	2019-03-29 20:22:05.536916	6518f545-8a31-49de-a0ac-ad5c2e1d00b6.png	http://www.midfur.com.au/
554	Midwest FurFest	39a68baf-2aca-496a-9159-0489b5973de4	midwest-furfest	2019-03-29 19:55:22.586354	2019-03-29 20:22:08.347961	8e5488c7-740d-4d6f-9b86-dcda51d2b326.png	http://www.furfest.org/
556	Motor City Furry Con	8ae5fdc3-e00a-4802-a0bc-c319f4739ec0	motor-city-furry-con	2019-03-29 19:55:22.606989	2019-03-29 20:22:14.820858	8628c237-fdcf-4c2f-8566-3d354b0e8a8c.png	https://motorcityfurrycon.org/
557	NakamaCon	349d9602-763c-4523-982e-b05c788e4977	nakamacon	2019-03-29 19:55:22.61761	2019-03-29 20:22:17.70352	cc1800e9-0847-49a1-8fa0-fe9721110c31.png	http://www.nakamacon.com/
559	New Year's Eve Con	d5804303-4f47-4d7e-b299-514c120ac384	new-year-s-eve-con	2019-03-29 19:55:22.639409	2019-03-29 20:22:23.247288	628e34a1-7543-4dc5-8049-c0fd772efc0e.png	http://newyearsevecon.com/
560	NordicFuzzCon	a30af9e2-0304-42c7-ba45-e4df8f737381	nordicfuzzcon	2019-03-29 19:55:22.651199	2019-03-29 20:22:27.205973	6d87e719-101d-45ad-bda4-3d4926fc7290.png	https://www.nordicfuzzcon.org/
561	Oklacon	9aa89210-a787-413e-98e3-7a7c8a4dfc04	oklacon	2019-03-29 19:55:22.663435	2019-03-29 20:22:30.734939	83f29fa6-b47f-4357-a76c-995eedb8105e.png	http://oklacon.com/
563	Party Along With Anthro Indonesia (PAWAI)	f0981818-358e-416c-bd3d-9e312780d044	party-along-with-anthro-indonesia-pawai	2019-03-29 19:55:22.68622	2019-03-29 20:22:37.788374	878edf86-0c16-497e-b22c-f98b01e799aa.png	https://pawai.id/
566	RainFurrest	2a6ba190-3d8f-4971-8492-e2a442b3e3e9	rainfurrest	2019-03-29 19:55:22.717337	2019-03-29 20:22:46.492799	f69590e7-4fdd-4e3c-8022-a2f50403a352.png	http://www.rainfurrest.org/
567	Rather Brilliant Weekend (RBW)	146064cd-d251-4443-9959-08f92121f90f	rather-brilliant-weekend-rbw	2019-03-29 19:55:22.728483	2019-03-29 20:22:49.634578	5f259028-072a-411b-aaf2-413d0308e90f.png	http://community.livejournal.com/rbwuk/
568	RivFur	f8f38505-9f4c-4a26-8636-75123463dc84	rivfur	2019-03-29 19:55:22.738515	2019-03-29 20:22:52.814492	d10a7b50-a18d-4cc7-9e21-f3c5972f882d.png	http://www.rivfur.com/
569	Rocket City FurMeet	386967df-3425-4547-9201-0870f6b1dd82	rocket-city-furmeet	2019-03-29 19:55:22.748664	2019-03-29 20:22:56.025011	3fdab38d-f0b1-4cf2-9d19-28006bbc00e7.png	http://www.rcfm.net/
570	Rocky Mountain Fur Con	2b36503d-bc02-49ca-aeb4-c52eebb7cc3b	rocky-mountain-fur-con	2019-03-29 19:55:22.758492	2019-03-29 20:22:59.749452	c746b0b4-4349-4a44-96cc-11b1f0f93bed.png	http://www.rockymountainfurcon.org/
571	Rusfurence	d0976f30-2c95-4c1c-b258-f77a6e12e234	rusfurence	2019-03-29 19:55:22.768648	2019-03-29 20:23:02.996422	9f7fb34c-6d81-40ec-bcbd-40356444d89b.png	https://www.rusfurence.ru
572	ScotiaCon	3826b7dc-d5d6-4dd5-b939-d6402951b456	scotiacon	2019-03-29 19:55:22.779266	2019-03-29 20:23:06.68274	5d86067d-4e7c-48b8-8b4f-571950acc596.png	http://www.scotiacon.org.uk/
575	Surfur	d737c274-fa0e-4cec-a358-470ccb7e1d6a	surfur	2019-03-29 19:55:22.811249	2019-03-29 20:23:15.205605	91427001-d84f-4fdb-b4cd-492e198e4379.png	http://surfur.ca/
576	Tarpaw Furmeet	022dfee6-034d-4030-a3b2-2d5e68794ffd	tarpaw-furmeet	2019-03-29 19:55:22.823171	2019-03-29 20:23:17.966728	317b1726-6864-4013-b050-178eae950181.png	http://www.tarpawfurmeet.com/
577	Texas Furry Con	4bd2be98-2e99-4969-ba29-b739d4bfffec	texas-furry-con	2019-03-29 19:55:22.835062	2019-03-29 20:23:20.75465	30032e1e-64fc-4f3a-84ee-6cb57b4618fc.png	http://web.archive.org/web/20040204192405/http://www.texasfurrycon.org/
578	Thaitails	b1dab780-6f8e-42a8-ab0a-b394889d08d1	thaitails	2019-03-29 19:55:22.847303	2019-03-29 20:23:24.010051	8f2f4d61-9e7e-4f96-96a3-45a2a28f7294.png	https://www.thaitails.net/?fbclid=IwAR1OrA3CcG3Pc0iQUDCP15NQWnEXpPWBtelwNBb04J05hc-4ZQC9z-xs7c4
579	The Maltese Fur-Con	3b22013b-58f0-400a-92d1-9fa3b26e3aa2	the-maltese-fur-con	2019-03-29 19:55:22.857894	2019-03-29 20:23:26.685541	cd13c590-cea6-44bc-b011-9ff9ab933c79.png	http://www.maltesefurcon.com/
581	TransFur	ff9d375e-aa3a-4a80-bf6d-572c9fe390da	transfur	2019-03-29 19:55:22.879892	2019-03-29 20:23:32.442609	56b65725-e2a7-4214-9f64-cec64220a2eb.png	http://babelfish.altavista.com/babelfish/trurl_pagecontent?lp=ja_en&trurl=http%3a%2f%2fwww.transfur.jp
582	Treecon	015c6398-df30-42c0-b2d7-49b864020253	treecon	2019-03-29 19:55:22.892955	2019-03-29 20:23:35.144395	56035e79-f937-4c19-8d59-81a897009980.png	http://www.dutchfurs.com/news.php?extend.149
583	Tropicon	39834343-fb23-4e45-ba4b-f69b22d83a63	tropicon	2019-03-29 19:55:22.908252	2019-03-29 20:23:37.786884	e9366e21-4483-4db6-84c8-cdd254a32c88.png	\N
584	VancouFur	63c22eba-f032-42d9-bb5c-937e919cb9e4	vancoufur	2019-03-29 19:55:22.92005	2019-03-29 20:23:41.34399	c42cef38-e6fa-41ed-bd71-574975783170.png	https://vancoufur.org/
585	Western Pennsylvania Furry Weekend (WPAFW)	b1b605d2-eae8-48da-8771-a54b37e40298	western-pennsylvania-furry-weekend-wpafw	2019-03-29 19:55:22.931501	2019-03-29 20:23:44.137895	10e0c935-c9b1-46f2-85e1-267f5bb6f6b3.png	http://www.wpafw.org/
586	What The Fur	b4179290-47af-4ff5-8363-d62f7608fcf2	what-the-fur	2019-03-29 19:55:22.947662	2019-03-29 20:23:47.0395	280bce99-a1e6-427d-8ab1-991e9aeb3415.png	http://whatthefur.ca/
587	Wild Nights	6ebca54a-045a-41a9-a28c-3ed794136611	wild-nights	2019-03-29 19:55:22.963526	2019-03-29 20:23:49.937184	d05d8c25-914f-4e62-8d80-81517264a617.png	http://wildnights.org/
589	WUFF	99048fd7-c966-4174-8b79-cea97484fe65	wuff	2019-03-29 19:55:22.995246	2019-03-29 20:23:55.397292	d07181b7-d64a-48d4-a0dd-8cae336ec1dc.png	https://wuff.ua/
409	Abando	55075b5b-3e37-4310-96ea-83fbc216d77c	abando	2019-03-29 19:55:20.8533	2019-03-29 20:15:06.155845	e4706f4e-7a7b-484e-8b3a-1665cc77c178.png	http://abando.com.br/
410	Alamo City Furry Invasion	7c5d57ed-2b0b-404e-b5f1-604c75e22f7a	alamo-city-furry-invasion	2019-03-29 19:55:20.89601	2019-03-29 20:15:09.221595	cfabf468-ee8a-4c70-8bbf-655ade0c1f7b.png	https://furryinvasion.org/
413	Anthro Crossroads East	eb0d63b2-b06f-4285-869f-347b042abe8c	anthro-crossroads-east	2019-03-29 19:55:20.934565	2019-03-29 20:15:17.485867	efcc6d04-6f85-46f3-90cc-eadf7a6dd507.png	https://www.anthrocrossroads.com/
419	Anthrofest	f2285e41-bd04-48d4-bf79-c5c6dfe6aef2	anthrofest	2019-03-29 19:55:21.00436	2019-03-29 20:15:36.24003	325a057b-151b-4bf0-9aa8-0bdbc8bbc382.png	\N
422	Arizona Fur Con	42bbcb2f-4fd2-497c-ba9d-9a5b9d83c751	arizona-fur-con	2019-03-29 19:55:21.038556	2019-03-29 20:15:44.879782	845748b9-3aa9-4f9b-b41c-d39ae1337a95.png	http://www.arizonafurcon.com/
426	Big Sky Paw Camp	551aea9f-3492-4355-ba87-601d802405bd	big-sky-paw-camp	2019-03-29 19:55:21.103477	2019-03-29 20:15:56.25272	5bdb2baa-a9ec-425d-bf5e-2ed05e0a7b8d.png	https://www.camppaw.org
430	Camp Feral!	0f9351fe-71ee-46e1-a808-c510349e4357	camp-feral	2019-03-29 19:55:21.158774	2019-03-29 20:16:07.95502	af2ca887-dead-4728-9543-26d4d7577fe8.png	http://www.campferal.org/
433	Campfire Tails	1202a062-3271-4db2-bd55-3c79be00dc32	campfire-tails	2019-03-29 19:55:21.201945	2019-03-29 20:16:16.532817	5ab0c5a0-6a93-4bd9-a0d2-7415f2929c26.png	http://campfiretails.org/
437	Canton Furry Only (China National Furry Party)	5cf4c81e-9abb-401a-9a41-062f5414c582	canton-furry-only-china-national-furry-party	2019-03-29 19:55:21.256758	2019-03-29 20:16:27.686469	2dc512ba-9927-4444-93e9-cdfb59f5339d.png	\N
442	Condition	acce60a6-cf59-463e-9d4d-eb2275bd76d7	condition	2019-03-29 19:55:21.324149	2019-03-29 20:16:41.434587	5764bbe3-f986-4dbf-bc65-f015cc52b332.png	https://twitter.com/conditionfurry/
446	Confuror	08b8e182-d213-4205-ac95-ac7cbd7d0964	confuror	2019-03-29 19:55:21.381061	2019-03-29 20:16:52.470535	b6a96731-bb7f-4601-9866-6fce0172a5e9.png	http://confuror.org/
449	Conifur Northwest	9d64c7fb-e089-41d3-bf51-1922a0d31536	conifur-northwest	2019-03-29 19:55:21.414198	2019-03-29 20:17:00.922774	93a2b520-bb08-42d4-aab2-f12df34f0009.png	http://www.conifur.org/
454	Duckon	2fffa692-b955-4b3a-ba76-a8017f40395b	duckon	2019-03-29 19:55:21.463765	2019-03-29 20:17:15.684032	acb828c7-2f75-4f79-af7d-60be5bd9086a.png	http://www.duckon.org/
457	Elliott's Spring Gatherings	c4f2cf0a-d06b-4ffa-847d-af93bd42ff6a	elliott-s-spring-gatherings	2019-03-29 19:55:21.495636	2019-03-29 20:17:23.491508	8ae834aa-8890-4bbd-9a41-c6c4affb3c47.png	https://twitter.com/ElliottsEvents/
461	Emerald Fur Con (Summit)	a07e685f-a240-4241-98f3-988f028e87a9	emerald-fur-con-summit	2019-03-29 19:55:21.534305	2019-03-29 20:17:34.732793	5d1393a3-4f0c-4ebb-bd0b-9c18083b0824.png	https://www.emeraldsfursummit.org/
466	Festival of the Feral (Oklacon)	f8dbc7ad-d9c8-4510-ab0f-c926ec71edc6	festival-of-the-feral-oklacon	2019-03-29 19:55:21.582657	2019-03-29 20:17:48.702118	c14a4bd7-58c9-42e9-9d73-ade0d31ede30.png	http://oklacon.com/
470	Fur Reality	6bd416ab-148c-4197-9093-a0bd39353804	fur-reality	2019-03-29 19:55:21.622579	2019-03-29 20:18:00.040125	d88cedab-9870-4924-b39d-67c659be928c.png	http://www.furreality.org/
472	Fur the 'More	59b53493-fa35-49ca-91c7-0c8424ffefbb	fur-the-more	2019-03-29 19:55:21.646292	2019-03-29 20:18:05.867797	ebd67458-a8c0-4ff4-bc16-cd9028343c74.png	https://www.furthemore.org/
476	Furboliche	cc29a7eb-bee7-4fa9-a3b2-2542d600c489	furboliche	2019-03-29 19:55:21.690084	2019-03-29 20:18:17.376114	e7a30ca0-a46a-45c8-9abd-e1dbd08f0e32.png	http://www.furboliche.com.br/
480	FurcoNZ	8c151c38-cffc-4e32-b0a0-5f690bd8ecb1	furconz	2019-03-29 19:55:21.730419	2019-03-29 20:18:28.692972	1a8283fa-d00d-401f-9ce5-9f85b32b440b.png	https://www.furconz.org.nz/
483	FurFright	82c0e930-20b7-46e0-b7ae-bfcd72615361	furfright	2019-03-29 19:55:21.761558	2019-03-29 20:18:37.20604	ee5dc886-bc34-4d41-a90f-e39342daeae2.png	http://www.furfright.org/
487	Furloween	cf39ec19-baee-426b-ab2c-7ed629b26ef0	furloween	2019-03-29 19:55:21.811998	2019-03-29 20:18:48.509269	1651c2a4-8232-49e7-8d9c-0434bc65b5d6.png	http://www.furhold.org/furloween/
492	FurryCon (Sweden)	4a855adc-22c2-4743-aa61-a0cbb1d8199b	furrycon-sweden	2019-03-29 19:55:21.873453	2019-03-29 20:19:02.42777	d6c7961a-32c5-4196-8769-99fc1a02595e.png	http://www.furrycon.se/
495	Furry Connection North	fb2a890a-0e96-4cdc-8df7-93377c817392	furry-connection-north	2019-03-29 19:55:21.904242	2019-03-29 20:19:10.82433	81d0938f-c54b-45f4-bac4-a689981d42fe.png	https://twitter.com/furryconnect
500	Furry Ski Weekend	07cd1dd6-ef3f-41b1-b999-b896c8c5bd5e	furry-ski-weekend	2019-03-29 19:55:21.958901	2019-03-29 20:19:25.604533	5cb28691-a3e0-4027-a5ce-0af4e2444080.png	https://furryskiweekend.com/
503	Furry Summer Gathering (FEC)	f34555de-e768-4cab-a3e0-8dbf067ef88a	furry-summer-gathering-fec	2019-03-29 19:55:21.992705	2019-03-29 20:19:33.854554	49f9a835-9bf3-41e7-b1a1-6dcfb80ff34e.png	https://www.shouxiaji.cn/index.html
509	Furs on Fire (The Furry Countdown)	5a85bfab-ed93-474a-ba2c-041f985154bb	furs-on-fire-the-furry-countdown	2019-03-29 19:55:22.069508	2019-03-29 20:19:50.740714	1bc63139-f332-46b0-9ab5-90083bf2cdb5.png	http://www.fursonfire.eu/
515	Furstivus	5fb75a08-d3dc-4c76-a090-7e6400880e66	furstivus	2019-03-29 19:55:22.131619	2019-03-29 20:20:07.590965	efd54128-735a-456c-ad43-36676d50d27a.png	http://www.furstivus.com/
518	Furtastic	a65b89ad-31ef-4460-b78e-c7bbc06578df	furtastic	2019-03-29 19:55:22.173538	2019-03-29 20:20:16.862274	7af95797-e6a1-40c7-b3e8-6ea4e0092d34.png	http://www.furtastic.dk/
522	Furvester	ff6bd515-d593-4266-8044-4609e06c6509	furvester	2019-03-29 19:55:22.22121	2019-03-29 20:20:28.999399	11cf2828-b1c9-47e0-aa86-e3ad8423f5aa.png	https://furvester.org/
526	Galactic Camp	a347d087-7287-4a6f-ae0f-d4a939cbd998	galactic-camp	2019-03-29 19:55:22.26166	2019-03-29 20:20:47.423169	2f2c5b04-5d55-447f-8da4-4243bf89b2c0.png	http://galacticcamp.com/
530	Great Lakes Fur Con	d0d24ed0-93ae-481d-bee7-89ae8d13bb90	great-lakes-fur-con	2019-03-29 19:55:22.308102	2019-03-29 20:20:58.810942	8af6c9d1-a0ec-49fa-805e-f15647febded.png	https://twitter.com/greatlakesfc
531	H-Con	4e7d876b-a19c-4d43-abd7-5b79646f649b	h-con	2019-03-29 19:55:22.318109	2019-03-29 20:21:01.628282	dcf4357b-d8d9-4160-a30b-df2d0d2f1ea3.png	https://h-con.org/startseite
532	HerbstCon	a2390f55-6ac5-4de7-9592-f51d74da8cbc	herbstcon	2019-03-29 19:55:22.329261	2019-03-29 20:21:04.37107	01b0a0ec-dbff-4e6d-a6e0-23a7336b6911.png	\N
535	IndyFurCon	107bb9fb-cf65-40c1-a7c3-e13d6c801a2c	indyfurcon	2019-03-29 19:55:22.360029	2019-03-29 20:21:12.834008	3fdb5e3e-f492-4753-a7ca-c92c0878c898.png	https://indyfurcon.com/
538	Itty Bitty Fur Con	9b7a5988-fe86-4641-b924-599bb0c3732e	itty-bitty-fur-con	2019-03-29 19:55:22.401793	2019-03-29 20:21:22.164928	c57bae26-93a7-4935-884f-07c3e3fac4b4.png	http://www.ittybittyfurcon.com/
541	Just Fur The Weekend	31a2486a-eefc-445f-9f15-aaf716b95b2b	just-fur-the-weekend	2019-03-29 19:55:22.440932	2019-03-29 20:21:30.477147	f33cb863-6dfe-45b6-9a4d-9ab2d0850fb5.png	https://justfurtheweekend.org.uk/
546	Lakeside Furs (LSF)	1394c8d3-9dfb-4999-b9e0-79219f01d68c	lakeside-furs-lsf	2019-03-29 19:55:22.496617	2019-03-29 20:21:45.036523	3207cbcc-0513-4466-a554-54d5f3017fa4.png	http://www.lakesidefurs.at/
549	Melbourne Fur Con	69863a0c-1326-4c74-a98c-4333c843ed65	melbourne-fur-con	2019-03-29 19:55:22.531645	2019-03-29 20:21:54.3258	124f7248-1d07-4b5c-a33e-6436c1213795.png	https://www.eventbrite.com.au/e/melbourne-furry-convention-2020-tickets-57296055043
555	Morphicon	073a8a67-e43e-4d07-b0f4-4b039ee73aa4	morphicon	2019-03-29 19:55:22.596835	2019-03-29 20:22:11.683577	f30653d1-09ae-413d-932d-a781eb893fcb.png	http://anthrohio.org/
558	NebelPfoten DustPaws (NEP)	a8157c77-a991-4a7f-8ae8-1cc23e734470	nebelpfoten-dustpaws-nep	2019-03-29 19:55:22.628773	2019-03-29 20:22:20.692372	61609145-384a-4148-80e0-ab5f8177338b.png	http://www.nep-dustpaws.de/
562	Pacific Anthropomorphics Weekend	fffde663-722f-4818-9a40-f1843b02d565	pacific-anthropomorphics-weekend	2019-03-29 19:55:22.675289	2019-03-29 20:22:34.65216	26f398d0-0b02-4d8d-b921-6ca12bb177a3.png	https://pacanthro.org/
564	Philippine Anthro Festival	6474e0ce-c864-4d6a-8da2-42a3841c67f2	philippine-anthro-festival	2019-03-29 19:55:22.696975	2019-03-29 20:22:40.504037	f3b7c7cb-d409-4c8f-98ff-28f9c13c240f.png	http://www.phanthrofest.com/
591	Zillercon	a01d639e-4822-4440-8671-6e437011d3ec	zillercon	2019-03-29 19:55:23.025625	2019-03-29 20:24:00.700871	7d2861be-e3b8-4a4b-80d6-702f0a990c1c.png	http://en.wikifur.com/wiki/Template:Convention_resources/Zillercon#Zillercon
592	Zodiacon	f1c8b3d9-4f13-43a5-b2ed-78f76bbca917	zodiacon	2019-03-29 19:55:23.037342	2019-03-29 20:24:03.448083	f72af35b-0d14-4213-b928-d64e91b99cc0.png	https://www.zodiacon.org/en
565	Pine Fur Con	434d721d-8436-470f-8bd4-a2b01cfc8ae4	pine-fur-con	2019-03-29 19:55:22.707227	2019-03-29 20:22:43.483754	3583789c-0c9a-4210-8e2b-5981390f5d43.png	https://pinefurcon.org/
573	South Afrifur	0275a19c-f71c-4365-a505-27b3f814296d	south-afrifur	2019-03-29 19:55:22.789201	2019-03-29 20:23:09.698331	b7fc7121-3a6a-49f6-9e25-e55f815b9426.png	https://www.south-afrifur.co.za/index.php
574	Super Furry Fusion (FEC)	5f9f7384-ee7f-4bbc-9691-bdd28e9809e4	super-furry-fusion-fec	2019-03-29 19:55:22.799883	2019-03-29 20:23:12.334306	af7f2f23-2942-45aa-b07c-1984a5c8da66.png	http://weibo.com/u/5383289490
580	The Menagerie	6374bd49-a625-4865-a01f-c0889f5f8f51	the-menagerie	2019-03-29 19:55:22.868691	2019-03-29 20:23:29.398953	c53a8ed9-331b-4a4b-953c-61835a38df70.png	https://www.kyanthros.org/menagerie
588	Wild Prairie Fur Con	9a09fd73-3a7a-45fd-80a8-451743533a88	wild-prairie-fur-con	2019-03-29 19:55:22.979844	2019-03-29 20:23:52.724884	0c70d087-85fa-4a7f-af8c-09cbec61f9a2.png	https://wpfcon.ca/
590	Zampacon	0509c04c-3484-4a19-9eeb-260a5ab3ca92	zampacon	2019-03-29 19:55:23.013556	2019-03-29 20:23:57.863988	15095ee9-a957-4ba4-8631-4755fc2ff97d.png	https://web.archive.org/web/20160427200051/http://zampacon.org/
\.


--
-- Data for Name: faves; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.faves (id, uuid, medium_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.follows (id, followable_type, follower_type, blocked, created_at, updated_at, followable_id, follower_id, uuid) FROM stdin;
3	User	User	f	2019-03-28 06:37:08.725727	2019-03-28 06:37:08.725727	3e69717e-9803-4fc1-9909-419092780574	abaf25c5-9e24-484e-90ce-e4159fd4bb03	3ac942e7-2eff-451c-80ac-c405b6f4329b
39	User	User	f	2019-05-08 20:24:03.39573	2019-05-08 20:24:03.39573	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	3a971a0a-1e5d-40f1-b86f-a2a809ef3d7c
\.


--
-- Data for Name: friendly_id_slugs; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.friendly_id_slugs (id, slug, sluggable_id, sluggable_type, scope, created_at) FROM stdin;
\.


--
-- Data for Name: fursuit_builds; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_builds (id, uuid, name, created_at, updated_at) FROM stdin;
1	54711ee7-d7fe-495f-941a-d96047bbc4f9	Fullsuit	2019-01-22 01:00:02.675857	2019-01-22 01:00:02.675857
2	56e707a9-d6d0-4837-9135-e15450247a15	Partial	2019-01-22 01:00:02.685798	2019-01-22 01:00:02.685798
\.


--
-- Data for Name: fursuit_fingers; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_fingers (id, uuid, name, created_at, updated_at) FROM stdin;
1	b1688f5f-4c9a-46a2-9e1c-7ae9765af363	Five	2019-01-22 01:00:18.441485	2019-01-22 01:00:18.441485
2	4de1edca-70f7-4c33-836d-903b461797fb	Four	2019-01-22 01:00:18.451968	2019-01-22 01:00:18.451968
3	34426685-ad36-44fa-8fe6-9430176804d8	Other	2019-01-22 01:00:18.461884	2019-01-22 01:00:18.461884
4	c455a36f-8ad9-4f01-aac2-4b14cb539367	N/A	2019-01-22 01:00:18.46921	2019-01-22 01:00:18.46921
\.


--
-- Data for Name: fursuit_genders; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_genders (id, uuid, name, created_at, updated_at) FROM stdin;
1	939cdbb4-32f2-497c-9339-7579e0162c1d	Masculine	2019-04-05 22:25:10.322379	2019-04-05 22:25:10.322379
2	3e1fb374-a35f-4018-a76b-b074cf342388	Feminine	2019-04-05 22:25:14.850416	2019-04-05 22:25:14.850416
\.


--
-- Data for Name: fursuit_leg_types; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_leg_types (id, name, created_at, updated_at, uuid) FROM stdin;
1	Quad	2019-01-22 00:59:55.908995	2019-01-22 00:59:55.908995	a2dd4537-173a-4b17-ab0b-564a21a034c9
2	Digitigrade	2019-01-22 00:59:55.920034	2019-01-22 00:59:55.920034	08926833-7d28-4751-b514-d550c966aafc
3	Plantigrade	2019-01-22 00:59:55.929656	2019-01-22 00:59:55.929656	9e3e9819-e8a1-49d1-8eb1-2bff8d13c6ce
\.


--
-- Data for Name: fursuit_makers; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_makers (id, fursuit_id, maker_id, uuid, created_at, updated_at) FROM stdin;
437670	3318a956-2337-41ad-883e-3fef890edfed	d20c6e26-2096-4ec8-b0e9-f5cccee17fe8	2bfb2355-8840-4d8f-b99e-5c5610b531d3	2019-04-16 21:58:40.961299	2019-04-16 21:58:40.961299
437671	2c73f9c3-4e49-4be3-9468-89666b2adc39	9cad0582-cc5d-43ab-8b5e-902e7477dd8e	9702f701-80c4-4c00-bf10-a5f1e699fc32	2019-04-16 21:58:43.346138	2019-04-16 21:58:43.346138
437672	af3a17ab-35b1-4304-8a54-8a40121c74fc	ff4d46c7-c1fc-40c7-b9b6-fa44add0fcff	3b6ed259-2cc9-4080-a633-3d3f54559e5e	2019-04-16 21:58:45.964519	2019-04-16 21:58:45.964519
437673	0f613fb7-c148-4577-8a40-08ee9eaa7501	d20c6e26-2096-4ec8-b0e9-f5cccee17fe8	7cd710a4-f1b1-4fa4-aad3-cbe09b3d93dd	2019-04-22 20:31:55.410059	2019-04-22 20:31:55.410059
437674	d7866a9c-3686-4d61-9d0e-e8329fe9c41d	82b41f5f-11bf-4645-9cb9-767fe2a32bd9	a7cf588c-9e1a-41a5-887c-4adaf10b01d3	2019-04-24 23:01:47.740761	2019-04-24 23:01:47.740761
437675	e5eca59d-b934-4772-8fab-74a338529982	ef79fcd4-9d63-45c0-9f77-cc8961f17346	bfd7c834-3899-443c-8faf-960b1edd2b52	2019-04-27 19:29:26.913932	2019-04-27 19:29:26.913932
\.


--
-- Data for Name: fursuit_media; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_media (id, created_at, updated_at, uuid, fursuit_id, medium_id, user_id) FROM stdin;
\.


--
-- Data for Name: fursuit_paddings; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_paddings (id, uuid, name, created_at, updated_at) FROM stdin;
1	2779a538-6558-4b52-860f-cbdc69e67101	None	2019-01-22 01:00:07.671513	2019-01-22 01:00:07.671513
2	b0f747e6-6b99-420b-9849-83518b4e9a9e	Muscle	2019-01-22 01:00:07.682773	2019-01-22 01:00:07.682773
3	314d06c1-9a28-49f0-8dc9-849e6adc79aa	Plush	2019-01-22 01:00:07.692219	2019-01-22 01:00:07.692219
\.


--
-- Data for Name: fursuit_species; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_species (id, created_at, updated_at, uuid, fursuit_id, specy_id) FROM stdin;
416	2019-04-17 21:35:20.106313	2019-04-17 21:35:20.106313	a8beb556-1559-4eb9-a2ab-daca357db6fb	2c73f9c3-4e49-4be3-9468-89666b2adc39	89f1fe6f-2bb6-41f5-9610-fd49eee136fe
417	2019-04-17 21:35:20.110401	2019-04-17 21:35:20.110401	992c8ec4-bb16-4726-ba01-ebe3b2f6dedf	2c73f9c3-4e49-4be3-9468-89666b2adc39	18054351-91bf-4eca-98ac-8a7bad820eba
418	2019-04-17 21:36:43.023225	2019-04-17 21:36:43.023225	d2461b2e-8b25-4a73-bd83-ab78a48386b9	af3a17ab-35b1-4304-8a54-8a40121c74fc	89f1fe6f-2bb6-41f5-9610-fd49eee136fe
419	2019-04-17 21:36:43.027874	2019-04-17 21:36:43.027874	fa27101b-c594-4ad5-95ed-4cde8f16f2e1	af3a17ab-35b1-4304-8a54-8a40121c74fc	4d9b399c-bc90-4c12-a1a5-d9faef090e91
422	2019-04-17 21:54:52.338752	2019-04-17 21:54:52.338752	bed9be4a-cf63-4e64-994f-c090f08aec15	3318a956-2337-41ad-883e-3fef890edfed	4606a508-6df0-4c96-b4af-7114fe204240
423	2019-05-10 10:07:07.258143	2019-05-10 10:07:07.258143	16f60a39-b172-4eeb-a363-48039ea0fc05	701f9dfa-03e8-4017-a6e5-21c3704ac879	89f1fe6f-2bb6-41f5-9610-fd49eee136fe
404	2019-04-16 21:58:40.97975	2019-04-16 21:58:40.97975	c1a1506f-6e6e-4f77-8fe2-1ed15b1f6f28	2c73f9c3-4e49-4be3-9468-89666b2adc39	c0d9ed74-a25d-4ec8-bad5-e8d9d6f3beb2
406	2019-04-16 21:58:45.981523	2019-04-16 21:58:45.981523	9435816c-0e50-4b85-a9ed-70a0a38a76d1	d7866a9c-3686-4d61-9d0e-e8329fe9c41d	19ad5048-33d7-4833-8d83-94a78a70bb3f
\.


--
-- Data for Name: fursuit_styles; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_styles (id, name, created_at, updated_at, uuid) FROM stdin;
1	Toony	2019-01-22 00:59:44.653791	2019-01-22 00:59:44.653791	ab91379d-1597-4dcb-ab8e-4c6aaa42d042
2	Realistic	2019-01-22 00:59:44.683703	2019-01-22 00:59:44.683703	f7fa998e-6000-40be-9bbd-732366907891
3	Realistic Toony	2019-01-22 00:59:44.69461	2019-01-22 00:59:44.69461	d65f98c9-24b9-4faa-abe2-2ccaadc6d4da
\.


--
-- Data for Name: fursuit_subscriptions; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_subscriptions (id, uuid, fursuit_id, user_id, created_at, updated_at) FROM stdin;
14	d891745d-1905-45d9-aafe-d41d63f48a95	3318a956-2337-41ad-883e-3fef890edfed	3e69717e-9803-4fc1-9909-419092780574	2019-04-21 04:02:46.328273	2019-04-21 04:02:46.328273
15	0e984dbd-7e52-4caa-90d9-14ec2759b788	3318a956-2337-41ad-883e-3fef890edfed	bd88fca0-9b2d-4252-9357-298429a6d5a3	2019-04-24 21:37:37.204727	2019-04-24 21:37:37.204727
\.


--
-- Data for Name: fursuit_users; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuit_users (id, uuid, user_id, fursuit_id, created_at, updated_at) FROM stdin;
29	f2d3b02c-d95b-4309-b0c8-d0940da32330	3e69717e-9803-4fc1-9909-419092780574	2c73f9c3-4e49-4be3-9468-89666b2adc39	2019-04-17 21:35:08.479035	2019-04-17 21:35:08.479035
30	6b889105-2e64-40b9-a5a8-f918018d717e	3e69717e-9803-4fc1-9909-419092780574	af3a17ab-35b1-4304-8a54-8a40121c74fc	2019-04-17 21:35:57.662882	2019-04-17 21:35:57.662882
31	27b864ad-bec9-46fb-9acb-beece5e40dfd	3e69717e-9803-4fc1-9909-419092780574	3318a956-2337-41ad-883e-3fef890edfed	2019-04-24 21:13:05.787343	2019-04-24 21:13:05.787343
32	f5684ba6-7996-4477-8c00-1051dce8e132	3e69717e-9803-4fc1-9909-419092780574	d7866a9c-3686-4d61-9d0e-e8329fe9c41d	2019-04-24 22:58:27.325992	2019-04-24 22:58:27.325992
33	3c71b160-ad0e-4edc-8346-900e863f947b	02b49ce7-22fd-429f-b1b1-55cfad638f59	701f9dfa-03e8-4017-a6e5-21c3704ac879	2019-05-01 00:34:21.254702	2019-05-01 00:34:21.254702
\.


--
-- Data for Name: fursuits; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.fursuits (id, created_at, updated_at, name, slug, uuid, creation_year, fursuit_leg_type_id, fursuit_style_id, avatar, fursuit_padding_id, fursuit_build_id, fursuit_finger_id, base_color, eyes_color, is_hybrid, fursuit_gender_id) FROM stdin;
442317	2019-04-16 21:58:40.97819	2019-04-17 21:35:20.129307	Brownee Bear	brownee-bear	2c73f9c3-4e49-4be3-9468-89666b2adc39	1995	9e3e9819-e8a1-49d1-8eb1-2bff8d13c6ce	ab91379d-1597-4dcb-ab8e-4c6aaa42d042	d3f59293-6721-45c6-9382-3376a712dd49.png	2779a538-6558-4b52-860f-cbdc69e67101	54711ee7-d7fe-495f-941a-d96047bbc4f9	4de1edca-70f7-4c33-836d-903b461797fb	Black	Black	t	\N
442318	2019-04-16 21:58:43.369847	2019-04-17 21:36:43.045293	Roxikat	roxikat	af3a17ab-35b1-4304-8a54-8a40121c74fc	1995	9e3e9819-e8a1-49d1-8eb1-2bff8d13c6ce	ab91379d-1597-4dcb-ab8e-4c6aaa42d042	588fb48a-c5f0-47b2-9bfd-5e0d3993624b.png	2779a538-6558-4b52-860f-cbdc69e67101	54711ee7-d7fe-495f-941a-d96047bbc4f9	4de1edca-70f7-4c33-836d-903b461797fb	Pink	Blue	t	\N
442320	2019-04-22 20:31:55.387104	2019-04-22 20:31:55.387104	Corey	corey	0f613fb7-c148-4577-8a40-08ee9eaa7501	\N	\N	\N	73dfadff-cf6c-49f8-9459-8e38bbb61e59.png	\N	\N	\N			f	\N
442319	2019-04-16 21:58:45.979255	2019-04-26 18:59:13.84692	Paddry The Penguin	paddy-the-penguin	d7866a9c-3686-4d61-9d0e-e8329fe9c41d	1995	9e3e9819-e8a1-49d1-8eb1-2bff8d13c6ce	ab91379d-1597-4dcb-ab8e-4c6aaa42d042	7a4b2578-3559-46c8-b78e-908bcf8afae3.png	2779a538-6558-4b52-860f-cbdc69e67101	54711ee7-d7fe-495f-941a-d96047bbc4f9	4de1edca-70f7-4c33-836d-903b461797fb	Black	Black	f	\N
442321	2019-04-27 19:29:26.881365	2019-04-27 19:29:26.881365	Stormy	stormy	e5eca59d-b934-4772-8fab-74a338529982	2014	\N	\N	48d0a0fc-84d0-4d0a-9506-893e21e0858a.png	\N	\N	\N			f	\N
442322	2019-05-01 00:27:41.616198	2019-05-01 00:27:41.616198	asd	asd	701f9dfa-03e8-4017-a6e5-21c3704ac879	\N	\N	\N	202accf1-e0ec-44e3-be59-098f84ba817b.png	\N	\N	\N			f	\N
442316	2019-04-16 21:58:38.07028	2019-05-10 22:39:00.982073	Hyro	hyro	3318a956-2337-41ad-883e-3fef890edfed	2014	9e3e9819-e8a1-49d1-8eb1-2bff8d13c6ce	ab91379d-1597-4dcb-ab8e-4c6aaa42d042	8432edb5-622f-4ef3-990d-e87fc299d7c9.png	b0f747e6-6b99-420b-9849-83518b4e9a9e	56e707a9-d6d0-4837-9135-e15450247a15	b1688f5f-4c9a-46a2-9e1c-7ae9765af363	Grey	Green	f	939cdbb4-32f2-497c-9339-7579e0162c1d
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.likes (id, uuid, user_id, medium_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.lists (id, uuid, user_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: lists_users; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.lists_users (id, uuid, user_id, list_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: maker_claims; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.maker_claims (id, uuid, maker_id, user_id, status, conflictual, created_at, updated_at) FROM stdin;
5	0bbfac78-1ec8-4882-94a9-82d22deed0ed	82b41f5f-11bf-4645-9cb9-767fe2a32bd9	3e69717e-9803-4fc1-9909-419092780574	rejected	f	2019-04-24 00:28:42.163937	2019-04-24 00:28:45.034352
6	acaf99c1-70f2-4860-9e4f-629033fad26e	d20c6e26-2096-4ec8-b0e9-f5cccee17fe8	3e69717e-9803-4fc1-9909-419092780574	accepted	f	2019-04-27 17:32:02.654782	2019-04-27 17:32:08.241599
\.


--
-- Data for Name: maker_subscriptions; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.maker_subscriptions (id, uuid, maker_id, user_id, created_at, updated_at) FROM stdin;
8	be86645a-61f0-4a09-991e-4c6ea2fc19cb	d20c6e26-2096-4ec8-b0e9-f5cccee17fe8	3e69717e-9803-4fc1-9909-419092780574	2019-04-22 06:06:09.667337	2019-04-22 06:06:09.667337
9	5829c19f-de01-47e1-9be3-158b28c18b2a	82b41f5f-11bf-4645-9cb9-767fe2a32bd9	3e69717e-9803-4fc1-9909-419092780574	2019-04-27 19:43:33.026332	2019-04-27 19:43:33.026332
10	2aaffd6c-f8ce-45ae-ab1a-86668e093615	94e807f2-8dc3-49ef-bfd7-fa023a741fa6	ffa902c2-63b1-40a9-8fbf-348a65ec7960	2019-05-07 05:13:10.380191	2019-05-07 05:13:10.380191
\.


--
-- Data for Name: makers; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.makers (id, name, web, country, slug, uuid, avatar, created_at, updated_at, reference, region, user_id, commission_status, commission_status_id) FROM stdin;
3647	1Pup Suits	http://www.1pupsuits.com/	United States	1pup-suits	94e807f2-8dc3-49ef-bfd7-fa023a741fa6	3b23ff0f-5326-4c88-b4bd-32babe60a1e3.png	2019-03-29 09:12:03.468162	2019-05-07 05:22:17.340307	2	Virginia	3e69717e-9803-4fc1-9909-419092780574	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3648	2 Stupid Furs	https://2stupidfurs.weebly.com/	United States	2-stupid-furs	82b41f5f-11bf-4645-9cb9-767fe2a32bd9	62659c0d-341d-4cb0-b80c-d4aa998fdc9b.png	2019-03-29 09:12:06.318132	2019-05-07 05:20:44.163748	3	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3649	28 Paws Later (Madcrafts)	https://www.facebook.com/28pawslater/	United Kingdom	28-paws-later-madcrafts	f9f676b9-909f-4f62-bf22-0dce277a7c46	7410cee9-88ef-4ed3-8c45-ae5275cf61b7.png	2019-03-29 09:12:09.02728	2019-05-07 05:20:44.174822	4	Pembrokeshire	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3650	79th Element	http://www.furaffinity.net/user/79thElement	United States	79th-element	774d835b-81dd-4b34-868e-325699fb8a06	10b02f8a-0707-484b-a8ca-cb9af42bdadc.png	2019-03-29 09:12:11.792953	2019-05-07 05:20:44.185201	5	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3652	8AM	http://www.furaffinity.net/user/8AM	United States	8am	04c1df73-ec43-478c-af2a-84e10af5d4a8	10587cc9-3970-4bb0-91a9-c11b55f0d54b.png	2019-03-29 09:12:17.270531	2019-05-07 05:20:44.195429	7	Missouri	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3653	8Bit-Works	https://8bit-works.weebly.com/	Australia	8bit-works	0d0b8cd9-4108-4bc1-972e-55b964016987	645c4941-e895-4288-b44a-71911df9a8b9.png	2019-03-29 09:12:19.921969	2019-05-07 05:20:44.206652	8	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3654	A Ginger's Suits	http://www.furaffinity.net/user/aGingerSuits	United States	a-ginger-s-suits	71ec1c57-7aa5-426d-99be-dd20bc61d2e5	aae21610-2fd9-4fe1-9456-ccbb9c0ec6be.png	2019-03-29 09:12:22.465643	2019-05-07 05:20:44.217101	9	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3655	Admirals Costumes	https://admiralscostumes.webs.com/	United States	admirals-costumes	b2bd9718-efa3-441a-9dd5-b1afe3cf8aff	4d1a6e3e-4671-413a-b81f-62c03a07506c.png	2019-03-29 09:12:25.006713	2019-05-07 05:20:44.226781	10	Alabama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3656	Adorable Foxie	http://www.adorablefoxie.com/	United States	adorable-foxie	b3b9a74d-9ffe-4a4d-ab01-33dc3e77794e	b6805350-249d-4ae4-be33-d88fbe85375b.png	2019-03-29 09:12:28.574297	2019-05-07 05:20:44.237388	11	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3657	Aheun Fursuit	https://aheunzzip.wixsite.com/fursuit	Korea	aheun-fursuit	9c76b544-3f71-40c5-847d-5d71042accf0	4e69be88-ce5f-4b6a-9155-49fe099ca8fa.png	2019-03-29 09:12:31.151514	2019-05-07 05:20:44.246879	12	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3658	Ajax Suitengu	http://www.furaffinity.net/user/ajaxsuitengu/	United States	ajax-suitengu	60b700f8-aef8-4b06-9132-9fe8d9855049	dd813cfd-51a2-47f5-8955-7bd507e6adc2.png	2019-03-29 09:12:33.796196	2019-05-07 05:20:44.257168	13	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3659	Akorn Studios	http://www.akornstudios.net/	United States	akorn-studios	ced14d91-3dc9-4eb2-a16f-6cab5424baa7	c04125ca-07a3-4020-b989-18ff0b635924.png	2019-03-29 09:12:36.404393	2019-05-07 05:20:44.266863	14	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3660	Al Bird	https://www.alfur.org/	Montenegro	al-bird	574aa148-7ebf-4e2c-95cb-30b261c54616	2ba4ce48-d6b6-4b47-8b35-4cd7a9a34f20.png	2019-03-29 09:12:38.971763	2019-05-07 05:20:44.277	15	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3661	Albrecht	https://albrecht-fur.livejournal.com/profile	United Kingdom	albrecht	2c5d8912-8384-4404-a804-a734402952e6	eff02875-f992-4fda-a2c8-361eb4e16b7c.png	2019-03-29 09:12:41.454936	2019-05-07 05:20:44.287349	16	Brighton	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3663	Alinchen Fursuits	https://www.deviantart.com/alinchen-tenny	Germany	alinchen-fursuits	ddc2cb4b-5e57-46d4-b695-a724cce3e97d	756ceb4b-0f74-41c6-be30-3a5173c792ce.png	2019-03-29 09:12:46.71286	2019-05-07 05:20:44.297005	18	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3664	Alinco Costumes	http://www.alincocostumes.com/	United States	alinco-costumes	3d5d84ef-a5eb-4080-85a3-b692ac343dda	2794e70b-8990-4ebc-935e-c5395d308da9.png	2019-03-29 09:12:49.027036	2019-05-07 05:20:44.307563	19	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3665	All Fur Fun	https://twitter.com/Splash_Wolf	United States	all-fur-fun	25e42c63-c3b4-430a-91ec-219983d6a4c1	8ae7e148-568b-4d0b-b09c-a1820e48cc7b.png	2019-03-29 09:12:51.879871	2019-05-07 05:20:44.31794	20	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3666	Alpha Dogs	https://alphadogs.dk/	France	alpha-dogs	787665ee-734e-4aae-886c-11e6a3f2eb4e	4fc9d282-43c7-4ba8-bba4-6359553f0b70.png	2019-03-29 09:12:54.457531	2019-05-07 05:20:44.327865	21	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3667	Alpha Suits	https://www.alphasuits.com/	United States	alpha-suits	25507bee-f932-4cde-a082-8621118b7686	fef68361-0999-4790-807b-fc7f6005e29c.png	2019-03-29 09:12:56.699092	2019-05-07 05:20:44.338425	22	Alabama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3668	Amber Groves	https://twitter.com/AmberGroves_	United States	amber-groves	ea8dbd10-d2ea-4dae-87ec-5304b76c2218	0dccb299-425b-4fba-a37a-9d0364b06597.png	2019-03-29 09:13:00.140563	2019-05-07 05:20:44.347818	23	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3669	Amoryllis Studios	http://www.amoryllisstudios.com/	Canada	amoryllis-studios	1f5be761-ae2d-4987-9e67-b491234fbfe9	935ddb0c-8ae3-4579-9ae1-7a639523ffaf.png	2019-03-29 09:13:02.695385	2019-05-07 05:20:44.357991	24	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3670	Andy Oagara	http://oagaracompany.blogspot.com/	Brazil	andy-oagara	184cc7a1-8af9-404b-aefe-f868f1356148	ccb952c2-11ad-4d18-9c9f-40d2b48d6b11.png	2019-03-29 09:13:05.106516	2019-05-07 05:20:44.367969	25	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3671	Angel Tigress	https://www.deviantart.com/angel--tigress	Russia	angel-tigress	9bab92cb-464c-4f11-b8a4-90a001012751	b5efb774-52d5-4459-b4c7-9532ddb85c03.png	2019-03-29 09:13:07.672271	2019-05-07 05:20:44.377795	26	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3672	AngelDragon5	http://www.furaffinity.net/user/AngelDragon5	United States	angeldragon5	8f1b7a45-784c-42bc-969c-ab87d689204c	bd5a0c73-e792-488b-bf03-f6a4b72509d1.png	2019-03-29 09:13:09.974925	2019-05-07 05:20:44.388828	27	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3673	Angry Red Fox	https://twitter.com/AngryRedFox	Canada	angry-red-fox	47b17aaa-5a9a-4f58-b955-d10ce6698e10	ac72436e-9cf6-43fe-8cf3-bd00f89c3e87.png	2019-03-29 09:13:12.462281	2019-05-07 05:20:44.399193	28	Quebec	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3674	AnnikaCat	http://sfw.furaffinity.net/user/annikacat/	United States	annikacat	cc84f7cc-8632-47ca-aa4e-87ed8917d41c	8c25c8c9-8998-441b-979f-b5fbb419ae84.png	2019-03-29 09:13:15.123946	2019-05-07 05:20:44.410863	29	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3675	Anthropaws	http://www.furaffinity.net/user/anthropaws/	United States	anthropaws	f8e546a1-0621-4dd6-aafa-883c5414a45e	fde6d529-1b02-4045-8a42-f23a14d4a252.png	2019-03-29 09:13:17.557364	2019-05-07 05:20:44.420289	30	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3676	Aoi Kitsune	https://www.furaffinity.net/user/aoi-kitsune/	France	aoi-kitsune	8c41b219-91bd-44e2-8fb5-e8c91f323a5c	2cfb3ee3-dda3-4b79-8c9d-3eb6e60e0e0f.png	2019-03-29 09:13:20.031155	2019-05-07 05:20:44.429775	31	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3678	Appalachian Fursuits	https://www.furaffinity.net/user/ruizaka/	United States	appalachian-fursuits	ca00bf73-d4f5-4087-8814-163758f3bbd0	39068667-0def-4bdd-a9cc-cf3ae3e32980.png	2019-03-29 09:13:24.504604	2019-05-07 05:20:44.440846	33	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3679	Apple Monster Studios	https://www.deviantart.com/kazulgfox	United States	apple-monster-studios	8fba9346-3359-47e8-a0a9-481c0e008acf	74955564-b24c-4444-bbae-e3b494e2bf30.png	2019-03-29 09:13:27.01272	2019-05-07 05:20:44.450126	34	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3680	Aqua Frost	http://www.furaffinity.net/user/aqua-frost/	Germany	aqua-frost	b6bf7095-62bc-4683-bc6f-e47f4b08eea6	aafea7eb-5efd-4f87-a29b-fa68a9681688.png	2019-03-29 09:13:29.545669	2019-05-07 05:20:44.459963	35	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3681	Arend Studios	http://www.arendstudios.com/home/home.php	United States	arend-studios	2564cddf-e9c2-4615-85c0-cafd5826c8bd	31c00814-8791-4879-9dbc-42f9f964f971.png	2019-03-29 09:13:32.043493	2019-05-07 05:20:44.470289	36	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3682	ARocco Suits	https://www.etsy.com/shop/ARoccoSUITS	United States	arocco-suits	92e720bf-0233-4308-9b45-2f367c1c83eb	26f63b1c-468e-48a3-90c2-98e7b06058dc.png	2019-03-29 09:13:34.714174	2019-05-07 05:20:44.480174	37	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3683	Around the Fur Studios	https://aroundthefurstudio.webs.com/	United States	around-the-fur-studios	f1510b92-4626-40f2-998b-ab86ce8f2a1d	2013f2e2-6c0c-4f9a-81f9-3a003b08a227.png	2019-03-29 09:13:37.438702	2019-05-07 05:20:44.490521	38	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3684	Artemis Bobcat	http://www.furaffinity.net/user/artemisbobcat	United States	artemis-bobcat	5bbb4f67-853b-4b0b-84fc-da7ca8ada4ca	ac313c68-c9c9-4264-8aa6-f94edee52382.png	2019-03-29 09:13:40.154078	2019-05-07 05:20:44.501013	39	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3685	ArtKour	https://www.artkour.com/mascot/	United States	artkour	65ac50dc-3df7-4126-98ad-8afb43863cc2	8a85e499-4228-4ed8-9429-7220cde923cf.png	2019-03-29 09:13:42.754763	2019-05-07 05:20:44.514375	40	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3686	Artslave	http://artslave.me/	United States	artslave	05b1ac61-ddfc-4b09-b69d-272728fc6999	86b78a11-5f85-4d73-a126-946372768854.png	2019-03-29 09:13:45.30032	2019-05-07 05:20:44.524315	41	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3687	Arzhurenn	http://www.furaffinity.net/user/arzhurenn/	France	arzhurenn	5f9f97d5-fdae-4077-a7f8-01687d8c9333	717584e5-b66e-48a4-b4bd-9b4c2755e1a4.png	2019-03-29 09:13:47.878521	2019-05-07 05:20:44.533412	42	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3688	Astro Antlers	https://astroantlers.wixsite.com/astroantlers/	United States	astro-antlers	f6dee069-38f1-48d3-a031-97975aef4ad3	e4e2d8e7-b6c1-44e6-9921-8ba7a4403325.png	2019-03-29 09:13:50.110798	2019-05-07 05:20:44.542691	43	Nevada	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3690	AtmosFur	https://www.furaffinity.net/user/atmosfur/	Germany	atmosfur	e68ff14f-a7ae-4378-b161-a92a10f5fed0	3b54768b-3a08-4ce1-984b-69cf04bb11e6.png	2019-03-29 09:13:54.778655	2019-05-07 05:20:44.552179	45	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3691	Av0salt	https://aminoapps.com/c/furry-amino/page/user/avo-salt/d37B_6pxHzfEwKrV2WNmR7MeMl7x741mq4K	United States	av0salt	01b69300-d2cd-4f94-8dd2-e1f2d55b381f	ee57811a-678d-478c-b7bc-ca021d5fda80.png	2019-03-29 09:13:57.029046	2019-05-07 05:20:44.561954	46	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3692	Avsun Mascots	http://www.furaffinity.net/user/avsun/	United States	avsun-mascots	87938c20-26a5-4c01-94c4-aa58180deb57	4eab9446-3684-4894-9ad5-802675762d64.png	2019-03-29 09:13:59.487856	2019-05-07 05:20:44.571618	47	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3693	Awesome Pawsome Mascots Costumes & More (Fuchsia Possum)	https://www.deviantart.com/fuchsiapossum	United States	awesome-pawsome-mascots-costumes-more-fuchsia-possum	36947cc3-45e1-4278-866a-6d90b8fdbae0	952804e3-c87f-4449-8bd0-84f2b348828d.png	2019-03-29 09:14:01.963411	2019-05-07 05:20:44.580904	48	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3694	Azflip	http://www.furaffinity.net/user/azflip	United States	azflip	447b8071-9bde-4947-814e-853d93959859	12eab86a-d0ea-4243-be99-817c2815698e.png	2019-03-29 09:14:04.516662	2019-05-07 05:20:44.593998	49	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3695	Azure Coyote Studios	http://www.azurecoyote.com/	United States	azure-coyote-studios	d8fca2d0-0e46-4ecc-afa2-76ef40ad345c	a7c7ce23-8904-4dc4-b354-b1915e356948.png	2019-03-29 09:14:07.084114	2019-05-07 05:20:44.604412	50	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3696	B3 Mascots	http://b3mascots.com/	United States	b3-mascots	1ce01a08-27d3-4c86-905b-545615e08407	46f22e5a-8057-44a8-9d6c-e8c9e180818d.png	2019-03-29 09:14:09.59849	2019-05-07 05:20:44.614528	51	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3697	Bad Doge Suits	https://www.furaffinity.net/user/baddogesuits/	United States	bad-doge-suits	60f1108a-7955-4a59-b49c-5a5593588f61	bfed24eb-e19c-4306-a5d2-1d5966001941.png	2019-03-29 09:14:12.910364	2019-05-07 05:20:44.624604	52	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3698	Barking Bats Creations	https://twitter.com/BarkingBat	United States	barking-bats-creations	17da5dd9-80b8-46e0-b417-2270ead8fa3f	db5b3b53-2f20-4c90-baf7-5951de9430ea.png	2019-03-29 09:14:15.365726	2019-05-07 05:20:44.63791	53	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3699	Barking Mad! Suits	http://barkingmadsuits.com/	United States	barking-mad-suits	480d86c1-ab15-44f0-a119-5a726edfbf95	44724ae4-7fd7-4a99-a0de-9e49ad884267.png	2019-03-29 09:14:18.393722	2019-05-07 05:20:44.650933	54	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3700	Bat Cat Suits	https://batcatsuits.wixsite.com/batcatsuits	United States	bat-cat-suits	e33a8af9-3ede-40cd-879a-2bbf362c86c7	daf1b5bd-daef-47a9-a174-75a0ab9ba599.png	2019-03-29 09:14:20.932678	2019-05-07 05:20:44.660928	55	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3702	Beast Makers Fursuits	https://www.furaffinity.net/user/beastmakersfursuits/	United States	beast-makers-fursuits	aec8260c-6b25-450e-80e8-fa2f491d60e3	ad82ded6-af82-485b-93d2-2e68846c7862.png	2019-03-29 09:14:26.098883	2019-05-07 05:20:44.671716	57	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3703	Beastcub Creations	http://www.beastcub.com/	United States	beastcub-creations	02b6e8f5-ade3-41b7-8ffe-792607e35a91	8a3c0e12-d382-4c8f-bfdb-94ebfdddede2.png	2019-03-29 09:14:28.666535	2019-05-07 05:20:44.68113	58	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3704	Beauty of the Bass	https://www.beautyofthebass.com/	United Kingdom	beauty-of-the-bass	278a2c45-6e60-473f-ace6-81cd3e240cea	0eecbb06-5cfd-4882-829f-904a397ad7e0.png	2019-03-29 09:14:31.288077	2019-05-07 05:20:44.691025	59	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3705	Beetlecat Originals	http://www.beetlecatoriginals.com/	United States	beetlecat-originals	0e922c43-6219-4139-b885-77070048879e	fcc6b028-66a0-44da-92dc-3da8896f503e.png	2019-03-29 09:14:34.772227	2019-05-07 05:20:44.700975	60	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3706	Benzene6	https://www.furaffinity.net/user/benzene6/	United States	benzene6	4024fc77-ab51-4a14-93f2-812094cc1d2a	f8991ab3-fd34-4e78-b876-f05310ffe007.png	2019-03-29 09:14:37.32436	2019-05-07 05:20:44.710777	61	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3707	Beta Raptor	https://www.furaffinity.net/user/betaraptor	United States	beta-raptor	151a4045-16bd-4e03-b8b9-f7ce78114255	91bd81b5-b565-4760-a56d-ede813ac3f59.png	2019-03-29 09:14:40.172494	2019-05-07 05:20:44.721319	62	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3708	Big Jaw Costumes	http://www.furaffinity.net/user/bigjaw/	United States	big-jaw-costumes	9dbfc8c0-3d10-4a6f-9ae1-8c772653e2ba	23d99e90-d7b1-4034-b61c-a20c08774852.png	2019-03-29 09:14:42.689111	2019-05-07 05:20:44.731507	63	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3709	Bio Pelt Productions	http://www.furaffinity.net/user/BioPelt	United States	bio-pelt-productions	35239a9b-4fce-4952-9f75-73c51c985e1e	b6048e80-9c95-42d7-a238-20ba05e2654b.png	2019-03-29 09:14:45.266948	2019-05-07 05:20:44.742578	64	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3710	Biohazardous	https://www.furaffinity.net/user/biohazardous	United States	biohazardous	3c31c0ca-2787-4b62-8fa1-48d608fce0d9	c03e5812-ecd5-42a8-87f2-c769817fee3f.png	2019-03-29 09:14:47.867884	2019-05-07 05:20:44.751756	65	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3711	Bird King Creations	http://www.birdkingcreations.com/	United States	bird-king-creations	401d7a5b-f16e-4ccd-ac18-add5e2ccb2ce	24fa1348-f88c-445e-a341-15e0e697f616.png	2019-03-29 09:14:51.131928	2019-05-07 05:20:44.764858	66	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3712	Birty Creations	http://www.furaffinity.net/user/birtycreations/	Chile	birty-creations	a5e64f75-f97f-4b0d-b5ce-bf4d7fb3b002	1ac1cf1d-9681-4f1f-b4da-f9efdcfdeee3.png	2019-03-29 09:14:53.737942	2019-05-07 05:20:44.774273	67	Viña del Mar	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3713	Black Back Studio	http://www.twitter.com/emberisolte	United States	black-back-studio	379321af-8a97-4611-85e2-0965be9e065a	42594ef2-418b-4b21-88ac-c0019291e9d0.png	2019-03-29 09:14:56.096057	2019-05-07 05:20:44.78344	68	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3715	Blix Fox Fursuits	https://www.furaffinity.net/user/blixfox/	United States	blix-fox-fursuits	a6199c1e-3782-400b-9d2d-a05e8ac640ac	12be41ad-c1b8-4caf-b149-e4c4076e1e49.png	2019-03-29 09:15:01.254482	2019-05-07 05:20:44.792471	70	New Orleans	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3716	Blue Canary	https://www.furaffinity.net/user/bluecanary	United States	blue-canary	30fefb3e-c2a4-4d6f-b0df-4a12a0ddb893	811ae885-0708-4032-9198-be0259cffba2.png	2019-03-29 09:15:03.761322	2019-05-07 05:20:44.801963	71	Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3718	Blue Harbor Mascots	http://blueharbormascots.com/	United States	blue-harbor-mascots	09f77631-a3ee-47ec-a3c1-485e933e8e94	395fcf83-43ab-4fb9-bac8-0c8f5138c61d.png	2019-03-29 09:15:08.770452	2019-05-07 05:20:44.81207	73	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3719	Blue Nose Creations (BNC) Costumes	http://www.bncreationcostumes.com/	United States	blue-nose-creations-bnc-costumes	075b7662-c23d-48a2-9acf-336762d1b730	f17240d0-be00-408f-b06b-d9373f72c5df.png	2019-03-29 09:15:11.280979	2019-05-07 05:20:44.822573	74	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3733	Cains Creations (Ionzy)	https://www.instagram.com/cains_creations/?utm_source=ig_profile_share&igshid=j0ikkse5vmgc	United Kingdom	cains-creations-ionzy	b8ee3fad-7aee-4742-8cc9-fc71925eb3b7	2e3adc99-ca30-4097-b4f8-d628519a5087.png	2019-03-29 09:15:49.986252	2019-05-07 05:20:44.951945	88	Wales	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3721	Blue Rabbit Studios	http://blue-rabbit-studios.com/	United States	blue-rabbit-studios	c5e4241d-c96d-4293-8b39-1207945868a8	0e1c2ce3-dd0e-415a-be17-9e894f7270fb.png	2019-03-29 09:15:16.591776	2019-05-07 05:20:44.832502	76	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3722	Bongo Queen	http://www.furaffinity.net/user/bongoqueen/	United States	bongo-queen	27881f01-c39a-4900-84e2-c7876e9d5582	975568ea-0e3f-468b-851e-a733532ea9ad.png	2019-03-29 09:15:19.289845	2019-05-07 05:20:44.842619	77	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3723	Bouncy Bat Works	https://www.bouncybatworks.com/	United States	bouncy-bat-works	08b57266-6886-4b23-94ca-b6d217c0153c	ad32e0a5-1efa-4fe9-b43e-7decb4ccd42b.png	2019-03-29 09:15:22.772332	2019-05-07 05:20:44.852143	78	Massachusetts	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3724	Brek Wolf	http://www.furaffinity.net/user/brekwolf	France	brek-wolf	21d10a52-c66d-44c8-b7b8-1da4c1c4b57a	563c3678-d9e2-455e-b72c-bdb2b85800ad.png	2019-03-29 09:15:25.466875	2019-05-07 05:20:44.86306	79	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3725	Brush Wolf Studios	https://www.brushwolfstudio.com/	United States	brush-wolf-studios	8f59e788-37f4-43ce-a001-f986df8f93ef	c2bd7942-b6ad-4393-b006-8a511edf063d.png	2019-03-29 09:15:29.448727	2019-05-07 05:20:44.874726	80	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3726	Builder Bear Studios	http://www.furaffinity.net/user/eddiebear	United States	builder-bear-studios	6d5ecaf5-0074-48bc-ba5e-532543909150	2ab54ff5-3745-49a5-9373-749f401644ed.png	2019-03-29 09:15:32.000164	2019-05-07 05:20:44.885651	81	South Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3727	Buppa Spirit Wolf	https://www.furaffinity.net/user/buppaspiritwolf/	United States	buppa-spirit-wolf	c75d712e-6f57-4c2c-8db8-4bbda2a87db9	97bb182e-1caa-4cb9-ad64-8ec3e4dddee1.png	2019-03-29 09:15:34.489098	2019-05-07 05:20:44.895994	82	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3729	By Bunny Fursuits	http://www.furaffinity.net/user/bunny	United States	by-bunny-fursuits	92ea6e04-e76b-4488-9685-6075573da5d8	7c7ad7b4-2325-4999-bc41-e987b2e06557.png	2019-03-29 09:15:39.739606	2019-05-07 05:20:44.906925	84	Loisiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3730	ByCats4Cats	http://bycats4cats.com/	United States	bycats4cats	93be0128-828c-4b22-886d-2666ceb7b9d0	f9cfa377-e0b1-4dc5-838c-aa04a0145120.png	2019-03-29 09:15:42.292829	2019-05-07 05:20:44.917348	85	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3731	Cabbits Co. (Megumibish)	https://cabbitsco.jimdo.com/	United States	cabbits-co-megumibish	7546e535-d5c0-422e-85a9-51e73fff74dd	e172dd3e-172d-4e52-9017-5ec5ec93781f.png	2019-03-29 09:15:44.831345	2019-05-07 05:20:44.927959	86	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3732	Caffeinated Crafts	https://www.furaffinity.net/user/caffeinated.crafts/	United States	caffeinated-crafts	9a96b93d-a765-454f-aa7f-c8d958810251	37af932f-cba2-4b66-9ec0-6a02431d9a42.png	2019-03-29 09:15:47.345603	2019-05-07 05:20:44.941375	87	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3734	Calico Cougar Studios	https://www.furaffinity.net/user/calicocougar/	United States	calico-cougar-studios	2e06e7a5-4353-4478-96db-705dcefa6b0e	86674959-815d-4c39-8ebc-b7f121d30513.png	2019-03-29 09:15:53.412677	2019-05-07 05:20:44.969882	89	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3735	Calypsonight	http://www.furaffinity.net/user/calypsonight/	United States	calypsonight	b1ba226c-6bba-435a-8a08-8f51039ae19e	225dfe48-ff7f-48c4-a7a3-0016b38f5024.png	2019-03-29 09:15:55.985139	2019-05-07 05:20:44.980857	90	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3736	Candi Fursuits	http://www.furaffinity.net/user/candi.fursuits	United States	candi-fursuits	e840e7c5-4cc2-4bef-b471-55711880cb7c	6dd09426-557a-4b86-b709-0576d40584d3.png	2019-03-29 09:15:58.587928	2019-05-07 05:20:44.992919	91	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3737	Candyxdog	http://www.furaffinity.net/user/xxscenesterfur/	United States	candyxdog	e3abeb19-6298-4c33-b2a9-57326f1e2f5c	7d17d379-e8d1-479f-8acf-4901902d36b4.png	2019-03-29 09:16:01.178305	2019-05-07 05:20:45.004067	92	Alaska	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3738	Canine Hybrid Creations	http://caninehybrid.net/	United States	canine-hybrid-creations	f7e07477-4594-4257-b200-47d760c40666	99736a92-dd52-42cb-aecd-8c988db9c2b5.png	2019-03-29 09:16:03.921042	2019-05-07 05:20:45.014955	93	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3739	Cant of Togs	https://www.cantoftogs.com/	United States	cant-of-togs	bfa295fc-a15a-4f9d-9728-506d97aa4ace	1ab40c75-2349-4ce9-bbae-1210831058a4.png	2019-03-29 09:16:06.432004	2019-05-07 05:20:45.025326	94	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3740	CardinalFSR	https://www.furaffinity.net/user/cardinalfsr/	United States	cardinalfsr	e75a62a9-428c-401d-9435-f2ecd6162d7b	876b649a-eb73-4e84-91b3-ac70f8c4b251.png	2019-03-29 09:16:09.221105	2019-05-07 05:20:45.035868	95	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3741	Carmal Coffee Fursuits	http://www.furaffinity.net/user/CarmalCoffeeFur	United States	carmal-coffee-fursuits	9155f195-2bca-40c2-b2c9-c5e2d72c74db	a84474ea-5c7d-4507-a911-074901f1981b.png	2019-03-29 09:16:11.698131	2019-05-07 05:20:45.045759	96	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3742	Carolina Critters	http://www.furaffinity.net/user/Carolina-Critters	United States	carolina-critters	19107f18-337b-47e1-b121-1c0c60382979	ce76d9bf-1099-4e02-8413-ad9f02d9e647.png	2019-03-29 09:16:14.256124	2019-05-07 05:20:45.056697	97	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3743	Carpet Shark Fursuits	https://arwenscoots.wixsite.com/carpetshark	United States	carpet-shark-fursuits	21b490b4-d4e4-4b11-981b-19bbacaa59fd	3c8db083-712b-4126-8aa9-e8075e6aa6e2.png	2019-03-29 09:16:16.781211	2019-05-07 05:20:45.066301	98	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3744	Cassius Crafts	https://www.cassiuscrafts.com/	United Kingdom	cassius-crafts	43e83a08-8896-4a8e-b3a5-1faef0392bbe	714bfdc1-ac23-4f03-b2b9-3b4f70d22aa2.png	2019-03-29 09:16:19.4238	2019-05-07 05:20:45.080206	99	Scotland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3745	Cat and Cockatoo	http://www.furaffinity.net/user/catandcockatoo/	Netherlands	cat-and-cockatoo	6d58bd9e-377d-4ece-a93c-b49d1bc5cad0	df08f596-0b24-4d68-8f1f-6b5341c8670f.png	2019-03-29 09:16:22.092325	2019-05-07 05:20:45.089942	100	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3746	Cat Tails Up	https://www.weasyl.com/~cattailsup	United States	cat-tails-up	3a5e1f4a-6813-4ca3-b7d9-3f5b2a636cc4	7c7ccc5b-9df1-495f-bcce-b0d7fddd2cd1.png	2019-03-29 09:16:24.354152	2019-05-07 05:20:45.122738	101	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3748	CCS Mascots	http://www.furaffinity.net/user/CCSMascots	United States	ccs-mascots	c85cc337-005f-4162-8feb-3852b68d91d4	1f028f2e-b540-418d-86e4-9b78411f2829.png	2019-03-29 09:16:30.1302	2019-05-07 05:20:45.133769	103	Maine	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3749	Cenobear	https://www.furaffinity.net/user/cenobear/	Brazil	cenobear	a8347106-89fa-49af-8b63-665949b6c1d5	34f62a35-9f59-4174-828b-1df850a2ad6c.png	2019-03-29 09:16:32.673283	2019-05-07 05:20:45.144753	104	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3750	CFStudios	http://www.cfstudiosonline.com/	United States	cfstudios	750179db-d242-4a4f-85cb-9522fa9c70a0	1fcac6ab-5a59-4a96-bd57-3987c529fd9f.png	2019-03-29 09:16:35.348109	2019-05-07 05:20:45.154796	105	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3751	Chairo	http://www.furaffinity.net/user/chairo/	United States	chairo	505e5ca6-b5e9-4f7c-8ea1-9b3deb4c6b1b	915d3725-b7c6-4831-b86a-256d1ef55e83.png	2019-03-29 09:16:37.886373	2019-05-07 05:20:45.164822	106	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3752	Chibi Marrow	http://www.furaffinity.net/user/chibi-marrow	United States	chibi-marrow	e85be750-c52f-4171-b6dd-09a08de763b4	065dea1a-1f99-401b-a992-3a5380e93b82.png	2019-03-29 09:16:40.404974	2019-05-07 05:20:45.17509	107	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3753	Chilifoo	http://www.furaffinity.net/user/Chilifoo	United States	chilifoo	b3c666ea-801c-421c-905a-a19c35b66aeb	61380a95-5415-4fdd-a40e-da8c890cb5fc.png	2019-03-29 09:16:43.035252	2019-05-07 05:20:45.184454	108	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3754	Chipmunk Dreams	http://www.furaffinity.net/user/chipmunkdreamstudios/	United States	chipmunk-dreams	22ee5495-bdd5-4733-af77-363a0861198f	4a15808a-7cf8-4d2a-a954-027523f38202.png	2019-03-29 09:16:45.543255	2019-05-07 05:20:45.194457	109	New Hampshire	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3871	Fish R Furiends Studios	https://www.furaffinity.net/user/fishRfuriendsStudios	United States	fish-r-furiends-studios	675e53a1-e294-499d-8ab2-5239df1be2f5	aa77852e-a5cf-4448-8f6b-41bf91ce6ec5.png	2019-03-29 09:22:00.870628	2019-05-07 05:20:46.299061	226	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4008	ISqueakyPinky (Mini Wolf Arts)	https://www.furaffinity.net/user/isqueakypinky	United States	isqueakypinky-mini-wolf-arts	78f3e9d3-9681-47cf-aea7-c932e08d23f9	11dc6fe0-e397-4987-82ac-83e5077a9ed3.png	2019-03-29 09:28:00.308863	2019-05-07 05:20:47.554221	363	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3756	Cinnamon Rabbit Creations	https://www.facebook.com/CinnamonRabbit/	Canada	cinnamon-rabbit-creations	e5930e09-95ec-483f-9efc-ec1510fac425	04b38319-fe42-4ddd-bd56-b7b85c922dc7.png	2019-03-29 09:16:50.687839	2019-05-07 05:20:45.204638	111	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3757	Circle Bird Works (Warped Reality)	http://www.furaffinity.net/user/CircleBirdWorks	United States	circle-bird-works-warped-reality	6913c046-b1f8-47af-a4b5-f0e0374d69e2	d1c99c85-8b4e-48fe-9913-3f1e3ae48eb4.png	2019-03-29 09:16:53.217797	2019-05-07 05:20:45.214301	112	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3758	City Mutt Fursuits	http://www.citymuttfursuits.com/	United States	city-mutt-fursuits	2c40877c-24be-4ec6-bb2c-eed446581ce4	85117c3b-1fc3-4cd7-902b-fbf55ad453fe.png	2019-03-29 09:16:56.03668	2019-05-07 05:20:45.224243	113	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3760	Clip Point Creations	http://www.furaffinity.net/user/clippointcreations/	United States	clip-point-creations	0e8e1245-2170-42d5-8ff0-421a3a1210c1	0912ce0b-237d-43b4-a8cd-61a8d8df8041.png	2019-03-29 09:17:01.584094	2019-05-07 05:20:45.259985	115	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3761	Clock Struck One	http://www.furaffinity.net/user/ClockStruckOne	United States	clock-struck-one	c3f6ed41-3a31-4c81-86c6-7001da2ce657	73473dba-45b5-464c-9eb0-9f4a021f1673.png	2019-03-29 09:17:04.232718	2019-05-07 05:20:45.271736	116	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3762	Clockwork Carousel	http://www.furaffinity.net/user/clockworkcarousel	United States	clockwork-carousel	8ca78cd8-0170-485a-aeb1-cd13e440acdd	93dfba83-e8ee-46da-8178-513a72a6d055.png	2019-03-29 09:17:06.771999	2019-05-07 05:20:45.281437	117	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3763	Clockwork Creatures	http://www.clockworkcreature.com/	United States	clockwork-creatures	4b09ab19-1dec-4e93-b670-58c9c45d4351	eae0aee1-cacc-4700-afee-eb4feeae3363.png	2019-03-29 09:17:09.276349	2019-05-07 05:20:45.290933	118	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3764	Coby Fursuits	https://www.furaffinity.net/user/coby-wong/	Brazil	coby-fursuits	b4f3d523-5379-4b70-af6e-46e6da434c2c	43c68251-dd24-41a5-8e3a-813dacb65cd5.png	2019-03-29 09:17:11.952829	2019-05-07 05:20:45.303819	119	Sao Paulo	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3765	Coffee Costumes	http://www.furaffinity.net/user/CoffeeCostumes	United States	coffee-costumes	7a9fee96-f6fd-4563-a12a-2ab8d187f9ef	e11c2b87-61d2-48a5-b830-c51dd9f8bfd9.png	2019-03-29 09:17:14.560092	2019-05-07 05:20:45.313436	120	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3766	Coffee Kitty Studio	https://coffeekittystudio.wixsite.com/coffeeks	United States	coffee-kitty-studio	6f7bdfaf-085b-46da-9508-d4f6057abc49	12088f2d-d146-4ec4-a2a3-7fbaeadc78c7.png	2019-03-29 09:17:17.167328	2019-05-07 05:20:45.329735	121	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3767	Colorful Creatures	https://www.colorful-creatures.com/	United States	colorful-creatures	92607626-6a82-452d-b070-2845efa6a80d	4817470a-8c08-4764-a9cf-1971c662abf9.png	2019-03-29 09:17:20.637487	2019-05-07 05:20:45.340821	122	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3768	ConiFURous	http://www.furaffinity.net/user/conifurous	United States	conifurous	6a2a21b7-8ba1-4462-8ab5-d634708e6854	78ba491a-cf7c-4c3a-b17a-458b5326d7ab.png	2019-03-29 09:17:23.427059	2019-05-07 05:20:45.350551	123	Portland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3769	Constellation Creations	https://www.deviantart.com/took-southpaw/	United Kingdom	constellation-creations	ee1d1ac4-8bb6-493e-97ed-bc5a006dd047	4206f3d5-43a8-4c41-a477-4c28355107a0.png	2019-03-29 09:17:26.030418	2019-05-07 05:20:45.360824	124	Cornwall	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3770	Coonec Creations	https://www.furaffinity.net/user/cooneccreations/	United States	coonec-creations	3ba280e4-2f0f-4ed5-8119-5892c40a7387	dfc2be6a-0467-4a25-8ae0-81fda1a906b1.png	2019-03-29 09:17:28.777409	2019-05-07 05:20:45.370724	125	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3771	Cosplay Dawn	https://www.cosplaydawn.com/	United States	cosplay-dawn	cc9d4ccc-aeae-4eda-aba7-349e27b0502a	90fecf2b-8573-44ac-b1ac-d6d1805c742a.png	2019-03-29 09:17:31.303825	2019-05-07 05:20:45.380585	126	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3772	Cowan Costumes	https://www.cowancostumes.com/	United States	cowan-costumes	45bb6a54-4807-445a-bcdf-72909adf697c	1a861b8c-feca-44d4-b869-9e7f798612ff.png	2019-03-29 09:17:33.829554	2019-05-07 05:20:45.390832	127	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3774	Crafty Coyo Costumes	https://www.furaffinity.net/user/craftycoyocostumes/	United States	crafty-coyo-costumes	de31a28b-4eb1-4ff3-9bc4-91d571b2bd73	9668efda-4b0b-4b5b-83c2-bd428298bf4d.png	2019-03-29 09:17:38.787411	2019-05-07 05:20:45.404563	129	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3775	Crafty Critters	https://www.furaffinity.net/user/craftycritters/	United States	crafty-critters	0e11896b-c60a-4254-b6b6-29d80f799b73	7cc90b2a-2d9e-4ef8-8d76-6c09e66ca576.png	2019-03-29 09:17:42.266452	2019-05-07 05:20:45.414193	130	Nevada	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3776	Crafty Husky	https://twitter.com/PixelCraftHusky	United Kingdom	crafty-husky	3084632b-a917-4706-a860-3e7940ba2df3	2b29a234-0f4c-45a7-8342-73b1c69b5359.png	2019-03-29 09:17:44.827536	2019-05-07 05:20:45.424418	131	Canterbury	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3777	Crafty Vulpine	https://twitter.com/CraftyVulpine/media?lang=en	Ireland	crafty-vulpine	6335ace6-3e43-46e3-8996-468328782111	e867cfa8-89ac-4eb3-a9c2-b8da578b65f7.png	2019-03-29 09:17:47.366586	2019-05-07 05:20:45.434062	132	Galway City	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3778	Craftypillar	https://twitter.com/Craftypillar	United States	craftypillar	c61046fd-d9ba-4956-938f-f449ad551adf	664c492c-5db0-446e-af8b-98f67ab3c845.png	2019-03-29 09:17:49.711239	2019-05-07 05:20:45.443627	133	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3779	Crazi Corgi	http://www.furaffinity.net/user/corgiface/	United States	crazi-corgi	ada829d2-d095-4239-b286-0eb51cbefec4	a44f43fa-fd1b-4a53-bf48-e3cea11f4477.png	2019-03-29 09:17:52.361733	2019-05-07 05:20:45.45322	134	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3780	Creation by LadyNightLight	https://georginacarpenter1.wixsite.com/ladynightlight	Ireland	creation-by-ladynightlight	fd2196d6-9dbf-4dc8-92ee-ce96817b8692	fd15a338-e9a9-4742-81c6-dc1448eb6fa8.png	2019-03-29 09:17:54.945567	2019-05-07 05:20:45.462785	135	Leinster	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3781	Creative Mochi	http://www.creativemochi.com/	United States	creative-mochi	b35c1627-3c9f-47b3-8910-139932ca3afe	aeff41cd-2b39-41b1-806c-7047b5256898.png	2019-03-29 09:17:57.143375	2019-05-07 05:20:45.47256	136	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3782	Creature Haven	http://www.furaffinity.net/user/CreatureHaven	United States	creature-haven	77500f79-8594-49bf-835b-e66e33a62450	04eeba5c-d734-42ab-b49d-e95e9d5388f0.png	2019-03-29 09:17:59.659066	2019-05-07 05:20:45.482216	137	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3783	Creatury	http://www.furaffinity.net/user/creatury/	Netherlands	creatury	ddefdd8d-94f0-4ebb-8120-2eb4dd7c13be	c0c319ab-e22c-4da2-8b9a-7a676a75288e.png	2019-03-29 09:18:02.349051	2019-05-07 05:20:45.492127	138	Zwolle	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3784	Cross the Fur	https://www.facebook.com/CrosstheFur/	Taiwan	cross-the-fur	69ad0e84-6403-451c-a091-c278099d2ef8	a2565565-7773-47b9-ae2b-c2f7d345d054.png	2019-03-29 09:18:04.603673	2019-05-07 05:20:45.501816	139	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3785	Crusher Costumes	https://crushercostumes.wixsite.com/crushercostumes/gallery	Finland	crusher-costumes	dec3d96c-9b2c-41ae-8a80-91de29f07a85	dfd11a66-daac-4929-a1ef-fef487e18a12.png	2019-03-29 09:18:07.102779	2019-05-07 05:20:45.512437	140	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3787	Crystumes	http://www.furaffinity.net/user/Crystumes	United States	crystumes	3d29f374-6b5c-487c-9c6f-ad10495528f4	725e75b0-a5ab-42f2-a3ba-e7416643bd7d.png	2019-03-29 09:18:12.220844	2019-05-07 05:20:45.523298	142	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3788	Cupcake Critters	https://twitter.com/CupcakeCritters/media	United States	cupcake-critters	fcedbad7-dfd0-422a-9a16-7f0d91c7fbf3	45cbc9cc-1117-4d63-ae2f-85dc25f3eb22.png	2019-03-29 09:18:14.784932	2019-05-07 05:20:45.533681	143	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3789	Curiosity Created the Cat	https://curiositycreatedthecat.weebly.com/	United States	curiosity-created-the-cat	e9dec073-4486-46e7-9ffb-78c4c78f7359	fd4d8004-7af9-4459-a02c-d570238d7d31.png	2019-03-29 09:18:17.367379	2019-05-07 05:20:45.543512	144	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3651	8 Foot Rabbit	https://www.furaffinity.net/user/8footrabbit	United States	8-foot-rabbit	0680ba1e-6a85-42e1-a2fd-995f58dde3d7	3fc4e845-d016-49c3-981a-2a2299a97776.png	2019-03-29 09:12:14.548849	2019-05-07 05:20:52.101453	6	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3791	Curious Tabby Studios	https://www.furaffinity.net/user/alytabby/	Canada	curious-tabby-studios	2e9726c9-9372-47e0-8579-bd19791b130a	f21f3790-b009-4b9e-be68-0889934d2d75.png	2019-03-29 09:18:22.537893	2019-05-07 05:20:45.553683	146	Quebec	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3792	Cursed Creations	http://www.furaffinity.net/user/CursedCreations	United Kingdom	cursed-creations	e4fc800e-db20-49f9-85d2-2ce83cc09c1a	a7f6991a-1b02-4f71-a47f-d2af1e21bbc8.png	2019-03-29 09:18:25.05487	2019-05-07 05:20:45.563831	147	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3793	CuttleB0ne	https://www.furaffinity.net/user/cuttlebone/	United States	cuttleb0ne	a0871353-5376-4366-a2b0-fef8b4a8de7f	ed2daa8a-0b53-4a8d-8988-27b7f2573e6b.png	2019-03-29 09:18:27.582586	2019-05-07 05:20:45.574145	148	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3794	Cwoodsdean Creations	https://www.cwoodsdeancreations.com/	United Kingdom	cwoodsdean-creations	6a6a7bbf-69d0-49a1-b84a-846ab017fe43	faa29593-b6ea-4a4d-bede-90bb057a2fdb.png	2019-03-29 09:18:30.125871	2019-05-07 05:20:45.584592	149	London	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3795	Cyon	https://twitter.com/CyonFR	United Kingdom	cyon	4f4e284f-9d61-480d-8f83-c7c7c1901268	7d03c5f0-7af6-4559-a2fd-05c32f1a1720.png	2019-03-29 09:18:32.736732	2019-05-07 05:20:45.594553	150	Southampton	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3796	Dalmy Do Dat Creations	http://www.dalmydodatcreations.com/	United States	dalmy-do-dat-creations	a3f526d5-54a3-4bfe-9831-9ac070b146ce	be016465-1d97-4b6f-9cef-e1b1f6420f68.png	2019-03-29 09:18:35.311943	2019-05-07 05:20:45.605202	151	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3797	Dandelion Fursuits	http://www.furaffinity.net/user/DandelionTheElefox	United States	dandelion-fursuits	6448a416-d4ea-4385-97d8-b070fc528b08	bbd87d69-ef08-4de4-901c-9aa7548a0a20.png	2019-03-29 09:18:37.862274	2019-05-07 05:20:45.615371	152	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3798	Dandy Designs	http://www.furaffinity.net/user/dandydesign/	United States	dandy-designs	886fcd74-1e9e-49e0-ae1e-d65fd1a98568	79ad61c2-21f7-44bc-93be-375787b3433c.png	2019-03-29 09:18:41.160043	2019-05-07 05:20:45.626316	153	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3800	Danish Pawstries	https://www.facebook.com/DanishPawstries/	United States	danish-pawstries	266b2191-05bf-4c69-872e-dd8edabf1da2	8238de40-6ec4-4f95-b8b9-c024c67cfe7f.png	2019-03-29 09:18:46.42569	2019-05-07 05:20:45.638217	155	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3801	Dark Creations	http://www.darkcreations.ca/	Canada	dark-creations	72a93cca-ceab-424e-aa63-db19ba920aa5	1f31d440-b0bf-4dca-8901-72309c93c973.png	2019-03-29 09:18:48.964899	2019-05-07 05:20:45.649212	156	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3802	Dark Rainbow Dragon	http://www.furaffinity.net/user/kathathedragoness	Germany	dark-rainbow-dragon	30b1bff7-d5a8-4aed-9c42-c2eb30eec903	b08937a2-5b8e-4b57-b898-b9ae8cc3043d.png	2019-03-29 09:18:51.328482	2019-05-07 05:20:45.660249	157	Schleswig-Holstein	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3803	Dead Dogma	http://www.furaffinity.net/user/dead-dogma/	United States	dead-dogma	84ed5a59-3963-430e-bf94-aa77120f9dae	a9e5bf45-3915-464b-93ef-ffa5a69236dd.png	2019-03-29 09:18:53.53451	2019-05-07 05:20:45.670875	158	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3804	Deadly Creations Fursuits	https://twitter.com/DeadlyFursuits	United States	deadly-creations-fursuits	7a2bc1c5-447f-4568-ad56-feb2cad57c41	b0742d47-5cdf-485c-8313-780e61a3a14a.png	2019-03-29 09:18:56.050238	2019-05-07 05:20:45.681137	159	South Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3805	Deathatsix	https://www.deviantart.com/deathatsix/	United States	deathatsix	0ec685ff-e99b-457b-8e9a-c627ae9ce232	bb7e98bc-eb39-4680-813f-e5bc25921f10.png	2019-03-29 09:18:58.608362	2019-05-07 05:20:45.691324	160	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3806	Deer In A Hat Costumes	https://deerinahat.com/	United States	deer-in-a-hat-costumes	cf8e4d12-6651-4b92-aedc-71383e788836	f34b80a9-ec3a-4906-a47e-849680c91446.png	2019-03-29 09:19:01.093614	2019-05-07 05:20:45.70122	161	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3807	Deezlberries	https://www.deviantart.com/deezlberries	United Kingdom	deezlberries	8df38341-0e48-4ea7-a1cd-371cab923f70	91d02049-6cae-4055-a86d-e89785257405.png	2019-03-29 09:19:03.575383	2019-05-07 05:20:45.711242	162	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3808	Defiant Tail Waggers Anonymous (DTWA)	https://www.furaffinity.net/user/dtwa/	United States	defiant-tail-waggers-anonymous-dtwa	54df7640-0a2f-41f0-a654-359f5fa23a86	60f80641-5527-43d4-8bd3-6542ad4357dd.png	2019-03-29 09:19:06.081886	2019-05-07 05:20:45.72087	163	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3809	Delicious Disguises	https://www.deliciousdisguises.com/	United States	delicious-disguises	9468090a-763d-42b5-a191-0152d63af55f	f8bf4441-102b-4536-a40a-7ff0ecb53978.png	2019-03-29 09:19:08.995439	2019-05-07 05:20:45.730676	164	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3811	Designosaur	https://www.weasyl.com/~designosaur	United States	designosaur	25737d5f-28f0-403b-a2b1-2904f4437048	7caa6617-e35a-4001-bb5e-f5618b47488a.png	2019-03-29 09:19:14.134259	2019-05-07 05:20:45.740475	166	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3812	Dexterous Zombie	http://dexterouszombie190.wixsite.com/dexterouszombie	United States	dexterous-zombie	1e0fea87-2be1-4728-9586-ddf54fc44439	7c3ff901-ba7c-4e4d-ac0a-0fa950fec405.png	2019-03-29 09:19:17.56983	2019-05-07 05:20:45.750008	167	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3813	Diadexxus	http://www.furaffinity.net/user/Diadexxus/	United States	diadexxus	6d54790d-0344-4a48-bff9-aaa04e81a3a3	ff1c357c-2734-4057-9512-95a057bc6e74.png	2019-03-29 09:19:20.226021	2019-05-07 05:20:45.759565	168	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3814	Difurgence	http://www.difurgence.com/	United States	difurgence	7402aeae-bc66-4d55-aad2-e88a7e16bc3f	0053acc8-dd09-455d-89b5-21bc93478f93.png	2019-03-29 09:19:22.752898	2019-05-07 05:20:45.768938	169	Vermont	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3815	Dingz	http://www.furaffinity.net/user/dingz/	United Kingdom	dingz	9baca742-3c2d-4a4a-8cc4-594d89410994	276c9138-84ec-43b3-ba8d-14681fb1a4a5.png	2019-03-29 09:19:25.259732	2019-05-07 05:20:45.778613	170	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3816	Dino Queen Creations	https://dinoqc.wixsite.com/-dinoqueencreations?fbclid=IwAR1aO3SD4d-P9DQf7nlKHqCS1M4kACxjWTm2iU-Mpd3HKLeZC5BI1IJdwMw	United States	dino-queen-creations	3b689d0e-7c4f-4c85-ad9a-79da44b295e3	b87770a0-0340-4d47-b5fa-8b3853b49433.png	2019-03-29 09:19:27.854113	2019-05-07 05:20:45.789442	171	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3817	Dire Creatures	https://www.direcreatures.com/	Czech Republic	dire-creatures	87a048f1-6455-4385-b94f-022f97f81f0b	7b45f2db-d6fc-4075-8b81-8fd53f74f5d7.png	2019-03-29 09:19:30.312067	2019-05-07 05:20:45.798882	172	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3818	Dolphyn	http://www.furaffinity.net/user/dolphyn	United States	dolphyn	a135e859-5bc0-4d3c-a081-a30a7839eb2e	bf93f78e-014c-4029-bff8-1297504d855c.png	2019-03-29 09:19:32.76935	2019-05-07 05:20:45.808602	173	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3819	Dombrus	https://www.furaffinity.net/user/dombrus/	United States	dombrus	1ed7a434-af79-4a50-b9ba-fffd5d1bfd1e	4a38082e-c03b-43f0-8123-8e53b32f8683.png	2019-03-29 09:19:35.278709	2019-05-07 05:20:45.818524	174	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3820	Don't Hug Cacti	http://www.donthugcacti.com/index.php	United States	don-t-hug-cacti	6e3c2bc2-04eb-4df2-80ec-4b1fe9f51427	2cb34d3c-cbff-4836-ab24-91d7036d8f2d.png	2019-03-29 09:19:37.792384	2019-05-07 05:20:45.828507	175	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3821	Dorky Dog Suits	http://www.furaffinity.net/user/DorkyDogSuits	Mexico	dorky-dog-suits	f79ff5f8-1586-422b-9b62-3e87bf0e9ab2	f9a04c45-1933-4584-abc8-7ee33b446bbe.png	2019-03-29 09:19:40.315546	2019-05-07 05:20:45.839212	176	Jalisco	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3822	Dragon-X2	http://www.furaffinity.net/user/dragon-x2/	Taiwan	dragon-x2	2a3ae384-7500-4f26-bb68-f8ac2b709316	c78d2d97-a94e-4098-999b-d6bb9f578c87.png	2019-03-29 09:19:43.197186	2019-05-07 05:20:45.848654	177	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3824	Dragoncid	https://www.deviantart.com/dragoncid/	United States	dragoncid	876a0e7d-2812-4ffd-a870-e8d45633d1fe	3565b6b6-28c3-4e29-ba91-3a62aa3bea25.png	2019-03-29 09:19:48.109783	2019-05-07 05:20:45.85851	179	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3825	Dragonfire Costumes	http://www.furaffinity.net/user/dragonfirecostumes/	United States	dragonfire-costumes	10e1b42e-1a38-44c7-b27c-9347d6a9bd4c	96fe480b-bcd8-438c-aff4-1effa26f606b.png	2019-03-29 09:19:50.859523	2019-05-07 05:20:45.86849	180	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3823	Dragon's Grin Studios	https://dragonsgrinstudios.weebly.com/	United States	dragon-s-grin-studios	9fc13e9d-b191-4ae8-875e-5cfe558598e7	d735e7a2-5b77-4c78-9bb3-82facd6ef53e.png	2019-03-29 09:19:45.532133	2019-05-07 05:20:52.453882	178	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3827	DragonfyreDawn (DFD) Costumes	https://www.furaffinity.net/user/dfdcostumes/	United States	dragonfyredawn-dfd-costumes	776cdb91-759e-4d80-b6f1-1a387bdd74af	b68b7cc3-b933-4b3c-94d5-5ed77073f84f.png	2019-03-29 09:19:56.20356	2019-05-07 05:20:45.878425	182	Alabama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3829	Drakonic Knight	http://www.furaffinity.net/user/drakonicknight/	United States	drakonic-knight	5ef07ba3-5aae-4ca2-a7fc-bee4acebff0c	7943a006-0ddd-4ce5-a987-611554505c79.png	2019-03-29 09:20:01.37584	2019-05-07 05:20:45.889444	184	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3830	Dream Machine Costumes	https://dreammachinecostumes.com/	United States	dream-machine-costumes	3654902c-b489-4156-88ab-674da4a932a0	e87c0875-4d32-42f3-890e-abc9da502334.png	2019-03-29 09:20:04.056296	2019-05-07 05:20:45.899366	185	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3831	Dream Vision Creations	https://www.furaffinity.net/gallery/dreamvisioncreations/	United States	dream-vision-creations	084baba8-d586-4b08-b9a6-56d65aa92359	f1b9a9f7-cfdb-47f7-b77a-01c3d37b518e.png	2019-03-29 09:20:06.678242	2019-05-07 05:20:45.908989	186	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3832	Dreams Come True Studios	https://dctfursuits.weebly.com/	United States	dreams-come-true-studios	b41860db-87bc-4d9b-ab31-14fdacfe7b51	5d82e6a2-52f7-4dfe-be2b-4aacf6ebf798.png	2019-03-29 09:20:09.502741	2019-05-07 05:20:45.918612	187	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3833	Dresden Complex	https://twitter.com/dresdencomplex	United States	dresden-complex	4f8fd44c-f597-4e98-a687-0689a27c8924	e5861776-c248-4171-a1a9-fd7369c20a66.png	2019-03-29 09:20:12.319669	2019-05-07 05:20:45.928469	188	Virginia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3834	Dubmutt	https://www.furaffinity.net/user/dubmuttcostumes/	United States	dubmutt	44ffd304-2d4f-4429-9005-a8c181d7b3fc	e736d9a5-6009-463b-b4c3-1128fefca2c9.png	2019-03-29 09:20:14.884929	2019-05-07 05:20:45.939128	189	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3835	Dynamic Cats Studio	https://dynamicatstudio.com/	Mexico	dynamic-cats-studio	e32d9d1b-2788-4390-ab1c-3ff56b304b50	e61bb8a3-9acd-4bde-8096-9cb1d304619a.png	2019-03-29 09:20:18.972131	2019-05-07 05:20:45.948525	190	Guadalajara	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3836	Elemental Fursuits	http://www.furaffinity.net/user/ElementalFursuits/	Canada	elemental-fursuits	7ab5d2f4-a125-406f-860b-838e3ae81b38	59522f6d-f56b-495c-810c-d20b37a9b92a.png	2019-03-29 09:20:21.491533	2019-05-07 05:20:45.958943	191	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3837	Elk Craft Fursuits (Elk Dragon)	https://www.elkcraftfursuits.com/	United States	elk-craft-fursuits-elk-dragon	2ed8bb4d-df9e-4bd8-abe3-10460d08247d	deabf722-d2db-4714-9c6a-32cb6d7ab7f6.png	2019-03-29 09:20:24.121491	2019-05-07 05:20:45.968626	192	california	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3838	Ellies Fursuits	https://www.furaffinity.net/user/ellies-fursuits/	Canada	ellies-fursuits	2eae8131-07dc-4bea-9cef-922c8bfb6873	e7921e5a-6dfb-4615-93aa-39162ea4913d.png	2019-03-29 09:20:26.708085	2019-05-07 05:20:45.978575	193	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3839	Elven Wolf	https://instagram.com/x.nymeria_elvenwolf.x?utm_source=ig_profile_share&igshid=1krvusqmnp18k	United Kingdom	elven-wolf	0f1b593b-0579-4d27-a6dc-368a4398f3c9	59c53b83-beb7-45b3-98bf-7e35df31dd91.png	2019-03-29 09:20:29.445616	2019-05-07 05:20:45.989066	194	Wales	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3840	EntryLevelFox	https://twitter.com/entrylevelfox	United States	entrylevelfox	d0dd8a4d-d387-4543-ac22-c12ea0927236	b516fa8c-ddb7-4db1-b6a8-3f576e232732.png	2019-03-29 09:20:32.054125	2019-05-07 05:20:45.998379	195	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3842	Errowolf	https://www.furaffinity.net/user/erro	United States	errowolf	645c7c64-3d1f-45a0-8144-956cda2c6986	dc77aca0-422c-4618-af65-7920970fb1c3.png	2019-03-29 09:20:37.776162	2019-05-07 05:20:46.008657	197	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3843	Esuterure	https://www.deviantart.com/esuterure2006/	United States	esuterure	09eac448-f492-4b43-8c73-2ec4cd5157c9	788928f0-17bc-4e6e-bf31-b6c7964b978b.png	2019-03-29 09:20:40.826363	2019-05-07 05:20:46.018983	198	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3844	Eternalskyy	https://www.deviantart.com/eternalskyy	United States	eternalskyy	7bab40ed-cf3b-4cf4-a420-224a0c6db84c	2964424c-e4fc-4e3d-b289-35905fcccd71.png	2019-03-29 09:20:43.386657	2019-05-07 05:20:46.029546	199	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3845	Euharmonics	https://www.furaffinity.net/user/euharmonics/	Australia	euharmonics	1b68d80e-80cf-4f94-bd0e-a67c6453c839	772c61e6-c34d-4d70-bf1c-4b940e487fff.png	2019-03-29 09:20:45.849505	2019-05-07 05:20:46.04057	200	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3846	Evil Bear Fx	http://www.furaffinity.net/user/evilbearfx/	United States	evil-bear-fx	2838067a-6aec-4dda-9c4a-2ce6d6a1bb39	52875e14-8ae3-4488-b978-5bdc77636217.png	2019-03-29 09:20:48.445228	2019-05-07 05:20:46.05064	201	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3847	Evozarro	https://www.furaffinity.net/user/evorazzo	Argentina	evozarro	059cad65-4225-4849-8c40-b3a56d8a4305	55997736-9205-403f-b11a-17fbc8fe3c06.png	2019-03-29 09:20:51.679493	2019-05-07 05:20:46.061153	202	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3848	Excelsior the Lion	https://www.furaffinity.net/user/excelsior-the-lion/	United States	excelsior-the-lion	e256e7ea-71e5-4dc4-b3e6-6d7c75474f7b	713f5a1f-d19a-4da4-bf2d-d9f1f199fd1e.png	2019-03-29 09:20:54.159949	2019-05-07 05:20:46.072077	203	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3849	Ezza	http://www.furaffinity.net/user/Ezza	Australia	ezza	7d6fa5ea-1525-4a62-a4b0-d855d21bf116	c8deba3b-fee4-494d-8c37-a807927eff27.png	2019-03-29 09:20:56.996122	2019-05-07 05:20:46.082613	204	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3850	Facemakers Inc	http://www.facemakersincorporated.com/	United States	facemakers-inc	0d759cab-f30c-4695-8005-9184f2eb02b2	f210dc91-c9c4-4d85-8911-0059214bd007.png	2019-03-29 09:20:59.791024	2019-05-07 05:20:46.093429	205	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3851	Fallimar	http://www.furaffinity.net/user/fallimar	Australia	fallimar	7bfa0703-f544-4dde-ac18-15840f7aed2b	d519da9b-54ad-4bec-bb19-a346eb1549b0.png	2019-03-29 09:21:02.439302	2019-05-07 05:20:46.103979	206	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3852	Fancy Beast Suits	https://twitter.com/fancybeastsuits?s=09	United States	fancy-beast-suits	97fce2f9-c950-4ed5-bf42-d2c35f963011	33b0d907-764f-4e2c-9c09-95defce6a620.png	2019-03-29 09:21:05.476635	2019-05-07 05:20:46.116293	207	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3853	Fancy Fish Fursuits	https://twitter.com/fancyfishfurs	United States	fancy-fish-fursuits	69c36fe3-c5af-4918-b5b9-fda808977859	e83267ef-19f5-437f-83fb-ae11d207e2e3.png	2019-03-29 09:21:08.070105	2019-05-07 05:20:46.130041	208	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3854	Faris Batwan	http://www.furaffinity.net/user/farisbatwan/	United States	faris-batwan	35ff90c2-1b1c-4a79-9cd7-9b8d1f2c52bd	0248c2cb-5259-446b-bb81-cadb66d315ce.png	2019-03-29 09:21:10.580709	2019-05-07 05:20:46.142253	209	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3855	Faruku Costumes	https://farukucostumes.co.uk/	United Kingdom	faruku-costumes	04fd00b5-e04d-47ad-ae67-72173edfa85a	898094fb-ebfb-48f4-8475-cec48ce9f78b.png	2019-03-29 09:21:14.09418	2019-05-07 05:20:46.15707	210	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3856	Fatazndog	https://www.furaffinity.net/user/fatazndog/	United States	fatazndog	33ce2b4d-6ed2-42b2-af8e-d24ac2a1bf2a	3fde5e90-05f8-483b-91af-67891f47fc56.png	2019-03-29 09:21:16.658055	2019-05-07 05:20:46.17079	211	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3858	Fauxpawroo	https://twitter.com/fauxpawroo?lang=en	United States	fauxpawroo	11840f63-bc88-4f36-9ba9-89929eab5a21	ce291295-48d5-4114-8667-76a2a28d75a1.png	2019-03-29 09:21:22.265433	2019-05-07 05:20:46.184596	213	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3859	Feast of Dreams	http://feastofdreams.net/	United States	feast-of-dreams	e2945886-8d61-41a1-b1da-3af68321e4b3	3a9a3e28-4fad-4529-adaf-34a909b29714.png	2019-03-29 09:21:25.27372	2019-05-07 05:20:46.194907	214	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3860	Featherbat Fursuits	https://www.furaffinity.net/user/featherbat/	United States	featherbat-fursuits	e1b3811d-1ca1-4835-8e79-6378406a4881	e4f49f06-4ed5-4a98-a94f-930bfd6a18e6.png	2019-03-29 09:21:28.76391	2019-05-07 05:20:46.205685	215	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3861	Feathered Faux Creatures	http://www.furaffinity.net/user/ffc/	United States	feathered-faux-creatures	644acdda-f7ac-4bc6-b12b-e392d5fef360	5637835d-b3b8-4976-aa2c-7b01e1e1fab2.png	2019-03-29 09:21:31.287989	2019-05-07 05:20:46.216096	216	Oklahoma	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4082	Liquid Sunshine Design Fursuits	https://twitter.com/LSDfursuits	United States	liquid-sunshine-design-fursuits	d3d68502-c9d5-47c3-a7dd-462042b720b4	46da286f-2286-4c89-8f5d-289c63258f5c.png	2019-03-29 09:31:21.250958	2019-05-07 05:20:52.790266	437	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3863	Felixkatz	https://www.furaffinity.net/user/felixkatz/	Germany	felixkatz	34f03f01-ff78-4ae4-8c41-bb7b1e60c204	e3200f3f-43ab-4843-96e0-7ecf438e0d0f.png	2019-03-29 09:21:37.47964	2019-05-07 05:20:46.226738	218	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3864	Fenné Crafts	https://fennecrafts.com/Home/	United States	fenne-crafts	306f9cd2-efbe-41a3-ae44-f82965f36a58	0577f7bc-3a09-443d-a496-5cdc1ad38f38.png	2019-03-29 09:21:41.163118	2019-05-07 05:20:46.237303	219	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3866	Feral Facade	https://www.furaffinity.net/user/eddie-ka/	United States	feral-facade	21f5f4f9-a399-4a0c-b8fd-ac558aa861ea	f63512c6-818d-460b-9d80-aa6b2dc8fa50.png	2019-03-29 09:21:46.242486	2019-05-07 05:20:46.2479	221	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3867	Fiery Furs Studios	https://www.facebook.com/FieryFurs/	United States	fiery-furs-studios	d62d1a48-03e3-4f4c-9862-900a19af121b	22537a30-90bc-475b-bf9b-3b44e23ad651.png	2019-03-29 09:21:49.157409	2019-05-07 05:20:46.258531	222	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3868	Finnish Fox	http://www.furaffinity.net/user/finnishfox/	United States	finnish-fox	386dd3a7-e8e9-4c27-8148-ccf7aa55422d	5d7b414e-8d4b-4081-bab7-2910d630fecb.png	2019-03-29 09:21:51.914178	2019-05-07 05:20:46.268724	223	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3869	Fionka Fursuits	http://www.furaffinity.net/user/fionka	Czech Republic	fionka-fursuits	ccf3a7b5-01ba-43e7-bed9-04a578f4ba14	95a3379a-3b1e-4f04-a8e4-c36369a2732b.png	2019-03-29 09:21:54.614337	2019-05-07 05:20:46.278825	224	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3870	Firestorm Six	http://www.furaffinity.net/user/firestormsix/	Canada	firestorm-six	6e29977a-c480-42a2-a5f7-b8a6d090e2a3	d5dd92dd-1266-4e1d-860b-996f77abb267.png	2019-03-29 09:21:57.459366	2019-05-07 05:20:46.289405	225	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3872	Fixit Fursuits	https://www.fixitfursuits.com/	United Kingdom	fixit-fursuits	74023831-7f57-4515-a486-248daa757ee6	858ecc63-1376-40a6-bc14-75ee3517c213.png	2019-03-29 09:22:03.778482	2019-05-07 05:20:46.309444	227	Scotland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3873	Flacko	http://www.furaffinity.net/user/flacko/	Estonia	flacko	7da891ca-f7b1-4bf1-b349-f8d6e787e602	ebd590a9-5109-4f4f-9eb7-3478a29ce06d.png	2019-03-29 09:22:07.05516	2019-05-07 05:20:46.319427	228	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3874	Fleecerot	http://www.furaffinity.net/user/fleecerot/	United States	fleecerot	2a506146-089d-4931-8d32-7291b494e782	5fad1c68-5010-412d-94ce-151a0c1525be.png	2019-03-29 09:22:09.323497	2019-05-07 05:20:46.329384	229	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3875	Fleeting Fennec	http://www.fleetingfennec.com/	United States	fleeting-fennec	7599f086-560f-44d4-83ec-b4161c4c82d7	d99c5eea-7be2-433e-a358-76d53c82f730.png	2019-03-29 09:22:12.080362	2019-05-07 05:20:46.339655	230	Vienna	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3876	Flix Dragoness	https://www.deviantart.com/flixdragoness/	Australia	flix-dragoness	563b9afe-52ab-400f-a7fd-a75a8afa228f	f795e491-11bb-41c0-9c48-8520206acf06.png	2019-03-29 09:22:14.811443	2019-05-07 05:20:46.34939	231	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3877	Flixsuits	https://www.deviantart.com/flixthefox/	United States	flixsuits	46948643-4f9a-404a-b199-9e713338558c	da4e497a-8bd2-4e15-a2ee-e21df41f6129.png	2019-03-29 09:22:17.379574	2019-05-07 05:20:46.359576	232	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3879	Floof-Batsuits	www.Floof-batsuits.weebly.com	United Kingdom	floof-batsuits	58c05a3d-bb9c-43a7-8b19-8e22cc18a67d	4817a573-7b05-4b34-86b1-0f5e48abf2ef.png	2019-03-29 09:22:22.865157	2019-05-07 05:20:46.370559	234	Birmingham	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3880	Flowercity Fursuits	https://flowercityfursuits.yolasite.com/	United States	flowercity-fursuits	676b166a-8c21-44c5-ae10-3c803e7b00c2	7e45d4f7-be7e-48a8-9eb1-1460d0051f7b.png	2019-03-29 09:22:25.452696	2019-05-07 05:20:46.380727	235	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3881	Fluffenough Creations	https://www.furaffinity.net/user/fluffenoughcreations/	United States	fluffenough-creations	3f69bf34-b4c8-44e5-b7dd-a1c399036632	8d680691-14f5-4ad4-ac56-662800ee12bb.png	2019-03-29 09:22:28.731464	2019-05-07 05:20:46.390718	236	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3882	Fluffy Stuff Studio	https://www.furaffinity.net/user/fluffystuffstudio	United States	fluffy-stuff-studio	b7ad417f-843e-4f9c-9944-4e4ced388d28	e6e0cbe1-2926-45e3-89a5-c031b21e6146.png	2019-03-29 09:22:31.384254	2019-05-07 05:20:46.401173	237	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3883	Fluorescent Paw Works	http://libbygillette.wixsite.com/fluorescentpaw	United States	fluorescent-paw-works	ffea3fb3-1804-4394-8b17-5229577ce673	4ec07537-a4d3-4709-9fb1-3954a97cf6f7.png	2019-03-29 09:22:34.144413	2019-05-07 05:20:46.41122	238	Massachusetts	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3884	Forever Furry Creations	https://www.furaffinity.net/user/ffcreations/	Australia	forever-furry-creations	61a2ee86-e836-4698-a329-05c7f33ac5db	0a13b1b7-8028-45eb-93dd-56077a8ae1b2.png	2019-03-29 09:22:36.733678	2019-05-07 05:20:46.421784	239	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3885	Fossa Studio	https://www.furaffinity.net/user/FossaStudio	Poland	fossa-studio	26d9a941-982d-4e29-b466-21f567f41dfe	881a526f-6973-4ba0-9fab-1ff6478f9be7.png	2019-03-29 09:22:39.266274	2019-05-07 05:20:46.4316	240	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3886	Fox Convoy	http://www.furaffinity.net/user/foxconvoy	United Kingdom	fox-convoy	c1a767e3-3daa-4051-918b-46290d11ba57	531ad6ce-516e-4afc-a812-812f482f62ab.png	2019-03-29 09:22:41.562959	2019-05-07 05:20:46.442118	241	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3887	Foxes and More	http://foxesandmore.com/	United States	foxes-and-more	d805dab7-65e5-4974-9ac3-56baf92cfd12	66202ce2-55a9-4532-b239-c94654b844d3.png	2019-03-29 09:22:44.36746	2019-05-07 05:20:46.451786	242	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3888	Foxfairy	https://www.furaffinity.net/user/foxfairy	Chile	foxfairy	f2f4cfbd-90e5-4046-907d-62c9f7314841	c187251e-a138-4b56-b33f-57a1e7116443.png	2019-03-29 09:22:46.967142	2019-05-07 05:20:46.462096	243	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3889	Foxfeather	https://www.furaffinity.net/user/foxfeather/	United States	foxfeather	6a8f238c-2466-4d56-967c-58494722f304	8485fadb-e2b2-4d2a-8cdb-6b2ee229af1d.png	2019-03-29 09:22:49.481654	2019-05-07 05:20:46.47207	244	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3891	Foxysox Studios	https://foxysoxstudios.com/home.html	United States	foxysox-studios	89478e78-f269-4b7b-b36b-e93a7afbf5b2	29fae894-f267-47fa-a4a0-178c2ae212c6.png	2019-03-29 09:22:54.830419	2019-05-07 05:20:46.481997	246	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3892	Frazzles626	http://www.furaffinity.net/user/frazzles626/	United States	frazzles626	59db35ea-2440-4e4c-b7f6-38b6b2ee9b96	8f852a97-6deb-462a-bbcd-fd66909d84d9.png	2019-03-29 09:22:57.37573	2019-05-07 05:20:46.49199	247	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3893	Freakhound Studios	http://freakhoundstudios.com/	New Zealand	freakhound-studios	fa9c0152-67df-431c-875e-5ad49f0c9053	35f04497-fd0a-4d6c-bcc4-761d93532230.png	2019-03-29 09:22:59.961644	2019-05-07 05:20:46.501643	248	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3894	Freaksnow	http://www.furaffinity.net/user/freaksnow/	Netherlands	freaksnow	6c8a9a73-28af-4ac1-9516-72b8803c7b8f	24e3d075-2e7f-46b0-8e05-dfdb4de06c66.png	2019-03-29 09:23:02.583014	2019-05-07 05:20:46.511386	249	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3895	Freedom Spirit Creations	http://www.freedomspiritcreations.com/	United Kingdom	freedom-spirit-creations	2539a000-d411-4532-af4d-c52abfd061b8	e905ad4d-7c7c-49a1-8ad8-ff638cf41973.png	2019-03-29 09:23:04.819982	2019-05-07 05:20:46.521167	250	Ireland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3896	Freya Fox	http://www.furaffinity.net/user/FreyaFox/	United States	freya-fox	149c48de-018b-4054-a7b8-09acd82141a2	7a0462a0-d7e6-4895-a21b-94c677163313.png	2019-03-29 09:23:07.375023	2019-05-07 05:20:46.530994	251	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3897	Frostbite Fursuits	https://www.furaffinity.net/user/FrostbiteFursuits	United Kingdom	frostbite-fursuits	c4db9d10-0ab4-44bd-b205-2673b0c3982a	6a07e4e6-ce80-49e5-89ac-c9fbe67d375f.png	2019-03-29 09:23:10.642787	2019-05-07 05:20:46.541374	252	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3898	Fruitsuit Creations	http://fruitsuitcreations.wixsite.com/fruitsuits	United States	fruitsuit-creations	7eb1df61-f2b2-423e-bcb8-c54798e34439	48f4edb9-0dc9-4872-bea4-a154f3e124fb.png	2019-03-29 09:23:13.302807	2019-05-07 05:20:46.550887	253	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3900	Fun Fur All	http://fun-fur-all.com/	Canada	fun-fur-all	1e024edb-b75c-4db2-91b8-12f5ff68fbfa	252f6f75-efbf-4e66-a87c-28c34b1d17d7.png	2019-03-29 09:23:18.779556	2019-05-07 05:20:46.561065	255	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3901	Funky Soul	http://www.furaffinity.net/view/26836748/	United States	funky-soul	0a949bac-b329-4e8f-8203-255222215e44	45125e1d-dc91-4657-9f47-9c05d3c559e1.png	2019-03-29 09:23:21.321819	2019-05-07 05:20:46.571228	256	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3902	Funny Farm Makers	https://twitter.com/FunnyFarmMakers	United Kingdom	funny-farm-makers	26c5b443-59dc-4a6a-bd9e-bc37712aaef9	157d7f5e-e4b7-4bb0-ab15-16847cd12d5c.png	2019-03-29 09:23:23.931095	2019-05-07 05:20:46.580971	257	Chester	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3903	Fur and Feathers	http://www.furaffinity.net/user/furandfeathersfursuits/	United States	fur-and-feathers	91dceb07-41b7-4f87-b0fc-56f1760abe17	1a6dfcd8-0e68-487d-8562-f4fe61d87f4d.png	2019-03-29 09:23:27.413035	2019-05-07 05:20:46.591883	258	ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3904	Fur It Up	http://www.furitup.com/	United States	fur-it-up	9bdbd2ae-30c0-4e6a-8273-98b11f76024d	9f7522d3-167d-4537-ab89-b02953deb58d.png	2019-03-29 09:23:30.296428	2019-05-07 05:20:46.602432	259	Oklahoma	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3905	Fur The Win Studio	https://www.furaffinity.net/user/furthewinstudio	Canada	fur-the-win-studio	ee87de35-1e3b-4713-82fa-cc606436d5b6	5e378d98-412f-4afd-b3b9-efb417a91c96.png	2019-03-29 09:23:32.891285	2019-05-07 05:20:46.613308	260	Québec	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3906	Fur Your Dream	http://www.furaffinity.net/user/-narrow-	Germany	fur-your-dream	d1e069be-2e02-49c0-9df0-8db7de8985b6	55197935-4c2c-463a-900d-b623d0bcd8eb.png	2019-03-29 09:23:35.270732	2019-05-07 05:20:46.623713	261	Amberg	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3908	FurDelicious	https://www.furaffinity.net/user/FurDelicious	Denmark	furdelicious	433c31ca-77bb-4714-a3b6-e478795aacef	144a4979-c159-434c-ad0a-de5459094acf.png	2019-03-29 09:23:40.086763	2019-05-07 05:20:46.634119	263	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3909	Furducers	https://www.etsy.com/shop/CerbCraft	United States	furducers	50ec7221-ebb8-4506-a6f6-9e33d5439052	b1f6d385-106b-444e-ae3f-43645bae5005.png	2019-03-29 09:23:42.597964	2019-05-07 05:20:46.644269	264	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3910	Furensics Studios	http://www.furaffinity.net/user/furensicsstudios/	United States	furensics-studios	12b6f398-28d1-4e7d-b474-c81b45bebad2	a6fbaab7-7889-4577-93fd-e45fe8f4c727.png	2019-03-29 09:23:45.109407	2019-05-07 05:20:46.654293	265	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3911	Furever Wear Fursuits	https://www.facebook.com/FureverWearFursuits/	United States	furever-wear-fursuits	3e07e17e-2344-4547-930e-c7b5c7e6b84f	54399917-82a1-4d02-8916-e34e8878daeb.png	2019-03-29 09:23:47.576953	2019-05-07 05:20:46.664195	266	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3912	Furfancy Costumes	http://www.furfancycostumes.com/	United States	furfancy-costumes	b33e8469-556d-4fec-9f5b-9bf6e20c43f7	477d20cd-a757-4fff-a097-47af621aa018.png	2019-03-29 09:23:50.06201	2019-05-07 05:20:46.674559	267	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3913	Furfect Pit Studio	https://furfectpitstudio.webs.com/	United States	furfect-pit-studio	f6151326-3737-4187-870b-8de23bf86f4e	dd12f0ff-1fa2-415a-a28c-640f662858da.png	2019-03-29 09:23:52.771838	2019-05-07 05:20:46.683924	268	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3914	FurForge	https://www.furaffinity.net/user/furforge/	Germany	furforge	a8980775-2bcf-40ab-bbca-4aa3ca6b8910	13d462f5-0b3d-408f-bdfb-b26dfa4cbae6.png	2019-03-29 09:23:55.556915	2019-05-07 05:20:46.694235	269	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3915	Furfrontier	https://www.furaffinity.net/user/QueenHyena	United States	furfrontier	7ed9f6cf-85a2-47af-ba71-a710906773d3	84aaae92-a847-473b-ab71-d8fcc7f022f3.png	2019-03-29 09:23:57.802375	2019-05-07 05:20:46.704116	270	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3916	Furgen Studios	http://www.furaffinity.net/user/furgenstudios/	United States	furgen-studios	e3a2087d-3190-46c5-bd6c-1ff6846edf0a	ee1c1086-39b8-40db-bbd5-ba27c17fec35.png	2019-03-29 09:24:00.409702	2019-05-07 05:20:46.713931	271	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3917	Furhonor	https://www.weasyl.com/~furhonor	United States	furhonor	f9817b49-9501-4c7c-9c3c-4d9427372651	eb45f67a-f319-4881-b526-932aecf0181c.png	2019-03-29 09:24:03.022917	2019-05-07 05:20:46.724798	272	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3918	FurLaMascota	https://twitter.com/FurLaMascota	Mexico	furlamascota	6bbb1ad9-bd08-4b55-a17b-afbff9efd8a4	4b8f0b95-8360-4908-9a1b-d7079d4c9760.png	2019-03-29 09:24:05.584347	2019-05-07 05:20:46.735208	273	Puebla	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3919	FurR Club	http://furr.club/en/	Russia	furr-club	aa1373d1-bef9-42d9-ac0e-6f0f53e737b0	9b7cedb3-bdcc-4907-a3d6-2878f74df7c6.png	2019-03-29 09:24:08.642994	2019-05-07 05:20:46.744805	274	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3921	Furred Fantasies	https://www.furaffinity.net/user/furredfantasies	United States	furred-fantasies	9bf6b4dd-b323-47a9-891b-e772f8114e7d	2e8ea1af-cc6f-429b-a8ea-e647d898f320.png	2019-03-29 09:24:13.438403	2019-05-07 05:20:46.755862	276	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3922	Furred Out Kreations	http://furredoutkreations.wixsite.com/home	United States	furred-out-kreations	4908fee1-708f-423f-88fd-eddbd326aa4b	73059716-2959-43eb-9a04-a1fdaa43d49b.png	2019-03-29 09:24:16.023394	2019-05-07 05:20:46.765915	277	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3923	Furry Crossing Creations	http://www.furaffinity.net/user/kawaiixteddy/	United States	furry-crossing-creations	b16a353f-ce03-46f8-9571-cb405c4e505e	fd05dbbf-d30a-4bd0-bae4-de15308b4ff3.png	2019-03-29 09:24:18.519457	2019-05-07 05:20:46.776066	278	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3924	Furry Factory	https://www.furaffinity.net/user/furry-factory/	Poland	furry-factory	68a1173d-018a-4af3-981e-ffc4fc889983	03b9b552-dfc2-4d50-987d-5500ec3e8921.png	2019-03-29 09:24:21.090703	2019-05-07 05:20:46.786014	279	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3925	Furry Fursuit Maker	https://www.furaffinity.net/user/FurryFursuitMaker	Netherlands	furry-fursuit-maker	70149a59-4b5a-4560-bb2d-d40da6b4d827	190aa840-c8dd-4571-925d-9cf23e00b232.png	2019-03-29 09:24:23.49381	2019-05-07 05:20:46.796017	280	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3926	Furry Machine	http://www.furaffinity.net/user/furrymachine	Brazil	furry-machine	30f6e3bb-1b15-4b8d-be9b-e42365e54225	1ece816f-b742-44ad-9d69-8fb93e3f1fa5.png	2019-03-29 09:24:25.748337	2019-05-07 05:20:46.80665	281	Sao Paulo	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3927	Furry Squad	https://www.furaffinity.net/user/furry-squad	Russia	furry-squad	a8e1ce34-e307-4e8f-8c0c-dbfef5f9d12b	19302d25-05d8-4adb-831d-c2ff90429e5d.png	2019-03-29 09:24:29.117863	2019-05-07 05:20:46.816593	282	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3928	Furry Studio	http://furry-studio.com/en/	Russia	furry-studio	87dc3aba-39cb-407b-a4ed-a6f3f8f12c6e	be5cbada-07d9-49bb-862b-7930e51739a2.png	2019-03-29 09:24:31.453734	2019-05-07 05:20:46.826851	283	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3929	Furry Tailor	http://www.furrytailor.co.uk/	United Kingdom	furry-tailor	8cf01f5b-b386-4b14-a761-04374a1c88c5	09a09e8e-a78b-447a-812a-12fb66422244.png	2019-03-29 09:24:33.680965	2019-05-07 05:20:46.837259	284	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3931	Furry-K9	https://furry-k9.livejournal.com/	United States	furry-k9	12641fc0-d084-4435-9c9e-f379214da5c8	6e7ed957-0145-49e4-bbde-b7e6438884bc.png	2019-03-29 09:24:38.597594	2019-05-07 05:20:46.846921	286	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3932	Furryious	https://www.deviantart.com/furryiouswolf	United States	furryious	e17e7044-4e47-4e9f-acf4-3c424876642a	bc832111-0f36-4cf4-83ff-b68b8d3265cd.png	2019-03-29 09:24:41.128679	2019-05-07 05:20:46.857419	287	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3933	Fursewna Studios	http://fursewnastudios.weebly.com/	United States	fursewna-studios	53d2f71d-3c4a-4e90-9e22-ae8201f88492	6ad1d8bc-5a9d-4560-a3ef-6189ccc2a45c.png	2019-03-29 09:24:43.779362	2019-05-07 05:20:46.866868	288	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3934	Fursonalities	http://fursonalities.com/	United States	fursonalities	76990691-b070-4e85-8991-1b4ec516216f	5d1afadf-2b4c-41d0-908c-24e5ed127b4a.png	2019-03-29 09:24:46.420806	2019-05-07 05:20:46.876885	289	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3935	Fursuit Creations	http://www.fursuitcreations.co.uk/	United Kingdom	fursuit-creations	5cda14d6-456e-48a7-a749-5a0f1260d18c	93ebb9e3-1a40-4b1f-b1d7-719b48652b6a.png	2019-03-29 09:24:48.976528	2019-05-07 05:20:46.886984	290	London	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4109	Magnus Diridian	http://www.furaffinity.net/user/magnusdiridian/	United States	magnus-diridian	bde18e56-89b3-4302-acd9-68498c04f477	2b708918-4c45-4b29-8fde-6132fb8d8024.png	2019-03-29 09:32:31.375663	2019-05-07 05:20:52.820914	464	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3938	Fursuit Parade	http://fursuitparade.com/	United States	fursuit-parade	1ab803ff-d616-45b0-a182-9f373402a739	e5d4feb1-9bfb-4b62-8da2-2e05e14b2dad.png	2019-03-29 09:24:56.905052	2019-05-07 05:20:46.896912	293	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3939	Fursuit Up	https://www.fursuitup.com/home	Hungary	fursuit-up	e5eab15b-4068-4266-813d-359025bd08ab	43ada9a0-f91d-4aeb-b7f8-602bb09c27ef.png	2019-03-29 09:24:59.5533	2019-05-07 05:20:46.907504	294	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3940	Fursuits by Lacy	http://Fursuiting.com	United States	fursuits-by-lacy	ef79fcd4-9d63-45c0-9f77-cc8961f17346	7cae3d0a-784a-4b1a-919c-f90501f1a650.png	2019-03-29 09:25:01.942093	2019-05-07 05:20:46.917483	295	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3941	Fursuits by Mars	https://fursuitsbymars.weebly.com/	United States	fursuits-by-mars	e3f22ede-6d3e-4960-9609-f81bb9adc706	75b2af53-a828-4a4f-8262-ad62e3820930.png	2019-03-29 09:25:04.729073	2019-05-07 05:20:46.929963	296	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3942	FursuitsUK Creations	https://twitter.com/FurSuitsUK	United Kingdom	fursuitsuk-creations	cb472430-7c21-4288-aeff-4549d56b4796	be9f7fa8-48b4-495c-9871-0de7263e9152.png	2019-03-29 09:25:07.251817	2019-05-07 05:20:46.940063	297	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3943	Furtastic Studios	https://www.furaffinity.net/user/FurtasticStudios	United States	furtastic-studios	1383295e-2ad3-4f59-b051-0e56877c824d	9d6be1b0-6a0a-43c6-b74b-eaaa9d88782d.png	2019-03-29 09:25:09.7605	2019-05-07 05:20:46.949638	298	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3944	Furtic Studio	http://furtic-studio.wixsite.com/index	Japan	furtic-studio	ab20fc2b-a3ff-4b4b-ab1b-af90060779c5	9106be67-bfdf-4056-b3d5-05553e5c1be9.png	2019-03-29 09:25:12.244661	2019-05-07 05:20:46.960052	299	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3945	FuruArts	http://www.furaffinity.net/user/furuarts	United States	furuarts	cd6957c6-3370-4822-80e6-84a21e0b1e32	395e3407-71cd-498a-811f-a270634a7d39.png	2019-03-29 09:25:15.62514	2019-05-07 05:20:46.969659	300	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3946	FurZombie Studios	https://furzombiestudios.com/	United States	furzombie-studios	d4a08d87-271e-4687-b5ee-2dcff92d3ab1	61f9aec3-a2e3-4df3-bef2-b823af8032c8.png	2019-03-29 09:25:18.263352	2019-05-07 05:20:46.986249	301	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3947	Fuzz Butt Fursuits	https://www.fuzzbuttfursuits.com/	United States	fuzz-butt-fursuits	7259b5e9-0d0b-47b2-a287-361eb0774fd3	28ff0211-d087-4f78-9d53-32cd86b642e9.png	2019-03-29 09:25:20.877305	2019-05-07 05:20:46.996844	302	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3948	Fuzzworks	https://www.furaffinity.net/user/FuzzWorks	United States	fuzzworks	fa976e84-e0ec-4741-be98-2a41cf5e043d	418badd8-d60d-4999-bcdf-be2fc6b37de0.png	2019-03-29 09:25:23.384442	2019-05-07 05:20:47.007643	303	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3950	Fuzzy Fur Creations	https://twitter.com/Dearly_doo	Netherlands	fuzzy-fur-creations	4afc2ddf-2948-4894-867e-81a4b715008b	a40798d3-a9dd-476e-85c5-8faded18b5b9.png	2019-03-29 09:25:28.469613	2019-05-07 05:20:47.017428	305	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3951	Gaderian Wolf Fursuits	https://www.furaffinity.net/user/gaderian-wolf/	United States	gaderian-wolf-fursuits	846ef2bd-3c98-4d2a-892e-5d81e885102b	d63bae59-8596-489b-b905-e7f5ff70bd5b.png	2019-03-29 09:25:30.997709	2019-05-07 05:20:47.027226	306	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3952	Galaxy Wolf Creation LLC	http://www.galaxywolfcreations.com/	United States	galaxy-wolf-creation-llc	ddbe7209-c723-48cb-841b-734123193614	b9131a6a-c9f4-4935-82a2-29b279cf21d3.png	2019-03-29 09:25:33.790452	2019-05-07 05:20:47.037461	307	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3953	Galesmilax	https://galesmilax.sofurry.com/	United States	galesmilax	c1e0909e-15ff-43cf-b817-c2a1a9ac4d57	65dec7cb-ed30-481d-98d5-c553531362f7.png	2019-03-29 09:25:36.767737	2019-05-07 05:20:47.048065	308	Mississippi	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3954	GEEKpaw Productions	https://www.furaffinity.net/user/geekpaw	United States	geekpaw-productions	f2eb85e0-29c9-4ceb-b3d6-59e8d4942bc2	f2afcf74-a44c-4c06-832f-b421a036d611.png	2019-03-29 09:25:39.270368	2019-05-07 05:20:47.058255	309	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3955	Ghostwoodcreations	http://www.ghostwoodcreatures.com/	United States	ghostwoodcreations	01e88827-9e93-41bd-811e-d8048e7c8a3c	11c595cf-114c-4451-9e73-b8dcdb3af1e1.png	2019-03-29 09:25:41.809906	2019-05-07 05:20:47.067832	310	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3956	Gitz	https://www.furaffinity.net/user/gitz/	United States	gitz	e3f1631f-40af-4341-91d6-c81bba4addda	d01fa2ab-809c-47f6-b514-e3292c968c71.png	2019-03-29 09:25:44.390918	2019-05-07 05:20:47.077865	311	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3957	Glow Fox Studios	https://twitter.com/GlowFoxStudios	United States	glow-fox-studios	078b1db8-87ac-411e-9114-951321a8ecea	bbdd89c2-98a0-40e2-833d-8ea05dc7742f.png	2019-03-29 09:25:47.08827	2019-05-07 05:20:47.087945	312	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3958	Glow Sheep	https://www.deviantart.com/glowsheep	United States	glow-sheep	4a8bc8ac-0233-4996-886e-28da42cf25b7	7857acf4-efee-4b3f-8e1c-e14b39631977.png	2019-03-29 09:25:49.829996	2019-05-07 05:20:47.098047	313	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3959	Go Fur It Studios	https://gofurit.co.uk/	United Kingdom	go-fur-it-studios	1abab4f4-b353-4138-a80f-830364c4ab46	8281adba-26f4-4eb6-8fb0-c5ca9c23ceb3.png	2019-03-29 09:25:52.354134	2019-05-07 05:20:47.108396	314	Peterborough	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3961	Golden Maw	https://www.goldenmaw.com/	United States	golden-maw	8d0e363f-679f-40b2-9d27-b7e5ba133f4a	68a731b0-43eb-4383-8fd8-986551308b21.png	2019-03-29 09:25:57.498797	2019-05-07 05:20:47.118071	316	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3962	Goldmouse Studios	https://twitter.com/GoldMouseStudio?s=09	United States	goldmouse-studios	7743cf60-0d7f-4b3a-9a49-e71502c1492c	d7ceb9c9-92de-481a-a01f-9b2deb4f5205.png	2019-03-29 09:26:00.131642	2019-05-07 05:20:47.128093	317	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3963	Goose Mom	https://www.facebook.com/TheGooseChaseFursuits/	United States	goose-mom	63189154-c325-4278-9111-50337de7de76	bcb0f374-9655-469a-8685-3857d997bd18.png	2019-03-29 09:26:02.977207	2019-05-07 05:20:47.13867	318	Arkansas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3964	Graveyard Stuffers Suits	https://www.furaffinity.net/user/GraveyardStuffers	United States	graveyard-stuffers-suits	af26d8dd-ae44-4e6b-950f-70b6059ac34a	a0f6952f-9a39-4c87-95e5-003d3ff4b7d6.png	2019-03-29 09:26:05.721918	2019-05-07 05:20:47.148551	319	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3965	GrayREALM Studio	https://www.grayrealmstudio.com/	United States	grayrealm-studio	682d92dd-3406-4060-9613-1e124e40679f	88c05ae0-e3b9-4a11-84f1-3252d1532b28.png	2019-03-29 09:26:08.314881	2019-05-07 05:20:47.159163	320	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3966	Greyfox Workshop	https://www.instagram.com/greyfoxworkshop/	United States	greyfox-workshop	2f836787-ad6f-4c65-813e-be42bd736abb	7268aa3d-988f-4e08-a420-df9bccc052da.png	2019-03-29 09:26:10.826635	2019-05-07 05:20:47.169574	321	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3967	Grinning Tiger Disorder	http://gtdstudio.wixsite.com/gtdstudio	Finland	grinning-tiger-disorder	116a4134-4cfd-4162-83b3-5dae265dfb75	05bdfa47-8ca2-4774-b97d-ac966824fa34.png	2019-03-29 09:26:13.363696	2019-05-07 05:20:47.179302	322	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3968	Gronway Commissions	https://www.furaffinity.net/user/grontalis/	United States	gronway-commissions	dc5e1cbd-0646-4f4c-8715-fd81ed206e1e	ea53e195-9781-4ecb-9f58-1ffbbcb6a64e.png	2019-03-29 09:26:15.581177	2019-05-07 05:20:47.190156	323	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3969	GroovyGoat Costumes	https://www.groovygoatcostumes.com/	United Kingdom	groovygoat-costumes	28946cdc-f313-4197-92bb-764a252bbcaa	11021f74-e74a-4029-8343-aea9ca34b8cc.png	2019-03-29 09:26:18.371278	2019-05-07 05:20:47.200082	324	Oxford	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3970	Grotto Creations	http://www.grottocreations.com/	United States	grotto-creations	b6573c38-efcf-4e8f-b445-d970e48aedba	6ce320f1-6ef8-4893-a379-818dad1aa012.png	2019-03-29 09:26:20.90551	2019-05-07 05:20:47.210736	325	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3971	Grove City Fursuits	https://www.instagram.com/grovecitysuits/	United States	grove-city-fursuits	dc603663-4e61-481f-8147-aaeb278fb8e7	7255b5cc-8f4b-4339-af9e-8efdad8264ab.png	2019-03-29 09:26:23.346267	2019-05-07 05:20:47.220677	326	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4130	Mini Boss Mascots (Marshmallowe)	https://www.furaffinity.net/user/Marshmallowtwirl	United States	mini-boss-mascots-marshmallowe	4fcc4820-d935-4331-9eb2-482d5c765cf0	7c7e1332-23be-435c-8871-5d36b642bb00.png	2019-03-29 09:33:26.756139	2019-05-07 05:20:52.851097	485	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3974	Halfblood Creatures	https://www.facebook.com/alteredcreatures/	Italy	halfblood-creatures	05cf5374-24d6-40f4-89df-68d79f9243f6	653636b7-24cc-41e1-9ddc-b75feb610af3.png	2019-03-29 09:26:30.913246	2019-05-07 05:20:47.232005	329	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3976	Harvey Manki Kang Cat	https://twitter.com/1366314389M	China	harvey-manki-kang-cat	2fbf6ddd-9c04-447d-b483-e82d03a89925	010aebd7-f0a7-4b4e-8eca-8ea870bb0c1a.png	2019-03-29 09:26:35.838167	2019-05-07 05:20:47.242799	331	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3977	Hawthorn	http://www.furaffinity.net/user/hawthorn	Germany	hawthorn	2e35733e-144e-48a0-ba0b-fc92eaef39ae	5261f090-ae07-4f5d-b6da-44783e4a9ef9.png	2019-03-29 09:26:38.341636	2019-05-07 05:20:47.252676	332	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3978	Haz Studio	http://www.furaffinity.net/user/haz-studio	Canada	haz-studio	9813be57-43fc-4451-87d7-1672ec8de53d	48b81ac4-cf25-4b5b-9628-cba1f28550c4.png	2019-03-29 09:26:40.7284	2019-05-07 05:20:47.262995	333	Rimouski	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3979	Head Over Tails	https://www.furaffinity.net/user/kazumadiran/	United Kingdom	head-over-tails	fa22cca3-b2c8-4805-9569-963f0094b5f9	8817486d-949d-4c22-8bbb-c89df760c1f1.png	2019-03-29 09:26:43.176613	2019-05-07 05:20:47.274491	334	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3980	Headless Hare Creations	https://headlessharecreations.weebly.com/	United States	headless-hare-creations	c66a6e54-6c9d-4eb3-a106-d518a0af57a8	2eb4d822-a130-4886-a62b-32e65aceb0e3.png	2019-03-29 09:26:45.788152	2019-05-07 05:20:47.285615	335	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3981	Heads and Tails Studio	http://www.furaffinity.net/user/headsandtailsstudios/	United States	heads-and-tails-studio	03b7c45c-2cbb-4bb2-81ac-25abb874f89d	b2abf16c-0519-4b01-baae-7820f134f326.png	2019-03-29 09:26:48.406244	2019-05-07 05:20:47.296366	336	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3982	HeckGeck	https://madisonholbrook97.wixsite.com/heckgeck	United States	heckgeck	c358fa05-3545-43c1-850f-4acdb5bcf9b0	37296b4a-1497-4602-9a22-5c3f568b13d6.png	2019-03-29 09:26:52.343002	2019-05-07 05:20:47.30695	337	Virginia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3983	Hell Charm	https://hellcharm.weebly.com/	Germany	hell-charm	7fb3a426-d4c0-41e8-8b65-7338b997d1ee	a18c2c08-5f90-432a-a5f7-3dee69b89dfc.png	2019-03-29 09:26:55.010159	2019-05-07 05:20:47.316997	338	België	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3984	Hidden Arts	https://www.deviantart.com/merkindesr/	United States	hidden-arts	e769723b-e6b0-41c3-9e15-6e4fc39a20ac	36526138-e2b4-40a1-b27f-f2a765385332.png	2019-03-29 09:26:57.260888	2019-05-07 05:20:47.328686	339	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3985	Hidden Treasury	http://www.hiddentreasury.com/	United States	hidden-treasury	86cbe033-4fcb-43a2-86c8-1f70dc7e4dc5	557834d7-5e0e-4049-a7c5-7be2cb9c9ca9.png	2019-03-29 09:26:59.792025	2019-05-07 05:20:47.33984	340	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3986	Hiero Craft Creations	https://www.facebook.com/HieroCraftCreations	United States	hiero-craft-creations	11be7e37-6cb7-4d7e-9837-e7d0a8c236aa	7b194b21-5e9d-4db1-aaee-677ee30a2fd3.png	2019-03-29 09:27:02.697112	2019-05-07 05:20:47.351465	341	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3987	Hikarinaka (DKAG)	https://vk.com/dolls_kingdom_ag	Russia	hikarinaka-dkag	355be081-69f0-45ea-a1bf-c40a317ea7a8	1c482012-83c6-4559-b494-4fdd9b08befe.png	2019-03-29 09:27:05.555952	2019-05-07 05:20:47.361938	342	St Petersburg	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3988	HoneyspydeR	https://www.deviantart.com/honeyspyder	United States	honeyspyder	7c4743d0-6468-472c-9959-d6a897412918	1f3b5101-bb6c-46af-8fa8-5a32e9848fa2.png	2019-03-29 09:27:07.83687	2019-05-07 05:20:47.373532	343	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3990	Hooskydawg Fursuits	http://meganthehusky.wixsite.com/hdfursuits	United States	hooskydawg-fursuits	dd37fdd0-83d9-402f-ab75-e13617be2527	7c6f49fd-cd26-4b4f-9869-94f84de3e263.png	2019-03-29 09:27:13.296725	2019-05-07 05:20:47.38329	345	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3991	Hounds Teeth	https://www.hounds-teeth.com/	United States	hounds-teeth	0831ba4b-6f8d-4f8b-b951-f02f4c614e97	58daf3e5-a64e-4d27-b55d-c457b6738509.png	2019-03-29 09:27:15.932745	2019-05-07 05:20:47.393263	346	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3992	Hunters Creations	https://twitter.com/Darkarcangel73	Canada	hunters-creations	1a63afbc-a2f0-4e62-b02c-03050f5b1f91	bb5c37cf-f0a2-4182-bb49-576801087981.png	2019-03-29 09:27:18.56989	2019-05-07 05:20:47.402984	347	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3993	Husky Moo Creations	https://www.furaffinity.net/user/huskymoocreations	Denmark	husky-moo-creations	28679b79-3fbb-4afc-bd8c-cdfcf4fc1c05	c6ff1281-a141-4fde-83e2-c311e134d2cd.png	2019-03-29 09:27:21.104769	2019-05-07 05:20:47.413504	348	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3994	Hybrid Studios	https://www.furaffinity.net/user/hybridstudios/	United Kingdom	hybrid-studios	febcdb21-4c43-409a-b1ce-09b6dbae11b0	d858a115-9c12-4267-9563-13d692fef582.png	2019-03-29 09:27:23.350522	2019-05-07 05:20:47.424135	349	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3995	Hyena Girl	https://www.furaffinity.net/user/hyenagirl	United States	hyena-girl	71a8ea81-91b9-4c82-bfd0-c446b1ef12e8	06d86984-d967-4e44-874e-7e914ceff0dc.png	2019-03-29 09:27:27.219852	2019-05-07 05:20:47.433732	350	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3996	Hyena Hoy	http://hyenahoy.weebly.com/	United States	hyena-hoy	69f87135-9c5b-4f69-89bc-f1bffd57271b	94e755d9-198c-4c16-a5ac-2fb7c04e9c1a.png	2019-03-29 09:27:29.771569	2019-05-07 05:20:47.443947	351	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3997	Hyokenseisou	https://www.deviantart.com/hyokenseisou-cosplay/	Canada	hyokenseisou	8ad60deb-e41c-466b-a715-cee8d1892416	49bee272-8459-465f-88fc-b20e33ea0e75.png	2019-03-29 09:27:32.428373	2019-05-07 05:20:47.453422	352	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3998	Ichi	http://www.furaffinity.net/user/ichiblack	United States	ichi	e580f26d-764d-45aa-8ed7-60dd2f14ad41	2262d275-573b-4781-a270-763867fe1d10.png	2019-03-29 09:27:34.848234	2019-05-07 05:20:47.463038	353	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4000	IJustLoveStuff	https://twitter.com/IjustLOVEstuff?lang=en	Slovakia	ijustlovestuff	6f40b0b3-eff1-408b-adff-d8cb7faad2ea	91243407-27c5-4df7-9bc7-de2cc19f2bf4.png	2019-03-29 09:27:40.234591	2019-05-07 05:20:47.473397	355	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4001	Illimearu	https://www.furaffinity.net/user/illimearu/	United States	illimearu	0ff630cf-ea97-4a61-9bae-5562c8f672d5	4eb0a1d3-32e2-4534-965a-9b0eebce95bb.png	2019-03-29 09:27:42.641126	2019-05-07 05:20:47.483312	356	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4002	Inajiffy Creations	https://inajiffy-creations.weebly.com/	United States	inajiffy-creations	b5777871-0209-4e99-a734-590914e15eaf	57fd2750-999c-4ad9-8d75-e9eb585c4715.png	2019-03-29 09:27:45.22669	2019-05-07 05:20:47.494354	357	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4003	Inerri Creatures	https://www.furaffinity.net/user/frostizoo/	France	inerri-creatures	4083b2de-0eba-4337-96bc-61f62ccdef5d	a6a93933-b535-47f5-87e0-bb19a960e18b.png	2019-03-29 09:27:48.257087	2019-05-07 05:20:47.503868	358	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4004	Inkfire	https://www.furaffinity.net/user/inkfire/	Australia	inkfire	32956d3f-3b29-406a-ab10-627eea5c5e0e	56f91e8a-aa09-4935-a761-1ba89d3134af.png	2019-03-29 09:27:50.535102	2019-05-07 05:20:47.514537	359	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4005	Irinae	http://www.furaffinity.net/user/irinaecreation	Belgium	irinae	c3de860c-adcd-4586-996a-00b6b277b6ec	4838296d-b2a8-4a24-a5af-b1119d471b9d.png	2019-03-29 09:27:53.053456	2019-05-07 05:20:47.525297	360	Liège	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4006	Isabelapparel	http://www.furaffinity.net/user/isabelapparel/	Canada	isabelapparel	1dad7a80-112a-4da2-8856-961514457430	5c446f64-ca0d-482a-a284-2667d1607e9d.png	2019-03-29 09:27:55.298589	2019-05-07 05:20:47.534492	361	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4007	Isabella Price	http://www.furaffinity.net/user/isabellaprice/	United States	isabella-price	1441c6c7-51e7-4faa-a7df-eeaf3288a720	7d17d34f-6bdc-411f-b256-a524a012cd5b.png	2019-03-29 09:27:57.724115	2019-05-07 05:20:47.544442	362	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4009	Itallonova	https://www.furaffinity.net/user/itallonova/	United States	itallonova	cb04dfe1-9b24-4fc6-a4c3-a1a2e3bd22f3	acc070c9-4ffd-4556-9747-6fd2706c6ab9.png	2019-03-29 09:28:02.832368	2019-05-07 05:20:47.564531	364	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4011	Jax the Purple Bat	http://www.furaffinity.net/user/jax/	United States	jax-the-purple-bat	3bce99e1-c6f3-4ab2-baea-7eb24b3d3945	d2258165-d766-4eb9-8ca1-5dc01798e837.png	2019-03-29 09:28:08.586825	2019-05-07 05:20:47.574944	366	Massachusetts	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4013	Jello Vair	https://www.furaffinity.net/user/jello-vair/	Canada	jello-vair	fa9376f1-b4cf-4231-b336-bf0116ca66c9	9306bf78-7fd1-4e88-8041-835df17ad2ad.png	2019-03-29 09:28:13.661132	2019-05-07 05:20:47.585027	368	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4014	Jenetixx' Creations	https://www.facebook.com/JenetixxCreations/	United States	jenetixx-creations	f530c70e-2f56-4f54-8eac-04548a096f87	2e33d39c-dbd1-476f-b010-7fb63eba00aa.png	2019-03-29 09:28:16.035983	2019-05-07 05:20:47.594823	369	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4015	Jesse Frosst	https://twitter.com/JesseFrosst	Canada	jesse-frosst	0d7b3f80-c994-4ce3-a70c-0cd081bb2db7	47bab2bd-5704-4fd3-8285-a2c98afb64e9.png	2019-03-29 09:28:18.515315	2019-05-07 05:20:47.60842	370	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4016	Jill Costumes	http://www.jillcostumes.com/	United States	jill-costumes	a7330953-4526-4269-ba84-c613ced96b6b	08db66b0-7756-4c8d-85c2-44d134d65196.png	2019-03-29 09:28:21.054834	2019-05-07 05:20:47.618909	371	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4017	Jive (Crowbait)	https://www.furaffinity.net/user/crowbait/	United States	jive-crowbait	91a2da6f-9f02-46ee-a490-43deacaf3004	8afd4e7a-3274-4452-bfe3-5eaade1fe9dc.png	2019-03-29 09:28:23.610608	2019-05-07 05:20:47.628744	372	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4018	JjreamBig	http://www.furaffinity.net/user/jjreaming	United States	jjreambig	030722f8-b9e8-4efc-a66d-971dbe6c2841	2120129d-4343-4ede-860a-ded51d25c694.png	2019-03-29 09:28:26.077122	2019-05-07 05:20:47.638999	373	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4019	Johara	https://www.furaffinity.net/user/johara	Canada	johara	8b8c58c9-b1d8-4113-8391-165091d404c4	b91f96d8-5bd6-4be3-be6c-581b6e2ead75.png	2019-03-29 09:28:28.582655	2019-05-07 05:20:47.649002	374	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4020	Jpupbob	https://www.furaffinity.net/user/jpupbob/	United States	jpupbob	0240c2f8-ae7e-438f-b512-9d715e269cd7	f0121e1e-b399-48fd-a085-828954e73d49.png	2019-03-29 09:28:31.000599	2019-05-07 05:20:47.659416	375	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4021	Just a Dragon Creations	http://justadragoncreations.com/	United States	just-a-dragon-creations	a132e69e-6ffe-4354-ae70-6c7b6a0deda2	cc24f1e5-fdc8-4a93-8dc6-153e3acee329.png	2019-03-29 09:28:33.537214	2019-05-07 05:20:47.669554	376	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4022	Just Fur Kicks	https://www.furaffinity.net/user/just-fur-kicks	United States	just-fur-kicks	29e14ef0-a24f-4678-a4bf-cee175de603b	af3d93b1-437d-4cd5-8e37-c28453256fdf.png	2019-03-29 09:28:36.290099	2019-05-07 05:20:47.679686	377	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4023	K-Line	https://www.furaffinity.net/user/kemono-line/	Japan	k-line	94fcd4b4-d5c7-463a-9322-84ff18d03958	26115d35-aee3-427d-80d6-3234782b0639.png	2019-03-29 09:28:38.818869	2019-05-07 05:20:47.690106	378	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4024	Kaibab Costumes	https://sites.google.com/site/kaibabcostumes/	United States	kaibab-costumes	2194f49a-1c57-41b1-bab6-46553a9a774b	c79de4b6-34b3-411a-82bd-b9484d493310.png	2019-03-29 09:28:41.196812	2019-05-07 05:20:47.699795	379	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4025	Kaiborg Studios	https://twitter.com/KaiborgStudios	United States	kaiborg-studios	61c27d63-8f28-44f4-9fda-f9978845138d	40c212ee-d8cc-432d-b7e9-fe0d1672540e.png	2019-03-29 09:28:43.701145	2019-05-07 05:20:47.709972	380	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4027	Kaiju Costumes	https://www.kaijucostumes.com/	United States	kaiju-costumes	721d7275-1293-4912-8f8f-5ba720f1a925	f8bee7f1-e0a3-4513-8844-c5d07da2434b.png	2019-03-29 09:28:48.787801	2019-05-07 05:20:47.720674	382	Cascadia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4028	Kaijugal	https://kaijugal.livejournal.com/	Canada	kaijugal	7fb1ccba-1a0c-4d32-ab16-05900a774355	b541b387-bc44-44a0-92ea-155863e5f5db.png	2019-03-29 09:28:51.371056	2019-05-07 05:20:47.730538	383	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4029	Kandorin Creations	http://www.furaffinity.net/user/keeatah	United States	kandorin-creations	99d4ed97-97cc-4e74-ad3c-b9c6461e8436	b7a63423-e7dc-4e85-af5b-dd82f1197fec.png	2019-03-29 09:28:53.737657	2019-05-07 05:20:47.741256	384	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4030	Kangaroo Feathers	http://furaffinity.net/user/KangarooFeathers	United States	kangaroo-feathers	eceff74f-b7af-4ca6-8fc0-3aeda1d27dbb	eb94258d-e118-4288-b8dd-25029e555aaf.png	2019-03-29 09:28:56.240545	2019-05-07 05:20:47.750813	385	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4031	Kangaroo Reef Mascots	https://m.facebook.com/Kangarooreefmascots/	United States	kangaroo-reef-mascots	9cb76238-26cc-4963-935b-bdac29d381e8	1fba57ef-f8da-4c95-aeb0-6999a524ea55.png	2019-03-29 09:28:58.753139	2019-05-07 05:20:47.760809	386	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4032	Kani n' Hyacin Productions	https://kaninhyacin.weebly.com/	United States	kani-n-hyacin-productions	5ca78464-45a1-4c05-aee6-4d5009af583f	363dbac0-7d71-4e0c-bff8-b71923fe3afe.png	2019-03-29 09:29:01.334866	2019-05-07 05:20:47.770447	387	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4033	Kara Cat Creations	http://www.furaffinity.net/user/karacatcreations/	United States	kara-cat-creations	f8a981b7-3508-491d-ae18-1cfb874d7ea2	92fb7b78-e383-4ea7-8d58-9292baf87e86.png	2019-03-29 09:29:07.031004	2019-05-07 05:20:47.780551	388	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4211	Pawgazer	https://www.pawgazer.com/	United States	pawgazer	e252b456-a60b-4388-866e-af8dcbee34a7	1f6c9ede-2797-43d1-98cd-76cbfd725a25.png	2019-03-29 09:36:59.187369	2019-05-07 05:20:47.791344	566	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4034	Karthegrax	http://www.furaffinity.net/user/karthegrax	Australia	karthegrax	552da37a-9cef-4453-8607-e648b58f57aa	89bd9a7e-9399-43a4-ab16-809a88947029.png	2019-03-29 09:29:09.523426	2019-05-07 05:20:47.800902	389	Queensland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4035	Kawaii Vixen	http://www.furaffinity.net/user/kawaiivixen/	United States	kawaii-vixen	c48f9076-c70b-42f6-bf2b-4998c1dc3403	5a215154-99a4-45b8-89a2-5d6bbee38139.png	2019-03-29 09:29:12.142587	2019-05-07 05:20:47.810666	390	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4036	Kayla's Kritterz	https://www.furaffinity.net/user/bluewolfcheetah/	United States	kayla-s-kritterz	6d472dd8-5685-4680-be6d-da0d6bca4683	2945d54b-f536-42ed-9480-f3fd474309c0.png	2019-03-29 09:29:14.63037	2019-05-07 05:20:47.820993	391	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4037	KaZ Fursuits	https://twitter.com/KaZFursuits	Germany	kaz-fursuits	ecde9065-5f6d-4533-8b65-dc0720d8d32c	090d4419-62cf-4eb1-a2ce-3d3f389a13e6.png	2019-03-29 09:29:17.172001	2019-05-07 05:20:47.830606	392	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4038	Kazulgfox	https://www.kazplay.com/	United States	kazulgfox	77f9749e-78d5-406a-8f3c-0eda9cee819c	a49d9381-e900-4d17-8ea2-b139a2baf69f.png	2019-03-29 09:29:19.573318	2019-05-07 05:20:47.841045	393	Utah	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4040	Kazy Cat Creations	https://www.kazycatcreations.com	United States	kazy-cat-creations	3555a425-8eeb-4408-ad66-903864eaed8e	9f6451e0-7dba-4ed0-be92-c42963fb9702.png	2019-03-29 09:29:24.798759	2019-05-07 05:20:47.850576	395	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4041	KC Costumes	https://www.kc-costumes.com/	United States	kc-costumes	80f5e43b-df66-4ed8-91d8-830576efb8fd	012107fd-9d92-46e7-9a40-53d973a1dd0a.png	2019-03-29 09:29:27.361875	2019-05-07 05:20:47.860974	396	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4042	Keeper of Dreams	https://keeperofdreams.livejournal.com/	United States	keeper-of-dreams	24268a15-8265-4c6e-92c1-3f3fce08cf1a	d3a1a740-ec64-4430-980b-d3c03bc30cd0.png	2019-03-29 09:29:30.688546	2019-05-07 05:20:47.870699	397	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4043	Kegawa Creation	http://www.kegawacreation.de/?lang=en	Germany	kegawa-creation	c34ec520-5690-4215-b208-a3534fcf0a0d	cbd88f57-54b0-46f6-8009-e378ff8bf164.png	2019-03-29 09:29:33.255427	2019-05-07 05:20:47.880479	398	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4044	Keiko Vixen	http://www.furaffinity.net/user/floxxylady/	United States	keiko-vixen	d8ef6514-1377-4f19-b843-670596b8adac	77938b6b-32fd-4396-a61b-b29544d14c92.png	2019-03-29 09:29:35.416347	2019-05-07 05:20:47.891076	399	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4045	Keira Blacktalon	https://www.deviantart.com/fleech-hunter/	United States	keira-blacktalon	07c42491-042a-4a18-a66b-17921b29f5b2	49198173-a2c5-4156-b3c7-a87644054efa.png	2019-03-29 09:29:38.045649	2019-05-07 05:20:47.900473	400	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4047	Keto Fursuits	http://www.furaffinity.net/user/keto-schneider/	Brazil	keto-fursuits	ac03565b-2834-477e-a1f6-d769b7496781	e4b8b2b8-5909-45c8-adff-ba4c67368b6a.png	2019-03-29 09:29:43.452954	2019-05-07 05:20:47.910402	402	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4048	Keyoki	https://twitter.com/keyoki	United States	keyoki	de6fcfc3-a4c8-4aa2-9620-eb8784c92e01	6782ef89-7332-4ad9-82b3-8707600c8785.png	2019-03-29 09:29:46.009342	2019-05-07 05:20:47.921666	403	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4049	Keyoto	https://www.deviantart.com/sasukeharber	United Kingdom	keyoto	3fce78b6-98ce-4acd-a999-216e72b95ed2	47d63af3-6dea-4efa-81f1-aa6d5e2b96a6.png	2019-03-29 09:29:49.585669	2019-05-07 05:20:47.931779	404	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4050	Kilcodo Costumes	http://www.kilcodocostumes.com/index.htm	United States	kilcodo-costumes	6d4761d6-692d-4129-a18a-509b62b1774c	e6fea931-e082-4d66-98f6-33b1948fddc1.png	2019-03-29 09:29:52.357712	2019-05-07 05:20:47.942565	405	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4051	Kimba Snowpaw	http://www.furaffinity.net/user/kimbasnowpaw/	United States	kimba-snowpaw	ab07e397-5e93-4c43-b50e-35dd40227727	e85d186a-b86e-4248-94ee-f1e7d83ae437.png	2019-03-29 09:29:55.149049	2019-05-07 05:20:47.95302	406	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4052	Kinghime	https://www.furaffinity.net/user/kinghime/	United States	kinghime	8fd6bec8-bbfa-4fc7-b886-cd3702fe3e29	b4a42c17-bacc-47cf-bc2c-4f8727dc7bfd.png	2019-03-29 09:29:57.671494	2019-05-07 05:20:47.962823	407	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4053	Kinred Fox	http://www.furaffinity.net/user/kinredfox	Mexico	kinred-fox	fa8d892f-ded1-4219-a856-345a2caafc8c	6b4c673d-3701-4d2d-97ea-4e19fdbf9801.png	2019-03-29 09:30:00.27157	2019-05-07 05:20:47.972408	408	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4054	Kisu	https://twitter.com/KisuPantteri	Finland	kisu	ed118dfb-db1c-427e-b3d5-18d23253b3cb	5198a067-525a-4e3b-96dd-1f6993b58502.png	2019-03-29 09:30:02.829795	2019-05-07 05:20:47.982463	409	Helsinki	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4055	Kitsune Illusions	http://www.kitsuneillusions.com	United States	kitsune-illusions	793ac7f7-9b8d-422d-ac9d-2c90f2fe8948	4ba7c1b9-b724-466d-85aa-a3b57ab0befd.png	2019-03-29 09:30:05.359066	2019-05-07 05:20:47.992363	410	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4057	Kitsunerawr	https://www.furaffinity.net/user/kitsunerawr/	Venezuela	kitsunerawr	4f85f27a-9544-433c-befb-548fe5cf1c3c	9d4b7da1-2192-4e98-8ddc-2cf13a6bddb4.png	2019-03-29 09:30:10.823999	2019-05-07 05:20:48.002747	412	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4058	Kitt Creations	https://www.furaffinity.net/user/kittcreations/	United States	kitt-creations	b26c0b2a-f5e1-44f1-a284-c27387f4e03b	a8f046b5-26ff-48ac-8c3c-b232c119196e.png	2019-03-29 09:30:13.383138	2019-05-07 05:20:48.012776	413	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4059	Kitty Fluff Costumes	http://www.kittyfluff.de/	Germany	kitty-fluff-costumes	472b0397-2e45-4748-a010-8ed85a47e453	8d4f1036-3f8e-45d0-a5aa-b3cec15e95b1.png	2019-03-29 09:30:15.990435	2019-05-07 05:20:48.023046	414	Leipzig	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4060	Kiwihunter	http://www.furaffinity.net/user/kiwihunter8/	United States	kiwihunter	c7cc2c01-8e2e-4f45-b55b-826f77aa4480	ab9d0d16-0bfa-4ece-95d4-32f36938b709.png	2019-03-29 09:30:18.952269	2019-05-07 05:20:48.033601	415	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4061	Klickitat Matrices	https://twitter.com/malytwotails	United States	klickitat-matrices	2c55f82f-8358-4f13-9c48-8311cc0aa067	983cb5fd-d4c6-4c57-a88a-904a6b2c34ce.png	2019-03-29 09:30:21.750568	2019-05-07 05:20:48.043738	416	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4062	Kloofsuits	https://www.kloofsuits.co.uk/commissions	United Kingdom	kloofsuits	ea3a5930-480d-4982-931e-1c5a38440386	4deb8e2f-8934-4652-a0e2-fb9a5ef788af.png	2019-03-29 09:30:24.539389	2019-05-07 05:20:48.053988	417	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4063	Knossos	http://www.furaffinity.net/user/knossos/	United States	knossos	308e9b28-9120-4921-8a24-d7e15829c05b	e30f9b69-c3fe-489e-9a17-760c412a07cd.png	2019-03-29 09:30:27.247544	2019-05-07 05:20:48.064089	418	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4064	Kodi Fursuits	https://www.kodimade.com/	United States	kodi-fursuits	b60441e5-6220-4b21-8dac-e96022e88cad	dd551c61-67fd-429b-a153-853350c6d9ee.png	2019-03-29 09:30:30.339496	2019-05-07 05:20:48.074178	419	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4065	KomicKrazi Studios	http://www.komickrazi.com/	United States	komickrazi-studios	8c0c50ef-cfb6-445c-8f76-095a99472108	6cd695ca-5343-4d03-9e0d-dedd7b07b597.png	2019-03-29 09:30:34.025406	2019-05-07 05:20:48.083971	420	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4066	Kurauno	http://www.furaffinity.net/user/kurauno/	United Kingdom	kurauno	ee919951-f62b-4709-a166-7a4ef103fcbc	aee79701-ccaf-40eb-9fc5-d9f72f440d98.png	2019-03-29 09:30:36.852296	2019-05-07 05:20:48.09413	421	Scotland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4068	Laela McPitty Suits	http://laelamcpittysuits.webs.com/	United States	laela-mcpitty-suits	901e463a-3e26-4912-8062-0aa1bb598b52	e033a7ac-e921-4828-acc9-7a862279f353.png	2019-03-29 09:30:42.819631	2019-05-07 05:20:48.103808	423	South Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4069	Laken Steeljaw	https://laken-steeljaw.livejournal.com/	United States	laken-steeljaw	dbdb9d4e-1e1d-495b-9414-1a3f649d436f	d99e2dd3-8b51-49c4-a428-b979aa5b9723.png	2019-03-29 09:30:45.3957	2019-05-07 05:20:48.113539	424	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4212	Pawie Paws	https://twitter.com/pawiepaws?lang=en	Mexico	pawie-paws	ab82a3be-cb2a-4b5f-9f89-a73f3d51a211	08bb320d-1726-4cb4-b788-7ade7c152c39.png	2019-03-29 09:37:01.784138	2019-05-07 05:20:48.124411	567	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4070	Lavafox	http://www.furaffinity.net/user/lavafox/	United States	lavafox	5631a9ef-5635-447a-8838-4958ae69c25c	ce051989-efba-49fd-bf09-a2ee1358ae45.png	2019-03-29 09:30:47.926353	2019-05-07 05:20:48.1343	425	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4071	Lazy Leopard Fursuits	https://lazyleopard.ca/	Canada	lazy-leopard-fursuits	5a30064f-7bdf-4d97-aea4-39144cf15475	7809d733-ece9-46d1-a13b-b560dc36dd1d.png	2019-03-29 09:30:50.636318	2019-05-07 05:20:48.14452	426	Winnipeg	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4072	Lazy Lupe	http://www.furaffinity.net/user/lazylupe/	Australia	lazy-lupe	77facd6d-0582-4d4b-a391-97d020f29d34	b217c152-1412-405d-891c-b700ece382c2.png	2019-03-29 09:30:53.008825	2019-05-07 05:20:48.15421	427	Queensland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4073	Leipziger-Fursuit-Schmiede	https://www.furaffinity.net/user/leipziger-fursuit-schmiede/	Germany	leipziger-fursuit-schmiede	e8df1616-84f9-4f0d-b96e-54a8ab827ba9	effc9122-d449-4662-85cd-58d21671057c.png	2019-03-29 09:30:55.573456	2019-05-07 05:20:48.164226	428	Saxony	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4074	Lemonbrat Fursuits	http://www.lemonbratfursuits.com/	United States	lemonbrat-fursuits	86c23d2c-70ac-4537-b1e7-1c59107d98ef	fa690a5b-d019-4273-87fe-ff0bf7b35cd8.png	2019-03-29 09:30:57.734707	2019-05-07 05:20:48.174062	429	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4075	Lenny Mutt	http://www.furaffinity.net/user/lennymutt	United States	lenny-mutt	af6d7a21-8661-4488-8fe9-68ef7fd17aa5	f092ca8d-d230-4afc-bc38-6a107b02cf7d.png	2019-03-29 09:31:00.343857	2019-05-07 05:20:48.184061	430	Alabama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4076	LeoneLaTwerk	https://www.furaffinity.net/user/leonelatwerk/	United States	leonelatwerk	732317a3-6768-4873-b170-cb0d40ad8161	7deb954e-3f6c-4956-a14e-0bc8121106a4.png	2019-03-29 09:31:02.851157	2019-05-07 05:20:48.193872	431	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4077	Leopardcorgi Creatures	http://www.leopardcorgi.co.uk/	United Kingdom	leopardcorgi-creatures	50e8db0e-dbce-4fc8-9de5-947922dc257d	c609d3dc-4be6-4ec6-8ec9-c9d33d98deeb.png	2019-03-29 09:31:05.350623	2019-05-07 05:20:48.204016	432	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4078	Lhbeau	https://www.furaffinity.net/user/lhbeau/	United States	lhbeau	769e462f-bbcc-41a1-96fe-51ea3f98a695	777249d9-0646-46c3-85b7-34c2276c7e6b.png	2019-03-29 09:31:07.825958	2019-05-07 05:20:48.213972	433	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4080	Lillie Likes Peas	https://www.furaffinity.net/user/LilliLikesPeas	United Kingdom	lillie-likes-peas	4f631395-8cf0-4873-9ccb-46942318751b	97c87149-783d-41c8-a0f3-ae2d10797a4d.png	2019-03-29 09:31:13.044963	2019-05-07 05:20:48.224579	435	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4081	Lion of the Sun	http://lionofthesun.com/	United States	lion-of-the-sun	f7dbd716-9358-4a42-9fd0-e70fdeefa09d	f85d4a95-a5b4-4ff7-a4ba-c16764d848dd.png	2019-03-29 09:31:17.265519	2019-05-07 05:20:48.234894	436	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4083	Little Fangs Fursuits	https://twitter.com/littlefangsfur?lang=en	Canada	little-fangs-fursuits	8f6c31ae-4e78-47a8-b986-3beeb6aad32b	93660ff4-e2d5-4060-a395-976cfda84be0.png	2019-03-29 09:31:23.763795	2019-05-07 05:20:48.244648	438	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4084	Lizard King Designs	https://lizardkingdesigns.weebly.com/	United States	lizard-king-designs	5141fc9e-0d8b-4381-8ec5-e0d6c85ab933	35d16a3c-f6cf-4c44-84d7-beda36f90852.png	2019-03-29 09:31:26.057459	2019-05-07 05:20:48.254697	439	West Viginia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4085	Lizard Loves Mustache	http://www.lizardlovesmustache.com/	United States	lizard-loves-mustache	036105a2-9744-4425-8547-4a1a9ed2ca24	213a50d7-742e-4a2b-9a4f-eb172cbb3b78.png	2019-03-29 09:31:28.600306	2019-05-07 05:20:48.265007	440	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4087	LKR Mascots	http://lkrmascots.wixsite.com/lkrmascots	United States	lkr-mascots	839a756b-c71f-477e-bf34-95c5725621e8	14c7aa12-6dc2-47bd-bfb4-4fcb9ce51e7d.png	2019-03-29 09:31:33.967108	2019-05-07 05:20:48.274889	442	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4088	Lobita Works	http://www.furaffinity.net/user/lobitaworks/	United States	lobita-works	7031dfa0-72d5-48c7-bd4e-35229fefa01f	cfbff584-5348-4d56-9e39-e90e19f7f9a1.png	2019-03-29 09:31:36.455573	2019-05-07 05:20:48.284779	443	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4089	Locado	http://www.furaffinity.net/user/locadocoon/	United States	locado	536c5c3e-897b-4217-8355-d4ce1422a903	41a23162-ccb8-4578-b439-2ec99047a6e2.png	2019-03-29 09:31:39.146453	2019-05-07 05:20:48.294712	444	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4090	Locomotion Fursuits	http://www.furaffinity.net/user/Locomotion/	United States	locomotion-fursuits	bdf8c34c-56f0-455c-bc23-fbca5294a852	2fb068db-e61d-44b2-94e0-6415a31b6e16.png	2019-03-29 09:31:41.715835	2019-05-07 05:20:48.304651	445	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4091	Lodi Dah Fursuits	https://lodidahfursuits.weebly.com/	United States	lodi-dah-fursuits	59eba936-a6d1-43e3-8a53-b3d9be95ece5	3b0c2782-2e88-40b5-a6e7-6338b3ea09a9.png	2019-03-29 09:31:44.318712	2019-05-07 05:20:48.314814	446	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4092	Loris	http://www.furaffinity.net/user/loris/	Brazil	loris	1355656c-0bc9-46d9-84dc-e4d6c861f54d	641bef32-010f-4e95-8867-bae138e5fdc3.png	2019-03-29 09:31:46.815248	2019-05-07 05:20:48.325051	447	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4093	Loui	https://www.furaffinity.net/user/loui/	United Kingdom	loui	fd495d9c-4451-47b1-bc3f-54e4801502ca	c219b577-cc1b-4fd8-9dc6-a3da70f1a85e.png	2019-03-29 09:31:49.351596	2019-05-07 05:20:48.335003	448	Manchester	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4094	Lucky Dog Fursuits	https://luckydogfursuits.com/	Australia	lucky-dog-fursuits	011323b0-52eb-4d67-8bd3-c5804a641d8f	9a4cb936-0746-452a-accc-d51bea5b9e2b.png	2019-03-29 09:31:51.88828	2019-05-07 05:20:48.345419	449	Queensland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4095	Lucky Gum Fursuits	http://www.luckygumfursuits.com/	United States	lucky-gum-fursuits	f1a843d8-617a-45c9-88b7-bbcee41ae3f0	c25a6d4b-580b-4f50-ad5e-ddc86bf29aab.png	2019-03-29 09:31:54.54088	2019-05-07 05:20:48.355638	450	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4096	Lunar Forest	http://lunarforest.ru/	Russia	lunar-forest	85174182-8532-49d9-9282-730ff0abb350	7b6055c5-23de-42e7-873b-a29da0d71810.png	2019-03-29 09:31:57.962127	2019-05-07 05:20:48.365895	451	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4098	Luno Vulpes	http://www.furaffinity.net/user/lunovulpes/	United States	luno-vulpes	350b89a0-c110-4c03-9fe4-14af5f0c89cc	5ba42f1c-2ac9-408e-a1cc-cb6797d892be.png	2019-03-29 09:32:02.873609	2019-05-07 05:20:48.376757	453	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4099	Lupinemoonfeather	https://www.furaffinity.net/user/lupinemoonfeather/	United Kingdom	lupinemoonfeather	570a8f51-f473-447d-a43e-a0d58adc8232	2f7d863b-105a-428b-b825-25857e46e208.png	2019-03-29 09:32:05.379052	2019-05-07 05:20:48.387761	454	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4100	Luskwood Creatures	http://luskwood.org/	United States	luskwood-creatures	b179df40-71f3-4131-ad8c-f645da413376	34670f46-bd5b-4bba-a65c-68157ce05220.png	2019-03-29 09:32:07.953502	2019-05-07 05:20:48.398039	455	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4101	Macaroni Market	http://macaronimarkets.weebly.com/	United States	macaroni-market	28762cf1-9d1e-47ac-b7bf-a1c4289b344a	fd1fe763-32fb-4ae9-8b69-69575aa1c888.png	2019-03-29 09:32:10.429075	2019-05-07 05:20:48.409716	456	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4102	Mackoolzie	https://macaronimarkets.weebly.com/	United States	mackoolzie	93b67fd7-210e-4185-a8a2-236f6e858761	e5653fdb-b528-487f-9289-42afec2ac75d.png	2019-03-29 09:32:13.121609	2019-05-07 05:20:48.419371	457	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4103	Made by Mercury	http://madebymercury.co.uk/	United Kingdom	made-by-mercury	93dae3a2-536a-4975-9f47-5865e8c048b2	643a3873-f407-48af-829c-5dca25db5c28.png	2019-03-29 09:32:15.576421	2019-05-07 05:20:48.429748	458	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4104	Made by Muttmix	https://www.furaffinity.net/user/MadeByMuttmix	United States	made-by-muttmix	aa28cd4e-00f3-4ca7-921c-c88a05a7ee46	1134f9c4-261b-4a30-84b6-46c3cd48fbf8.png	2019-03-29 09:32:18.863156	2019-05-07 05:20:48.439804	459	Alabama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4105	Made Fur You	http://www.madefuryou.com/	United States	made-fur-you	81c3d878-e7af-445a-9248-e41cdda93e3f	27933236-40d3-4d5f-bc6a-bb6547ad968a.png	2019-03-29 09:32:21.439481	2019-05-07 05:20:48.450086	460	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4106	Made in Holland	https://www.furaffinity.net/user/madeinholland/	Hungary	made-in-holland	6dc33ed7-d453-4c01-814d-9295bc4804ad	e9fa86ec-3f55-41ae-9ca7-3b83f941133d.png	2019-03-29 09:32:24.034414	2019-05-07 05:20:48.461513	461	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4107	Made4Hugging	https://www.furaffinity.net/user/pixelbunny/	United Kingdom	made4hugging	7483e0f8-86c8-4f2f-bab1-7c42f30cd536	bbced42f-f0cf-40cb-9d07-4523a1f5a034.png	2019-03-29 09:32:26.202667	2019-05-07 05:20:48.471277	462	Brighton	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4108	Magic Foxy Artworks	http://magicfoxy.com/	United States	magic-foxy-artworks	e3e6d66c-edfa-4157-b89e-0a1a2a1fedf8	012fc03e-58f1-448e-8292-2ffb80dce016.png	2019-03-29 09:32:28.789414	2019-05-07 05:20:48.481925	463	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4110	MagpieBones	http://www.magpiebones.com/	United States	magpiebones	a2ce3d03-3b6d-4099-8f93-7281c9f91b34	c107e109-77c1-4c4e-9d31-04d6747ffb4f.png	2019-03-29 09:32:33.952074	2019-05-07 05:20:48.49328	465	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4111	Maj Mania	https://aminoapps.com/c/furry-amino/page/user/majeste749-maj-mania749/j04Y_XwPSpf38Jz2klZ182PkBwJm0YL1XxxIk	United States	maj-mania	2c45e541-29c1-4c0e-ab3c-5297000632f4	fc77c265-1591-4094-b020-37e28b723a4f.png	2019-03-29 09:32:36.468345	2019-05-07 05:20:48.504538	466	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4112	Mango Island Creations	https://www.furaffinity.net/user/MangoIslandCreations	United States	mango-island-creations	bfbc0c8f-535d-426c-924d-d1724f794bfd	6843c485-fa42-41e1-927c-6a35baa76c5d.png	2019-03-29 09:32:40.033981	2019-05-07 05:20:48.516229	467	Massachusetts	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4113	Mangusu	http://www.furaffinity.net/user/mangusu/	United States	mangusu	e376ef0f-34d2-4009-a5fa-b7b8122223bb	f29aa97c-16ea-42e6-ac26-c1e11e6816a7.png	2019-03-29 09:32:42.572927	2019-05-07 05:20:48.528011	468	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4114	Maria’s Creative Corner	http://mcreativecorner.com/	Denmark	maria-s-creative-corner	000b0b7f-b7de-4c50-802b-62eb6e5d3ac1	739ad522-d7f0-4e4e-bc37-599275ff2f42.png	2019-03-29 09:32:45.182449	2019-05-07 05:20:48.537686	469	Randers	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4115	Marylen Costumes	http://www.marylen.com/	United States	marylen-costumes	9cad0582-cc5d-43ab-8b5e-902e7477dd8e	640bc58d-ec1d-4437-a629-00e84d07236f.png	2019-03-29 09:32:47.407103	2019-05-07 05:20:48.547978	470	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4116	Matchapawz	https://twitter.com/Matchapawz	United States	matchapawz	4d32bb15-8834-4dcd-8a00-25a30a9858eb	f4607887-872c-4304-a9e9-ca54855044b8.png	2019-03-29 09:32:50.013296	2019-05-07 05:20:48.55985	471	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4117	Matrices	http://www.matrices.net/	United States	matrices	b22db5d7-479b-4a5a-90f7-304e1370385f	0f086cd6-02b0-4c7a-917a-9f3759663351.png	2019-03-29 09:32:52.718555	2019-05-07 05:20:48.569498	472	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4118	Meanie Beanie Fursuits (Star Seeker)	https://twitter.com/starseekerdoggo	Germany	meanie-beanie-fursuits-star-seeker	e507c241-5746-4f00-961b-d841e65aa7bd	f914fe57-8d27-4195-b1b7-c96290528d02.png	2019-03-29 09:32:55.297136	2019-05-07 05:20:48.579195	473	Dortmund	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4121	Menagerie Workshop	https://menagerieworkshop.com/	United States	menagerie-workshop	36c79eb9-bf07-4920-a165-07451e7ed5de	3dd424af-22dd-48c2-98d9-28d52419599b.png	2019-03-29 09:33:02.506542	2019-05-07 05:20:48.588604	476	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4122	Mercifur	https://www.deviantart.com/mercifur	United States	mercifur	7efa3e6a-afb4-4b3d-a3bc-92bd50c689f9	0a1da7ae-6c00-4781-892d-897c8f395b3f.png	2019-03-29 09:33:04.997132	2019-05-07 05:20:48.602174	477	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4123	Messerschmitt	https://messerschmitt51.webs.com/	United States	messerschmitt	d4d59347-60c5-4085-afc8-17387a4c5267	c235d42c-6096-40c0-a2c1-14ece5cf12e6.png	2019-03-29 09:33:07.883457	2019-05-07 05:20:48.612906	478	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4124	Metaldog00781	http://www.furaffinity.net/user/Metaldog00781	United States	metaldog00781	c7ac9ab1-c67f-4397-bb94-d92c41cae8ca	28d0ab4e-c090-46fd-8a38-a7b103367e55.png	2019-03-29 09:33:10.408759	2019-05-07 05:20:48.623388	479	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4125	Micro Mascots	https://twitter.com/micromascots?lang=en-gb	United States	micro-mascots	1e7521c0-73ac-4155-b089-395038fd3bbd	c2fac154-0786-4ce3-a6ed-783ed3f24be5.png	2019-03-29 09:33:12.941063	2019-05-07 05:20:48.633042	480	Delaware	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4126	Midnight Storm Creations	http://www.furaffinity.net/user/midnightstormcreations/	United States	midnight-storm-creations	e71c5ff1-331b-485d-9cf8-57a855a155a3	db1bf8e4-fb10-4bf1-8246-c1bed803bba2.png	2019-03-29 09:33:15.577078	2019-05-07 05:20:48.643048	481	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4127	Midnight Swimmers	https://midnightswimmers.com/	Canada	midnight-swimmers	037b9495-4fb3-48eb-ad95-7df856516d0e	68a51f33-9ec6-4d5d-b907-4deca9beafeb.png	2019-03-29 09:33:18.327243	2019-05-07 05:20:48.652905	482	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4128	Midowko Art	https://www.furaffinity.net/user/Midowko	China	midowko-art	55fb1550-fbbe-42a4-8c71-114de53a613e	561ceca0-0fe5-4b95-8514-a213576d9108.png	2019-03-29 09:33:20.98681	2019-05-07 05:20:48.662586	483	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4129	Mijou	https://www.furaffinity.net/user/mijou	United States	mijou	63e57c66-f1b6-4f4d-8acc-beb9ff015d0e	0031a1e7-37e8-4196-9d18-74d38c2bfe88.png	2019-03-29 09:33:24.17583	2019-05-07 05:20:48.672863	484	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4131	Mirepoix	https://www.furaffinity.net/user/Mirepoix	United States	mirepoix	4b4d622b-51be-4d50-a6aa-c6b56816da7c	ef5bbbf9-12d0-4a40-9f98-f54fe2614c8f.png	2019-03-29 09:33:29.432799	2019-05-07 05:20:48.682718	486	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4132	Mischief Makers	http://www.fluffymischief.com/	United States	mischief-makers	11df326a-816c-4d36-a6da-98ac9a3e3ab5	e3b3d107-3d9c-4eb7-9aca-3f9b077ae47c.png	2019-03-29 09:33:31.929722	2019-05-07 05:20:48.69309	487	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4133	Miss Wolfiee	https://www.furaffinity.net/user/MissWolfiee	United States	miss-wolfiee	c9b253eb-8167-4b9e-a43a-074634d4a87b	8a4d7ea4-c095-4c0d-acbf-1197f0bff66c.png	2019-03-29 09:33:34.574485	2019-05-07 05:20:48.702761	488	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4134	MissRaptor	http://www.shingfx.com/	United States	missraptor	44b1a004-0b78-4ee0-aa06-7a81b009bf20	47d07e69-1e65-4dd2-9bc4-a844b688b0c2.png	2019-03-29 09:33:37.302964	2019-05-07 05:20:48.712619	489	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4135	Mitha	http://www.furaffinity.net/user/Mitha	United States	mitha	150226ae-8324-4fdb-be22-91ae60d6fe39	0092ad1f-7384-40ff-b455-0cce84955eba.png	2019-03-29 09:33:39.869789	2019-05-07 05:20:48.722952	490	Alaska	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4136	Mixed Candy	https://www.mixedcandycostumes.com/	United States	mixed-candy	605f77e7-420a-4232-b118-1c71b1c71bda	30975fec-8dc9-4021-98b0-08144542ac38.png	2019-03-29 09:33:42.466934	2019-05-07 05:20:48.732818	491	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4137	Mixed Monsters	https://twitter.com/MixedMonsters	Netherlands	mixed-monsters	faf71f13-57a0-4fe4-93e6-bf924671a861	f1587e9a-aef3-4bc4-8a85-f07d85fd85f4.png	2019-03-29 09:33:45.615766	2019-05-07 05:20:48.743534	492	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4138	Mochiri	http://www.furaffinity.net/user/mochiri/	Japan	mochiri	4079dad6-fc82-411e-a10b-ce16065d52b1	1802ebe8-8caf-4f29-8f6b-3e6bd72386d9.png	2019-03-29 09:33:47.94078	2019-05-07 05:20:48.753007	493	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4139	Monkaus Furry Bitz	https://www.furaffinity.net/user/monkausfurrybitz/	Australia	monkaus-furry-bitz	eaf78db3-94d7-43ff-8eb2-ca118ca2405f	bbf00345-a5e2-4ebf-9992-3a000bd8c218.png	2019-03-29 09:33:50.318141	2019-05-07 05:20:48.762915	494	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4140	Monster Cat Creations	https://www.furaffinity.net/user/MonsterCatCreations	United States	monster-cat-creations	76fabc73-64af-41e1-af9e-1f95c4a057a3	3a29e29e-8039-45aa-b3bf-6785268d8df8.png	2019-03-29 09:33:52.900335	2019-05-07 05:20:48.773817	495	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4497	Zrcalo	https://www.furaffinity.net/user/zrcalo/	Germany	zrcalo	eb0947f7-a771-4de8-aabf-727b80dc7b0d	6af52d4a-f172-4c7f-82b1-d5d4f7465aa6.png	2019-03-29 09:49:46.303825	2019-05-07 05:20:48.784	852	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4141	Monster Deer Creations	https://www.furaffinity.net/user/MonsterDeerCreations	United States	monster-deer-creations	e7ca3de6-d439-4528-aa1c-fc08788d7927	910da9d5-8dea-43d5-8223-742fe68c3c59.png	2019-03-29 09:33:55.443319	2019-05-07 05:20:48.795643	496	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4142	Moon Devourer	http://www.furaffinity.net/user/moondevourer/	United States	moon-devourer	9fa8605d-3e6f-4ed5-9fa8-b7870270377a	76a395b7-8f83-4712-94ea-6d3d6546affb.png	2019-03-29 09:33:57.955719	2019-05-07 05:20:48.805184	497	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4143	Moon Mochi	http://www.furaffinity.net/user/moonmochi	United States	moon-mochi	95ea0dc0-0512-4bb1-9055-705850e7fa33	30c27b39-0623-4f8d-b620-f1a7f2c539f1.png	2019-03-29 09:34:00.993659	2019-05-07 05:20:48.815495	498	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4145	Moonlightbatshadow	https://www.furaffinity.net/user/moonlightbatshadow/	Spain	moonlightbatshadow	f8e41154-8ca1-470a-80d0-e80ca86db3a8	f69049c6-7311-45b0-a32d-1a36968004c6.png	2019-03-29 09:34:06.303576	2019-05-07 05:20:48.825972	500	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4146	Moop	https://www.furaffinity.net/user/moopdrea	United States	moop	5cc67220-c646-40c7-a96d-30f3ac0eaf5d	fecd8f1b-5861-4161-ae99-df9fd087340a.png	2019-03-29 09:34:08.732814	2019-05-07 05:20:48.835711	501	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4147	Mordrudes Monsters	http://www.mordrudesmonsters.com/index.php	United States	mordrudes-monsters	cd430f7e-93c0-4e66-91b4-4accde3de9be	48dbca4f-2e1c-4ad6-9434-ee5b9dcef1e3.png	2019-03-29 09:34:11.307854	2019-05-07 05:20:48.845584	502	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4148	More Fur Less	http://www.morefurless.com/	United States	more-fur-less	d2ba9bef-e2b8-45d2-bc07-87ef45e4a07d	4837afcd-3817-4628-81b6-25d6dde28a13.png	2019-03-29 09:34:13.845389	2019-05-07 05:20:48.855742	503	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4149	Mostly Bad Costumes	https://suitalors.tumblr.com/	United States	mostly-bad-costumes	e3a5ea12-6cdf-4160-942a-3a3eb0d69310	bbd61408-e542-4b53-8942-377c154d61a1.png	2019-03-29 09:34:16.427493	2019-05-07 05:20:48.865398	504	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4150	Mothsicle Suits	http://mothsicles.wix.com/mothsiclesuits	United States	mothsicle-suits	8a90b43a-4c02-45b8-a233-c76e1e1b1a1d	e4cc7dec-fbc7-4900-9f2b-9be440917267.png	2019-03-29 09:34:19.022732	2019-05-07 05:20:48.876559	505	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4151	Mugiwara Cosplay	https://www.deviantart.com/maria-m--aka--bakura	Denmark	mugiwara-cosplay	776314b6-b5ea-4061-9f83-e7ef199a6daf	7256d73c-6a76-4720-bb64-b20fb1d0c130.png	2019-03-29 09:34:22.528414	2019-05-07 05:20:48.886663	506	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4152	Multicolor Bark (Autumn Fallings)	https://www.multicolorbark.com/	United States	multicolor-bark-autumn-fallings	46efa394-e5e0-43ab-b6e7-bad3f5cf7bbd	65a73df5-008d-45fa-9a63-53f713f4d34f.png	2019-03-29 09:34:24.849251	2019-05-07 05:20:48.8965	507	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4153	Munchkin Bunny	https://www.furaffinity.net/user/munchkin-bunny	United States	munchkin-bunny	43d244cb-fe86-4b20-9920-0f3809ae8cac	abeb44bc-8f20-483c-8daf-5669103ece23.png	2019-03-29 09:34:27.33485	2019-05-07 05:20:48.907158	508	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4154	Muntjacked	https://www.furaffinity.net/user/Muntjacked	United States	muntjacked	3f704b12-b18f-4e17-ae6d-e9e37c059a9a	4c1b57f3-b05f-46c8-ae42-22630c7fd032.png	2019-03-29 09:34:29.919304	2019-05-07 05:20:48.917283	509	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4156	Mut-Mut-Fur Costumes	http://www.furaffinity.net/user/mut-mut-furcostumes	Czech Republic	mut-mut-fur-costumes	52ab026e-2a29-4f0c-be49-6727909623a4	c843c0d5-c15c-4684-9c2b-a8e732ec86ce.png	2019-03-29 09:34:35.182135	2019-05-07 05:20:48.927688	511	Prague	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4157	Mutt-Zilla (Marshmellow)	http://www.furaffinity.net/user/mutt-zilla/	Slovakia	mutt-zilla-marshmellow	cd1bb3f6-1f49-4b66-83ea-70cab4e10596	3e29c7b1-ae23-42ae-b4d9-b06333f07aa6.png	2019-03-29 09:34:37.711047	2019-05-07 05:20:48.937181	512	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4158	MuttRitzu	https://www.furaffinity.net/user/muttritsu/	Canada	muttritzu	9184ad28-d9a2-45e6-9402-6fb72a2d37e8	10786982-2368-49f8-8d87-30361e5e7927.png	2019-03-29 09:34:40.139498	2019-05-07 05:20:48.946872	513	Saskatchewan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4159	My Fur Creations	http://www.myfurcreations.com/	United States	my-fur-creations	fff7786b-8082-43d1-a2d8-9fa7a3780eb9	5164b163-a4c7-41e0-90cc-7f9c1ce65fda.png	2019-03-29 09:34:42.505276	2019-05-07 05:20:48.95707	514	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4160	Myrtle's Monsters	https://www.furaffinity.net/user/Myrtles-Monsters	United States	myrtle-s-monsters	00ce2375-0218-4e0e-b77d-a8590ad36323	039d0b2d-b900-4880-9229-5e1bf48e89eb.png	2019-03-29 09:34:45.218243	2019-05-07 05:20:48.967752	515	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4161	Mystic Creatures	https://mystic-creatures.com/	Germany	mystic-creatures	e1c95e30-b27b-4390-b93d-9080d5d47531	c85266b7-b810-4c87-a595-2411bc82b90f.png	2019-03-29 09:34:48.09934	2019-05-07 05:20:48.978161	516	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4162	Mystikreatures	http://www.furaffinity.net/user/AnimagusFursuits/	Singapore	mystikreatures	1737be60-23fb-48ca-85cb-396e3cabf8f3	8a63cabc-af03-4409-a3cf-604f9cf61670.png	2019-03-29 09:34:50.675671	2019-05-07 05:20:49.006082	517	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4163	Nafierye	https://www.furaffinity.net/user/nafierye/	United States	nafierye	4feb9e2f-9cc7-4a70-8000-4d10de97cc20	b6f68db7-7879-46d2-a4f7-b20624942102.png	2019-03-29 09:34:53.264292	2019-05-07 05:20:49.0167	518	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4165	Natsuro Suits	https://www.furaffinity.net/user/KazutoKurama	United States	natsuro-suits	9b94fd60-90cf-4320-ba3d-8086c0f5b1d7	0f4887fb-e8d2-48d3-95ec-922cc85d6e0c.png	2019-03-29 09:34:58.372589	2019-05-07 05:20:49.02682	520	Loisiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4166	Neala Appaloosa	http://www.furaffinity.net/user/neala-appaloosa/	United States	neala-appaloosa	2390ddca-6c11-46a6-aa12-4ddb5d12d6bd	31aac590-6fd2-49dd-82c9-59d44d13198e.png	2019-03-29 09:35:01.372596	2019-05-07 05:20:49.038501	521	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4167	Neex	http://www.furaffinity.net/user/neex/	Canada	neex	9482a44c-d070-4921-86e3-b035b275c15b	2eafaeb5-685d-433c-958e-05ad2cf1316f.png	2019-03-29 09:35:03.996963	2019-05-07 05:20:49.049218	522	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4168	Nekofelin	https://www.furaffinity.net/user/nekofelin	United States	nekofelin	898fb13f-4a71-4087-bd37-1bab7463ac80	9fe4bb06-ec04-48ca-ad7f-68935baff9b7.png	2019-03-29 09:35:06.471986	2019-05-07 05:20:49.059958	523	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4169	Neon Fur Studios	https://www.furaffinity.net/user/neonfurstudios/	Germany	neon-fur-studios	4f44d67a-53b3-4536-a169-321d40b0281c	24a52824-2948-42b0-9c92-7e3c6835be49.png	2019-03-29 09:35:09.17106	2019-05-07 05:20:49.069417	524	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4170	Neon Puppy Creations	https://www.facebook.com/NeonPuppyCreations/	United States	neon-puppy-creations	afd95f54-f7b3-40f6-8f52-3b6427da0220	8b33e089-8e9b-4c02-bc1e-ae703fbc24d1.png	2019-03-29 09:35:11.524607	2019-05-07 05:20:49.079779	525	Oklahoma	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4171	Neonr0se	https://www.furaffinity.net/user/neonr0se/	United States	neonr0se	fdbc7854-ebb4-4dd5-97a8-f17a6ff9c5fa	416fe3f1-0fa0-48b7-a49f-1250153b7a63.png	2019-03-29 09:35:14.127751	2019-05-07 05:20:49.089567	526	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4172	Nether Den Studio	http://www.furaffinity.net/user/netherden/	United States	nether-den-studio	30d22b83-272f-4385-92eb-c82f89157c88	4e0b9816-8c40-4e86-a904-bddad9f461a3.png	2019-03-29 09:35:16.706999	2019-05-07 05:20:49.099563	527	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4173	Niennis	https://www.furaffinity.net/user/niennis/	United States	niennis	dfec683a-9cbf-4ef1-a0d7-975578108791	f2ebe4ac-787c-441d-b2c5-d92c010d3de2.png	2019-03-29 09:35:19.352122	2019-05-07 05:20:49.11004	528	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4174	Nifeline	https://www.furaffinity.net/user/nifeline/	Norway	nifeline	250de106-606d-4932-a2a0-23290b020357	20009aa0-ab97-4dce-a7aa-708c86257c30.png	2019-03-29 09:35:23.138123	2019-05-07 05:20:49.119334	529	Oslo	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4175	Nightfell	http://www.furaffinity.net/user/nightfell/	United States	nightfell	400ba3c1-ed54-4931-89ec-c3f5ae6da8c7	95a0c2c2-64dc-44cc-bde0-1666f964ee3d.png	2019-03-29 09:35:25.806454	2019-05-07 05:20:49.129411	530	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4177	Nightwolf Creations	https://furrynetwork.com/nightwolf/photos/	Netherlands	nightwolf-creations	707c1ac2-d9d4-4ced-85e6-0b955ca04af6	f8de1b4d-82f1-4bc5-aa7f-7923d4c31dd6.png	2019-03-29 09:35:31.03665	2019-05-07 05:20:49.139608	532	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4178	Niiku	https://www.furaffinity.net/user/niiku	United States	niiku	d821b76b-90b9-4e12-9474-301e55062dea	d4787c6b-aaf9-4c7d-bc22-a6903b85591d.png	2019-03-29 09:35:33.437068	2019-05-07 05:20:49.149571	533	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4179	Noble Productions	http://www.furaffinity.net/user/noblewolf/	Canada	noble-productions	97a4bc33-b9b1-4cf5-b7b9-8e80593418b0	a44b08e0-4a2e-406e-aa96-f921c6f88584.png	2019-03-29 09:35:36.014	2019-05-07 05:20:49.160298	534	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4180	Norman Patches n' Furs	http://www.furaffinity.net/user/normanpatchesnfurs	United States	norman-patches-n-furs	565f15e9-309e-4718-b870-6e3686fd0531	7814ebf5-f67b-49e3-9d55-996df0304441.png	2019-03-29 09:35:38.411374	2019-05-07 05:20:49.170717	535	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4181	Norsepaw Studio	https://norsepaw.webs.com/	Norway	norsepaw-studio	3591a22e-509f-4065-8720-fbefb3c19373	6e705bce-d4ef-4e90-b802-d224d97d9698.png	2019-03-29 09:35:40.947805	2019-05-07 05:20:49.181008	536	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4182	Norsewolf Creations	https://twitter.com/nwcfursuits?lang=en	Canada	norsewolf-creations	4b614776-8293-488a-a629-6edc4e127e8d	3234bfc5-7041-477e-9da1-ea19b874ae21.png	2019-03-29 09:35:43.361671	2019-05-07 05:20:49.190637	537	British Columbia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4183	Northcat Creations	https://northcatcreations.weebly.com/about.html	finland	northcat-creations	7aee9663-afc7-4ee5-8bc5-28e0b41a65b7	c9e1d040-5a8d-4916-9418-798ab2f7b0f9.png	2019-03-29 09:35:45.939222	2019-05-07 05:20:49.200348	538	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4184	Northern Lights Costume Company (Wolfbird)	https://www.furaffinity.net/user/wolfbird/	Canada	northern-lights-costume-company-wolfbird	812b8c2e-4fe1-4720-a809-8a048c93e241	c512da46-fe76-4f35-b1f6-6722ed5ed488.png	2019-03-29 09:35:48.153089	2019-05-07 05:20:49.211011	539	Montreal	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4185	Northfur FX	https://www.northfur.ca/	Canada	northfur-fx	d41a5672-bbfe-4e8d-bd5f-580e523c5c87	7dae9501-4943-4d85-bd17-ecc5d39b3873.png	2019-03-29 09:35:50.595572	2019-05-07 05:20:49.220361	540	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4186	Northshore Mascots	https://wildworkscostumes.weebly.com/	United States	northshore-mascots	e6852d6e-dfa8-4bb9-bcba-1fc8c96d8ca2	c9e24be7-16ab-4a4e-b1a8-01686bca436a.png	2019-03-29 09:35:53.930863	2019-05-07 05:20:49.230362	541	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4188	Nuke Creations	http://nukecreations.com/	Poland	nuke-creations	5704ba26-b422-4644-a685-a3fca018bc15	dc1d2425-097d-42fd-bb9e-288f911530a6.png	2019-03-29 09:35:59.246313	2019-05-07 05:20:49.240786	543	Katowice	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4189	Ocicat	https://www.furaffinity.net/user/ocicat/	United States	ocicat	fbbc6a4a-953a-43bc-96a8-1a8f43d08490	7a5dfb94-e980-4e2d-b4bb-b77eee0e4a61.png	2019-03-29 09:36:01.56744	2019-05-07 05:20:49.250611	544	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4190	Og's Fursuits	https://www.furaffinity.net/user/ognas/	United States	og-s-fursuits	c18868dc-2197-4333-93b9-f7d63e9b5e7b	eb32efdb-40a1-4490-81d5-47c2d812c107.png	2019-03-29 09:36:04.071307	2019-05-07 05:20:49.260908	545	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4192	Omega Paws	http://www.furaffinity.net/gallery/omegapaws/	France	omega-paws	38b1a88e-a422-4aa9-a0a9-456d2170f353	50faa389-cfa7-4f48-8534-f6b9c11293d2.png	2019-03-29 09:36:09.15168	2019-05-07 05:20:49.270632	547	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4193	OMG Pineapples	http://www.omgpineapples.net/	United States	omg-pineapples	c0838a46-d0d3-4aba-97fd-f4155e3244db	579ffb2d-3530-488d-88e7-f10b66bac304.png	2019-03-29 09:36:11.433371	2019-05-07 05:20:49.280468	548	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4194	Onai Wolfwind	https://www.deviantart.com/onai-wolfwind/	United States	onai-wolfwind	c783f28f-8fb0-4bda-9e00-54e999d6d135	f8d3cebb-815d-4592-b652-c88bf99d49b6.png	2019-03-29 09:36:14.876105	2019-05-07 05:20:49.290528	549	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4195	One Eyed Doe	https://www.oneeyeddoe.info/	United States	one-eyed-doe	fcaf5c48-e6a8-4c76-8308-20a42f65191a	82764796-97c3-4105-8977-f0f89619a1de.png	2019-03-29 09:36:17.528772	2019-05-07 05:20:49.3004	550	Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4196	One Eyed Jack 	https://www.furaffinity.net/user/oneeyedjack/	United States	one-eyed-jack	28a847ee-7da1-4ec1-8c26-7dffaf2751c2	54f7d588-6ff5-495b-9bc9-d5599e65f131.png	2019-03-29 09:36:20.221197	2019-05-07 05:20:49.311291	551	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4197	One Fur All	http://www.onefurall.com/	Canada	one-fur-all	44d9b9b6-26b8-44de-b5b2-0952e47b711a	f1bf87d0-8dad-4707-b611-c132870def8b.png	2019-03-29 09:36:22.727943	2019-05-07 05:20:49.321968	552	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4198	Onix Angel Creations	https://www.onixangelcreations.com/	Canada	onix-angel-creations	ff4d46c7-c1fc-40c7-b9b6-fa44add0fcff	1218bc74-35d9-4f9b-9275-cbd4674faf10.png	2019-03-29 09:36:25.103943	2019-05-07 05:20:49.332053	553	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4199	Orwin	http://www.furaffinity.net/user/orwin/	Canada	orwin	621bfeed-f126-492e-b7fb-2c8fd78dab2e	ff11141d-705b-43a2-9984-fc908b29765a.png	2019-03-29 09:36:27.511352	2019-05-07 05:20:49.342854	554	British Columbia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4200	Otter Nonsense	https://www.furaffinity.net/user/Otter.Nonsense	United States	otter-nonsense	4125f3d3-0d37-4b2d-9d8b-0e2602bb734e	e6ec4ad4-2552-4612-b937-3b9f86ac3313.png	2019-03-29 09:36:29.974237	2019-05-07 05:20:49.35229	555	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4202	Our Mass Hysteria	http://www.furaffinity.net/user/ourmasshysteria/	United States	our-mass-hysteria	aa129864-bcf3-4730-b811-05bab73c823e	ffe771f9-a041-40ae-bb8d-e04f9f47ab64.png	2019-03-29 09:36:35.344511	2019-05-07 05:20:49.362521	557	Missouri	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4203	Oz Kangaroo	http://www.furaffinity.net/user/ozkangaroo/	United States	oz-kangaroo	298011c9-5995-4f1c-a54f-43ed944867ad	89dadab4-8f23-44df-bab6-d2489033467b.png	2019-03-29 09:36:37.897058	2019-05-07 05:20:49.372449	558	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4204	P Pardus	https://p-pardus.livejournal.com/	Canada	p-pardus	2a9b001e-9d05-4405-8238-ccff4f6dcfa0	f530e6e9-f944-42f0-b4e0-0de6668e808f.png	2019-03-29 09:36:40.528285	2019-05-07 05:20:49.382135	559	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4205	Paciulo Fursuits	https://www.facebook.com/paciulofursuits/	Brazil	paciulo-fursuits	146c1e33-d524-4024-a2e5-4b1832832e3b	9278c6e4-3edb-4066-a635-845b1846a354.png	2019-03-29 09:36:42.975682	2019-05-07 05:20:49.392553	560	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4206	Paddlefoot	https://www.furaffinity.net/user/paddlefoot/	United States	paddlefoot	9914ad29-faf0-414e-9915-4d2d3793969c	e5da59e0-7488-4bea-90eb-61156301673a.png	2019-03-29 09:36:46.477112	2019-05-07 05:20:49.402726	561	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4207	Palohmino	https://www.furaffinity.net/user/Palohmino	Germany	palohmino	323e317b-548a-413d-bb4d-22c65095ebfc	82506547-0374-4488-b219-5a44b49a810f.png	2019-03-29 09:36:49.103168	2019-05-07 05:20:49.412895	562	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4208	Panda Candy Suits (Blue Moon Creations BMC)	https://twitter.com/PandaCandySuits	United Kingdom	panda-candy-suits-blue-moon-creations-bmc	f652b1a9-6b98-4946-8302-0af34e57f91e	773cf7da-538a-4f02-a402-2d10ec47d064.png	2019-03-29 09:36:51.282433	2019-05-07 05:20:49.422908	563	Glasgow	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4209	Patchworkpibble	http://www.furaffinity.net/user/patchworkpibble/	United States	patchworkpibble	c70eb98c-f601-49d8-a0c4-9e94a28c4b41	020cec56-4ccb-436c-943b-d02698d2b9ba.png	2019-03-29 09:36:53.860791	2019-05-07 05:20:49.432812	564	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4210	Pawaii Suits	https://twitter.com/PawaiiFursuits?lang=en	United States	pawaii-suits	5fe37364-2896-4728-a8f5-a0bd0470fde3	9bf4c102-2159-48f8-a116-caca1d346255.png	2019-03-29 09:36:56.545362	2019-05-07 05:20:49.443275	565	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4213	Paws Fur Effect	https://pawsfureffect.webs.com/	United States	paws-fur-effect	241d8f93-6912-47dc-bbc8-48799f55d4f3	8642fab5-ee02-4b0e-8dc9-8685b5f2d2b2.png	2019-03-29 09:37:07.62553	2019-05-07 05:20:49.452824	568	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4214	Paws Productions	https://www.furaffinity.net/user/Paws	United States	paws-productions	88e031b9-b010-4bf4-b520-2708beee2c9f	3f7b2abf-a7da-4b97-b63f-53fd0b623d33.png	2019-03-29 09:37:10.196326	2019-05-07 05:20:49.463366	569	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4216	Pawthentic Creations	https://www.furaffinity.net/user/PawthenticCreations	United States	pawthentic-creations	e88ac4ca-66eb-4c76-9b12-6c359cd1650a	11c18f46-fc19-455e-9dfb-d565acb4a72d.png	2019-03-29 09:37:15.499108	2019-05-07 05:20:49.472771	571	Nebraska	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4217	Peacewolf Creations	http://peacewolfcreations.com/	United States	peacewolf-creations	0037de20-e1eb-4aa2-9d67-d3b349dc7ab9	0fab9d0d-1c62-4adf-836b-e8bb3660e3c6.png	2019-03-29 09:37:18.293093	2019-05-07 05:20:49.48267	572	Oklahoma	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4218	Penpenfoli	http://www.furaffinity.net/user/penpenfoli/	France	penpenfoli	15909ae3-8860-473a-81d8-8a8b61255474	577670b6-1811-4972-9a96-0fd14e3097aa.png	2019-03-29 09:37:20.911887	2019-05-07 05:20:49.493528	573	Paris	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4219	Phar	https://www.furaffinity.net/user/dragonsquared/	United States	phar	047c82b1-9ff0-4363-8c23-f4a3f3a538a6	b1b26c95-2691-4a0f-9e5a-cecf3413b3ba.png	2019-03-29 09:37:23.127856	2019-05-07 05:20:49.503792	574	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4220	Phoenix Nest	http://www.furaffinity.net/user/phoenixnest	United States	phoenix-nest	e6ca4077-15e7-479a-89b0-9e39e909f139	1af24d8a-f111-46b1-8926-20daa7997a2c.png	2019-03-29 09:37:25.668744	2019-05-07 05:20:49.514234	575	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4221	Pico Dog Studios	https://www.furaffinity.net/user/picodogstudio/	Germany	pico-dog-studios	c8ea67f4-d782-42e9-a853-bed728ba3c47	0528cea5-0eb7-4bbf-8db2-91143b190cc5.png	2019-03-29 09:37:28.285625	2019-05-07 05:20:49.524551	576	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4222	Pink Fox Works	https://twitter.com/Pinkfox2017	China	pink-fox-works	a41bc2cc-c205-4396-a6b2-4758b9ddc220	2a0999a7-82c9-469c-b99f-e4393128727c.png	2019-03-29 09:37:30.474786	2019-05-07 05:20:49.534261	577	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4223	Pink Gecko Productions	https://pinkgeckoproductions.weebly.com/	United States	pink-gecko-productions	ab716992-7d4b-4720-ac89-a71fbcf2973a	cf2597a0-f3d6-4e30-a3a8-e663850f3c7a.png	2019-03-29 09:37:33.351426	2019-05-07 05:20:49.544777	578	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4224	Piranha Petting Zoo	http://www.furaffinity.net/user/piranhapettingzoo/	United States	piranha-petting-zoo	b22a3911-e4f3-4e49-8d59-2cbc8fd62920	fc1806e2-a987-485e-a3d1-e6b53290918b.png	2019-03-29 09:37:35.973571	2019-05-07 05:20:49.555117	579	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4225	Pixel and Fur	https://www.furaffinity.net/user/pixelandfur/	Canada	pixel-and-fur	bab8a787-25d9-4f19-bb2f-361512d12b6d	0c4e4414-4446-4e22-a062-801eb69637bf.png	2019-03-29 09:37:38.674671	2019-05-07 05:20:49.566968	580	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4226	Pocalypto Designs	https://www.furaffinity.net/user/pocalypto-designs/	United States	pocalypto-designs	4720d79f-1516-486f-99a8-e0c8ca3f2d09	a347df15-fa16-4f3c-9843-a91b25bbc6c5.png	2019-03-29 09:37:41.028152	2019-05-07 05:20:49.577023	581	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4228	Pokem	http://www.furaffinity.net/user/Pokem/	Poland	pokem	7b4d9670-9371-4fe3-aa2c-86ab5fa189f0	e94c63a6-02f4-41a3-9522-a66088140eae.png	2019-03-29 09:37:46.484864	2019-05-07 05:20:49.586918	583	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4230	PotatoMonster Cosplay	http://potatomonstercosplay.weebly.com/	United States	potatomonster-cosplay	c85d39d2-bcde-4765-b41f-ceff12c8faae	9c0f10fc-7e92-47e1-9aa6-f8679bdd77eb.png	2019-03-29 09:37:50.804856	2019-05-07 05:20:49.597311	585	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4231	Pouchhopper	https://pouchhopper.livejournal.com/	United States	pouchhopper	35fe64d1-3aa9-4571-9374-b5f7e3c846ce	25d9f68e-9da4-4fe2-a6b1-39ba065ad6cc.png	2019-03-29 09:37:53.501034	2019-05-07 05:20:49.611335	586	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4232	Prefur	https://www.deviantart.com/prefur	United States	prefur	f20302ba-2529-46ea-b258-3b11e07078c6	fb09b819-d55c-4575-bd95-db832e79928a.png	2019-03-29 09:37:56.089019	2019-05-07 05:20:49.654087	587	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4233	Priamwolf	http://www.furaffinity.net/user/priamwolf/	France	priamwolf	5acd53bb-4544-411d-b5da-81da8f1aa369	ee5bd009-410f-4e8c-af82-73864f050757.png	2019-03-29 09:37:58.922886	2019-05-07 05:20:49.665291	588	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4234	Primal Art	https://www.furaffinity.net/user/primal-art/	United States	primal-art	45549323-0948-4c08-9021-fdc55105868a	d498d36a-ca4f-47bd-b10f-153aa251c012.png	2019-03-29 09:38:01.391346	2019-05-07 05:20:49.677817	589	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4235	Primal Visions	http://alexisrudd.com/	United States	primal-visions	0315a35a-9ff7-4edf-99da-71ecfe7db4d9	32391e1b-b570-478c-bbc6-df2ef5cc203d.png	2019-03-29 09:38:04.104976	2019-05-07 05:20:49.688232	590	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4236	Psybird	https://twitter.com/Lucifurrv	United States	psybird	719f9044-0b4d-4816-8117-c6df03614126	0947e959-2e14-411f-924e-264ca1c288b5.png	2019-03-29 09:38:06.834153	2019-05-07 05:20:49.697598	591	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4237	Pup1K	https://www.furaffinity.net/user/pup1k/	United States	pup1k	75e3ba11-b2d8-4451-a773-d6a0861d7a51	421bb038-ebd1-43fd-8562-b1d1e0b45db2.png	2019-03-29 09:38:09.360198	2019-05-07 05:20:49.706709	592	New Hampshire	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4239	Pyrope Costumes	https://twitter.com/PyropeCostumes	Mexico	pyrope-costumes	9abf42e2-12eb-405b-88b7-6e70b911ede4	b9b85b33-07fc-438e-9125-262cbccae439.png	2019-03-29 09:38:14.619352	2019-05-07 05:20:49.717808	594	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4240	Queen of Yeen (Crafty Hyena)	http://www.furaffinity.net/user/hyenaclaw	United Kingdom	queen-of-yeen-crafty-hyena	1d5f1575-730a-44c5-9871-521209e2d7d3	b37ef209-5e6f-42ad-bd5e-bc389e338f15.png	2019-03-29 09:38:17.10393	2019-05-07 05:20:49.727693	595	Blackpool	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4241	Ques Costumes	https://www.furaffinity.net/user/quescostumes/	United States	ques-costumes	61227e34-8d0a-4f09-83ff-50e51aabdaf6	d9711c3c-f8b8-47ff-b296-bf820069a4ca.png	2019-03-29 09:38:19.695966	2019-05-07 05:20:49.737918	596	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4242	Quest Fur Saplings (ElfinStray)	https://questfursaplings.weebly.com/	United States	quest-fur-saplings-elfinstray	387a2d64-1d2b-4209-8eab-f02fd295637c	4dc619a4-72fc-4fcd-9a04-5223f2d9f2bd.png	2019-03-29 09:38:22.416106	2019-05-07 05:20:49.748235	597	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4243	R5 Suits	http://www.furaffinity.net/user/r5suits	Slovakia	r5-suits	ee0331a2-5b88-4963-bdf4-34c4186b28c4	c115891a-a379-4536-8626-d69090346290.png	2019-03-29 09:38:25.060646	2019-05-07 05:20:49.758716	598	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4244	Rabbit in the Moon	https://www.furaffinity.net/user/rabbitinthemoon/	United States	rabbit-in-the-moon	8e36a35f-857e-4c25-96f1-3e86cabcd40d	c8ca9efa-d013-43de-ba12-77da708b84a4.png	2019-03-29 09:38:28.090775	2019-05-07 05:20:49.768666	599	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4245	Rachel Loal	https://www.facebook.com/RachelLoalART	Brazil	rachel-loal	1d2cb660-a4ea-4b55-9a13-e4a7a4c155af	23a01935-7f79-478b-9b9b-9db05aec6c4f.png	2019-03-29 09:38:30.699646	2019-05-07 05:20:49.780893	600	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4246	Radioactimals	http://www.radioactimals.com/	United States	radioactimals	45b66e13-ba15-4656-b641-f1f8028bf105	22ba7f4f-bf54-4c25-a406-9970314b5410.png	2019-03-29 09:38:33.253123	2019-05-07 05:20:49.790524	601	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4247	Raditz Wyvern	https://www.furaffinity.net/user/Raditz-wyvern	Canada	raditz-wyvern	2809e3f6-3323-4f5b-b596-e87b00f5b376	3347bec7-37bd-4c70-821f-ca05a1af5b64.png	2019-03-29 09:38:35.933523	2019-05-07 05:20:49.800692	602	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4248	RadPandas	https://www.furaffinity.net/user/radpandas/	United States	radpandas	d966bc4a-e48a-4c6a-bcd5-3cef2b75da8a	8843844e-d2f9-4dfa-890c-8c0b1d2ee430.png	2019-03-29 09:38:38.302649	2019-05-07 05:20:49.811004	603	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4250	Rainbow Productions	https://www.facebook.com/Rainbow-Productions-571534512865859/	United Kingdom	rainbow-productions	c3a8122e-e0e7-4586-be07-8e8db74f5d69	ea68e044-e232-4592-96e2-105e8296055d.png	2019-03-29 09:38:43.326014	2019-05-07 05:20:49.820937	605	London	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4251	Rainbow Wolfie Creations	https://www.deviantart.com/rainbowwolfiex	United States	rainbow-wolfie-creations	f00a5ce8-9fb0-4ac9-b3c1-4df19bf75a68	fa6f30e6-e420-4e66-ac21-7bc90a29e5be.png	2019-03-29 09:38:46.011154	2019-05-07 05:20:49.830923	606	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4252	Rainbowbeatz	http://www.furaffinity.net/user/rainbowbeatz	United States	rainbowbeatz	d7a7f153-d69b-49d1-a620-cec0a9d7ee67	fcde268a-d4d1-49cb-bea4-31fca0106619.png	2019-03-29 09:38:48.699472	2019-05-07 05:20:49.841141	607	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4253	Ranshiin	http://www.furaffinity.net/user/ranshiin/	United Kingdom	ranshiin	bed6c4d4-0052-4ab2-b777-19155f805c08	761c09bb-896b-4981-ba3e-649127124757.png	2019-03-29 09:38:51.194238	2019-05-07 05:20:49.851382	608	Yorkshire	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4254	Rastafarian Lion	http://fursuitreview.com/maker/rastafarianlion/	United States	rastafarian-lion	0b5802c4-cd63-4049-9233-ff9c2e78e157	612fb53d-26bc-4e99-b68d-dae8b91c7587.png	2019-03-29 09:38:53.921374	2019-05-07 05:20:49.862735	609	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4255	Ratcoffee	http://www.furaffinity.net/gallery/ratcoffee/	United States	ratcoffee	832eaa17-82af-47a0-9519-8117f19f885b	9a9c1c71-aae2-4d79-b2ad-8581944be8f5.png	2019-03-29 09:38:56.589851	2019-05-07 05:20:49.872669	610	Indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4256	Ratty Mischief Creations	https://aminoapps.com/c/furry-amino/page/user/taffy-the-rat/BQkR_B7Jhbf5268z5aoDD3aJ56wQaY8a7dE	United States	ratty-mischief-creations	52c9ef95-6efb-4d4e-b614-e610b1c5f892	83451f26-a168-46ec-9a20-33a97d87f730.png	2019-03-29 09:38:59.112862	2019-05-07 05:20:49.882914	611	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4257	Ravell	http://www.furaffinity.net/user/ravell	United Kingdom	ravell	560547fb-a31c-43f2-bcf7-57406ef2fbc5	5c817adc-83a7-4d84-9003-a1390ff09981.png	2019-03-29 09:39:01.661439	2019-05-07 05:20:49.893801	612	Hertfordshire	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4258	Razzy Lee	https://twitter.com/razzy_lee/	United States	razzy-lee	6a625c16-0717-4369-85b1-9e0728330dbc	5ad09c6a-3d6e-4ed7-a3ae-aafaf57f8cc2.png	2019-03-29 09:39:04.26895	2019-05-07 05:20:49.90528	613	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4259	Reason for Pawz	https://www.furaffinity.net/user/reasonforpawz/	United States	reason-for-pawz	95c28f24-b2b6-465a-84f1-1ce88624eed9	360df8ce-c29d-4287-a57a-a36203ec1bdb.png	2019-03-29 09:39:06.9781	2019-05-07 05:20:49.917161	614	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4260	Red Diamond Creations	https://twitter.com/NoColission	United States	red-diamond-creations	4436c01e-e31b-42b2-8f1e-6b6ab5130ec2	60956882-451e-4bce-ac08-b88b892f0b10.png	2019-03-29 09:39:09.539169	2019-05-07 05:20:49.928485	615	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4261	Red Hyena	https://redhyena.net/	United States	red-hyena	51ac4197-f8c4-4195-b849-c7658a4ec7a2	1cfa9533-cab2-4a72-9953-fa1308a7495e.png	2019-03-29 09:39:12.084638	2019-05-07 05:20:49.939191	616	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4262	Red Moon Hawk	https://twitter.com/RedMoonHawk1	Germany	red-moon-hawk	10dbdab0-af43-4889-8af9-5b1bbddfff3f	994c712f-3476-44d1-a1ea-6a573daa25ee.png	2019-03-29 09:39:14.606114	2019-05-07 05:20:49.949544	617	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4264	Regal Wolf Studios	https://www.deviantart.com/regalwolfstudios	United States	regal-wolf-studios	96c92183-cc0e-459c-ac87-7fc0bf453351	797b90f8-8a1a-49cd-9b9e-0f4679d423be.png	2019-03-29 09:39:19.450197	2019-05-07 05:20:49.960238	619	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4266	Reveille D'Giovanetti	https://reveille-d.livejournal.com/profile	United States	reveille-d-giovanetti	6c82f769-6536-4f77-a45d-fb773ed5285d	7cb82a53-c062-4403-aa0b-5ff0ec627a16.png	2019-03-29 09:39:24.742556	2019-05-07 05:20:49.971052	621	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4267	Rex	http://www.furaffinity.net/user/canrexplay/	United States	rex	c3f8c52e-0e18-456d-a0a6-33597c6db176	f95b57f6-0126-4bd6-a32d-3055640b939a.png	2019-03-29 09:39:27.364666	2019-05-07 05:20:49.981694	622	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4268	Rhee	https://www.furaffinity.net/user/Rhee	United States	rhee	86db15c1-21d8-43aa-be3b-a07507d8ae65	619f396e-dc00-4f08-bd9b-3aff943a8e53.png	2019-03-29 09:39:29.983625	2019-05-07 05:20:49.993078	623	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4269	Rhys Ookami	https://www.furaffinity.net/user/RhysOokami	United States	rhys-ookami	8e2c4a25-74f8-4917-8e62-5824f5233fa5	fdfe6657-236e-48c7-a595-ccb74e08b43c.png	2019-03-29 09:39:32.715201	2019-05-07 05:20:50.003819	624	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4270	Riiya	https://www.furaffinity.net/user/riiya/	United States	riiya	a7d4667c-1578-4c8d-bea1-efe08f032dbb	ff17fb4a-4152-4977-86f7-0f03895cbde7.png	2019-03-29 09:39:35.239564	2019-05-07 05:20:50.014393	625	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4271	Ritz Costumes	https://www.ritzcostumes.com/	United States	ritz-costumes	bd982c7a-6840-4653-b30c-0c7b1d21e43a	d42957f4-d074-4fc3-a271-892586e2a0f3.png	2019-03-29 09:39:37.778384	2019-05-07 05:20:50.024752	626	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4272	Roofur	http://www.roofur.com/	United States	roofur	d225c70d-a7da-40da-b0e8-d89d613795d2	b565ec39-b399-46fa-8967-59bd3f963e38.png	2019-03-29 09:39:40.325148	2019-05-07 05:20:50.034562	627	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4273	RooksRoofTops (RND Crafters)	https://rndcrafters.wixsite.com/randdcrafters	United States	rooksrooftops-rnd-crafters	8035f5bc-80e3-4312-836b-ec32afa5c0a4	bfcfbc33-428e-4738-9b2d-157df9b15bdf.png	2019-03-29 09:39:42.933614	2019-05-07 05:20:50.045229	628	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4274	RooSuits	https://www.furaffinity.net/user/RooSuits	United States	roosuits	184d37ae-81e6-4227-b399-cb72cde33af7	141c1867-f66e-419d-8720-b87d341e109e.png	2019-03-29 09:39:45.671674	2019-05-07 05:20:50.056159	629	Missouri	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4275	Rosequoll	https://www.furaffinity.net/user/rosequoll/	Australia	rosequoll	f2190b0a-c7e2-46c4-822f-11d5700341f1	3888eff0-4f6d-4b81-aa32-55e08706cf8d.png	2019-03-29 09:39:48.27181	2019-05-07 05:20:50.069199	630	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4277	Rowdy Monster	https://www.furaffinity.net/user/rowdymonster	United States	rowdy-monster	93c98086-e493-43ee-b67c-19bcf1522d2f	0e32c04c-abaa-4a30-82b7-d66762d36ba8.png	2019-03-29 09:39:53.395165	2019-05-07 05:20:50.080229	632	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4278	Ruff Stuff Costumes (Green Fox Fursuits GFF)	https://twitter.com/RUFFStuffSuits	United States	ruff-stuff-costumes-green-fox-fursuits-gff	88e06484-aec0-435e-9e5a-80ce949a9884	ddd5b7ab-6048-427f-99ae-ad597b1c19f3.png	2019-03-29 09:39:55.924345	2019-05-07 05:20:50.090404	633	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4279	Ruffled Designs	http://ruffleddesigns.com/	United States	ruffled-designs	47ce978b-f3f1-4338-b8fd-c801c25db85e	e9dc93c9-2228-49fb-91b1-e286dd0d3f1b.png	2019-03-29 09:39:58.382777	2019-05-07 05:20:50.100665	634	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4280	Rum Wolf Studios	https://www.rumwolf.net/	United States	rum-wolf-studios	ac2e02e5-432a-44a9-bbee-2a44b8aea309	0f3b7562-c888-457a-beb6-66af275cea2b.png	2019-03-29 09:40:01.215461	2019-05-07 05:20:50.111364	635	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4281	Runaway Workshop	http://www.furaffinity.net/gallery/awsole/	United Kingdom	runaway-workshop	6a8d42e3-8928-44db-9092-84fb2024d883	80d0a966-261e-49f0-ab99-4fece4184aac.png	2019-03-29 09:40:03.768051	2019-05-07 05:20:50.121471	636	Leicester	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4282	Running Wolf Productions	https://www.runningwolfpack.com/	United States	running-wolf-productions	e6bf5a0a-7df1-48f8-a4e7-0fca877dc8f8	4f5af407-7fe5-4929-bdef-d7b8758bb464.png	2019-03-29 09:40:07.237721	2019-05-07 05:20:50.13164	637	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4283	Runoratsu	http://www.furaffinity.net/user/runoratsu/	Germany	runoratsu	bccff751-bbdf-41ee-a802-6af8a8108a97	d0aa7890-549b-473f-92d6-c5cbbfe7584b.png	2019-03-29 09:40:09.699888	2019-05-07 05:20:50.141862	638	Lichtenstein	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4284	Rust Rat	http://www.furaffinity.net/user/silverraccoon/	United States	rust-rat	d005afc2-1ca3-4035-8f21-ce863485fc40	2f45615a-e8c9-4d46-9918-41769012bdb3.png	2019-03-29 09:40:11.856941	2019-05-07 05:20:50.152061	639	Arkansas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4285	Ryoken	https://www.furaffinity.net/user/ryoken/	United States	ryoken	aa70c3c9-1084-4471-beaf-b3d80fca3fc6	e7f7e6dc-1498-4b89-83cd-8f2b4cfbd91f.png	2019-03-29 09:40:14.453488	2019-05-07 05:20:50.162402	640	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4286	Sabrinageek	https://www.furaffinity.net/user/sabrinageek/	United States	sabrinageek	bb112c97-a0a3-4466-90f9-6b6629172330	14d46555-97ca-4767-a578-686cfc561f25.png	2019-03-29 09:40:17.02462	2019-05-07 05:20:50.172683	641	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4288	Salty Suits	https://saltysuits.webs.com/	United States	salty-suits	dab7d191-74d4-4dd9-bb75-0a7da0a1aac8	0533405c-e5f4-4b64-a393-e1bc45d1a0e0.png	2019-03-29 09:40:22.29736	2019-05-07 05:20:50.182223	643	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4289	Salvo Sniper	http://salvosniper.wixsite.com/commissions/piercing	United States	salvo-sniper	550d5520-d267-4ca7-8db5-946c3d7081c8	fec280ac-7a31-484c-a34e-cdd07343556c.png	2019-03-29 09:40:25.020984	2019-05-07 05:20:50.193135	644	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4290	Samajulas Fursuits	https://www.furaffinity.net/user/samajula/	Australia	samajulas-fursuits	83299110-2286-4c76-b587-c56e1651600c	361e85bb-4b0f-4c14-8ae6-3bbd66677a79.png	2019-03-29 09:40:27.949219	2019-05-07 05:20:50.203819	645	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4291	Sammy Smiles Works	https://www.furaffinity.net/user/myriddle4u	United States	sammy-smiles-works	3c5978e7-7342-4a20-afd1-5a3c555a33a6	dbde9bec-675b-465a-b8e9-b6de231f8238.png	2019-03-29 09:40:30.596769	2019-05-07 05:20:50.214359	646	Delaware	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4292	Sammy's Fur Shoppe	http://www.furaffinity.net/user/samthemoose101	United States	sammy-s-fur-shoppe	e1aef0c9-041a-4cc0-bfd3-96b4506a8d19	cad4fab2-ce45-4812-8b6c-1b817118c453.png	2019-03-29 09:40:33.600021	2019-05-07 05:20:50.224987	647	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4293	Sanctuary Suits	https://sanctuarysuits.webs.com/	United Kingdom	sanctuary-suits	ece9a9e8-cf3b-439d-a60b-9c5ca68db034	429e6b04-f4c3-4024-85f7-ec833c084591.png	2019-03-29 09:40:36.207797	2019-05-07 05:20:50.235611	648	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4294	Sarahcat	http://www.furaffinity.net/user/sarahcat/	United States	sarahcat	782b3b4f-ddc0-4600-8da2-62af41327ec2	2f798e06-042a-47fd-a94e-a7888750a731.png	2019-03-29 09:40:40.424853	2019-05-07 05:20:50.251354	649	Connecticut	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4295	Sasa Creations	https://www.furaffinity.net/user/~sasa/	Germany	sasa-creations	316dd385-9b8c-48ed-ba75-e47561a0b36e	81ab2f95-de80-4350-9f58-6109d450ee4c.png	2019-03-29 09:40:42.98946	2019-05-07 05:20:50.262935	650	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4296	Sashaligress	http://www.furaffinity.net/user/captainsasha	United States	sashaligress	291675db-36fc-4fd8-84ef-b54912b9e9e5	ef4e1f65-f03b-47ac-8a45-e18f0616051a.png	2019-03-29 09:40:52.818553	2019-05-07 05:20:50.273535	651	Tennessee	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4297	Sassy Pup Creations	https://www.sassypupcreations.com/	United States	sassy-pup-creations	bd5b6927-6619-4802-be9b-9d8b91effb80	87115a73-8746-4ac4-ae99-9fdb28035baa.png	2019-03-29 09:40:55.370112	2019-05-07 05:20:50.283972	652	Kentucky	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4299	Saved Ferret	https://www.instagram.com/saveferret/	United States	saved-ferret	c8c9ff63-2c5a-4f06-8171-8c7449673f99	3d0b0698-daec-4588-ba60-b88427ae1737.png	2019-03-29 09:41:00.396878	2019-05-07 05:20:50.295286	654	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4300	Scardykat85	https://www.furaffinity.net/user/scardykat85/	United States	scardykat85	2cba803c-fbff-4864-bfb1-0abe1eb332d4	04750a5c-6ca5-4b34-945a-22edefff904d.png	2019-03-29 09:41:03.615493	2019-05-07 05:20:50.305562	655	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4302	Scratch Kitty	http://www.furaffinity.net/user/scratchkitty/	United States	scratch-kitty	f8637702-8bee-4342-a6cb-bf67024ba083	b53c7a16-eb2a-4b01-906a-0275cfe0eaa3.png	2019-03-29 09:41:08.387825	2019-05-07 05:20:50.315906	657	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4303	Scuddlebutt Creatures (Onai)	http://www.furaffinity.net/user/onai	United States	scuddlebutt-creatures-onai	cfe98ab2-6fca-434f-b051-173e01685dce	04d932c3-f325-4608-aafe-2af4e9746a60.png	2019-03-29 09:41:10.959991	2019-05-07 05:20:50.326364	658	Wisconsin	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4304	Seadog Suits	http://seadogsuits.tumblr.com/	United States	seadog-suits	84a17e8a-8d12-4861-9ee6-672362ec9b4d	d0c08027-bab5-4d5b-b5e0-c6599df27688.png	2019-03-29 09:41:19.619829	2019-05-07 05:20:50.336517	659	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4305	Sector Suits	https://www.sectorsuits.com	United States	sector-suits	071aec1d-d91a-48f6-a585-86d493e39cc1	c80d3214-4b76-4d9c-926c-8c369c895f63.png	2019-03-29 09:41:22.220057	2019-05-07 05:20:50.350052	660	Kansas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4307	Sewing-Critters	http://www.sewing-critters.com/	Germany	sewing-critters	cf821d32-567d-4587-8e31-8feb05a910b4	d5602302-2ca6-469d-be05-4d84b5e31ae0.png	2019-03-29 09:41:27.839814	2019-05-07 05:20:50.360908	662	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4308	Seylyn	https://www.furaffinity.net/user/seylyn	Canada	seylyn	df1f2c0b-4c86-460b-a8a0-7054f09b49a3	0c5b627b-dfd4-48ac-97c0-781a5dca3980.png	2019-03-29 09:41:30.147377	2019-05-07 05:20:50.371005	663	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4309	Shaggy Griffon Studios	http://www.furaffinity.net/user/shaggygriffonstudios/	United States	shaggy-griffon-studios	6bbe24ed-793f-429a-bcc5-72f160c3598d	3687d27d-fa26-4aaf-9245-6b9505cee62b.png	2019-03-29 09:41:32.586551	2019-05-07 05:20:50.381091	664	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4310	Shagpoke Studios	http://www.furaffinity.net/user/shagpoke/	Canada	shagpoke-studios	a4e4a08e-e629-4724-bd82-3225c105adbb	171a1c10-5bf5-4b24-beef-78c2868a66b9.png	2019-03-29 09:41:35.082483	2019-05-07 05:20:50.390517	665	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4311	Shamrock Scales	https://www.instagram.com/shamrock.scales/	United States	shamrock-scales	0995071f-e51d-4c12-a6c8-7a8e180b0e30	5daa374d-adc2-443f-9787-2f780360a4dd.png	2019-03-29 09:41:37.409807	2019-05-07 05:20:50.400101	666	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4312	Sharkteefs	https://twitter.com/Sharkteefs	United States	sharkteefs	f4834d62-f7b9-437e-b5c1-ad25e1c2e043	c25a2fc5-160c-4d84-bb95-230c395a5bef.png	2019-03-29 09:41:39.999042	2019-05-07 05:20:50.409737	667	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4313	Sharpe Costumes	https://www.furaffinity.net/user/Sharpe19	United States	sharpe-costumes	97039aa2-06cb-4667-8db4-bd12e48eeef4	bad1ff0a-b86f-4dcb-bf26-4c8e0078a176.png	2019-03-29 09:41:42.524871	2019-05-07 05:20:50.419097	668	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4314	Sheevee	https://www.furaffinity.net/user/sheevee	France	sheevee	e3c09ca2-195e-4e5d-adaf-7a12a9ed0d0f	a7883b29-f0b0-4a61-a611-8c6a375998d5.png	2019-03-29 09:41:45.075371	2019-05-07 05:20:50.429779	669	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4315	Shengoh	https://www.furaffinity.net/user/shengoh/	United States	shengoh	a4c5407f-ea02-4866-94a5-0678526f3544	a44f3cf3-c479-4fd6-b7c7-e862d52619a4.png	2019-03-29 09:41:47.265957	2019-05-07 05:20:50.439915	670	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4316	Shkaff	https://www.furaffinity.net/user/Shkaff29	Russia	shkaff	cf0e6c64-86db-4e33-b96b-2fab809dfe3f	fe5bdd6c-3332-4c92-b3cc-17ba00aa8f68.png	2019-03-29 09:41:49.767359	2019-05-07 05:20:50.45032	671	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4317	Shock Collar Studios	https://shockcollar.webs.com/	United States	shock-collar-studios	1ee56297-16e5-48af-aea7-6d038f820af9	afd5e3a6-7f2f-49d7-8943-7f77bf1c2f22.png	2019-03-29 09:41:51.945163	2019-05-07 05:20:50.461488	672	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4319	Shuntorizzy	http://www.furaffinity.net/user/shuntorizzy/	Finland	shuntorizzy	e4a34a8d-96dc-448d-96b9-8b11d5296094	4cbe938a-c400-4db6-9a89-29a71a2a69bf.png	2019-03-29 09:41:57.815226	2019-05-07 05:20:50.471823	674	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4320	Silent Howl	https://www.furaffinity.net/user/silenthowl/	Italy	silent-howl	3459eba9-adcd-438f-9aa8-a64258b5220a	2b5a55fc-5c40-465d-a95c-979b8cbff0f3.png	2019-03-29 09:42:00.827478	2019-05-07 05:20:50.48201	675	Milano	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4321	Silvena Handmade	http://silvenahandmade.com/	Poland	silvena-handmade	31446c1b-7204-4543-98bc-5eab6741ed81	1f31aaec-e1e3-491d-b9bd-4990530f2ac8.png	2019-03-29 09:42:02.999583	2019-05-07 05:20:50.492559	676	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4322	Silver Sky Studio	https://www.furaffinity.net/user/silverskystudio	United States	silver-sky-studio	a7469533-8ed7-49a6-979f-576b0ca59a0a	30f04fa2-6937-47e6-9d1c-a744f9dd750f.png	2019-03-29 09:42:05.559062	2019-05-07 05:20:50.503031	677	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4323	Silverfang	https://www.furaffinity.net/user/silverfangfluffball/	United States	silverfang	db415d0b-ada3-46c7-b1c2-fa35bbad322c	2db8036e-f246-4c6f-acaf-1f1cf2204ff9.png	2019-03-29 09:42:08.353574	2019-05-07 05:20:50.513387	678	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4324	Sironafur Creations	https://www.sironafurcreations.com/	United States	sironafur-creations	e23456b9-989c-4bb1-83b0-c957f76009d3	1538e04c-72b4-4381-a6cc-e6454e41de52.png	2019-03-29 09:42:10.89845	2019-05-07 05:20:50.523768	679	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4325	Skookum	https://www.furaffinity.net/user/skookum/	United States	skookum	749c1a69-e7e7-43ca-bf79-a8c33075fa2d	ee5ca642-e7ff-463b-bcde-ad6ed259b559.png	2019-03-29 09:42:13.380963	2019-05-07 05:20:50.534333	680	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4326	Sky Hawk Cosplay	https://twitter.com/skyhawkcosplay	Germany	sky-hawk-cosplay	8acac388-f124-4c6f-baf2-be3741c68855	eb0fbd12-d272-4aba-b6d2-fed838da1c9a.png	2019-03-29 09:42:15.917534	2019-05-07 05:20:50.544656	681	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4327	Skyehigh Studios	https://www.furaffinity.net/user/skyehighstudios	Australia	skyehigh-studios	76f5bb8d-8f66-4049-bb95-cb3698470faa	270f4cc8-407d-4db2-9aa9-cfd730fb0f04.png	2019-03-29 09:42:18.09798	2019-05-07 05:20:50.55507	682	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4328	Skypro Costumes	https://www.skyprocostumes.com/	United States	skypro-costumes	d0655439-d81b-4ca0-b9fa-fbbdc2a981f9	e33f386b-45b0-4b6f-83a9-7ba70818226f.png	2019-03-29 09:42:20.600702	2019-05-07 05:20:50.56542	683	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4329	Slap Happy Bunny	https://www.furaffinity.net/user/slaphappybunny/	United States	slap-happy-bunny	d358bb4f-95d7-47f6-8b67-dee94a9e187d	15bb205d-a59c-4770-b48a-6203bda23600.png	2019-03-29 09:42:23.154036	2019-05-07 05:20:50.575578	684	Delaware	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4330	SmolShepSuits	https://twitter.com/HowDoUKnoMyName	Denmark	smolshepsuits	a0d3958c-7bcf-4b91-878d-f7ad0820d28f	0d148c8c-763d-4469-8f62-b558b2536895.png	2019-03-29 09:42:25.745973	2019-05-07 05:20:50.585844	685	Jylland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4331	Snow Covered Yote	https://twitter.com/PordzMoose	Canada	snow-covered-yote	c8a82601-f768-47e5-bbe6-99b8e69c56f3	d484c5b5-0c79-4eb0-92f9-9722ff4f5c40.png	2019-03-29 09:42:27.981339	2019-05-07 05:20:50.596302	686	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4333	Snow Leopard Creations	https://www.snowleopardcreations.com/	United States	snow-leopard-creations	11dc49c1-ae3a-490d-bc5f-863e31294bbd	38951f67-08c9-4193-8ec2-19b80bbd5153.png	2019-03-29 09:42:42.447175	2019-05-07 05:20:50.607844	688	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4334	Soapdish	http://www.furaffinity.net/user/soapdish/	United States	soapdish	4c77916e-1509-43e6-87dd-f391c34972d3	c4887490-9179-4e32-ad2c-e189075f83ef.png	2019-03-29 09:42:45.068726	2019-05-07 05:20:50.618865	689	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4335	Sogertone	https://twitter.com/sogertone/media	United States	sogertone	efd979bb-19e5-4cd5-98dc-0ab1bf3dca08	263ed3ce-6919-4cbb-bd73-9806873d34f4.png	2019-03-29 09:42:48.16264	2019-05-07 05:20:50.629153	690	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4336	Solemn Vulpine	https://www.furaffinity.net/user/SolemnVulpine	United States	solemn-vulpine	3c59f36e-a499-4905-9847-224088bb00ee	217f5f7c-0571-4692-af79-853c759e8558.png	2019-03-29 09:42:50.814983	2019-05-07 05:20:50.639194	691	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4337	Sonartoo	http://www.furaffinity.net/user/sonartoo/	United States	sonartoo	00423755-3393-44c3-a7bf-0b06567a602a	d3d08c35-e6d8-4ab3-aac8-221b9ccc285d.png	2019-03-29 09:42:53.298309	2019-05-07 05:20:50.649654	692	Delaware	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4339	Soul Creations	http://www.furaffinity.net/user/soul-creations	Germany	soul-creations	4f86d058-cb75-4fd2-8b26-0e658e0b1e70	e89d8191-c5a8-40a1-8098-b53b8640e332.png	2019-03-29 09:42:58.764529	2019-05-07 05:20:50.660101	694	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4340	Space Cat Creations	http://www.furaffinity.net/user/SpaceCatCreations	United States	space-cat-creations	f7135e9b-ec52-4bda-aa23-3b4ca75d6cfb	469eef22-7cbc-4f98-815f-e18d035d74f7.png	2019-03-29 09:43:01.09238	2019-05-07 05:20:50.671417	695	Connecticut	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4341	Spark Costuming	http://www.sparkcostumes.com/	United States	spark-costuming	f55df2ba-ae33-4b88-a555-a465071b898f	2f4efe9c-03a4-463a-a6f1-aaf02a0409e6.png	2019-03-29 09:43:03.574409	2019-05-07 05:20:50.684018	696	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4342	Spark Studios	http://www.furaffinity.net/user/bladespark/	United States	spark-studios	041cb01f-ddfd-48fb-a601-1d46933fb30f	17231edd-0479-4f42-a840-97681e8ea98e.png	2019-03-29 09:43:06.077804	2019-05-07 05:20:50.69634	697	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4343	Sparkle Kreations	https://www.furaffinity.net/user/SparkleKreations	United States	sparkle-kreations	27a73223-3547-4236-9414-26dd6d18cf21	cfd40063-b046-42a6-a204-d646e8a285f0.png	2019-03-29 09:43:08.673196	2019-05-07 05:20:50.709311	698	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4344	Sparklepup Studios	https://www.furaffinity.net/user/SparklepupStudios	United Kingdom	sparklepup-studios	b718045f-ebfe-4c66-9ae4-4c48f0b929d3	6b7591f1-f887-484d-a46d-c0a33406051f.png	2019-03-29 09:43:11.175325	2019-05-07 05:20:50.720867	699	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4345	SparkyCanDo	http://www.furaffinity.net/user/sparkycando/	New Zealand	sparkycando	6bee4a0a-a579-445a-8f85-1d3300c09179	8f6e303d-33f6-47f8-9644-499ebfc323a6.png	2019-03-29 09:43:13.705687	2019-05-07 05:20:50.733523	700	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4346	Sparkyena	http://www.sparkys-stitches.com/	United States	sparkyena	f233fab2-4314-4c1b-a3fa-963e571de70a	49b9249b-992b-4a7f-8c6d-c750347143fe.png	2019-03-29 09:43:16.152663	2019-05-07 05:20:50.745092	701	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4348	Speckled Studios	https://sspeckledstudios.wixsite.com/speckledstudios	Australia	speckled-studios	cd068487-3b6a-4f79-8592-42ae42f348ca	609bf251-718c-4a20-bf35-a7c42caeefd2.png	2019-03-29 09:43:21.319507	2019-05-07 05:20:50.758059	703	Adelaide	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4349	Specter Suits	https://www.furaffinity.net/user/spectersuits/	United States	specter-suits	36c182c7-5282-472b-976b-80f33e4a5aaa	fbce733d-856f-418d-8641-7779890550aa.png	2019-03-29 09:43:23.882482	2019-05-07 05:20:50.770195	704	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4350	Spinfox	https://www.furaffinity.net/user/spinfox/	Mexico	spinfox	8bf6694c-8b63-4c85-aa65-14932d41e509	c2b08731-39c4-4ee2-83ba-c99b8fbaed01.png	2019-03-29 09:43:26.419277	2019-05-07 05:20:50.781853	705	Coahuila	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4351	SpiritPanda Creature Cosplay and Costumes	https://twitter.com/SpiritPandaSuit	United States	spiritpanda-creature-cosplay-and-costumes	ede5b4a2-c0b4-4218-b089-d740271d20cc	39071ee7-b659-44dd-8675-af1e78fae2e4.png	2019-03-29 09:43:28.890006	2019-05-07 05:20:50.792745	706	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4352	Spit and Ink Studios	https://www.furaffinity.net/user/Neptuna	United States	spit-and-ink-studios	beb79487-1ca4-455a-a83f-a67f1e5dd063	3a8bbfb8-2325-4978-bfe3-db9bac4f9cb0.png	2019-03-29 09:43:31.462462	2019-05-07 05:20:50.803981	707	Connecticut	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4353	Splinter Fox Productions	https://www.furaffinity.net/user/splinterfoxproductions/	United States	splinter-fox-productions	f675f6bc-28ff-43af-85d0-c6da2c29b812	03a12a99-5098-4cef-9123-d0211b90dd70.png	2019-03-29 09:43:34.018482	2019-05-07 05:20:50.816947	708	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4354	SplootSuits	https://www.furaffinity.net/user/shannon/	United States	splootsuits	abedd539-ec43-44a4-afc3-9e2042205591	2dd3aee2-478a-4f59-883e-ce9f66111313.png	2019-03-29 09:43:36.533236	2019-05-07 05:20:50.829315	709	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4355	Spotty Productions	https://www.furaffinity.net/user/hindpaws/	United States	spotty-productions	b5f63635-6676-4b6f-a4bb-310ad515b910	290d62f7-3e4b-4bcc-ae17-2ce08ad2cdf1.png	2019-03-29 09:43:39.021147	2019-05-07 05:20:50.84559	710	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4356	Spud Studios	https://spudstudios.net/	United States	spud-studios	764c8756-cb57-47f4-a288-f8831b6bbeea	c5ec6eed-e48d-495c-967e-8a68fd384539.png	2019-03-29 09:43:41.523565	2019-05-07 05:20:50.861469	711	Utah	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4357	Squeaky Chewtoy	http://www.furaffinity.net/user/chewtoy/	United States	squeaky-chewtoy	846f3f82-6cd3-40b2-98fd-7ae3bf9c31a6	d69261b7-9ff1-484e-abb7-3120a60431a6.png	2019-03-29 09:43:44.061286	2019-05-07 05:20:50.875401	712	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4359	Star Fursuits	https://www.starfursuits.com/	United States	star-fursuits	d2e8e8ef-2ce3-42c0-89c8-9bb403259d9c	bd432de6-ba81-42fd-b08f-6bef03e68415.png	2019-03-29 09:43:49.13165	2019-05-07 05:20:50.886302	714	Utah	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4360	Starparty	https://www.furaffinity.net/user/starparty	United States	starparty	de0e7a64-7c90-4412-9e6f-4c2434782b00	f3d02c77-4e52-4697-b6ef-68cb492d6dee.png	2019-03-29 09:43:51.89268	2019-05-07 05:20:50.897211	715	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4361	Starry Kitsune	https://www.starrykitsune.com/	United States	starry-kitsune	3c345e99-cf41-4900-aadb-e026f3009c7a	a9eb6d6e-255e-4a6a-a0b7-daea411c4e4c.png	2019-03-29 09:43:54.426427	2019-05-07 05:20:50.907878	716	Nevada	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4362	Starslikeroses	https://www.furaffinity.net/user/Starslikeroses	United Kingdom	starslikeroses	6779e8ee-4562-4a2f-a870-7a46528b67e8	f14900b1-0556-49ff-856d-5bd31fe036ae.png	2019-03-29 09:43:56.973537	2019-05-07 05:20:50.919277	717	London	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4363	Steel the Wolf	https://www.furaffinity.net/user/steelthewolf/	United States	steel-the-wolf	bf794ffa-01b7-4d32-a578-7198713264bf	f5fcc6bb-0486-4a76-9e2c-07a3b7726861.png	2019-03-29 09:43:59.483802	2019-05-07 05:20:50.929951	718	Kansas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4364	Stickypawz Studio	http://stickypawz.timduru.org/	United States	stickypawz-studio	36a28c14-fd9f-44e7-a23c-ae96158bd2e7	99c2aa50-e172-4da2-9363-86b5fef4a418.png	2019-03-29 09:44:02.015816	2019-05-07 05:20:50.940449	719	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4365	Stitch Star Fursuits	https://www.furaffinity.net/user/stitchstarfursuits	United States	stitch-star-fursuits	2b691ca2-703f-4eae-826b-c76c88f3a19b	73049a98-7069-4708-a1d1-cdeed87036c6.png	2019-03-29 09:44:04.663967	2019-05-07 05:20:50.951137	720	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4366	Stitchit Studios	https://instagram.com/stitchitstudios?utm_source=ig_profile_share&igshid=1kjcouew7voy1	United States	stitchit-studios	4a4dfd48-ce8c-49eb-8a8c-182cee227833	19c99228-616a-4a25-8101-dbaec028b21d.png	2019-03-29 09:44:07.416554	2019-05-07 05:20:50.962391	721	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4367	Stone Studios	https://www.furaffinity.net/user/stone.studios./	United States	stone-studios	259983ce-1cb6-4a34-b398-20fccbc1c96f	09d530b1-083c-4d61-b0ec-cb4eb0825325.png	2019-03-29 09:44:10.047093	2019-05-07 05:20:50.973019	722	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4368	Storm Wolf Creations	https://stormwolfcreations.weebly.com/	United States	storm-wolf-creations	98a35272-97c6-4d68-a1d6-23fc4f1906d2	c1a0993c-b6d8-47c0-9773-6b6a6116e04f.png	2019-03-29 09:44:12.708779	2019-05-07 05:20:50.98385	723	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4369	Stormy Fluff Creations	https://aizonkwbellam.wixsite.com/stormyfluffcreations/	Canada	stormy-fluff-creations	da150fb2-4286-4678-9a47-850a5f810876	4e53e6ca-43a2-41bb-94bd-fa3412711c3c.png	2019-03-29 09:44:15.485184	2019-05-07 05:20:50.994642	724	Alberta	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4370	Streifenschnauzer Fursuits	https://www.streifensuits.de/	Germany	streifenschnauzer-fursuits	2e952086-be5b-4d27-a471-635254952f36	f3dbfe44-93f5-4a6b-8de1-527dba540153.png	2019-03-29 09:44:18.349724	2019-05-07 05:20:51.00519	725	Brandenburg	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4371	Studio Citrus	https://twitter.com/_studiocitrus?lang=en	Japan	studio-citrus	72cf5fe9-1f65-4489-9f4f-f9ab19f5782c	4655b9de-06d4-42e5-91e2-fe2efa45a8bb.png	2019-03-29 09:44:21.160837	2019-05-07 05:20:51.016205	726	Tokyo	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4374	Studio Pinali	http://www.furaffinity.net/user/pinali/	United States	studio-pinali	bb4f7939-c132-46ae-97c8-c43f523daf90	3641133e-370e-4396-8490-86503692e722.png	2019-03-29 09:44:28.796278	2019-05-07 05:20:51.030241	729	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4375	Stuffed Panda Studios	http://stuffedpandastudios.com/	United States	stuffed-panda-studios	fc3cf841-3fca-4d9d-8a83-4798e8d89334	83848867-ccc5-4061-80e6-177d70767f98.png	2019-03-29 09:44:31.403838	2019-05-07 05:20:51.041059	730	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4376	SueCreations	https://www.deviantart.com/suecreations	Norway	suecreations	b40c79b2-c916-40a7-9ae7-9a3d59aaa1d4	4a5302bf-cae5-4003-963e-be151147dcda.png	2019-03-29 09:44:34.128321	2019-05-07 05:20:51.05162	731	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4377	Sugar Critter Studios	http://sugarcrittersstudios.webs.com/	United States	sugar-critter-studios	36a7b14b-4a9a-4383-b07a-a56593b907aa	7acd2c0c-59d4-45b6-bf22-8c9a8b68666a.png	2019-03-29 09:44:36.685095	2019-05-07 05:20:51.062473	732	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4378	SugarNSpiceCostumes	https://www.instagram.com/sugarnspicecostumes/	United States	sugarnspicecostumes	29a1c50a-4386-4b8e-9933-f546ace958ea	6532460a-d84e-4983-8c05-012cbe6a8eb6.png	2019-03-29 09:44:40.258796	2019-05-07 05:20:51.072828	733	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4379	Sugarrush Creations	http://www.furaffinity.net/user/sugarrushcreations/	Finland	sugarrush-creations	c6b7126d-f51f-482e-affe-79043d911c2d	3cd53964-e5f0-4af2-a3fb-608000acc4a9.png	2019-03-29 09:44:43.994123	2019-05-07 05:20:51.083446	734	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4380	Suit-a-dile	http://www.furaffinity.net/user/suit-a-dile	United States	suit-a-dile	d86784ec-4f6d-47b5-8323-d098a6da3866	8e5cec90-53d5-4230-ad57-131d9f82d5be.png	2019-03-29 09:44:46.173214	2019-05-07 05:20:51.094355	735	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4381	Suits by Shark	https://www.furaffinity.net/user/TwerkOnThatShark	United States	suits-by-shark	4638a8fb-c682-4c7b-9204-78954d1c54a9	79e323de-2fdc-403f-9798-2ec385fad3e7.png	2019-03-29 09:44:48.83064	2019-05-07 05:20:51.104737	736	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4383	Sunny Valley Creations	https://twitter.com/SunnyValleyC?s=09	United States	sunny-valley-creations	85e291c9-c152-406d-be83-b93b1fccf7c8	1acfc67d-6302-485e-8c0c-d260a728d32c.png	2019-03-29 09:44:53.98117	2019-05-07 05:20:51.115347	738	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4384	Surf Cat Costumes	http://www.furaffinity.net/user/sophiecabra/	United States	surf-cat-costumes	2cfd4c33-3d43-433e-8b18-081e439c17bc	53ebc5d4-c043-4ccc-92b7-3f48d469f390.png	2019-03-29 09:44:56.723474	2019-05-07 05:20:51.125321	739	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4385	Sushi Suits	http://www.furaffinity.net/user/sushi.suits/	United States	sushi-suits	1021dace-4883-4d59-a7de-228f5b698523	35acf627-dd4a-4daa-ba4d-8f91c5fc6de6.png	2019-03-29 09:44:59.499211	2019-05-07 05:20:51.135479	740	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4386	Sushimon Suits	https://www.furaffinity.net/user/sushinomsuits/	United States	sushimon-suits	1a83050d-8085-4ad7-b264-823dc6aa815f	d466ae6c-b23b-4370-b506-eca8bbcf0355.png	2019-03-29 09:45:01.906273	2019-05-07 05:20:51.146009	741	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4387	Sushinom Suits	https://www.furaffinity.net/user/jacek/	United States	sushinom-suits	03f953af-c1ec-45f2-8d4b-94b62bdf220c	f63836e8-c778-408d-8471-f21995329480.png	2019-03-29 09:45:04.676106	2019-05-07 05:20:51.156818	742	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4388	Suzamuri Creations	http://www.furaffinity.net/user/suzamuricreations/	Russia	suzamuri-creations	b3f5042e-1f68-4359-b781-04f0ef4db0be	b221b0ba-eccf-4e9f-8694-fb654576ba3f.png	2019-03-29 09:45:08.789226	2019-05-07 05:20:51.170036	743	Moscow	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4389	Sweentastic Productions	https://sweentasticproductions.weebly.com/	Canada	sweentastic-productions	0ee52993-5e21-4d05-9f8f-064e8668210f	1f747834-ea96-4adb-a120-e8ded96e3125.png	2019-03-29 09:45:11.63328	2019-05-07 05:20:51.180898	744	Saint Catharines	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4390	Sweet and Salty Suits	https://www.instagram.com/sassy.suits/	United States	sweet-and-salty-suits	61578888-653a-4173-a53b-4e01e2f0b8f4	7684fa64-eecd-4894-af8b-655ff0657748.png	2019-03-29 09:45:14.009774	2019-05-07 05:20:51.191515	745	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4391	SweetSushi	https://www.furaffinity.net/user/SweetSushi	Netherlands	sweetsushi	4fa15048-c458-40aa-b04b-6b7f21e036b2	81bd8e8e-8f4c-42f0-9028-f456a53095c4.png	2019-03-29 09:45:17.234901	2019-05-07 05:20:51.202273	746	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4392	Sylfur	https://www.furaffinity.net/gallery/sylfur/	Canada	sylfur	ac3155c2-836c-4726-b437-4fce07923d31	971dae1f-3059-43cc-b5d4-3815ec45d588.png	2019-03-29 09:45:19.47607	2019-05-07 05:20:51.21281	747	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4393	Synthwolf	https://www.furaffinity.net/user/synthwolf/	United States	synthwolf	64f285e7-88d0-4e03-83ff-aed5f312c878	49f3585e-43b5-443a-91a3-2dd406354cb8.png	2019-03-29 09:45:21.84902	2019-05-07 05:20:51.223218	748	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4394	Tabulambestias	https://www.furaffinity.net/user/tabulambestias/	Ukraine	tabulambestias	67ef4658-35b2-4480-b1d5-edc4f5873277	33ef643b-920b-4480-b8d1-f8c0085e6f40.png	2019-03-29 09:45:24.413908	2019-05-07 05:20:51.233796	749	Odessa	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4395	Taffka	https://www.furaffinity.net/user/taffka	Russia	taffka	4dab03b3-6fbd-439c-ae93-9819beb83590	d6ca483d-51f4-4562-bcca-905cb7763cfd.png	2019-03-29 09:45:27.20744	2019-05-07 05:20:51.244593	750	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4396	Tailin	http://www.furaffinity.net/user/tailin	United States	tailin	e0d3a8ed-48ba-4ad0-b5c3-c2c769525a7a	10bca187-d9df-48a3-943d-952a159e6a6b.png	2019-03-29 09:45:29.564056	2019-05-07 05:20:51.255339	751	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4398	Takumori	https://www.furaffinity.net/user/takumori/	United States	takumori	5546eb87-a023-4bf3-9089-e518c0f69d38	6a9cfd65-1f79-400a-bce1-1be0d8dce9a3.png	2019-03-29 09:45:34.739671	2019-05-07 05:20:51.266502	753	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4399	Talarus	http://www.furaffinity.net/user/Talarus/	Canada	talarus	9396eee3-fbc3-4d7c-9ff2-29b7af2297cd	ea51818f-77a7-4ff9-8ad0-9fd3d9e55372.png	2019-03-29 09:45:37.433918	2019-05-07 05:20:51.277068	754	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4400	Tanidareal	http://www.tanidareal.com/index.htm	Germany	tanidareal	f4d77533-fc4d-4b98-add6-e8281e7912b7	6bf4e66b-0b81-4ca9-aaa3-16745d97ec0b.png	2019-03-29 09:45:39.80323	2019-05-07 05:20:51.287348	755	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4401	Tapapat Creations	http://tapapatcreations.com	France	tapapat-creations	b303c8b7-beba-4db5-8d3d-f01907815eec	e3b10ae5-7299-44b3-9467-08ee39ae966b.png	2019-03-29 09:45:42.530169	2019-05-07 05:20:51.297893	756	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4402	Taybee Fursuits	http://www.furaffinity.net/user/taybee	United States	taybee-fursuits	73641669-a3a3-46e5-be73-8dc576311d3b	637771fc-cd93-475a-b3b7-5e41419cd091.png	2019-03-29 09:45:44.679248	2019-05-07 05:20:51.308805	757	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4403	Technicolour Costumes	https://technicolourcostumes.weebly.com/	United States	technicolour-costumes	38a2c31b-901c-4ce4-8cb5-18b2ec8f945f	0aae83cf-ea60-4627-a078-d4052f30a377.png	2019-03-29 09:45:47.132724	2019-05-07 05:20:51.319202	758	Massachusetts	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4404	Templa Creations	http://www.templacreations.com/	Norway	templa-creations	97655a29-6df9-442f-b595-b793129a06cd	cd61d88a-0cf4-4a90-a855-f7889737f66a.png	2019-03-29 09:45:49.675398	2019-05-07 05:20:51.331136	759	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4405	Tesyra Creations	https://fire-feather.wixsite.com/tesyracreations	Netherlands	tesyra-creations	b9408c42-95b3-4f23-bf04-c237163f70f0	4b9ca562-cc06-4b16-af6d-6f3cb5b60ad8.png	2019-03-29 09:45:52.335007	2019-05-07 05:20:51.342024	760	Amsterdam	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4407	The Corrupted Furries	https://www.furaffinity.net/user/thecorruptedfurries	United Kingdom	the-corrupted-furries	f4f868f7-97d9-4c30-a7f1-da331850436b	23794640-33a5-4a36-9ff6-a79fd687c3fc.png	2019-03-29 09:45:57.117215	2019-05-07 05:20:51.35242	762	Wales	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4408	The Critter Factory	https://twitter.com/CritterFactory	United States	the-critter-factory	d7d19b99-d3e9-42c3-ac47-ce877f12a736	5acba64a-cdce-4e83-8e77-bffe0c53d5b1.png	2019-03-29 09:45:59.595168	2019-05-07 05:20:51.363362	763	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4410	The Frozen Phoenix	https://thefrozenphoenix.weebly.com/	United States	the-frozen-phoenix	d7814e80-3eaa-4b7c-941e-d639e930455f	53878aa1-240e-458d-934b-c8f88ae51ca0.png	2019-03-29 09:46:04.994193	2019-05-07 05:20:51.373367	765	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4411	The Fur Collective	https://www.thefurcollective.com/	United States	the-fur-collective	5f7d0630-1e72-4321-b2a3-9ccedcf66b56	4672e496-2bee-4bb8-8b46-1dacd65352e8.png	2019-03-29 09:46:07.642685	2019-05-07 05:20:51.383581	766	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4412	The Fuzz Factory	https://www.thefuzzfactory.com/	United States	the-fuzz-factory	92652eb5-cd14-474f-a2d8-5de3cfd3cbe3	15498916-c689-4c19-9d1b-3fbe546ecd5a.png	2019-03-29 09:46:10.308852	2019-05-07 05:20:51.394307	767	Cascadia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4414	The Menagerie Costumes	https://www.themenageriecostumes.com/	Australia	the-menagerie-costumes	80f5fe5d-a7d1-48f2-b649-9cf9d37d224b	fa706d76-03dd-47ad-aeed-362c3d1328f5.png	2019-03-29 09:46:14.947393	2019-05-07 05:20:51.404566	769	Queensland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4415	The Other Side of Us	https://www.facebook.com/The-other-side-of-us-1992356991010637/	United States	the-other-side-of-us	94f7ca4c-7d72-4486-8125-5e73ff01aecb	ecc9dd02-46f0-4e55-84ce-a4fa80e84447.png	2019-03-29 09:46:17.436134	2019-05-07 05:20:51.414757	770	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4416	The Phoenix Nest	http://the-phoenix-nest.com/	United States	the-phoenix-nest	ccdcdbe3-cbf0-44c4-aeef-4bb4a891dff9	63189993-d956-445a-aade-63b068bac497.png	2019-03-29 09:46:20.089862	2019-05-07 05:20:51.424634	771	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4417	The Sable Kitty	http://phoenixwolfsuits.com/	United States	the-sable-kitty	441b05ff-ca1b-4a51-8cd7-ec57fe58d620	67f37070-3e7a-4f57-8455-9e289d8045ab.png	2019-03-29 09:46:22.637638	2019-05-07 05:20:51.434748	772	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4418	The Woodland Tailor	https://thewoodlandtailor.com/character-designs/\n	United States	the-woodland-tailor	97bffe6f-be86-4e56-922f-8d1b38970e35	3462d893-282c-4f49-a942-e2c0c96a6c22.png	2019-03-29 09:46:25.214881	2019-05-07 05:20:51.445426	773	Vienna	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4419	Thirteen Diamonds	https://www.furaffinity.net/user/demonnyoko/	United States	thirteen-diamonds	de6fb874-b307-419a-831b-9434a2615714	3c522587-9970-4473-988c-ed147922bb62.png	2019-03-29 09:46:27.686798	2019-05-07 05:20:51.455678	774	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4420	Thrash	https://www.furaffinity.net/user/Thrash	United States	thrash	494d3ce0-3127-42a6-a7a1-74ed4e31ff46	6878c0f0-aa3e-47c4-97cd-33b629299b5f.png	2019-03-29 09:46:30.171945	2019-05-07 05:20:51.46554	775	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4421	Thunderhowl Studios	https://thunderhowlstudios.weebly.com/	United States	thunderhowl-studios	d322f5bb-98ab-4216-81ea-49aa8cd8c4d2	e0299cda-a7ed-427e-90f4-38a9e1bd9199.png	2019-03-29 09:46:32.792191	2019-05-07 05:20:51.475196	776	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4422	Thursday2U	https://www.furaffinity.net/user/thursday2u/	United States	thursday2u	980117ca-11be-4ae5-b3f7-2afc261395c5	5c54df2e-d7e5-45f1-89dc-5aa1f324e48d.png	2019-03-29 09:46:35.362973	2019-05-07 05:20:51.485512	777	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4423	Ticklish Tentacle Studio	https://www.facebook.com/TicklishTentacle/	Canada	ticklish-tentacle-studio	4b1ed0c9-f95c-47ca-8cb5-c554dcbc1759	af8a9155-90cc-4907-894b-c74f167b18b4.png	2019-03-29 09:46:37.924347	2019-05-07 05:20:51.495762	778	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4424	Tiggcreations	https://www.tiggcreations.com/	Austria	tiggcreations	da9601c9-82a0-46d4-9d5c-56d36aa84541	535acb81-4e00-427c-bed6-26eeee4bd286.png	2019-03-29 09:46:40.329486	2019-05-07 05:20:51.506004	779	Graz	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4425	Tiggy Workz	http://tiggyworkz.floof.org/	New Zealand	tiggy-workz	7ee57329-4220-4d4e-bd55-6a9a3db38aec	93afa4de-192a-48db-9e79-6073375aff31.png	2019-03-29 09:46:42.775208	2019-05-07 05:20:51.516706	780	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4427	Tioh	https://www.deviantart.com/tioh/	Germany	tioh	49cb2a5b-a8b4-4888-b084-a2367e91fb7d	b6a0cba8-37fb-494c-8951-912934467533.png	2019-03-29 09:46:47.833443	2019-05-07 05:20:51.527524	782	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4428	Toffeee	http://www.furaffinity.net/user/toffeee/	United States	toffeee	1ebc96b2-03da-4449-9dc1-53b77626ac29	d89af7c7-f0ab-41e2-8905-18e54b631e57.png	2019-03-29 09:46:49.99174	2019-05-07 05:20:51.5376	783	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4429	Tokai Suiting	http://tokaisuiting.com/	United States	tokai-suiting	bc7983f9-860e-4981-a117-0eb3917965f1	2786b6cb-420b-41b4-89ed-2f2548cf23bd.png	2019-03-29 09:46:52.518207	2019-05-07 05:20:51.548064	784	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4430	Tokyo Rampage Suits	https://twitter.com/varian_king	United States	tokyo-rampage-suits	b91e75d4-7402-4762-a9c0-28cc05483ce4	8a592de4-81b1-4759-834c-c379b847b977.png	2019-03-29 09:46:55.263274	2019-05-07 05:20:51.558067	785	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4431	Toxic Fursuits	http://toxicfursuits.wixsite.com/toxic-fursuits	United States	toxic-fursuits	2177a16e-c6e6-4bc8-862f-cb4b9cf2be62	e104ca62-202d-4180-9346-34e14de08709.png	2019-03-29 09:46:57.7898	2019-05-07 05:20:51.56844	786	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4432	Tribal Works	https://www.furaffinity.net/user/tribalworks/	United States	tribal-works	3286482a-b93a-4924-a331-9c6c2ff23080	2ec85105-0e63-41bc-a6db-5107021b634b.png	2019-03-29 09:47:00.369979	2019-05-07 05:20:51.57914	787	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4433	Tsebresos	https://www.tsebresos.com/index.html	United States	tsebresos	928cb33e-1682-41b7-aff4-1cee313b545b	09dbfb1c-4515-43e5-a66f-4caf0b189a33.png	2019-03-29 09:47:03.008886	2019-05-07 05:20:51.589185	788	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4434	TunnySaysIDK	http://tunnysaysidk.com/	United States	tunnysaysidk	f81f2220-5881-4b1f-bbf0-ed2e5ddf13c5	1f8db88e-5492-4d22-88cd-dee951e7cffe.png	2019-03-29 09:47:05.545533	2019-05-07 05:20:51.600049	789	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4435	TV_Thari	https://www.furaffinity.net/user/TVThari	Netherlands	tv_thari	730d19c8-cf4b-409d-a080-7fed2a73d447	ec097a24-c72b-432a-8263-c7a9666d26b3.png	2019-03-29 09:47:08.05933	2019-05-07 05:20:51.611051	790	unknown	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4436	Twilight Knights Cosplay	https://www.twilightknightscosplay.ca/	Canada	twilight-knights-cosplay	5659bcff-9689-4444-ac9d-ed3cd72de103	5568cf1e-c974-4cf6-8da4-c6f500e3b483.png	2019-03-29 09:47:10.209045	2019-05-07 05:20:51.621699	791	Ontario	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4437	Twinky Arts	http://www.twinkyarts.net/	United States	twinky-arts	3c5563b0-95ac-4000-8861-68655f2242ba	779f591d-82ca-42a5-8ec7-5ee7a337103c.png	2019-03-29 09:47:12.538661	2019-05-07 05:20:51.631831	792	New Mexico	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4439	Two Tails Enterprises	https://www.twotailsenterprises.com/	United States	two-tails-enterprises	35f3177a-5614-481a-99c2-10515766d51f	195bcee0-4593-477b-8c35-c37bf1a1831f.png	2019-03-29 09:47:18.00776	2019-05-07 05:20:51.641607	794	West Virginia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4440	Two Wet Noses	http://www.furaffinity.net/user/twowetnoses/	Canada	two-wet-noses	4b305ce7-3777-4296-9392-74db891e3508	be3b332a-9b3f-4462-af99-c408d76c5cb8.png	2019-03-29 09:47:20.490946	2019-05-07 05:20:51.652217	795	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4441	Uchihafox	https://www.furaffinity.net/user/uchihafox/	United States	uchihafox	6f8936cb-96e2-45e7-a9b8-9cb298d32da0	071b890a-4323-4ede-aaf3-92ce70a079a3.png	2019-03-29 09:47:23.169603	2019-05-07 05:20:51.662507	796	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4442	Ugly Puppy	https://www.furaffinity.net/user/uglypuppy/	United States	ugly-puppy	51cf2509-8810-44d7-8e7d-7cf6540c6dd9	a7921edf-cfbd-440f-b4c0-5ff7bed2ccde.png	2019-03-29 09:47:25.643534	2019-05-07 05:20:51.672844	797	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4443	Ugolek Fursuit Studio	https://www.furaffinity.net/user/UshGalesh	Russia	ugolek-fursuit-studio	a89f05bf-346a-4ea6-af62-9d8a119ea8e3	d78dde35-e47e-4612-b72f-ae2bf4a9023f.png	2019-03-29 09:47:28.196221	2019-05-07 05:20:51.683305	798	Moscow	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4444	Unmerited	https://www.deviantart.com/facecreep/	United States	unmerited	2d6021c5-7954-48f7-852c-fa7c758f2798	d0cb1469-216b-466b-b158-4fc3f35a23d0.png	2019-03-29 09:47:30.373423	2019-05-07 05:20:51.696754	799	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4445	Untamed Fur	http://www.furaffinity.net/user/chival	United States	untamed-fur	786bb1c9-4957-47e8-b41e-8e7ad6a7a54c	75033b7a-8bdd-48d9-b1b8-7e097d6dbe94.png	2019-03-29 09:47:33.521075	2019-05-07 05:20:51.707564	800	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4447	Valdyr	http://www.furaffinity.net/user/valdyr/	United States	valdyr	ed53ab3e-a4d1-4d55-83a3-cdf798b0af28	66d53486-ffab-4c8e-8512-4c5d25398c8b.png	2019-03-29 09:47:38.540741	2019-05-07 05:20:51.71777	802	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4448	Valrus the Tiger Costumes	https://www.furaffinity.net/user/valrusthetiger/	Canada	valrus-the-tiger-costumes	874cce10-c026-47db-84ed-5a0dfd625dc2	2934d1e2-6703-402d-bae3-30c27f5fdc57.png	2019-03-29 09:47:41.197579	2019-05-07 05:20:51.72839	803	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4449	Vegasyote	https://vegasyote.weebly.com/	United States	vegasyote	1610de27-0fa6-4c58-85d3-745921fc894c	f81f999f-72df-4b8c-9ce0-d698de785284.png	2019-03-29 09:47:43.561147	2019-05-07 05:20:51.739057	804	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4450	Velkss	https://www.furaffinity.net/user/velkss	Netherlands	velkss	fd3b32a6-ea55-469f-bb54-e46c63b31104	8611e770-d51f-49bb-8f9f-5b9f2d8c6cfe.png	2019-03-29 09:47:46.12176	2019-05-07 05:20:51.749758	805	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4452	Vexed Creations	https://vexedcreations.com	United States	vexed-creations	9261e6fc-d623-413e-a59a-26968b445172	97d09e6f-ee1c-4916-bd3f-cd1cfc719a53.png	2019-03-29 09:47:51.574488	2019-05-07 05:20:51.759484	807	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4453	Vixens Creations	https://twitter.com/Maria_Valentic	New Zealand	vixens-creations	0ea67963-f4a3-49e6-ac45-1671a132c077	ec04aa53-4316-421a-8c7d-8f918d77cde1.png	2019-03-29 09:47:54.157959	2019-05-07 05:20:51.769915	808	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4454	Voxal Visions Fursuits	https://twitter.com/voxalvisions	United Kingdom	voxal-visions-fursuits	594a759b-1ff0-4778-818c-66e498130d82	a23cbc69-9fe0-4ae6-91f9-b969d4f2c454.png	2019-03-29 09:47:56.778129	2019-05-07 05:20:51.782387	809	Dorset	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4455	Waggery Costumes	https://twitter.com/WaggeryCos	United States	waggery-costumes	48baa10c-fa8e-40e5-8039-6a2dda93d41d	25f78729-c421-4578-b780-414a74e7676d.png	2019-03-29 09:47:59.769804	2019-05-07 05:20:51.7923	810	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4456	Wanderlust Suits	https://www.wanderlustsuits.com/	United States	wanderlust-suits	7bd8be79-4235-49e3-b4dc-e0a7aff5c51f	e3b5f373-977e-497c-bb41-f9f91fdd4538.png	2019-03-29 09:48:02.781136	2019-05-07 05:20:51.802936	811	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4457	Water Dog Wharf	https://www.furaffinity.net/user/WaterDogWharf	United States	water-dog-wharf	56ec614f-1bde-44ac-a9d3-7558f8b05d25	3f0c8da8-5ff5-4670-bcae-1d642ac787fe.png	2019-03-29 09:48:05.511618	2019-05-07 05:20:51.813761	812	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4458	We Might Bite	https://twitter.com/wemightbite?lang=en	Netherlands	we-might-bite	63a3d516-6142-4b4f-bc47-1f47cc7a440d	cc9a422a-6d68-41a3-92d6-f6fe7bbabb71.png	2019-03-29 09:48:08.078375	2019-05-07 05:20:51.823469	813	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4459	Wearcat Creations	https://www.inst4gram.com/u/wearcatcreations	United States	wearcat-creations	22695f91-eb57-4249-8837-0906e8809ce9	61afee8e-014f-4d98-8ea4-7712e0a744c0.png	2019-03-29 09:48:10.43045	2019-05-07 05:20:51.833499	814	Virginia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4460	Weasel Crafts	http://www.furaffinity.net/user/flacko/	Estonia	weasel-crafts	703c9e71-1a1d-4efc-bb9f-1f7fa37b36c0	ed42aac1-17cd-4d89-a968-eb1f5b50c74c.png	2019-03-29 09:48:13.075426	2019-05-07 05:20:51.843773	815	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4461	Weasels on Easels	https://www.weaselsoneasels.com/	United States	weasels-on-easels	6a7d9e74-46ed-4089-af53-4265fd9cf7f7	9bae83f9-64a7-401f-85b3-7dfeb95814bc.png	2019-03-29 09:48:15.241108	2019-05-07 05:20:51.853415	816	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4463	Whaleosaur Suits	https://www.furaffinity.net/user/whaleosaursuits	United States	whaleosaur-suits	2241e38f-a88d-4d94-aa8f-fb98b08ebd21	492b8f12-364a-443a-b1a4-50b3abaceb67.png	2019-03-29 09:48:20.956898	2019-05-07 05:20:51.863919	818	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4464	What The Fluff	https://www.furaffinity.net/user/nylagera	United States	what-the-fluff	daa8a9f6-f2ef-4258-b8d7-70f106679c4e	82298b8b-4006-4165-b949-f3cbb46901bc.png	2019-03-29 09:48:23.595499	2019-05-07 05:20:51.873994	819	Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4465	What's Up Hot Dog	https://www.wuhdfursuits.com/	United States	what-s-up-hot-dog	0b40c3eb-3d76-40eb-838a-932c90967821	71f3cbb3-b9f2-4b93-99c9-9ed6c0deb930.png	2019-03-29 09:48:26.297509	2019-05-07 05:20:51.886459	820	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4466	White Wolf Creations (Blisk)	http://whitewolf.denofwolves.com/	United States	white-wolf-creations-blisk	35ac1346-2f21-4f3e-8eef-208235ea2f99	66ac8e3c-a511-44a3-a96f-7af8cb2732d2.png	2019-03-29 09:48:28.965252	2019-05-07 05:20:51.897823	821	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4467	Why I Otter	https://www.furaffinity.net/user/whyiotter	United States	why-i-otter	9b1fa7fa-bdbc-4db1-af24-c3f6113a0e45	7ba90c4d-8999-4a87-80dc-a5a29584cac3.png	2019-03-29 09:48:31.461301	2019-05-07 05:20:51.912357	822	Minneapolis	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4468	Wild Fuzz Studios	https://www.furaffinity.net/user/wild-fuzz-studios	Canada	wild-fuzz-studios	02b01e9b-0fba-45f1-a1d7-6e9e88dcdf90	fe3d620c-5f8f-432c-8f1e-3d19e04a87c9.png	2019-03-29 09:48:33.984204	2019-05-07 05:20:51.925406	823	Manitoba	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4469	Wildlife	http://wild---life.com/about-ba/	United States	wildlife	60b8e6b6-e739-4d0b-a045-498745ecc27f	598675ac-2d65-4bde-9276-28923002a389.png	2019-03-29 09:48:36.374183	2019-05-07 05:20:51.93657	824	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4470	Wildspotworks	https://wildspotworks.com/gallery	Germany	wildspotworks	6df981a3-3e2c-4e2d-8122-c9121950cdda	5464b89b-d2bc-4a91-a191-be26dd9d0ab2.png	2019-03-29 09:48:39.038134	2019-05-07 05:20:51.947171	825	Brandenburg	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4471	Wildvskings	https://www.wildvskings.com/	United States	wildvskings	be03ffed-c8cc-4e44-81ca-cef931af1712	1c7a48a4-9e3d-4862-97e3-44ca86bbc0d0.png	2019-03-29 09:48:41.231643	2019-05-07 05:20:51.958381	826	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4472	Wildwolf	http://www.furaffinity.net/user/wildwolf/	United States	wildwolf	392a9e52-a7a1-44cc-9236-8169bb64e564	7641a969-fb7e-4ed3-aeea-f4f585634bba.png	2019-03-29 09:48:43.749261	2019-05-07 05:20:51.972591	827	Florida	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4473	Willow Creative	http://willow-creative.nl/	Netherlands	willow-creative	69c06445-afce-4c4f-a98d-e1a9662fc0ba	5e1840d7-2f58-4346-b617-64b6f890e4ac.png	2019-03-29 09:48:46.309491	2019-05-07 05:20:51.984307	828	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4474	Windy Fursuits	http://www.furaffinity.net/user/windyfursuits	United States	windy-fursuits	c82444d5-cd8a-430f-adcd-422037a62150	d252922d-88bb-4db7-a3f7-0b7c9a34f85d.png	2019-03-29 09:48:48.498162	2019-05-07 05:20:51.995616	829	Minnesota	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4475	Winfox	https://www.furaffinity.net/user/winfox/	Ukraine	winfox	7207f5ca-06bf-4a05-9e9a-19b5245c3ed2	1f595e63-b543-4345-b59a-f0e5873feac5.png	2019-03-29 09:48:50.951077	2019-05-07 05:20:52.006335	830	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4477	WMW66 Costumes	http://wmw66-costumes.com/	Czech Republic	wmw66-costumes	c9cade9a-9a73-4892-bc42-7a02871c63a7	4a4023db-1ea7-43eb-b7df-6c6719796e00.png	2019-03-29 09:48:56.035113	2019-05-07 05:20:52.01764	832	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4478	Wolfskin Suiting	https://www.wolfskinsuiting.com/	United States	wolfskin-suiting	ace2fa60-8a9e-4524-86e6-5bf29252b66e	83e90ab9-5fd0-4f3e-af3f-73bf3b37b5c6.png	2019-03-29 09:48:58.533352	2019-05-07 05:20:52.030264	833	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4479	Wolfwood72	https://www.furaffinity.net/user/wolfwood72/	United States	wolfwood72	2a55dc77-01ca-4eda-8f37-b85c1aa8c7a7	db8cd187-a006-4af9-a884-0d2c77ac8836.png	2019-03-29 09:49:01.045428	2019-05-07 05:20:52.043046	834	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4480	Woltirr	http://www.furaffinity.net/user/Woltirr	Sweden	woltirr	9c7e5f6e-46e7-4ae9-9c41-72c988c45f4c	6e370d7e-7fef-4430-86a7-13f1e1f304d9.png	2019-03-29 09:49:03.634071	2019-05-07 05:20:52.054635	835	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4481	Woozles-Wonders	http://www.furaffinity.net/user/woozles-wonders/	United States	woozles-wonders	ecab6524-e5bb-4c51-8d6c-38f4e5ce9966	873c5430-6b14-49f4-95d8-8d35f06ac7b0.png	2019-03-29 09:49:05.886569	2019-05-07 05:20:52.066606	836	Utah	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4482	WorldConColor	https://www.furaffinity.net/user/worldconcolor/	Mexico	worldconcolor	6abe5903-85e1-4445-b35e-146925cae307	b802da6a-3678-491c-a2c1-91ef7e6f620d.png	2019-03-29 09:49:08.56911	2019-05-07 05:20:52.079624	837	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3646	~Owner Made~	\N	Owner Made	owner-made	73c12bfe-3848-49d0-bfcc-871867e0f60e	691b0b0b-5a39-42ee-b65d-9d19083cdf82.png	2019-03-29 09:12:00.409045	2019-05-07 05:20:52.090465	1	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3662	Alien Eyes Creations	https://www.furaffinity.net/user/alien~eyes~creations	United States	alien-eyes-creations	761bf796-fd7d-409c-bca9-fce5f2acc120	9023ba6f-9b9e-449a-b6bd-5f4ec4d76a9f.png	2019-03-29 09:12:44.147074	2019-05-07 05:20:52.112592	17	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3677	Apoxon	https://twitter.com/apoxon_arts?lang=en	Canada	apoxon	f1149a33-11da-4ec0-a292-4a34df9bf418	4bba67d0-d0f6-4e2c-b3b3-7796b48e4190.png	2019-03-29 09:13:22.217396	2019-05-07 05:20:52.123478	32	British Columbia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3689	Atalon Deer	https://www.furaffinity.net/user/atalonthedeer/	Germany	atalon-deer	17337676-0378-4481-9c4b-4eca0b18a2d1	9672827c-4c23-4b1a-a969-c18934c97fb8.png	2019-03-29 09:13:52.641774	2019-05-07 05:20:52.133913	44	Karlsruhe	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3701	Battitude Studios	http://www.furaffinity.net/user/battitudestudios	United States	battitude-studios	b7afe057-949f-4bb0-b7ba-ae14e3b86c0d	ee227337-1b25-40cc-9bff-228c8d20008d.png	2019-03-29 09:14:23.4341	2019-05-07 05:20:52.144884	56	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3714	Black Lion Designs	http://www.furaffinity.net/user/BlackLion-Designs	United States	black-lion-designs	3d5fe85c-a73f-40e5-b3ec-fc0078a6a92e	98f03feb-4027-429a-92bd-d96fa7048ec9.png	2019-03-29 09:14:58.67913	2019-05-07 05:20:52.155527	69	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3720	Blue or Bust Fursuits	http://blue-or-bust-fursuits.weebly.com/	United States	blue-or-bust-fursuits	3f86eca8-b279-481c-969a-858b6eecdca8	f2b0ca13-efbc-4739-b135-c0f5d48e8486.png	2019-03-29 09:15:13.879282	2019-05-07 05:20:52.165563	75	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3728	Butterfly Back Fursuits (\nMushi Magic Suits)	https://www.furaffinity.net/user/butterflybackfursuits	United States	butterfly-back-fursuits-mushi-magic-suits	dd039c9c-537a-4bdc-8f51-e3f9ed8d206a	dbf101d0-2ecd-410c-8824-5b9fdb163103.png	2019-03-29 09:15:36.955566	2019-05-07 05:20:52.175929	83	Montana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3747	Cawstumes	https://www.furaffinity.net/gallery/cawstumes/	United States	cawstumes	56cc106b-251f-4bbe-9f53-e95840d6ffea	749d2691-7103-4093-b177-db15c6563d43.png	2019-03-29 09:16:26.984813	2019-05-07 05:20:52.186612	102	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3755	Chiyo Fursuiting	http://crissangelisthebes.wixsite.com/chiyofursuiting	Netherlands	chiyo-fursuiting	27e70e02-fafb-40ff-8385-21006d741684	67d808bf-99ea-4cdc-bb77-de19d1d67bb8.png	2019-03-29 09:16:48.324223	2019-05-07 05:20:52.197946	110	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3759	Clawsome Creations	https://en-gb.facebook.com/ClawsomeCreations/	Canada	clawsome-creations	be6acd14-4e43-4f02-83b2-24620b05b695	10c1addf-997d-4fb7-af7a-0fa2f5dae0b2.png	2019-03-29 09:16:58.723167	2019-05-07 05:20:52.20836	114	Saint Catharines	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3773	Coyote Mountain Costumes	http://www.furaffinity.net/user/wildpup11/	United States	coyote-mountain-costumes	ef7185c1-c1f7-473f-aec2-04fb70b9edec	ea3ca776-ae72-49dd-8055-0aafa8b44127.png	2019-03-29 09:17:36.317088	2019-05-07 05:20:52.218983	128	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3786	Crystal Cat Fursuits	https://www.instagram.com/crystal_cat_fursuits/	United States	crystal-cat-fursuits	ef21b6fa-7306-4424-a7ca-7981c54ea92a	d049226a-a36c-4fe1-b57a-513cadc6202b.png	2019-03-29 09:18:09.683738	2019-05-07 05:20:52.230036	141	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3790	Curious Creatures	http://thoughtdemons.wixsite.com/curiouscreatures	United Kingdom	curious-creatures	b21e0b53-daa4-4a3d-b553-ff536b183bed	5c517241-dbd2-42c0-ad54-aaf2e4e667f8.png	2019-03-29 09:18:19.899299	2019-05-07 05:20:52.241768	145	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3799	Dandylions LLC	http://www.dandylionsllc.com/	United States	dandylions-llc	d9779c3f-2f50-4e5d-8ee9-67d83df3b401	209bae41-ce75-4fc9-b440-a6c4817c79b1.png	2019-03-29 09:18:43.868415	2019-05-07 05:20:52.254052	154	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3810	Demon Ferret Studios	https://www.demonferretstudios.com/	United States	demon-ferret-studios	7cc84b2b-2cd0-4cc7-b494-a6ada426e932	7026122b-aabe-4ff5-a213-7691fad90cf4.png	2019-03-29 09:19:11.574739	2019-05-07 05:20:52.264966	165	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4484	Xaria Wolf	http://www.furaffinity.net/user/XariaWolf/	United States	xaria-wolf	bc49652f-1442-44d4-928e-d59c03edcd7d	c7a263f6-d77f-4155-b5cd-e1dfa93b64fc.png	2019-03-29 09:49:13.108172	2019-05-07 05:20:52.275411	839	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4485	XeyedCreations	https://xeyedcreations.wixsite.com/xeyedcreations	United States	xeyedcreations	16a5087b-01f9-4e87-bc79-8fb6306b088d	1a6208b1-0668-451b-b86c-5694e477e6a9.png	2019-03-29 09:49:15.665408	2019-05-07 05:20:52.285551	840	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4486	Xianniecho	https://www.furaffinity.net/user/xianniecho/	Mexico	xianniecho	6f34c90d-c23e-43a1-9dea-3a6a1b786310	84940efb-9f1c-45b6-817e-a524f4bce85b.png	2019-03-29 09:49:18.207228	2019-05-07 05:20:52.296085	841	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4487	Ya Boy Luke Fursuits	http://yaboylukesuits.com/index.html	Canada	ya-boy-luke-fursuits	cc45c472-2753-48d5-8391-dffb6866f66e	9706751b-a40b-4fe8-883f-ba3e38195e12.png	2019-03-29 09:49:20.623902	2019-05-07 05:20:52.306008	842	Fergus	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4488	Yette Helin Studio	http://www.yvettehelinstudio.com/	United States	yette-helin-studio	6fa4c987-b972-494d-baa0-6fd7c29d5af9	59fc13e8-cd4a-4038-9b01-feba35aac2d8.png	2019-03-29 09:49:23.097782	2019-05-07 05:20:52.316499	843	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4489	Yoshinomi	http://www.furaffinity.net/user/yoshinomi	Japan	yoshinomi	caf78368-c205-4e26-9dec-01d38ad4832e	cf5f0c6e-acca-4a38-98a1-5ca7cc18e007.png	2019-03-29 09:49:25.718707	2019-05-07 05:20:52.326757	844	Yokohama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4491	Z Cube Fursuit Studio	https://www.z-cube-fursuit.com/	Japan	z-cube-fursuit-studio	05897864-9d99-4581-ad74-9ca9c958e7bb	becb95eb-b899-4636-8025-625280a13068.png	2019-03-29 09:49:30.640484	2019-05-07 05:20:52.337234	846	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4492	Zagone Studios	https://www.zagonestudios.com/	United States	zagone-studios	b1870d6f-deee-48c3-a8d6-69857622aa69	fc89409b-82af-47a7-9896-7db8f6ad931e.png	2019-03-29 09:49:32.960458	2019-05-07 05:20:52.360238	847	Illinois	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4493	Zarathus	http://www.furaffinity.net/user/zarathus/	New Zealand	zarathus	45eb77c9-6766-4f4a-a677-565756a0a701	5b6fa8b3-fd29-40bb-a3c6-95b30aaacc63.png	2019-03-29 09:49:36.211682	2019-05-07 05:20:52.370793	848	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4494	Zee-The-Dingo	http://www.furaffinity.net/user/Zee-The-Dingo	United States	zee-the-dingo	eeca45d0-851d-4ab9-b44e-ca7f2ec7ddbf	8a1c0f56-a553-4691-9417-04095db173f7.png	2019-03-29 09:49:38.670477	2019-05-07 05:20:52.380895	849	New York	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4495	ZombieHorse	https://www.furaffinity.net/user/ZombieHorse	United States	zombiehorse	afc4e907-607a-4442-86c6-94f21612c9dd	053c6f25-d910-414b-9a8a-a35d0ca6fdb6.png	2019-03-29 09:49:41.182961	2019-05-07 05:20:52.390629	850	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4496	ZooAbsurd	https://zooabsurd.com/	Netherlands	zooabsurd	87744ed4-efe4-4a0b-a6d0-838cbd2344c6	c6e9dd86-e792-4f8a-b359-cb013a088b04.png	2019-03-29 09:49:43.691485	2019-05-07 05:20:52.400785	851	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4498	Zuri Studios	http://www.furaffinity.net/user/zuristudios/	Germany	zuri-studios	15f5d844-73da-4f86-80fa-79a892b8317e	2c74f759-b0f6-44c6-806f-4fc180af2a89.png	2019-03-29 09:49:48.412969	2019-05-07 05:20:52.410888	853	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4499	Zurya Creations	http://www.furaffinity.net/user/zuryacreations/	United Kingdom	zurya-creations	f1ea42a8-6a4c-4909-af68-6b97ace4c36f	4fb0c2c9-19ad-4d9c-bfa7-7a1fdd62827a.png	2019-03-29 09:49:50.663107	2019-05-07 05:20:52.421315	854	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4500	Zuzufur	https://www.deviantart.com/zuzufur	Hungary	zuzufur	15a6b580-66bd-45cd-8143-2ec76a3b22e4	6ff6054a-0a82-4f86-af14-09d76898440a.png	2019-03-29 09:49:53.127975	2019-05-07 05:20:52.432602	855	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3717	Blue Fox Fursuits	http://www.bf-fursuits.com/	United Kingdom	blue-fox-fursuits	d20c6e26-2096-4ec8-b0e9-f5cccee17fe8	c0fcbe6d-1dcd-4aae-a43a-f0599e27313b.png	2019-03-29 09:15:06.273896	2019-05-07 05:20:52.442987	72	\N	3e69717e-9803-4fc1-9909-419092780574	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3826	Dragonfoxdemon	https://www.furaffinity.net/gallery/dragonfoxdemon/folder/420889/Fursuits	United States	dragonfoxdemon	7a7662aa-6a8e-4fa3-b290-c2688e725012	9b3ef1f8-801a-4ca1-af6d-0a9af06975c3.png	2019-03-29 09:19:53.466824	2019-05-07 05:20:52.464565	181	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3828	Drakon Twins' Fursuits	https://www.furaffinity.net/user/drakontwinscostumes	United States	drakon-twins-fursuits	1d0a6034-3324-4719-a7ef-dc38d1ad83bb	3ee746fc-06b1-4c79-8f5a-68210a533b33.png	2019-03-29 09:19:58.830639	2019-05-07 05:20:52.47472	183	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3841	ErrorFactor (PancakeCorgi/Shortstack)	https://www.furaffinity.net/user/errorfactor/	United States	errorfactor-pancakecorgi-shortstack	a6dd166c-e2b9-42fb-a5dc-cf74a0458fbb	3c70a625-72d3-4020-acf5-6e413aa3f8f8.png	2019-03-29 09:20:35.103484	2019-05-07 05:20:52.485401	196	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3857	Fatkraken	https://www.deviantart.com/fatkraken	United Kingdom	fatkraken	871aab84-404b-4d9e-93d7-901b6b64c35a	782615dd-7f94-4725-aad1-bb3894e2b55b.png	2019-03-29 09:21:19.25405	2019-05-07 05:20:52.495809	212	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3862	Feely's Den	https://feelysden.weebly.com/	United States	feely-s-den	106cff49-c54a-480a-b4cd-6f39cd414da1	1af828e0-f18e-4d14-ab8e-7e4291586657.png	2019-03-29 09:21:34.3583	2019-05-07 05:20:52.508075	217	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3865	Fenrirs Child	http://www.furaffinity.net/user/fenrirschild/	United States	fenrirs-child	6d212c9b-9153-45e4-9432-2093141317cb	b1dce72b-a002-479b-ba42-4253e4fd4938.png	2019-03-29 09:21:43.695543	2019-05-07 05:20:52.519964	220	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3878	Floof Unlimited	https://www.furaffinity.net/user/FloofUnlimited	United States	floof-unlimited	a681bf00-9ac5-438c-9881-77aea8c1efb5	87bf5668-c1e0-40d3-b7dc-ea373803e4f3.png	2019-03-29 09:22:20.377953	2019-05-07 05:20:52.53148	233	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3890	FoxPupMeow	https://twitter.com/FoxPupMeow	United States	foxpupmeow	8670b8a8-03dc-4507-81fd-a01ba0de3b7b	4e2ef2eb-6b5d-45fc-8ed4-bda9a70639c9.png	2019-03-29 09:22:52.090638	2019-05-07 05:20:52.542094	245	ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3899	Full Moon Special (CFF)	https://www.fullmoonspecial.com/	United States	full-moon-special-cff	72963642-8af9-4fb2-8782-3c887197a0e9	10b9ea10-f649-44c1-86a2-0a590d6fad2a.png	2019-03-29 09:23:16.161633	2019-05-07 05:20:52.553063	254	Massachusetts	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3907	Furbrications	http://www.furaffinity.net/user/Furbrications	United States	furbrications	79ad1c7d-93b8-4b0b-a75d-d1cb50b7c23f	56952339-6d05-4ffb-a65c-c0d72ba50bf0.png	2019-03-29 09:23:37.501492	2019-05-07 05:20:52.564212	262	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3920	Furr Happens	https://twitter.com/furrhappens	United States	furr-happens	0d1dc3f8-37d7-49de-8486-864467118c1c	43f76d22-7571-4a0a-abb8-e4cf6118b63c.png	2019-03-29 09:24:10.860854	2019-05-07 05:20:52.594403	275	California	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3930	Furry Time Creations	http://www.furaffinity.net/user/furrytimecreations/	Estonia	furry-time-creations	d695fee9-6c16-4b9f-a65c-808e4fdeeef8	d69345c8-d477-4b8d-970a-c0d9b5f35f7d.png	2019-03-29 09:24:36.252803	2019-05-07 05:20:52.606394	285	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3936	Fursuit Enterprise	http://www.fursuitenterprise.com/	United States	fursuit-enterprise	c2eebc6a-c876-4f15-8028-6ecaabeadede	12896bd4-cf67-4f95-b32d-efc1ef88fd9e.png	2019-03-29 09:24:51.612952	2019-05-07 05:20:52.617405	291	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3937	Fursuit Funday	https://www.furaffinity.net/user/Kaxeno	United States	fursuit-funday	27b5d194-7dd9-4820-9afc-4919a5f5ad3c	47740e64-c0d2-4c76-ad22-1a80fc8690d0.png	2019-03-29 09:24:54.308574	2019-05-07 05:20:52.627634	292	Iowa	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3949	Fuzzy Buns of Steel	https://www.deviantart.com/grizzled-dog	United States	fuzzy-buns-of-steel	66bc37ac-41f4-4e3a-b473-8c752d3b4df2	e33a437a-1df6-48f2-b7c8-e867cbd1ef86.png	2019-03-29 09:25:25.901034	2019-05-07 05:20:52.63739	304	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3960	Gold Ribbon Studio	https://www.goldribbonstudio.com/	United States	gold-ribbon-studio	f56716df-6551-48a9-bd1b-24739e31f24b	80283107-0391-4fdf-a808-04088498b4f4.png	2019-03-29 09:25:55.016299	2019-05-07 05:20:52.648448	315	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3972	Guinns Custom Creatures	https://www.furaffinity.net/user/guinnscustomcreatures/	United States	guinns-custom-creatures	7ea49c2b-9990-405d-aa46-b75ea8042973	6b4755a3-1e61-4d8b-a56b-5745de182c95.png	2019-03-29 09:26:25.837025	2019-05-07 05:20:52.65797	327	West Viginia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3973	Hakumei House	https://www.deviantart.com/hakumei94	United Kingdom	hakumei-house	8cfc3ebb-f227-4fae-aa35-d625c7d38913	e242e9fa-b4dd-4171-8263-ba41d36644ba.png	2019-03-29 09:26:28.407342	2019-05-07 05:20:52.66837	328	Ireland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3975	Happy Tails Costumes	https://www.happytailscostumes.com/	United States	happy-tails-costumes	c3350661-0251-4c07-a859-61a275513cfe	02c3b0a6-d8f0-4806-8022-7eb518e6d8c5.png	2019-03-29 09:26:33.178245	2019-05-07 05:20:52.679425	330	Hawaii	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3989	HoofnHard	https://www.furaffinity.net/user/hoofnhard/	United States	hoofnhard	f60e051e-cf5f-445a-8a09-1835b749e4d7	12d971c5-55ab-4862-9235-29ec4e7bc9e8.png	2019-03-29 09:27:10.663437	2019-05-07 05:20:52.689163	344	Utah	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
3999	Icy Paw Productions (Nevask)	http://www.furaffinity.net/user/nevask/	United States	icy-paw-productions-nevask	b6261f33-09ba-4929-ab7d-e6695a168b81	88b70537-6891-430f-a4f8-09c579d3876b.png	2019-03-29 09:27:37.562274	2019-05-07 05:20:52.699245	354	New Jersey	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4010	Ivanitko	https://www.deviantart.com/ivanitko	Czech Republic	ivanitko	835f360d-172c-4dc5-b662-c23f73ebdc13	eb2c7683-8871-448a-bff1-b19587d2aa1c.png	2019-03-29 09:28:06.040379	2019-05-07 05:20:52.709354	365	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4012	Jeepers Creepers Suits	https://www.furaffinity.net/user/jeeperscreaturessuits/	United States	jeepers-creepers-suits	22ba26a4-bfa4-4264-9183-3c197a0f8744	01636a8d-37f7-43a0-a2c6-16b6a3880c72.png	2019-03-29 09:28:11.097415	2019-05-07 05:20:52.719519	367	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4026	Kaidas Kingdom	https://www.furaffinity.net/user/kaidaskingdom/	United States	kaidas-kingdom	4ec6c389-92cc-467a-8fba-3ff8fd40658c	29afe9c4-3dd0-4939-8390-995b1a939bf5.png	2019-03-29 09:28:46.283396	2019-05-07 05:20:52.729511	381	North Carolina	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4039	Kazuto Kurama	http://www.furaffinity.net/user/kazutokurama/	United States	kazuto-kurama	fb5988a7-c970-438e-b0c2-e1fdc62c4b76	11729789-1d5c-4674-8416-3f60ebdb3a6b.png	2019-03-29 09:29:22.189934	2019-05-07 05:20:52.739105	394	Louisiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4046	KemoSuki	http://www.furaffinity.net/user/isoniku/	United States	kemosuki	9cd7b633-66c7-41dd-8796-c81d8b2eab89	e624974b-7095-42a9-9d81-4e613d52aaf9.png	2019-03-29 09:29:40.943763	2019-05-07 05:20:52.749603	401	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4056	Kitsune Studios	https://www.furaffinity.net/user/kitsunestudios	United States	kitsune-studios	738a7411-4644-48d7-9e43-3f21c28ad825	7298bca2-84ca-4968-b7b4-385560c15e8a.png	2019-03-29 09:30:08.074604	2019-05-07 05:20:52.759424	411	New Hampshire	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4067	Kyanite Creations	https://www.etsy.com/shop/KyaniteCreations	United States	kyanite-creations	241b42de-77eb-4311-9e79-4508b1fe0c90	a8399acc-7a57-418f-9f75-551dad1b6d80.png	2019-03-29 09:30:40.194323	2019-05-07 05:20:52.769564	422	Idaho	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4079	Ligercraft Suits	https://www.furaffinity.net/user/ligercraftsuits/	United States	ligercraft-suits	d8c4b94b-aced-44a6-9446-5828e51dcfde	6036f993-8405-439c-a046-55f2f566c51c.png	2019-03-29 09:31:10.393016	2019-05-07 05:20:52.779937	434	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4086	Lizaruk	http://www.furaffinity.net/user/lizaruk/	Brazil	lizaruk	ed4fad2c-a68f-41b5-a5ac-ad935744b691	08311e62-0922-4429-9c8d-7d78cf83cb10.png	2019-03-29 09:31:31.426305	2019-05-07 05:20:52.800579	441	São Paulo	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4097	Lunar Wolf Pup Studios	https://www.facebook.com/lunarwolfpupstudios	United States	lunar-wolf-pup-studios	a426b261-408c-41fc-9fb2-8d8558e1ce70	3f20ca78-45fc-417d-982f-73b0bc9db5db.png	2019-03-29 09:32:00.231987	2019-05-07 05:20:52.810652	452	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4119	Mei Fursuits	https://meifursuits.weebly.com/	United Kingdom	mei-fursuits	14d5335c-df4e-4831-bfe5-221b18fc951f	ab08a5e8-aa42-48d9-b8a9-9106a95482a0.png	2019-03-29 09:32:57.485119	2019-05-07 05:20:52.832235	474	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4120	Melissa Mendelson Art	https://www.melissamendelsonart.com/	United States	melissa-mendelson-art	d7561129-9606-471c-b814-208fc0e7aade	bd481dfe-6b34-49ba-914c-b583e81396d5.png	2019-03-29 09:32:59.989262	2019-05-07 05:20:52.841351	475	Ohio	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4144	Moonlight Delights	http://www.furaffinity.net/user/moonlightdelights	United States	moonlight-delights	5bf67d2f-8e28-4f86-a653-939b5733a9f2	ed69d4a2-5f5c-4230-acf3-8df8531a87bb.png	2019-03-29 09:34:03.609026	2019-05-07 05:20:52.863419	499	indiana	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4155	Mushi Crosshairs	http://www.furaffinity.net/user/mushicrosshairs	United States	mushi-crosshairs	97b2b6cd-b4fe-426c-8a53-7653c1b3482c	363a033d-ac17-4aff-ace0-19930d22aaeb.png	2019-03-29 09:34:32.486047	2019-05-07 05:20:52.876705	510	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4164	Nagowteena Costumes	http://www.furaffinity.net/user/nagowteenacostumes	United States	nagowteena-costumes	60daa1b0-f8b8-4713-8be3-e10289f8307e	c61e001a-c824-4974-8c9c-84efaa00a2c1.png	2019-03-29 09:34:55.84816	2019-05-07 05:20:52.88763	519	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4176	Nightmare Beast Creations	https://twitter.com/NightmareBeastC/media?lang=en	Mexico	nightmare-beast-creations	45702bc8-9ae1-44f3-9c99-e754fd07566d	1d795d4e-6fcb-4f4c-aa68-f7d19f201238.png	2019-03-29 09:35:28.639761	2019-05-07 05:20:52.898653	531	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4187	Nucler Fur Creations	https://www.furaffinity.net/user/nuclerfurcreations/	United States	nucler-fur-creations	c1a2db6d-0a41-4a55-bfd5-fc3376443efb	f04994ab-7b94-4009-892e-e9bb88dfc75f.png	2019-03-29 09:35:56.643726	2019-05-07 05:20:52.909498	542	Costa Rica	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4191	Ohmega Suit Studios	https://ohmegasuitstudios.weebly.com/	United States	ohmega-suit-studios	30d396b4-eb7d-4f67-8798-6fd6845e9531	5624e59e-49c6-4514-b494-08e3161e9bf2.png	2019-03-29 09:36:06.663121	2019-05-07 05:20:52.919982	546	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4201	Otter-n-Daughter	http://www.furaffinity.net/user/otter.n.daughter/	United States	otter-n-daughter	9f2c1471-d199-4313-b5fd-8b481d6b9553	413b8565-2529-4f5e-a093-2e9faa790faa.png	2019-03-29 09:36:32.647447	2019-05-07 05:20:52.930834	556	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4215	Pawsome Furries	https://wolvez14.wixsite.com/pawsome-furries	United States	pawsome-furries	d341685e-7805-49da-8f37-0509840fe1ce	2a1d2907-15e8-4ad9-9c5b-050c83b2b4ad.png	2019-03-29 09:37:12.920906	2019-05-07 05:20:52.941315	570	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4227	Pocket Wolf Fursuits	https://www.furaffinity.net/user/pocketwolfcollections/	United States	pocket-wolf-fursuits	88f2751b-f0ef-4e1e-a14f-a59575072cda	d3639d6b-f22b-42cf-b51f-3876de05c599.png	2019-03-29 09:37:43.878238	2019-05-07 05:20:52.95225	582	Chicago	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4229	Polarlight	https://www.furaffinity.net/user/polarlight/	Russia	polarlight	5e8e5f2a-2824-4aaf-b5d4-6bbe682b45be	9f642ab7-9f18-43a0-be70-31e5c1e6bb12.png	2019-03-29 09:37:48.668084	2019-05-07 05:20:52.963166	584	Dzerzhinsk	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4238	Purple Slushie	https://www.furaffinity.net/user/purpleslushie/	United States	purple-slushie	762273b1-8bd6-414a-bccd-f7a3cef3a82a	8001abec-572d-47d4-9c03-085a4d8d0100.png	2019-03-29 09:38:12.04848	2019-05-07 05:20:52.973291	593	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4249	Rage and Roar Customs	http://www.furaffinity.net/user/3lectroangel	United States	rage-and-roar-customs	a2f5853f-629f-493b-9a20-84ca9ec48ca0	a8ac5831-7754-427b-894a-44742c88b795.png	2019-03-29 09:38:40.785223	2019-05-07 05:20:52.984287	604	Colorado	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4263	Redstorm Fursuits	https://redstormfurs.weebly.com/	United States	redstorm-fursuits	67ed6c42-6cf0-402b-af91-605f43565bc6	ebcb02f6-e97d-4f29-8c15-b61a51d68f35.png	2019-03-29 09:39:16.843987	2019-05-07 05:20:52.99383	618	Arizona	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4265	Resurrecting Creatures	https://www.facebook.com/ResurrectingCreatures	Argentina	resurrecting-creatures	7476a08d-6851-4d70-9c61-f7d4a8c72cf4	936ed834-27a8-4fd2-a529-7a40482511cb.png	2019-03-29 09:39:22.13636	2019-05-07 05:20:53.003857	620	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4276	Rossykitti Kreations	https://rossykittikreations.weebly.com/	United States	rossykitti-kreations	130612f0-dae4-42ee-a286-436f0e4b3917	532eb30a-231a-433b-a41f-c5abea96524d.png	2019-03-29 09:39:50.878023	2019-05-07 05:20:53.014206	631	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4287	Saigo Zangetzu	https://www.furaffinity.net/user/SaigoZangetzu	Argentina	saigo-zangetzu	396eb779-5076-4645-9496-704d3230dd32	813e165c-052c-4f19-af63-2b7f66b827ef.png	2019-03-29 09:40:19.590953	2019-05-07 05:20:53.024118	642	Buenos Aires	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4298	Savage Turtle Studios	https://www.furaffinity.net/user/savageturtlestudios/	United States	savage-turtle-studios	46fa282d-123a-4bf7-bd56-d7ee85d2368d	f9c513c6-a8ad-4eda-8cee-7af6e15dcccc.png	2019-03-29 09:40:57.887121	2019-05-07 05:20:53.033889	653	Georgia	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4301	Schneepardi Creations	https://www.furaffinity.net/user/sethaa/	Germany	schneepardi-creations	ab105a83-dc1d-48e1-a942-30ea56d95e85	5b3d567b-791f-4588-8bb6-bdbbf31a47e1.png	2019-03-29 09:41:06.150577	2019-05-07 05:20:53.044192	656	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4306	SereStudios	http://www.furaffinity.net/user/~serenity~	United States	serestudios	920219d9-0212-4827-947d-cc621ae5f6bb	64974ad3-fc27-408b-aa59-794ed908b60d.png	2019-03-29 09:41:25.355029	2019-05-07 05:20:53.054752	661	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4318	Showreel Studios	https://www.furaffinity.net/user/showreelstudios	United States	showreel-studios	13cbc1a7-b7aa-4ba7-b2df-09ce33a22406	191a7607-68fe-4b43-ae1f-d738c8f6b7bb.png	2019-03-29 09:41:55.289822	2019-05-07 05:20:53.066583	673	Texas	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4332	Snow Gryphon Suits	https://snowgryphonsuits.com/	United Kingdom	snow-gryphon-suits	886b6a9d-9fdb-415b-981f-a8278478638a	bef94ebc-0838-4cfb-a1e1-998ca72b5ac4.png	2019-03-29 09:42:39.892453	2019-05-07 05:20:53.081262	687	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4338	Soul Bound Fursuits	https://www.deviantart.com/soulboundfursuits	United States	soul-bound-fursuits	dc5e80cb-ce28-4f51-a260-cac1beb8df29	f4bd7305-5e36-4ab6-923e-438f6e341982.png	2019-03-29 09:42:55.778815	2019-05-07 05:20:53.094137	693	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4347	Speckled Blue Nose	https://speckledbluenose.weebly.com/	United States	speckled-blue-nose	688525f9-6c4a-4197-bcc4-5d6c613f7ddb	1a062a79-9b31-4fd1-a252-457fa08ee58d.png	2019-03-29 09:43:18.744402	2019-05-07 05:20:53.10599	702	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4358	Star Candy Creations	http://www.pa-furry.org/user/8311/loki-wolf	United States	star-candy-creations	bb3b5aa3-38f9-488e-a414-6c3cca4614a4	d0bfeeff-5ec6-4e78-a0ae-5da103f1bc0d.png	2019-03-29 09:43:46.611422	2019-05-07 05:20:53.120574	713	Pennsylvania	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4372	Studio Delights	https://studiodelights.weebly.com/	United States	studio-delights	a42703e0-61da-4a83-9949-33fd2d201caa	386272c5-4017-466c-a8a6-b78d579df312.png	2019-03-29 09:44:23.733448	2019-05-07 05:20:53.131012	727	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4373	Studio Neko	https://www.deviantart.com/studioneko	United States	studio-neko	97ce3ab9-a937-4758-a0fe-cf9b7ebaa0a6	148580f2-fc59-46ad-903c-00cc0a257896.png	2019-03-29 09:44:26.195336	2019-05-07 05:20:53.141982	728	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4382	Sun & Moon Creations	http://sm-creations.wixsite.com/sun-moon-creations/tosprice	United States	sun-moon-creations	7f93c580-093b-4080-8d97-f2ff5468080a	ea158863-10b3-47fc-a1e0-bd58bc2ad582.png	2019-03-29 09:44:51.330661	2019-05-07 05:20:53.156087	737	Oregon	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4397	Tails Time	https://www.furaffinity.net/user/kuramakun/	Russia	tails-time	eb3305f0-e639-49c4-bc47-2a1bdad4d834	b14f70ab-c3ba-4b16-b565-d31e6fb983da.png	2019-03-29 09:45:32.178761	2019-05-07 05:20:53.167714	752	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4406	That's Furred Up	https://www.thatsfurredup.com/	United States	that-s-furred-up	03e9e5b1-3644-4023-8e36-4cb5a52ed150	016de2f2-6ae6-49cb-bf15-cd0ecefa3fc4.png	2019-03-29 09:45:54.603991	2019-05-07 05:20:53.179635	761	Michigan	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4409	The Curry Mouse	http://www.furaffinity.net/user/thecurrymouse	United States	the-curry-mouse	11df8d0d-0def-4740-985e-b43f07d3a2b5	2ddc3f25-968d-4741-986c-59f69e217d84.png	2019-03-29 09:46:02.155337	2019-05-07 05:20:53.191299	764	Alabama	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4413	The Karelia Fursuits	https://www.furaffinity.net/user/TheKareliaFursuits	Denmark	the-karelia-fursuits	4b0eab5d-244b-4dea-93b5-e119d59ff93f	ef4d6877-c57e-4167-b5c5-b9c98870caf7.png	2019-03-29 09:46:12.830597	2019-05-07 05:20:53.203853	768	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4426	Tiny1Badger	https://www.furaffinity.net/user/tiny1badger	United States	tiny1badger	7eda1723-c657-4fad-8510-1118679f92d7	115d6749-7dff-4a76-a168-e7ef9427c7f3.png	2019-03-29 09:46:45.256316	2019-05-07 05:20:53.216289	781	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4438	Two Faced Creations	https://www.deviantart.com/twofacedcreations	Australia	two-faced-creations	b151df9d-9e75-4018-8530-5331e1c42099	9e18dc9d-f745-41c3-abf5-ef9b527123da.png	2019-03-29 09:47:15.041951	2019-05-07 05:20:53.226771	793	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4446	Uren Husky	https://www.furaffinity.net/user/urenhusky/	Brazil	uren-husky	f239af9c-628e-405e-ae41-74f25272f0fb	d9b1154d-8592-44ca-b4b9-8a84433a3fc8.png	2019-03-29 09:47:35.975642	2019-05-07 05:20:53.238038	801	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4451	Velveteen Soldier	https://www.furaffinity.net/user/Velveteen-Soldier	United States	velveteen-soldier	6d9ce175-866d-4d1c-8953-ea8552932fa4	f8447f86-6918-4cd0-bb65-fc2a7b5ea98e.png	2019-03-29 09:47:48.96504	2019-05-07 05:20:53.250732	806	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4462	West Wind Howling	https://www.furaffinity.net/user/westwindhowling	United States	west-wind-howling	cae2c905-011c-4245-aa57-f32e3093f49a	aa789946-4c91-4457-9989-179adc5f0a6c.png	2019-03-29 09:48:17.710223	2019-05-07 05:20:53.261531	817	Maryland	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4476	Wingwolf Creations	https://www.furaffinity.net/user/wingwolf-creations	United States	wingwolf-creations	cf302728-4ef7-4de0-bc69-97aad339d4d1	d55cd3b9-04d2-415a-a761-4dd57b4c8134.png	2019-03-29 09:48:53.512761	2019-05-07 05:20:53.27306	831	\N	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4483	Wuffy Wolf Workshop	https://www.facebook.com/WuffyWolfWorkshop/	Hungary	wuffy-wolf-workshop	fc0bf06f-1b93-4c51-8147-5d8719eccf66	9cdf2669-53a6-4dbe-8eee-aac442900041.png	2019-03-29 09:49:10.961596	2019-05-07 05:20:53.284587	838	Budapest	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
4490	Yu Puffin	https://www.furaffinity.net/user/yupuffin/	United States	yu-puffin	c23a088a-c514-4f9e-b466-de393ab80730	e4b5ec8c-4641-4969-8f7a-05aad4957ad2.png	2019-03-29 09:49:28.075457	2019-05-07 05:20:53.295255	845	Washington	\N	N/A	7714da95-148c-4866-b3d7-4babc6a14157
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.media (id, uuid, title, description, created_at, updated_at, user_id, duration, slug, views_count, comments_count, likes_count, comments_disabled, refused_at, share_on_twitter, small_thumbnail_key, picture, width, height, data, exif, size, edition_id, fursuit_id, category_id, panel_id, completion, fursuits_count, sub_event_id, faves_count, photographer_slug, photographer_string, tag_locked, tagger, tag_lock_data, is_gif) FROM stdin;
351	b2d5019f-bb5a-4793-a213-4d9d5229f795	title		2019-05-03 04:04:05.474492	2019-05-10 07:27:25.867136	3e69717e-9803-4fc1-9909-419092780574	\N	title-92194697-9122-4ed7-a325-66554c719159	0	0	0	f	\N	t	\N	e52f7778-4658-45c0-b3e5-5dc1c3a437a4.jpeg	598	596	\N	{}	30816	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
347	66f8b5ac-5dfa-4cc8-8d3a-14c6b205fd38	title		2019-05-03 04:03:53.813125	2019-05-10 07:27:34.463348	3e69717e-9803-4fc1-9909-419092780574	\N	title-4d0f60cf-646f-491f-ab99-f76501735d30	1	0	0	f	\N	t	\N	8ff97690-3272-4bbe-94e7-223e96ba594a.jpeg	480	640	\N	{}	50376	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
363	ce7324fc-2a1e-4754-aafb-d1d75c10d649	title		2019-05-10 06:35:33.083952	2019-05-10 07:28:29.779211	3e69717e-9803-4fc1-9909-419092780574	\N	title-b26c1356-9442-42fb-803e-ee382307864f	1	0	0	f	\N	t	\N	8c862257-43f4-4001-8c27-6048b5d829aa.jpeg	5760	3840	\N	{"ApertureValue":"262144/65536","Artist":"Jonathan Grondin (FA: tango0)","ColorSpace":"1","ComponentsConfiguration":"1, 2, 3, 0","Copyright":"www.tangohusky.net","CustomRendered":"0","DateTime":"2015:01:05 04:36:16","DateTimeDigitized":"2015:01:05 04:36:16","DateTimeOriginal":"2015:01:05 04:36:16","ExifImageLength":"3840","ExifImageWidth":"5760","ExifOffset":"360","ExifVersion":"0230","ExposureBiasValue":"0/1","ExposureMode":"0","ExposureProgram":"3","ExposureTime":"1/60","Flash":"16","FlashPixVersion":"0100","FNumber":"4/1","FocalLength":"32/1","FocalPlaneResolutionUnit":"2","FocalPlaneXResolution":"5760000/1461","FocalPlaneYResolution":"3840000/972","GPSInfo":"9554","GPSVersionID":"2, 3, 0, 0","InteroperabilityOffset":"9326","ISOSpeedRatings":"5000","Make":"Canon","MakerNote":"40, 0, 1, 0, 3, 0, 49, 0, 0, 0, 116, 5, 0, 0, 2, 0, 3, 0, 4, 0, 0, 0, 214, 5, 0, 0, 3, 0, 3, 0, 4, 0, 0, 0, 222, 5, 0, 0, 4, 0, 3, 0, 34, 0, 0, 0, 230, 5, 0, 0, 6, 0, 2, 0, 22, 0, 0, 0, 42, 6, 0, 0, 7, 0, 2, 0, 24, 0, 0, 0, 74, 6, 0, 0, 9, 0, 2, 0, 32, 0, 0, 0, 98, 6, 0, 0, 13, 0, 7, 0, 0, 6, 0, 0, 130, 6, 0, 0, 16, 0, 4, 0, 1, 0, 0, 0, 133, 2, 0, 128, 19, 0, 3, 0, 4, 0, 0, 0, 130, 12, 0, 0, 25, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 3, 0, 9, 1, 0, 0, 138, 12, 0, 0, 53, 0, 4, 0, 4, 0, 0, 0, 156, 14, 0, 0, 147, 0, 3, 0, 30, 0, 0, 0, 172, 14, 0, 0, 149, 0, 2, 0, 74, 0, 0, 0, 232, 14, 0, 0, 150, 0, 2, 0, 16, 0, 0, 0, 50, 15, 0, 0, 151, 0, 7, 0, 0, 4, 0, 0, 66, 15, 0, 0, 152, 0, 3, 0, 4, 0, 0, 0, 66, 19, 0, 0, 153, 0, 4, 0, 83, 0, 0, 0, 74, 19, 0, 0, 154, 0, 4, 0, 5, 0, 0, 0, 150, 20, 0, 0, 160, 0, 3, 0, 14, 0, 0, 0, 170, 20, 0, 0, 170, 0, 3, 0, 6, 0, 0, 0, 198, 20, 0, 0, 180, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 208, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 224, 0, 3, 0, 17, 0, 0, 0, 210, 20, 0, 0, 1, 64, 3, 0, 32, 5, 0, 0, 244, 20, 0, 0, 8, 64, 3, 0, 3, 0, 0, 0, 52, 31, 0, 0, 9, 64, 3, 0, 3, 0, 0, 0, 58, 31, 0, 0, 16, 64, 2, 0, 32, 0, 0, 0, 64, 31, 0, 0, 17, 64, 7, 0, 252, 0, 0, 0, 96, 31, 0, 0, 18, 64, 2, 0, 32, 0, 0, 0, 92, 32, 0, 0, 19, 64, 4, 0, 11, 0, 0, 0, 124, 32, 0, 0, 21, 64, 7, 0, 200, 1, 0, 0, 168, 32, 0, 0, 22, 64, 4, 0, 7, 0, 0, 0, 112, 34, 0, 0, 24, 64, 4, 0, 7, 0, 0, 0, 140, 34, 0, 0, 25, 64, 7, 0, 30, 0, 0, 0, 168, 34, 0, 0, 33, 64, 4, 0, 5, 0, 0, 0, 198, 34, 0, 0, 37, 64, 4, 0, 9, 0, 0, 0, 218, 34, 0, 0, 39, 64, 4, 0, 5, 0, 0, 0, 254, 34, 0, 0, 40, 64, 4, 0, 19, 0, 0, 0, 18, 35, 0, 0, 0, 0, 0, 0, 98, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 255, 127, 255, 127, 3, 0, 2, 0, 0, 0, 3, 0, 255, 255, 237, 0, 105, 0, 24, 0, 1, 0, 128, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 127, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 0, 0, 32, 0, 133, 210, 204, 47, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 84, 1, 232, 255, 128, 0, 192, 0, 0, 0, 0, 0, 3, 0, 0, 0, 8, 0, 8, 0, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 0, 188, 0, 78, 0, 0, 0, 0, 0, 248, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 67, 97, 110, 111, 110, 32, 69, 79, 83, 32, 53, 68, 32, 77, 97, 114, 107, 32, 73, 73, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 105, 114, 109, 119, 97, 114, 101, 32, 86, 101, 114, 115, 105, 111, 110, 32, 49, 46, 50, 46, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 170, 103, 40, 104, 40, 117, 0, 0, 233, 0, 246, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 152, 58, 0, 95, 0, 89, 0, 91, 0, 32, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 1, 187, 187, 80, 96, 0, 155, 17, 208, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 195, 0, 82, 0, 182, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 182, 0, 159, 4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 12, 204, 204, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 80, 5, 0, 0, 0, 106, 0, 0, 0, 0, 0, 16, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3, 5, 3, 255, 122, 3, 15, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 22, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 7, 3, 3, 3, 2, 239, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 80, 0, 237, 0, 24, 0, 105, 145, 119, 58, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 81, 14, 39, 0, 0, 0, 0, 41, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 128, 22, 0, 0, 0, 15, 0, 0, 0, 18, 0, 0, 128, 10, 0, 0, 64, 2, 0, 0, 0, 3, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 208, 2, 0, 0, 224, ","MeteringMode":"5","Model":"Canon EOS 5D Mark III","Orientation":"1","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"393216/65536","SubSecTime":"01","SubSecTimeDigitized":"01","SubSecTimeOriginal":"01","thumbnail:Compression":"6","thumbnail:InteroperabilityIndex":"R98","thumbnail:InteroperabilityVersion":"48, 49, 48, 48","thumbnail:JPEGInterchangeFormat":"11444","thumbnail:JPEGInterchangeFormatLength":"13896","thumbnail:ResolutionUnit":"2","thumbnail:XResolution":"72/1","thumbnail:YResolution":"72/1","UserComment":"0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","WhiteBalance":"0","XResolution":"72/1","YCbCrPositioning":"2","YResolution":"72/1"}	5912705	\N	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	\N	0	\N	Tango	f	\N	\N	f
350	58eaf0b1-6cec-4b6c-873e-eec7d3ba375d	title		2019-05-03 04:04:02.558564	2019-05-10 07:28:39.034161	3e69717e-9803-4fc1-9909-419092780574	\N	title-5fb10df7-bcc8-42dc-b797-6d0c0c5c3894	1	0	0	f	\N	t	\N	cfd523b7-d09a-4aea-957d-65480ebd9707.jpeg	427	760	\N	{}	37359	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
355	368f2b54-9e9b-47a8-a07a-53cdea778912	title		2019-05-08 09:40:11.782202	2019-05-10 07:28:51.225258	3e69717e-9803-4fc1-9909-419092780574	\N	title-e326b730-203f-4375-bb72-f8445d05d82a	1	0	0	f	\N	t	\N	3ecb3a79-fbde-470f-8399-3e6c38147ef5.gif	600	180	\N	{}	48046	\N	\N	a2edc378-7bd1-4d38-adc5-12edd944106c	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
364	4b3cdff0-6be8-4868-955b-f448e3a6a32d	title		2019-05-12 08:55:52.517224	2019-05-12 08:55:52.517224	3e69717e-9803-4fc1-9909-419092780574	\N	title-b61eb9d8-d9ef-4afc-a75b-247ae3787061	0	0	0	f	\N	t	\N	d11802a1-82d7-4160-bd60-15e6dc95ddc6.png	2048	2048	\N	{}	621790	\N	\N	0915b93c-8d8a-45b3-aeb5-5f5230b2b711	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
359	eea1cb0c-3998-429b-99c6-4df98c2c3229	title		2019-05-08 09:58:40.600323	2019-05-10 07:31:14.844239	3e69717e-9803-4fc1-9909-419092780574	\N	title-e3fd8de7-d6e2-4e6a-9d58-0f6eb3c6db60	1	0	0	f	\N	t	\N	097c0e43-a2c8-4d28-978b-7a66c5cbe1bc.mp4	320	180	\N	{}	378396	\N	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
360	763576ad-eb5b-4b89-82dc-76af6d8dc7e8	title		2019-05-08 10:06:36.11647	2019-05-10 07:33:32.0962	3e69717e-9803-4fc1-9909-419092780574	\N	title-86562549-150f-408a-89bf-5d31012c7718	0	0	0	f	\N	t	\N	db124e0b-4848-46f3-962e-004f6c28c6b1.mp4	320	180	\N	{}	378396	\N	\N	0915b93c-8d8a-45b3-aeb5-5f5230b2b711	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
365	1a988ae4-5b14-48ec-8cf8-0d85ee100e5a	title		2019-05-12 09:20:50.636873	2019-05-12 09:20:50.636873	3e69717e-9803-4fc1-9909-419092780574	\N	title-a61f251f-c2da-49ce-b008-6dd704ead29b	0	0	0	f	\N	t	\N	cc084ea9-e417-4461-a364-d34be65e9003.jpeg	3000	2000	\N	{"ApertureValue":"970854/1000000","Artist":"TangoHusky (Twitter \\u0026 Telegram : @TangoHusky)","ColorSpace":"1","Copyright":"www.tangohusky.net","CustomRendered":"0","DateTime":"2018:09:01 07:36:38","DateTimeDigitized":"2018:08:21 20:49:26","DateTimeOriginal":"2018:08:21 20:49:26","ExifOffset":"312","ExifVersion":"0230","ExposureBiasValue":"0/1","ExposureMode":"0","ExposureProgram":"3","ExposureTime":"1/200","Flash":"16","FNumber":"14/10","FocalLength":"50/1","FocalPlaneResolutionUnit":"3","FocalPlaneXResolution":"52428800/32768","FocalPlaneYResolution":"52428800/32768","ISOSpeedRatings":"6400","Make":"Canon","MaxApertureValue":"1/1","MeteringMode":"5","Model":"Canon EOS 5D Mark III","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"7643856/1000000","Software":"Adobe Photoshop Lightroom Classic 7.2 (Windows)","SubSecTimeDigitized":"00","SubSecTimeOriginal":"00","WhiteBalance":"0","XResolution":"300/1","YResolution":"300/1"}	4702144	\N	\N	a2edc378-7bd1-4d38-adc5-12edd944106c	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
353	0bbf4f60-5c57-4fc5-80a8-56c111cf0ab0	title		2019-05-03 04:04:10.996614	2019-05-10 07:23:46.889826	3e69717e-9803-4fc1-9909-419092780574	\N	title-0275b096-1acc-4173-a6e0-e9081560407f	1	0	0	f	\N	t	\N	f2d67cf2-07cc-4295-992d-538c0551886c.jpeg	500	500	\N	{}	35740	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
346	0af34b1a-2dbb-4842-a625-e0620b101d7c	title		2019-05-03 04:03:50.975868	2019-05-10 07:23:56.715457	3e69717e-9803-4fc1-9909-419092780574	\N	title-ba571f45-ac34-4ed2-a269-d82d9ff7fef7	1	0	0	f	\N	t	\N	8334da72-56eb-4bb7-be66-c881f77099d3.jpeg	720	800	\N	{}	86307	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
348	3cd6c36c-c3d2-46cc-a207-50d085a5e36b	title		2019-05-03 04:03:56.633373	2019-05-10 07:24:06.538325	3e69717e-9803-4fc1-9909-419092780574	\N	title-a66d64b3-faaf-4793-ba90-9a9f9dd94282	1	0	0	f	\N	t	\N	5e7cc3d1-d09a-44e1-b7c7-f1e04496b5ad.jpeg	399	788	\N	{}	42216	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
342	d169aa9b-b2b6-4192-b6a1-066f35811cbd	title		2019-05-03 03:57:29.650669	2019-05-10 07:25:11.343208	3e69717e-9803-4fc1-9909-419092780574	\N	title	1	0	0	f	\N	t	\N	590f441e-68dd-4061-934c-d7d5b62a2df7.jpeg	5760	3840	\N	{"ApertureValue":"262144/65536","Artist":"Jonathan Grondin (FA: tango0)","ColorSpace":"1","ComponentsConfiguration":"1, 2, 3, 0","Copyright":"www.tangohusky.net","CustomRendered":"0","DateTime":"2015:01:06 19:31:33","DateTimeDigitized":"2015:01:06 19:31:33","DateTimeOriginal":"2015:01:06 19:31:33","ExifImageLength":"3840","ExifImageWidth":"5760","ExifOffset":"360","ExifVersion":"0230","ExposureBiasValue":"0/1","ExposureMode":"0","ExposureProgram":"3","ExposureTime":"1/25","Flash":"16","FlashPixVersion":"0100","FNumber":"4/1","FocalLength":"65/1","FocalPlaneResolutionUnit":"2","FocalPlaneXResolution":"5760000/1461","FocalPlaneYResolution":"3840000/972","GPSInfo":"9554","GPSVersionID":"2, 3, 0, 0","InteroperabilityOffset":"9326","ISOSpeedRatings":"3200","Make":"Canon","MakerNote":"40, 0, 1, 0, 3, 0, 49, 0, 0, 0, 116, 5, 0, 0, 2, 0, 3, 0, 4, 0, 0, 0, 214, 5, 0, 0, 3, 0, 3, 0, 4, 0, 0, 0, 222, 5, 0, 0, 4, 0, 3, 0, 34, 0, 0, 0, 230, 5, 0, 0, 6, 0, 2, 0, 22, 0, 0, 0, 42, 6, 0, 0, 7, 0, 2, 0, 24, 0, 0, 0, 74, 6, 0, 0, 9, 0, 2, 0, 32, 0, 0, 0, 98, 6, 0, 0, 13, 0, 7, 0, 0, 6, 0, 0, 130, 6, 0, 0, 16, 0, 4, 0, 1, 0, 0, 0, 133, 2, 0, 128, 19, 0, 3, 0, 4, 0, 0, 0, 130, 12, 0, 0, 25, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 3, 0, 9, 1, 0, 0, 138, 12, 0, 0, 53, 0, 4, 0, 4, 0, 0, 0, 156, 14, 0, 0, 147, 0, 3, 0, 30, 0, 0, 0, 172, 14, 0, 0, 149, 0, 2, 0, 74, 0, 0, 0, 232, 14, 0, 0, 150, 0, 2, 0, 16, 0, 0, 0, 50, 15, 0, 0, 151, 0, 7, 0, 0, 4, 0, 0, 66, 15, 0, 0, 152, 0, 3, 0, 4, 0, 0, 0, 66, 19, 0, 0, 153, 0, 4, 0, 83, 0, 0, 0, 74, 19, 0, 0, 154, 0, 4, 0, 5, 0, 0, 0, 150, 20, 0, 0, 160, 0, 3, 0, 14, 0, 0, 0, 170, 20, 0, 0, 170, 0, 3, 0, 6, 0, 0, 0, 198, 20, 0, 0, 180, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 208, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 224, 0, 3, 0, 17, 0, 0, 0, 210, 20, 0, 0, 1, 64, 3, 0, 32, 5, 0, 0, 244, 20, 0, 0, 8, 64, 3, 0, 3, 0, 0, 0, 52, 31, 0, 0, 9, 64, 3, 0, 3, 0, 0, 0, 58, 31, 0, 0, 16, 64, 2, 0, 32, 0, 0, 0, 64, 31, 0, 0, 17, 64, 7, 0, 252, 0, 0, 0, 96, 31, 0, 0, 18, 64, 2, 0, 32, 0, 0, 0, 92, 32, 0, 0, 19, 64, 4, 0, 11, 0, 0, 0, 124, 32, 0, 0, 21, 64, 7, 0, 200, 1, 0, 0, 168, 32, 0, 0, 22, 64, 4, 0, 7, 0, 0, 0, 112, 34, 0, 0, 24, 64, 4, 0, 7, 0, 0, 0, 140, 34, 0, 0, 25, 64, 7, 0, 30, 0, 0, 0, 168, 34, 0, 0, 33, 64, 4, 0, 5, 0, 0, 0, 198, 34, 0, 0, 37, 64, 4, 0, 9, 0, 0, 0, 218, 34, 0, 0, 39, 64, 4, 0, 5, 0, 0, 0, 254, 34, 0, 0, 40, 64, 4, 0, 19, 0, 0, 0, 18, 35, 0, 0, 0, 0, 0, 0, 98, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 255, 127, 255, 127, 3, 0, 2, 0, 0, 0, 3, 0, 255, 255, 237, 0, 105, 0, 24, 0, 1, 0, 128, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 127, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 0, 0, 65, 0, 133, 210, 204, 47, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 64, 1, 212, 255, 128, 0, 148, 0, 0, 0, 0, 0, 3, 0, 0, 0, 8, 0, 8, 0, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 0, 148, 0, 79, 0, 0, 0, 0, 0, 248, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 67, 97, 110, 111, 110, 32, 69, 79, 83, 32, 53, 68, 32, 77, 97, 114, 107, 32, 73, 73, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 105, 114, 109, 119, 97, 114, 101, 32, 86, 101, 114, 115, 105, 111, 110, 32, 49, 46, 50, 46, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 170, 93, 40, 93, 40, 112, 0, 0, 237, 0, 231, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 152, 58, 0, 101, 0, 100, 0, 108, 0, 65, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 1, 187, 187, 106, 112, 0, 13, 81, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 255, 0, 106, 255, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 159, 0, 142, 4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 12, 204, 204, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 106, 5, 0, 0, 0, 106, 0, 0, 0, 0, 0, 196, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3, 5, 3, 241, 122, 3, 15, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 22, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 7, 3, 3, 3, 2, 239, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 80, 0, 237, 0, 24, 0, 105, 145, 119, 58, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 81, 14, 39, 0, 0, 0, 0, 41, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 128, 22, 0, 0, 0, 15, 0, 0, 32, 10, 0, 0, 252, 2, 0, 0, 64, 2, 0, 0, 0, 3, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 208, 2, 0, 0,","MeteringMode":"5","Model":"Canon EOS 5D Mark III","Orientation":"1","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"303104/65536","SubSecTime":"00","SubSecTimeDigitized":"00","SubSecTimeOriginal":"00","thumbnail:Compression":"6","thumbnail:InteroperabilityIndex":"R98","thumbnail:InteroperabilityVersion":"48, 49, 48, 48","thumbnail:JPEGInterchangeFormat":"11444","thumbnail:JPEGInterchangeFormatLength":"12835","thumbnail:ResolutionUnit":"2","thumbnail:XResolution":"72/1","thumbnail:YResolution":"72/1","UserComment":"0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","WhiteBalance":"0","XResolution":"72/1","YCbCrPositioning":"2","YResolution":"72/1"}	5474899	ee8a3fc2-707a-4ed4-bf74-cc8b5a894bad	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
343	bfd3be2c-a1a9-4b3d-9a5f-f54a8dad379a	title		2019-05-03 03:57:39.352696	2019-05-10 07:26:10.642618	3e69717e-9803-4fc1-9909-419092780574	\N	title-cc39bdba-0d69-48a6-a9e9-43856e76d30d	0	0	0	f	\N	t	\N	f3e89169-9187-4797-b277-964e98065c71.jpeg	5760	3840	\N	{"ApertureValue":"262144/65536","Artist":"Jonathan Grondin (FA: tango0)","ColorSpace":"1","ComponentsConfiguration":"1, 2, 3, 0","Copyright":"www.tangohusky.net","CustomRendered":"0","DateTime":"2015:01:06 19:32:20","DateTimeDigitized":"2015:01:06 19:32:20","DateTimeOriginal":"2015:01:06 19:32:20","ExifImageLength":"3840","ExifImageWidth":"5760","ExifOffset":"360","ExifVersion":"0230","ExposureBiasValue":"0/1","ExposureMode":"0","ExposureProgram":"3","ExposureTime":"1/25","Flash":"16","FlashPixVersion":"0100","FNumber":"4/1","FocalLength":"55/1","FocalPlaneResolutionUnit":"2","FocalPlaneXResolution":"5760000/1461","FocalPlaneYResolution":"3840000/972","GPSInfo":"9554","GPSVersionID":"2, 3, 0, 0","InteroperabilityOffset":"9326","ISOSpeedRatings":"3200","Make":"Canon","MakerNote":"40, 0, 1, 0, 3, 0, 49, 0, 0, 0, 116, 5, 0, 0, 2, 0, 3, 0, 4, 0, 0, 0, 214, 5, 0, 0, 3, 0, 3, 0, 4, 0, 0, 0, 222, 5, 0, 0, 4, 0, 3, 0, 34, 0, 0, 0, 230, 5, 0, 0, 6, 0, 2, 0, 22, 0, 0, 0, 42, 6, 0, 0, 7, 0, 2, 0, 24, 0, 0, 0, 74, 6, 0, 0, 9, 0, 2, 0, 32, 0, 0, 0, 98, 6, 0, 0, 13, 0, 7, 0, 0, 6, 0, 0, 130, 6, 0, 0, 16, 0, 4, 0, 1, 0, 0, 0, 133, 2, 0, 128, 19, 0, 3, 0, 4, 0, 0, 0, 130, 12, 0, 0, 25, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 3, 0, 9, 1, 0, 0, 138, 12, 0, 0, 53, 0, 4, 0, 4, 0, 0, 0, 156, 14, 0, 0, 147, 0, 3, 0, 30, 0, 0, 0, 172, 14, 0, 0, 149, 0, 2, 0, 74, 0, 0, 0, 232, 14, 0, 0, 150, 0, 2, 0, 16, 0, 0, 0, 50, 15, 0, 0, 151, 0, 7, 0, 0, 4, 0, 0, 66, 15, 0, 0, 152, 0, 3, 0, 4, 0, 0, 0, 66, 19, 0, 0, 153, 0, 4, 0, 83, 0, 0, 0, 74, 19, 0, 0, 154, 0, 4, 0, 5, 0, 0, 0, 150, 20, 0, 0, 160, 0, 3, 0, 14, 0, 0, 0, 170, 20, 0, 0, 170, 0, 3, 0, 6, 0, 0, 0, 198, 20, 0, 0, 180, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 208, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 224, 0, 3, 0, 17, 0, 0, 0, 210, 20, 0, 0, 1, 64, 3, 0, 32, 5, 0, 0, 244, 20, 0, 0, 8, 64, 3, 0, 3, 0, 0, 0, 52, 31, 0, 0, 9, 64, 3, 0, 3, 0, 0, 0, 58, 31, 0, 0, 16, 64, 2, 0, 32, 0, 0, 0, 64, 31, 0, 0, 17, 64, 7, 0, 252, 0, 0, 0, 96, 31, 0, 0, 18, 64, 2, 0, 32, 0, 0, 0, 92, 32, 0, 0, 19, 64, 4, 0, 11, 0, 0, 0, 124, 32, 0, 0, 21, 64, 7, 0, 200, 1, 0, 0, 168, 32, 0, 0, 22, 64, 4, 0, 7, 0, 0, 0, 112, 34, 0, 0, 24, 64, 4, 0, 7, 0, 0, 0, 140, 34, 0, 0, 25, 64, 7, 0, 30, 0, 0, 0, 168, 34, 0, 0, 33, 64, 4, 0, 5, 0, 0, 0, 198, 34, 0, 0, 37, 64, 4, 0, 9, 0, 0, 0, 218, 34, 0, 0, 39, 64, 4, 0, 5, 0, 0, 0, 254, 34, 0, 0, 40, 64, 4, 0, 19, 0, 0, 0, 18, 35, 0, 0, 0, 0, 0, 0, 98, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 255, 127, 255, 127, 3, 0, 2, 0, 0, 0, 3, 0, 255, 255, 237, 0, 105, 0, 24, 0, 1, 0, 128, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 127, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 0, 0, 55, 0, 133, 210, 204, 47, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 64, 1, 208, 255, 128, 0, 148, 0, 0, 0, 0, 0, 3, 0, 0, 0, 8, 0, 8, 0, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 0, 144, 0, 78, 0, 0, 0, 0, 0, 248, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 67, 97, 110, 111, 110, 32, 69, 79, 83, 32, 53, 68, 32, 77, 97, 114, 107, 32, 73, 73, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 105, 114, 109, 119, 97, 114, 101, 32, 86, 101, 114, 115, 105, 111, 110, 32, 49, 46, 50, 46, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 170, 92, 40, 93, 40, 112, 0, 0, 235, 0, 228, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 152, 58, 0, 101, 0, 100, 0, 108, 0, 55, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 55, 0, 0, 1, 187, 187, 106, 112, 0, 123, 80, 208, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 255, 0, 106, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 0, 116, 4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 12, 204, 204, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 106, 5, 0, 0, 0, 106, 0, 0, 0, 0, 0, 196, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3, 5, 3, 241, 122, 3, 15, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 22, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 7, 3, 3, 3, 2, 239, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 80, 0, 237, 0, 24, 0, 105, 145, 119, 58, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 81, 14, 39, 0, 0, 0, 0, 41, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 128, 22, 0, 0, 0, 15, 0, 0, 32, 10, 0, 0, 252, 2, 0, 0, 64, 2, 0, 0, 0, 3, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 208, 2, 0, 0, 2","MeteringMode":"5","Model":"Canon EOS 5D Mark III","Orientation":"1","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"303104/65536","SubSecTime":"09","SubSecTimeDigitized":"09","SubSecTimeOriginal":"09","thumbnail:Compression":"6","thumbnail:InteroperabilityIndex":"R98","thumbnail:InteroperabilityVersion":"48, 49, 48, 48","thumbnail:JPEGInterchangeFormat":"11444","thumbnail:JPEGInterchangeFormatLength":"13399","thumbnail:ResolutionUnit":"2","thumbnail:XResolution":"72/1","thumbnail:YResolution":"72/1","UserComment":"0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","WhiteBalance":"0","XResolution":"72/1","YCbCrPositioning":"2","YResolution":"72/1"}	5648486	ee8a3fc2-707a-4ed4-bf74-cc8b5a894bad	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
345	54c277c0-19c3-4eea-97f0-fde6b977b67e	title		2019-05-03 04:01:39.719865	2019-05-10 07:27:01.770799	3e69717e-9803-4fc1-9909-419092780574	\N	title-9cf7e25c-0d58-4a98-88cb-e13f0987aca2	1	0	0	f	\N	t	\N	eb8ff105-8b14-4e4b-8bb9-4a59d76bcc0b.jpeg	5760	3840	\N	{"ApertureValue":"262144/65536","Artist":"Jonathan Grondin (FA: tango0)","ColorSpace":"1","ComponentsConfiguration":"1, 2, 3, 0","Copyright":"www.tangohusky.net","CustomRendered":"0","DateTime":"2015:01:06 19:29:40","DateTimeDigitized":"2015:01:06 19:29:40","DateTimeOriginal":"2015:01:06 19:29:40","ExifImageLength":"3840","ExifImageWidth":"5760","ExifOffset":"360","ExifVersion":"0230","ExposureBiasValue":"0/1","ExposureMode":"0","ExposureProgram":"3","ExposureTime":"1/20","Flash":"16","FlashPixVersion":"0100","FNumber":"4/1","FocalLength":"40/1","FocalPlaneResolutionUnit":"2","FocalPlaneXResolution":"5760000/1461","FocalPlaneYResolution":"3840000/972","GPSInfo":"9554","GPSVersionID":"2, 3, 0, 0","InteroperabilityOffset":"9326","ISOSpeedRatings":"2000","Make":"Canon","MakerNote":"40, 0, 1, 0, 3, 0, 49, 0, 0, 0, 116, 5, 0, 0, 2, 0, 3, 0, 4, 0, 0, 0, 214, 5, 0, 0, 3, 0, 3, 0, 4, 0, 0, 0, 222, 5, 0, 0, 4, 0, 3, 0, 34, 0, 0, 0, 230, 5, 0, 0, 6, 0, 2, 0, 22, 0, 0, 0, 42, 6, 0, 0, 7, 0, 2, 0, 24, 0, 0, 0, 74, 6, 0, 0, 9, 0, 2, 0, 32, 0, 0, 0, 98, 6, 0, 0, 13, 0, 7, 0, 0, 6, 0, 0, 130, 6, 0, 0, 16, 0, 4, 0, 1, 0, 0, 0, 133, 2, 0, 128, 19, 0, 3, 0, 4, 0, 0, 0, 130, 12, 0, 0, 25, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 3, 0, 9, 1, 0, 0, 138, 12, 0, 0, 53, 0, 4, 0, 4, 0, 0, 0, 156, 14, 0, 0, 147, 0, 3, 0, 30, 0, 0, 0, 172, 14, 0, 0, 149, 0, 2, 0, 74, 0, 0, 0, 232, 14, 0, 0, 150, 0, 2, 0, 16, 0, 0, 0, 50, 15, 0, 0, 151, 0, 7, 0, 0, 4, 0, 0, 66, 15, 0, 0, 152, 0, 3, 0, 4, 0, 0, 0, 66, 19, 0, 0, 153, 0, 4, 0, 83, 0, 0, 0, 74, 19, 0, 0, 154, 0, 4, 0, 5, 0, 0, 0, 150, 20, 0, 0, 160, 0, 3, 0, 14, 0, 0, 0, 170, 20, 0, 0, 170, 0, 3, 0, 6, 0, 0, 0, 198, 20, 0, 0, 180, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 208, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 224, 0, 3, 0, 17, 0, 0, 0, 210, 20, 0, 0, 1, 64, 3, 0, 32, 5, 0, 0, 244, 20, 0, 0, 8, 64, 3, 0, 3, 0, 0, 0, 52, 31, 0, 0, 9, 64, 3, 0, 3, 0, 0, 0, 58, 31, 0, 0, 16, 64, 2, 0, 32, 0, 0, 0, 64, 31, 0, 0, 17, 64, 7, 0, 252, 0, 0, 0, 96, 31, 0, 0, 18, 64, 2, 0, 32, 0, 0, 0, 92, 32, 0, 0, 19, 64, 4, 0, 11, 0, 0, 0, 124, 32, 0, 0, 21, 64, 7, 0, 200, 1, 0, 0, 168, 32, 0, 0, 22, 64, 4, 0, 7, 0, 0, 0, 112, 34, 0, 0, 24, 64, 4, 0, 7, 0, 0, 0, 140, 34, 0, 0, 25, 64, 7, 0, 30, 0, 0, 0, 168, 34, 0, 0, 33, 64, 4, 0, 5, 0, 0, 0, 198, 34, 0, 0, 37, 64, 4, 0, 9, 0, 0, 0, 218, 34, 0, 0, 39, 64, 4, 0, 5, 0, 0, 0, 254, 34, 0, 0, 40, 64, 4, 0, 19, 0, 0, 0, 18, 35, 0, 0, 0, 0, 0, 0, 98, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 255, 127, 255, 127, 3, 0, 2, 0, 0, 0, 3, 0, 255, 255, 237, 0, 105, 0, 24, 0, 1, 0, 128, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 127, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 0, 0, 40, 0, 133, 210, 204, 47, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 44, 1, 224, 255, 128, 0, 140, 0, 0, 0, 0, 0, 3, 0, 0, 0, 8, 0, 8, 0, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 0, 140, 0, 80, 0, 0, 0, 0, 0, 248, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 67, 97, 110, 111, 110, 32, 69, 79, 83, 32, 53, 68, 32, 77, 97, 114, 107, 32, 73, 73, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 105, 114, 109, 119, 97, 114, 101, 32, 86, 101, 114, 115, 105, 111, 110, 32, 49, 46, 50, 46, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 170, 91, 40, 91, 40, 107, 0, 0, 240, 0, 240, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 151, 58, 0, 100, 0, 96, 0, 104, 0, 40, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 1, 187, 187, 108, 112, 255, 239, 80, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 255, 0, 108, 0, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 182, 0, 159, 4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 12, 204, 204, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 107, 0, 0, 0, 0, 0, 0, 0, 0, 108, 5, 0, 0, 0, 106, 0, 0, 0, 0, 0, 196, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3, 5, 3, 241, 122, 3, 15, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 22, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 7, 3, 3, 3, 2, 239, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 80, 0, 237, 0, 24, 0, 105, 145, 119, 58, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 81, 14, 39, 0, 0, 0, 0, 41, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 128, 22, 0, 0, 0, 15, 0, 0, 32, 10, 0, 0, 252, 2, 0, 0, 64, 2, 0, 0, 0, 3, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 208, 2, 0, 0,","MeteringMode":"5","Model":"Canon EOS 5D Mark III","Orientation":"1","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"286720/65536","SubSecTime":"00","SubSecTimeDigitized":"00","SubSecTimeOriginal":"00","thumbnail:Compression":"6","thumbnail:InteroperabilityIndex":"R98","thumbnail:InteroperabilityVersion":"48, 49, 48, 48","thumbnail:JPEGInterchangeFormat":"11444","thumbnail:JPEGInterchangeFormatLength":"11662","thumbnail:ResolutionUnit":"2","thumbnail:XResolution":"72/1","thumbnail:YResolution":"72/1","UserComment":"0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","WhiteBalance":"0","XResolution":"72/1","YCbCrPositioning":"2","YResolution":"72/1"}	5031788	\N	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
349	87268508-496e-47a5-bed5-916775729a9f	title		2019-05-03 04:03:59.405797	2019-05-10 07:27:15.094303	3e69717e-9803-4fc1-9909-419092780574	\N	title-9ec37bde-e414-4227-88b4-0cd02b30cb8e	0	0	0	f	\N	t	\N	3f135552-f504-4f51-b4fe-05c6d0398665.jpeg	620	1129	\N	{}	104551	c1e920c6-94d8-448c-8224-c7bb518b94ba	\N	ca0ea9af-3a01-45b3-a0f3-3f2b6dbb70c7	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
361	8cae3a07-02be-4c44-8db6-8f0c596b0341	title		2019-05-08 10:09:02.018997	2019-05-10 07:35:40.531483	3e69717e-9803-4fc1-9909-419092780574	\N	title-46e674bd-dcfb-4990-bd45-b983f46ef1cd	1	0	0	f	\N	t	\N	28b997b0-3791-496c-a2ad-a40d293a1f33.mp4	320	180	\N	{}	378396	\N	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
344	5972f3b1-fdc5-4052-baa1-61267f07e73a	title		2019-05-03 03:57:48.864455	2019-05-10 07:36:53.327911	3e69717e-9803-4fc1-9909-419092780574	\N	title-41886d00-dfce-4b17-ace5-26b7395aa1a1	1	0	0	f	\N	t	\N	19d54333-f7ec-4b2b-8191-4dbce7d50aac.jpeg	5760	3840	\N	{"ApertureValue":"262144/65536","Artist":"Jonathan Grondin (FA: tango0)","ColorSpace":"1","ComponentsConfiguration":"1, 2, 3, 0","Copyright":"www.tangohusky.net","CustomRendered":"0","DateTime":"2015:01:06 19:32:26","DateTimeDigitized":"2015:01:06 19:32:26","DateTimeOriginal":"2015:01:06 19:32:26","ExifImageLength":"3840","ExifImageWidth":"5760","ExifOffset":"360","ExifVersion":"0230","ExposureBiasValue":"0/1","ExposureMode":"0","ExposureProgram":"3","ExposureTime":"1/25","Flash":"16","FlashPixVersion":"0100","FNumber":"4/1","FocalLength":"50/1","FocalPlaneResolutionUnit":"2","FocalPlaneXResolution":"5760000/1461","FocalPlaneYResolution":"3840000/972","GPSInfo":"9554","GPSVersionID":"2, 3, 0, 0","InteroperabilityOffset":"9326","ISOSpeedRatings":"3200","Make":"Canon","MakerNote":"40, 0, 1, 0, 3, 0, 49, 0, 0, 0, 116, 5, 0, 0, 2, 0, 3, 0, 4, 0, 0, 0, 214, 5, 0, 0, 3, 0, 3, 0, 4, 0, 0, 0, 222, 5, 0, 0, 4, 0, 3, 0, 34, 0, 0, 0, 230, 5, 0, 0, 6, 0, 2, 0, 22, 0, 0, 0, 42, 6, 0, 0, 7, 0, 2, 0, 24, 0, 0, 0, 74, 6, 0, 0, 9, 0, 2, 0, 32, 0, 0, 0, 98, 6, 0, 0, 13, 0, 7, 0, 0, 6, 0, 0, 130, 6, 0, 0, 16, 0, 4, 0, 1, 0, 0, 0, 133, 2, 0, 128, 19, 0, 3, 0, 4, 0, 0, 0, 130, 12, 0, 0, 25, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 3, 0, 9, 1, 0, 0, 138, 12, 0, 0, 53, 0, 4, 0, 4, 0, 0, 0, 156, 14, 0, 0, 147, 0, 3, 0, 30, 0, 0, 0, 172, 14, 0, 0, 149, 0, 2, 0, 74, 0, 0, 0, 232, 14, 0, 0, 150, 0, 2, 0, 16, 0, 0, 0, 50, 15, 0, 0, 151, 0, 7, 0, 0, 4, 0, 0, 66, 15, 0, 0, 152, 0, 3, 0, 4, 0, 0, 0, 66, 19, 0, 0, 153, 0, 4, 0, 83, 0, 0, 0, 74, 19, 0, 0, 154, 0, 4, 0, 5, 0, 0, 0, 150, 20, 0, 0, 160, 0, 3, 0, 14, 0, 0, 0, 170, 20, 0, 0, 170, 0, 3, 0, 6, 0, 0, 0, 198, 20, 0, 0, 180, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 208, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 224, 0, 3, 0, 17, 0, 0, 0, 210, 20, 0, 0, 1, 64, 3, 0, 32, 5, 0, 0, 244, 20, 0, 0, 8, 64, 3, 0, 3, 0, 0, 0, 52, 31, 0, 0, 9, 64, 3, 0, 3, 0, 0, 0, 58, 31, 0, 0, 16, 64, 2, 0, 32, 0, 0, 0, 64, 31, 0, 0, 17, 64, 7, 0, 252, 0, 0, 0, 96, 31, 0, 0, 18, 64, 2, 0, 32, 0, 0, 0, 92, 32, 0, 0, 19, 64, 4, 0, 11, 0, 0, 0, 124, 32, 0, 0, 21, 64, 7, 0, 200, 1, 0, 0, 168, 32, 0, 0, 22, 64, 4, 0, 7, 0, 0, 0, 112, 34, 0, 0, 24, 64, 4, 0, 7, 0, 0, 0, 140, 34, 0, 0, 25, 64, 7, 0, 30, 0, 0, 0, 168, 34, 0, 0, 33, 64, 4, 0, 5, 0, 0, 0, 198, 34, 0, 0, 37, 64, 4, 0, 9, 0, 0, 0, 218, 34, 0, 0, 39, 64, 4, 0, 5, 0, 0, 0, 254, 34, 0, 0, 40, 64, 4, 0, 19, 0, 0, 0, 18, 35, 0, 0, 0, 0, 0, 0, 98, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 255, 127, 255, 127, 3, 0, 2, 0, 0, 0, 3, 0, 255, 255, 237, 0, 105, 0, 24, 0, 1, 0, 128, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 127, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 0, 0, 50, 0, 133, 210, 204, 47, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 64, 1, 216, 255, 128, 0, 148, 0, 0, 0, 0, 0, 3, 0, 0, 0, 8, 0, 8, 0, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 0, 152, 0, 78, 0, 0, 0, 0, 0, 248, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 67, 97, 110, 111, 110, 32, 69, 79, 83, 32, 53, 68, 32, 77, 97, 114, 107, 32, 73, 73, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 105, 114, 109, 119, 97, 114, 101, 32, 86, 101, 114, 115, 105, 111, 110, 32, 49, 46, 50, 46, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 170, 94, 40, 93, 40, 112, 0, 0, 235, 0, 234, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 152, 58, 0, 100, 0, 96, 0, 104, 0, 50, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 1, 187, 187, 106, 112, 255, 235, 16, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 255, 0, 106, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 182, 0, 159, 4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 12, 204, 204, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 106, 5, 0, 0, 0, 106, 0, 0, 0, 0, 0, 196, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3, 5, 3, 241, 122, 3, 15, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 22, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 7, 3, 3, 3, 2, 239, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 80, 0, 237, 0, 24, 0, 105, 145, 119, 58, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 81, 14, 39, 0, 0, 0, 0, 41, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 128, 22, 0, 0, 0, 15, 0, 0, 32, 10, 0, 0, 252, 2, 0, 0, 64, 2, 0, 0, 0, 3, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 2, 0, 0, 224, 1, 0, 0, 208, 2, 0, 0, ","MeteringMode":"5","Model":"Canon EOS 5D Mark III","Orientation":"1","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"303104/65536","SubSecTime":"91","SubSecTimeDigitized":"91","SubSecTimeOriginal":"91","thumbnail:Compression":"6","thumbnail:InteroperabilityIndex":"R98","thumbnail:InteroperabilityVersion":"48, 49, 48, 48","thumbnail:JPEGInterchangeFormat":"11444","thumbnail:JPEGInterchangeFormatLength":"14618","thumbnail:ResolutionUnit":"2","thumbnail:XResolution":"72/1","thumbnail:YResolution":"72/1","UserComment":"0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","WhiteBalance":"0","XResolution":"72/1","YCbCrPositioning":"2","YResolution":"72/1"}	5848894	ee8a3fc2-707a-4ed4-bf74-cc8b5a894bad	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	3b1b58bd-bedd-459a-8b05-c4dddca8e912	0	stormy	\N	f	\N	\N	f
362	00681928-a21b-4663-a0c4-02a9c9e562dd	00681928		2019-05-08 10:14:53.876525	2019-05-10 07:37:04.859637	3e69717e-9803-4fc1-9909-419092780574	\N	title-03785014-13ad-4435-a547-51fc2d6ff56c	1	0	0	f	\N	t	\N	58388f0b-c45d-414c-b78f-c37622c941a0.gif	600	180	\N	{}	26837	\N	\N	1aac9a5a-0860-4bc6-8f9f-ec1135afe1f2	\N	20	\N	\N	0	\N	Tango	f	\N	\N	f
368	865e39c8-13e4-4c0f-ad5d-04161252db5f	title		2019-05-12 09:27:59.999103	2019-05-12 09:27:59.999103	3e69717e-9803-4fc1-9909-419092780574	\N	title-ab6b9a7f-4f24-437e-8b35-f8e817221e87	1	0	0	f	\N	t	\N	bb7a4f8d-03c6-4579-9a7f-4381d1c21058.jpeg	2268	4032	\N	{"ApertureValue":"153/100","BrightnessValue":"-3/100","ColorSpace":"1","ComponentsConfiguration":"1, 2, 3, 0","DateTime":"2019:04:25 09:14:13","DateTimeDigitized":"2019:04:25 09:14:13","DateTimeOriginal":"2019:04:25 09:14:13","ExifImageLength":"2268","ExifImageWidth":"4032","ExifOffset":"214","ExifVersion":"0220","ExposureBiasValue":"0/10","ExposureMode":"0","ExposureProgram":"2","ExposureTime":"1/24","Flash":"0","FlashPixVersion":"0100","FNumber":"17/10","FocalLength":"420/100","FocalLengthIn35mmFilm":"26","GPSAltitude":"167/1","GPSAltitudeRef":"0","GPSDateStamp":"2019:04:25","GPSInfo":"882","GPSLatitude":"33/1, 8/1, 13/1","GPSLatitudeRef":"N","GPSLongitude":"117/1, 8/1, 60/1","GPSLongitudeRef":"W","GPSTimeStamp":"16/1, 13/1, 57/1","GPSVersionID":"2, 2, 0, 0","ImageUniqueID":"F12LLJA00VM F12LLKL01GM.","InteroperabilityOffset":"852","ISOSpeedRatings":"200","Make":"samsung","MakerNote":"7, 0, 1, 0, 7, 0, 4, 0, 0, 0, 48, 49, 48, 48, 2, 0, 4, 0, 1, 0, 0, 0, 0, 32, 1, 0, 12, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 16, 0, 5, 0, 1, 0, 0, 0, 90, 0, 0, 0, 64, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 80, 0, 4, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","MaxApertureValue":"153/100","MeteringMode":"2","Model":"SM-G955F","Orientation":"6","ResolutionUnit":"2","SceneCaptureType":"0","ShutterSpeedValue":"456/100","Software":"G955FXXU2CRF7","SubSecTime":"0072","SubSecTimeDigitized":"0072","SubSecTimeOriginal":"0072","thumbnail:Compression":"6","thumbnail:ImageLength":"280","thumbnail:ImageWidth":"496","thumbnail:InteroperabilityIndex":"R98","thumbnail:InteroperabilityVersion":"48, 49, 48, 48","thumbnail:JPEGInterchangeFormat":"1218","thumbnail:JPEGInterchangeFormatLength":"12469","thumbnail:Orientation":"6","thumbnail:ResolutionUnit":"2","thumbnail:XResolution":"72/1","thumbnail:YResolution":"72/1","UserComment":"0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0","WhiteBalance":"0","XResolution":"72/1","YCbCrPositioning":"1","YResolution":"72/1"}	2490147	\N	\N	a9101a71-590d-4483-8b50-c6194c005e16	\N	20	\N	\N	0	stormy	\N	f	\N	\N	f
\.


--
-- Data for Name: medium_reports; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.medium_reports (id, uuid, description, medium_id, reporter_id, status, assignee_id, created_at, updated_at) FROM stdin;
12	a19918aa-4f07-4355-9a96-123abdf38e9f	porn\n	0015951a-0ae2-4fa9-80d5-9119e42e604a	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-27 21:35:46.65968	2019-03-27 21:37:05.294476
13	6df38e2b-d1ed-4d24-b944-17edae8e9b73	bad	0f2940c6-6f7a-4d71-b2c8-2e5f1b014142	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-28 04:26:19.943642	2019-03-28 04:26:45.967566
14	0c2c67b2-e632-4e4e-8053-cb9bda23c8bb	asd	fb6d2e26-d146-421d-98a5-5c6d1854475c	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-28 04:27:36.622796	2019-03-28 04:27:49.323014
15	60bf500d-c3cd-45b3-8876-cbcbc6e01356	wsdg	ce0d02b4-3c4d-4b87-a0a5-aeae9047f6d1	3e69717e-9803-4fc1-9909-419092780574	new	\N	2019-03-28 06:31:25.382905	2019-03-28 06:31:25.382905
16	c1a4d3e2-da79-4023-b5e1-6cf763d5134d	dghn	d9bb7289-e7bc-40de-b4ac-ae6cc973e34c	3e69717e-9803-4fc1-9909-419092780574	new	\N	2019-03-29 23:19:01.367195	2019-03-29 23:19:01.367195
18	0faa42b9-56a0-4c59-bbe7-d772acae894f	asd	ffe4d64e-629f-43e9-94b5-481d59f04647	3e69717e-9803-4fc1-9909-419092780574	accepted	\N	2019-05-05 23:39:44.199421	2019-05-06 22:12:23.823664
22	aefe2fba-c954-408c-822a-a1e557a2f309	xfcvgb	ffe4d64e-629f-43e9-94b5-481d59f04647	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-05-06 20:56:38.600659	2019-05-06 22:12:23.863757
19	cbeb8d97-abd9-465d-af31-e76e6bc16703	sdfgh	9d5c7556-2ebd-47db-be21-c0b54fa87827	02b49ce7-22fd-429f-b1b1-55cfad638f59	accepted	\N	2019-05-05 23:41:29.468083	2019-05-06 22:12:49.662052
20	c385c00c-5518-40e3-b5a8-04901491bea1	zdxsfbv	9d5c7556-2ebd-47db-be21-c0b54fa87827	02b49ce7-22fd-429f-b1b1-55cfad638f59	accepted	\N	2019-05-05 23:49:26.966049	2019-05-06 22:12:49.699054
21	85f5c5ed-4737-40ee-951b-689887807069	xcvb	9d5c7556-2ebd-47db-be21-c0b54fa87827	02b49ce7-22fd-429f-b1b1-55cfad638f59	accepted	1	2019-05-05 23:52:31.239331	2019-05-06 22:12:49.778263
17	d1da809d-59ab-4a7c-9e22-5f1cce18a5f1	hkf	ead023a2-7a54-4e26-9f1b-f4496e0f5418	3e69717e-9803-4fc1-9909-419092780574	new	\N	2019-04-23 23:48:39.629756	2019-05-06 22:15:48.789637
23	96163f4f-d953-453d-878a-bd02fb4e5662	asfd	ce7324fc-2a1e-4754-aafb-d1d75c10d649	3e69717e-9803-4fc1-9909-419092780574	new	\N	2019-05-10 09:03:54.354002	2019-05-10 09:03:54.354002
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.messages (id, uuid, chat_id, sender_id, body, picture, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: moderation_comments; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.moderation_comments (id, subject_id, subject_type, body, created_at, updated_at, moderator_id) FROM stdin;
1	c6580e17-e1e0-42f7-a5c1-9d4b0ce64363	TagReport	asf	2019-03-19 05:24:34.983441	2019-03-19 05:24:34.983441	1
2	d1da809d-59ab-4a7c-9e22-5f1cce18a5f1	MediumReport		2019-05-06 22:15:23.010696	2019-05-06 22:15:23.010696	1
\.


--
-- Data for Name: moderators; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.moderators (id, email, encrypted_password, name, reset_password_token, reset_password_sent_at, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, created_at, updated_at, capabilities, telegram_id, telegram_username) FROM stdin;
1	toto@toto.com	$2a$11$c.ieNJm9nIJYpcHdWSpuEeWOOUCtgz1LrFzeIBH2SmW0uvvDIAICO	Korben Dallas	cf83cdf90c61bd98a793b58e09e3a898f831f2d0c08237518e6a85f7f29e1a1d	2019-04-30 15:44:21.095396	\N	22	2019-05-10 08:33:37.01737	2019-05-08 20:51:13.435159	127.0.0.1	127.0.0.1	2019-01-27 07:39:48.022705	2019-05-10 08:33:37.018765	{adverts,analytics,assets,delete_and_edit,events,fursuit_claims,maker_claims,moderators,reports,sponsors,suspended_users,tickets,tech,tooltips}	\N	\N
\.


--
-- Data for Name: panels; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.panels (id, name, edition_id, created_at, updated_at, uuid) FROM stdin;
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.reports (id, uuid, description, user_id, reporter_id, status, assignee_id, created_at, updated_at) FROM stdin;
1	0e4897ca-2046-4476-a577-364f70966130	racist fuck\n	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-15 22:34:58.223543	2019-03-18 00:02:47.825944
2	408a042a-22e7-430d-a57e-fdeaf4679337	kujyg	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-18 01:58:09.172227	2019-03-18 02:05:52.743034
3	d6928b28-1cf7-4b03-8150-e1e7359aafe5	asdfg	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-18 02:06:31.603518	2019-03-18 02:06:38.475332
4	5d085e58-9b91-4f83-a1f1-315664188b73	qwsd	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-18 02:06:47.666379	2019-03-18 02:08:01.257818
5	c842aee3-6841-48af-a62c-0ca54518e695	13r4	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-18 02:08:26.099393	2019-03-18 02:08:32.416297
6	4b12c3be-47dc-44da-a40a-39903d983311	qawrf	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-18 02:09:35.303513	2019-03-18 02:10:12.047407
7	bf1a7576-6dcb-4d7f-a4f7-b184a9c28550	bio is offensive	3e69717e-9803-4fc1-9909-419092780574	bd88fca0-9b2d-4252-9357-298429a6d5a3	accepted	1	2019-03-19 18:30:42.141936	2019-03-19 18:31:15.438791
8	1d8dd8bc-3a23-4178-8389-daae2a91950a	WESF	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	\N	2019-03-28 06:32:13.642339	2019-05-06 22:07:20.21456
9	61795d74-aff9-4917-88f1-49d1e1b17563	offensive	bd88fca0-9b2d-4252-9357-298429a6d5a3	3e69717e-9803-4fc1-9909-419092780574	accepted	1	2019-03-29 23:18:49.011353	2019-05-06 22:07:51.753217
\.


--
-- Data for Name: ribbon_announcements; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.ribbon_announcements (id, uuid, body, public, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.schema_migrations (version) FROM stdin;
20180902075012
20180902075302
20180905082638
20180912123601
20180912134554
20180913060305
20180913060307
20180915183925
20180915203019
20180915204930
20180916083224
20180916114814
20180916195706
20180916203647
20180916203648
20180916203649
20180916213418
20180916213547
20180916233235
20180918104636
20180920074941
20180921090458
20180921094428
20180921095026
20180921162652
20180921210715
20180922151644
20180924123339
20181003044941
20181003110745
20181003115246
20181005094957
20181005095239
20181008065623
20181009062404
20181010064202
20181010124811
20181010124812
20181010124813
20181010124814
20181010124815
20181010124816
20181011080737
20181012021648
20181012072950
20181013113511
20181014080112
20181014081545
20181014091121
20181021074836
20181022075330
20181029031213
20181029031301
20181031062354
20181031062514
20181101190445
20181101192002
20181101195218
20181101200116
20181102083124
20181103113946
20181103115037
20181103185008
20181104103957
20181105130635
20181105140635
20181105162541
20181105162724
20181110120855
20181110133907
20181110153732
20181111043539
20181111043739
20181111044755
20181111051044
20181111180251
20181111182842
20181119061641
20181119062820
20181119103115
20181121060923
20181122072440
20181122073608
20181122080031
20181207211257
20181207211652
20181208074503
20181209214701
20181211074849
20181212034655
20181217054039
20181222155426
20181222155444
20181222163835
20181222173541
20181222194041
20181223212852
20181227164307
20181227183429
20181228065824
20190101195405
20190101195457
20190101195511
20190131202304
20190207022119
20190207022130
20190207203748
20190208020746
20190209054922
20190209061808
20190209062429
20190209062606
20190210073756
20190210091052
20190223100250
20190224063917
20190224063938
20190224065812
20190224114022
20190225210600
20190226050304
20190227044624
20190227084147
20190302040500
20190304030131
20190306033814
20190306033831
20190306034253
20190309014938
20190309231530
20190311005051
20190311061643
20190316174723
20190317014648
20190319023458
20190319173028
20190320004050
20190325214454
20190327025719
20190328041735
20190405193329
20190405222239
20190410063012
20190411203907
20190417050729
20190417065654
20190418022546
20190418042634
20190418121715
20190420170005
20190420172901
20190421041200
20190422001234
20190424003800
20190425080320
20190430003247
20190506213930
20190507042901
20190508204458
20190510222206
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.sessions (id, uuid, user_id, created_at, updated_at) FROM stdin;
35	ba017d77-e324-4fd1-abef-aad4d7069ba2	3e69717e-9803-4fc1-9909-419092780574	2019-04-25 08:40:29.209362	2019-05-01 23:00:52.600421
38	f480a848-efcc-4529-aa8c-a832935a4bc3	ffa902c2-63b1-40a9-8fbf-348a65ec7960	2019-05-07 05:10:26.389256	2019-05-07 05:10:43.723195
39	b7678bb9-c655-421f-91b2-d8bcd0687d55	3e69717e-9803-4fc1-9909-419092780574	2019-05-09 07:15:26.896606	2019-05-09 07:15:26.896606
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.species (id, uuid, name, created_at, updated_at) FROM stdin;
211	89f1fe6f-2bb6-41f5-9610-fd49eee136fe	Aardvark	2019-04-16 07:46:24.226527	2019-04-16 07:46:24.226527
212	f161bdcd-cb9f-4a3b-bfa1-a123b91cdb36	Aardwolf	2019-04-16 07:46:24.236064	2019-04-16 07:46:24.236064
213	8dcd38ad-d7da-4fc4-aa54-b15a6bffb2a3	Alien	2019-04-16 07:46:24.246309	2019-04-16 07:46:24.246309
214	e878522e-adb5-40d9-8e01-49f398fd7f05	Alligator	2019-04-16 07:46:24.254278	2019-04-16 07:46:24.254278
215	61ea62e4-c4cb-44c0-a4df-2b1dc88c4e9e	Cerberus	2019-04-16 07:46:24.263749	2019-04-16 07:46:24.263749
216	18054351-91bf-4eca-98ac-8a7bad820eba	Anteater	2019-04-16 07:46:24.271732	2019-04-16 07:46:24.271732
217	700cf2b2-76b0-4ae9-9682-2986058e5b49	Antelope	2019-04-16 07:46:24.280148	2019-04-16 07:46:24.280148
218	4d9b399c-bc90-4c12-a1a5-d9faef090e91	Anubis	2019-04-16 07:46:24.288628	2019-04-16 07:46:24.288628
219	8ff605ce-f2ee-4890-8bf5-34e70f880a18	Armadillo	2019-04-16 07:46:24.2957	2019-04-16 07:46:24.2957
220	d0e6560e-ef79-4b6e-acdd-134e4cb64ba2	Badger	2019-04-16 07:46:24.30417	2019-04-16 07:46:24.30417
221	c07e7a68-2073-49f8-9ca9-901cdd23c6b5	Bandicoot	2019-04-16 07:46:24.314254	2019-04-16 07:46:24.314254
222	44415216-9e3c-40ed-bfb6-e9ba97d293c7	Bat	2019-04-16 07:46:24.321792	2019-04-16 07:46:24.321792
223	c0d9ed74-a25d-4ec8-bad5-e8d9d6f3beb2	Bear	2019-04-16 07:46:24.329934	2019-04-16 07:46:24.329934
224	4b019981-5ccf-46b9-86fc-aba655a95e1d	Beaver	2019-04-16 07:46:24.338424	2019-04-16 07:46:24.338424
225	19ad5048-33d7-4833-8d83-94a78a70bb3f	Bird	2019-04-16 07:46:24.347815	2019-04-16 07:46:24.347815
226	2128d436-9e1e-416b-ad84-e76986561c0f	Bison	2019-04-16 07:46:24.355056	2019-04-16 07:46:24.355056
227	dd448a51-4e82-48c2-aba3-6bab524f3934	Bobcat	2019-04-16 07:46:24.363821	2019-04-16 07:46:24.363821
228	ebbbdeb0-efdf-4701-916b-17eeeec51e5c	Camel	2019-04-16 07:46:24.373292	2019-04-16 07:46:24.373292
229	ac4b24b8-609c-4f64-95a4-ac8dd2a75d88	Caracal	2019-04-16 07:46:24.382951	2019-04-16 07:46:24.382951
230	769b22db-8cc3-4d5e-85fc-b1ee523d604c	Cat Domestic	2019-04-16 07:46:24.391195	2019-04-16 07:46:24.391195
231	61576754-f844-4607-b837-dada2bb3b85a	Cheetah	2019-04-16 07:46:24.399921	2019-04-16 07:46:24.399921
232	c76827fa-2fd0-40bf-bfb8-37da0e0f9542	Chimera	2019-04-16 07:46:24.409417	2019-04-16 07:46:24.409417
233	9c3a49cc-b699-47bc-8cdf-238a3a35a7eb	Chinchilla	2019-04-16 07:46:24.416429	2019-04-16 07:46:24.416429
234	67661482-a242-4e9d-9d42-a80a45d2f321	Chipmunk	2019-04-16 07:46:24.42569	2019-04-16 07:46:24.42569
235	d184fcf4-de8c-49f7-88b0-880ad88bceaf	Civet	2019-04-16 07:46:24.433379	2019-04-16 07:46:24.433379
236	82059316-1f70-4a70-9655-c09f1c6d626c	Hybrid Angel Dragon	2019-04-16 07:46:24.441617	2019-04-16 07:46:24.441617
237	af0b1bb1-b5f5-41be-aaf4-ffd96ffdc734	Hybrid Cabbit	2019-04-16 07:46:24.450795	2019-04-16 07:46:24.450795
238	f50f7593-597f-468a-a452-90a47a8e6c77	Hybrid Cannax	2019-04-16 07:46:24.466101	2019-04-16 07:46:24.466101
239	b9f59f98-0d17-4a09-8d29-9ae3a40aad69	Hybrid Cat-Fox	2019-04-16 07:46:24.47621	2019-04-16 07:46:24.47621
240	2a00aeb7-3ce7-4390-9e92-1082f12e666a	Hybrid Chimera	2019-04-16 07:46:24.485049	2019-04-16 07:46:24.485049
241	56690808-75bd-4b6b-b3a6-eb2eef7cf2fb	Hybrid Crux	2019-04-16 07:46:24.493367	2019-04-16 07:46:24.493367
242	f1e5ef39-849f-4e39-9214-8ca2cadb82b2	Hybrid Dragon Fox	2019-04-16 07:46:24.501576	2019-04-16 07:46:24.501576
243	57e78a5d-3d39-4c47-b9b5-1f115713cc30	Hybrid Drusky	2019-04-16 07:46:24.510651	2019-04-16 07:46:24.510651
244	72025afb-06d1-4650-808c-684b78fb3ee3	Hybrid Dutch Angel Dragon	2019-04-16 07:46:24.519929	2019-04-16 07:46:24.519929
245	ed39e15a-e006-4688-b237-5e2dc053e4ed	Hybrid Folf	2019-04-16 07:46:24.529854	2019-04-16 07:46:24.529854
246	b260ed0a-d329-40ac-8051-7dd2c22ee756	Hybrid Fox Bat	2019-04-16 07:46:24.537852	2019-04-16 07:46:24.537852
247	bcb09d11-9626-4560-9bfb-d909d8c70312	Hybrid Foxcoon	2019-04-16 07:46:24.547563	2019-04-16 07:46:24.547563
248	5b0498c3-72bd-4c82-8453-e16bfe4fd6e5	Hybrid Fusky	2019-04-16 07:46:24.556879	2019-04-16 07:46:24.556879
249	ed670b7d-a0a6-4c86-9b06-41de509fe370	Hybrid Jackalope	2019-04-16 07:46:24.565127	2019-04-16 07:46:24.565127
250	3f37d9fb-7bd6-4812-a836-b0431c1afbf3	Hybrid Kitsune	2019-04-16 07:46:24.57305	2019-04-16 07:46:24.57305
251	760ed77e-96d9-4576-a725-58dc608b02c0	Hybrid Liger/Tigon	2019-04-16 07:46:24.582283	2019-04-16 07:46:24.582283
252	08de68be-3303-4435-8593-193c610a6baa	Hybrid Manokit	2019-04-16 07:46:24.59169	2019-04-16 07:46:24.59169
253	acc29705-b5d2-4f7e-b6ce-05f5d6b97197	Hybrid Pandacat	2019-04-16 07:46:24.601541	2019-04-16 07:46:24.601541
254	4a318830-d419-4a74-9fb5-c1422971b988	Hybrid Protogen	2019-04-16 07:46:24.609721	2019-04-16 07:46:24.609721
255	d3efdd41-0d3d-49c6-adb5-6d9dd21f5d08	Hybrid Sergal	2019-04-16 07:46:24.619357	2019-04-16 07:46:24.619357
256	b72d4a12-e332-42dc-a3a4-9953687e5876	Hybrid Sergal	2019-04-16 07:46:24.628328	2019-04-16 07:46:24.628328
257	5d62267a-4de5-4919-8b80-319e9b60e989	Hybrid Tiger Dragon	2019-04-16 07:46:24.637225	2019-04-16 07:46:24.637225
258	1a6ad0f6-f160-42af-9de1-fbe828d6a54f	Hybrid Wolf Fox	2019-04-16 07:46:24.645883	2019-04-16 07:46:24.645883
259	cc16dd36-8fc2-4c65-895f-d91f38409044	Hybrid Wolf Shark	2019-04-16 07:46:24.655725	2019-04-16 07:46:24.655725
260	eaf8959f-d4c0-473b-90fe-766783f96381	Hybrid Wolfcoon	2019-04-16 07:46:24.666188	2019-04-16 07:46:24.666188
261	e743bc12-7b47-4b22-a7b0-8a9aa76c7861	Hybrid Wolfdog	2019-04-16 07:46:24.674923	2019-04-16 07:46:24.674923
262	4c4a8074-f7c1-4388-a8ca-a9039046fc1e	Hybrid Wolgen/Drolf	2019-04-16 07:46:24.683282	2019-04-16 07:46:24.683282
263	20422a20-acba-412a-84d8-fdabf8a3e21a	Hybrid Wolger	2019-04-16 07:46:24.692278	2019-04-16 07:46:24.692278
264	7e82b3eb-3e50-474a-8585-569117737d7b	Hybrid Wusky/Wolfsky	2019-04-16 07:46:24.703946	2019-04-16 07:46:24.703946
265	5b74a823-88b2-478a-992e-44bc12dc4519	Cougar	2019-04-16 07:46:24.714472	2019-04-16 07:46:24.714472
266	597dd815-ae7d-4c38-b23b-0f4d2da7f6fd	Cow	2019-04-16 07:46:24.724417	2019-04-16 07:46:24.724417
267	cd8c849f-28b5-47fa-bb1e-9df767754030	Coyote	2019-04-16 07:46:24.732421	2019-04-16 07:46:24.732421
268	377439aa-412e-48ae-aeed-13ca4c14a741	Crocodile	2019-04-16 07:46:24.740519	2019-04-16 07:46:24.740519
269	44dbe879-58b0-4f23-8b23-2a20523febaa	Crustacean	2019-04-16 07:46:24.749462	2019-04-16 07:46:24.749462
270	e737219b-b3a7-42da-8370-3d545b46cbd4	Crux	2019-04-16 07:46:24.757569	2019-04-16 07:46:24.757569
271	1f56ee92-ad95-4a27-b834-76c29adc6e83	Deer	2019-04-16 07:46:24.764574	2019-04-16 07:46:24.764574
272	0d4c97fa-4609-4ac2-8aa9-4a3503385840	Demon	2019-04-16 07:46:24.773292	2019-04-16 07:46:24.773292
273	a282fdd5-fd60-4ed7-a76c-063dff87687c	Digimon	2019-04-16 07:46:24.781659	2019-04-16 07:46:24.781659
274	3fcaf44f-b56d-426e-b2e9-b4f22d14c4b4	Dingo	2019-04-16 07:46:24.789824	2019-04-16 07:46:24.789824
275	5fd241aa-78c9-4570-982b-e0e37f4e0c80	Dinosaur	2019-04-16 07:46:24.812037	2019-04-16 07:46:24.812037
276	86a38956-f785-4b49-bfd7-5fa28ddb4178	Dodo	2019-04-16 07:46:24.81923	2019-04-16 07:46:24.81923
277	b27df51e-fb33-4c63-b0b8-07552f6584b7	Dog Akita	2019-04-16 07:46:24.829064	2019-04-16 07:46:24.829064
278	86b71292-ddca-43b5-865c-5fed1b416c6d	Dog Australian Shepherd	2019-04-16 07:46:24.838461	2019-04-16 07:46:24.838461
279	028247df-8868-4de0-bafd-7e6445e044b1	Dog Beagle	2019-04-16 07:46:24.85031	2019-04-16 07:46:24.85031
280	f7603665-c986-480b-971a-956fc01b5515	Dog Border Collie	2019-04-16 07:46:24.858786	2019-04-16 07:46:24.858786
281	86c6fefa-7674-49e6-8afb-933a25340adf	Dog Boxer	2019-04-16 07:46:24.866859	2019-04-16 07:46:24.866859
282	028e3a37-5201-43e2-9d39-2b9c14cd4214	Dog Bull Terrier	2019-04-16 07:46:24.87547	2019-04-16 07:46:24.87547
283	71fd4827-7384-4288-9304-f672fa6172fa	Dog Bulldog	2019-04-16 07:46:24.884135	2019-04-16 07:46:24.884135
284	e1859c6f-2653-4c2b-a68f-4564f05e783f	Dog Burnese Mountain	2019-04-16 07:46:24.896319	2019-04-16 07:46:24.896319
285	f0c9c883-34d9-4b75-9e0b-ee5c9a7a5b0e	Dog Cattledog	2019-04-16 07:46:24.906954	2019-04-16 07:46:24.906954
286	eb03adc6-a484-4c6b-8fb0-e29aea4bced0	Dog Chow Chow	2019-04-16 07:46:24.9154	2019-04-16 07:46:24.9154
287	247d96d8-fe98-4aff-9c82-75eafbb38627	Dog Collie	2019-04-16 07:46:24.925102	2019-04-16 07:46:24.925102
288	d01ff9bd-0402-4eeb-ba72-5720a9935cb6	Dog Corgi	2019-04-16 07:46:24.932291	2019-04-16 07:46:24.932291
289	14fcbfd2-80fd-425c-809c-558647e3cce2	Dog Dachshund	2019-04-16 07:46:24.942241	2019-04-16 07:46:24.942241
290	cd848c5f-9a73-4033-960d-53310109af1e	Dog Dalmatian	2019-04-16 07:46:24.950655	2019-04-16 07:46:24.950655
291	edde68be-e84f-4a2d-a5e2-55776fa2196d	Dog Doberman	2019-04-16 07:46:24.960003	2019-04-16 07:46:24.960003
292	453e6d8b-3338-47d9-8573-08bdcf55f6d3	Dog Domestic	2019-04-16 07:46:24.968743	2019-04-16 07:46:24.968743
293	4008065b-f1e2-490b-bc5e-6e5005a8c08f	Dog German Shepherd	2019-04-16 07:46:24.977527	2019-04-16 07:46:24.977527
294	0f1f9a83-81e2-4e27-a112-5d8bd223611b	Dog Golden Retriever	2019-04-16 07:46:24.98708	2019-04-16 07:46:24.98708
295	292a9cb2-c89c-48ed-9ca8-872b23e5b060	Dog Great Dane	2019-04-16 07:46:24.997065	2019-04-16 07:46:24.997065
296	c4476f4a-def3-426c-9c13-1b185628b78c	Dog Hound	2019-04-16 07:46:25.008189	2019-04-16 07:46:25.008189
297	f2ed2257-9e63-4618-8267-f1d3d204f6a7	Dog Husky	2019-04-16 07:46:25.017426	2019-04-16 07:46:25.017426
298	6d3c2bc2-073b-4869-8f9d-f3cc5e30c880	Dog Labrador	2019-04-16 07:46:25.027258	2019-04-16 07:46:25.027258
299	071ccdb1-cfae-4389-ab3c-87fe0c1d32a0	Dog Malamute	2019-04-16 07:46:25.03826	2019-04-16 07:46:25.03826
300	4b96debb-18d8-4c24-aa7a-a712e6881118	Dog Mixed Breed	2019-04-16 07:46:25.046344	2019-04-16 07:46:25.046344
301	15428dcc-90a4-4209-8b96-4b882c8ba251	Dog Newfoundland	2019-04-16 07:46:25.055814	2019-04-16 07:46:25.055814
302	9dab5186-f838-4f00-8e9e-86a33f8ca6ff	Dog Pitbull	2019-04-16 07:46:25.065363	2019-04-16 07:46:25.065363
303	249f4d70-24bd-4171-aa03-54bb21867651	Dog Poodle	2019-04-16 07:46:25.074303	2019-04-16 07:46:25.074303
304	5a9924df-478e-4831-a012-6198eb2e6054	Dog Pug	2019-04-16 07:46:25.084429	2019-04-16 07:46:25.084429
305	f799043f-fa21-482d-8c6d-a1ccb2cf2047	Dog Rottweiler	2019-04-16 07:46:25.092574	2019-04-16 07:46:25.092574
306	fc233ff9-2a27-44b8-a7a3-9b34575accde	Dog Samoyed	2019-04-16 07:46:25.100804	2019-04-16 07:46:25.100804
307	8a49e386-e6af-49aa-aac3-392c53e33279	Dog Sheepdog	2019-04-16 07:46:25.110228	2019-04-16 07:46:25.110228
308	2adca902-b39c-4df5-9e94-51110bf533a1	Dog Shiba Inu	2019-04-16 07:46:25.119974	2019-04-16 07:46:25.119974
309	c5fee475-1d05-40a7-a0a3-f74f14fd8c84	Dog Spaniel	2019-04-16 07:46:25.129989	2019-04-16 07:46:25.129989
310	863833a7-7d31-4ae0-a20a-3d705a96a744	Dog Terrier	2019-04-16 07:46:25.1376	2019-04-16 07:46:25.1376
311	91fa246c-ade8-465b-9c76-bc4e089929d8	Dolphin	2019-04-16 07:46:25.147468	2019-04-16 07:46:25.147468
312	1f6c9e20-82e3-4ecd-b99a-4710fa00499d	Donkey	2019-04-16 07:46:25.156048	2019-04-16 07:46:25.156048
313	a283dea6-456a-41a8-b2d0-436360c92c0f	Dragon	2019-04-16 07:46:25.164763	2019-04-16 07:46:25.164763
314	a41d1d88-50b6-4abc-9ca4-38e6d4d110cd	Duck	2019-04-16 07:46:25.176585	2019-04-16 07:46:25.176585
315	c9c9254a-f6f9-45d6-ade1-9ea97ab0566a	Eagle	2019-04-16 07:46:25.184766	2019-04-16 07:46:25.184766
316	97e24540-3c00-421f-876b-6c474b16b03a	Elephant	2019-04-16 07:46:25.194187	2019-04-16 07:46:25.194187
317	6a106c06-dfd4-40af-a715-0bcfdf9d0a8f	Extinct Mammal	2019-04-16 07:46:25.202812	2019-04-16 07:46:25.202812
318	2f572ad0-7027-4aca-a045-15bc5a9607b0	Fennec	2019-04-16 07:46:25.212444	2019-04-16 07:46:25.212444
319	ae4d02ec-e75f-41b7-9ddb-bd2f8a463c2b	Ferret	2019-04-16 07:46:25.224086	2019-04-16 07:46:25.224086
320	12b5b9da-a956-4c54-b3c0-cdd2b6ac4b18	Fish	2019-04-16 07:46:25.23196	2019-04-16 07:46:25.23196
321	4606a508-6df0-4c96-b4af-7114fe204240	Fox	2019-04-16 07:46:25.241743	2019-04-16 07:46:25.241743
322	0a39f5b2-2626-4f8c-a543-ef7b6e55662b	Frog	2019-04-16 07:46:25.249433	2019-04-16 07:46:25.249433
323	8b6089c7-8e16-4e75-bfc2-1a68d69734e1	Fudog	2019-04-16 07:46:25.258084	2019-04-16 07:46:25.258084
324	3c17c7fb-b041-4c17-ac57-80fb6afbfd13	Gargoyle	2019-04-16 07:46:25.266307	2019-04-16 07:46:25.266307
325	bdf6714d-daff-4804-b29b-86e0b8715d6b	Gecko	2019-04-16 07:46:25.275249	2019-04-16 07:46:25.275249
326	64d44047-fbea-4fa6-ab90-b091546afe23	Genet	2019-04-16 07:46:25.283485	2019-04-16 07:46:25.283485
327	43fdbfe9-18b9-4b08-908e-28ce558b3086	Gerbil	2019-04-16 07:46:25.291832	2019-04-16 07:46:25.291832
328	a8da540e-d7f3-4fa2-93d4-6a1c6882d0bb	Giraffe	2019-04-16 07:46:25.29912	2019-04-16 07:46:25.29912
329	5234420f-02d2-4715-a9af-33ce8fcc4479	Goat	2019-04-16 07:46:25.308813	2019-04-16 07:46:25.308813
330	798ae207-aebf-4456-93f4-98bbe97cffd0	Golem	2019-04-16 07:46:25.3176	2019-04-16 07:46:25.3176
331	4d8333e2-1d3d-4538-a588-83c91c8ac8a3	Gryphon	2019-04-16 07:46:25.326573	2019-04-16 07:46:25.326573
332	8c54dfc5-ba42-4125-a7de-bac7fbcd791e	Guinea Pig	2019-04-16 07:46:25.334542	2019-04-16 07:46:25.334542
333	13a3c869-dff5-46de-ba09-c8d8821e7612	Hamster	2019-04-16 07:46:25.343385	2019-04-16 07:46:25.343385
334	1dc2b927-2b13-4217-bc66-3f5845678460	Hare	2019-04-16 07:46:25.35202	2019-04-16 07:46:25.35202
335	2c33a4d4-1c48-4d9d-84e0-59d4fff0d2d4	Hawk	2019-04-16 07:46:25.361827	2019-04-16 07:46:25.361827
336	5d2ba649-3c3a-499a-ad95-5f3d08738840	Hedgehog	2019-04-16 07:46:25.371262	2019-04-16 07:46:25.371262
337	1b103374-c0c1-4381-9a63-1a08beb0b3f9	Hippopotamus	2019-04-16 07:46:25.381303	2019-04-16 07:46:25.381303
338	c88fb30e-c670-4896-9f9e-79e61ceba1eb	Horse	2019-04-16 07:46:25.389685	2019-04-16 07:46:25.389685
339	eb7afa4d-cd6d-42b8-a7d2-44531a90a31b	Hybrid Custom	2019-04-16 07:46:25.39848	2019-04-16 07:46:25.39848
340	a5b7e883-e666-427f-b3db-9295eba55a26	Hyena	2019-04-16 07:46:25.407226	2019-04-16 07:46:25.407226
341	abcec64c-8be5-42a5-ab52-2f14f573361b	Insect	2019-04-16 07:46:25.416281	2019-04-16 07:46:25.416281
342	e16aa664-0791-456e-bc69-5f62f1a0c341	Jackal	2019-04-16 07:46:25.424323	2019-04-16 07:46:25.424323
343	0ea3daf7-3f0b-4495-8b78-092f248af7ae	Jaguar	2019-04-16 07:46:25.433971	2019-04-16 07:46:25.433971
344	e447741d-c9eb-4179-a89b-f0c3b27957c6	Kangaroo	2019-04-16 07:46:25.443032	2019-04-16 07:46:25.443032
345	747584bd-430e-4805-a7b2-d2d6039bddc4	Kirin	2019-04-16 07:46:25.45119	2019-04-16 07:46:25.45119
346	9021ca3c-9620-4ca8-a9ff-fb21a3e8dc1f	Koala	2019-04-16 07:46:25.460509	2019-04-16 07:46:25.460509
347	e19b0691-b01c-4eb0-981f-2e2fbd25077f	Lemur	2019-04-16 07:46:25.468782	2019-04-16 07:46:25.468782
348	8a54c9fb-c4d0-4e8d-8a08-aec89f80852e	Leopard	2019-04-16 07:46:25.476945	2019-04-16 07:46:25.476945
349	f3a517c7-3694-4f8f-a03c-55abcdee304f	Lion	2019-04-16 07:46:25.485068	2019-04-16 07:46:25.485068
350	9934d964-61ea-481c-8ae5-e2cf8b7129f5	Lizard	2019-04-16 07:46:25.492446	2019-04-16 07:46:25.492446
351	1e36157c-61d9-41e1-bf1d-d79259478163	Llama	2019-04-16 07:46:25.500821	2019-04-16 07:46:25.500821
352	4f9d7160-639d-4520-8521-e1d1d029de6c	Lynx	2019-04-16 07:46:25.509707	2019-04-16 07:46:25.509707
353	b7dd816c-61ca-4234-9886-65e73452f829	Maned Wolf	2019-04-16 07:46:25.518581	2019-04-16 07:46:25.518581
354	798b64ac-f61c-4c28-a07f-ad530b785526	Marten	2019-04-16 07:46:25.527537	2019-04-16 07:46:25.527537
355	9f8ebdcd-afd1-4a28-9760-2fdbab7c3218	Mechanical	2019-04-16 07:46:25.53769	2019-04-16 07:46:25.53769
356	0c9ea1f7-ce15-4699-981a-fd588d3806ed	Media	2019-04-16 07:46:25.548004	2019-04-16 07:46:25.548004
357	f3be2155-c933-4a33-a86e-e078e30a3c5c	Meerkat	2019-04-16 07:46:25.55713	2019-04-16 07:46:25.55713
358	21c11231-6e43-484f-affa-8304c3699506	Minotaur	2019-04-16 07:46:25.566561	2019-04-16 07:46:25.566561
359	5119c039-2845-4fb7-adae-2f109514c9ce	Mole	2019-04-16 07:46:25.576311	2019-04-16 07:46:25.576311
360	3439641d-a860-4394-b732-48508effea43	Mongoose	2019-04-16 07:46:25.586044	2019-04-16 07:46:25.586044
361	cc028940-acca-4403-958e-01d02c471882	Monkey	2019-04-16 07:46:25.594301	2019-04-16 07:46:25.594301
362	780d65fc-6637-429c-af1a-de03f074de67	Monster	2019-04-16 07:46:25.603289	2019-04-16 07:46:25.603289
363	70177b32-c4d6-4870-9440-82d2896168b6	Moose	2019-04-16 07:46:25.61176	2019-04-16 07:46:25.61176
364	4a680596-30e1-4500-9426-0c80e88223d3	Mouse	2019-04-16 07:46:25.619659	2019-04-16 07:46:25.619659
365	14aa8752-fed3-4cc1-9d73-6d24cf0408c3	Ocelot	2019-04-16 07:46:25.628409	2019-04-16 07:46:25.628409
366	187eb642-c0aa-494b-a150-0548eafb6148	Okapi	2019-04-16 07:46:25.63662	2019-04-16 07:46:25.63662
367	8d612c7b-5c7b-48a8-ae80-0532e08571ea	Orca	2019-04-16 07:46:25.646489	2019-04-16 07:46:25.646489
368	c76901e5-09e0-4a3e-b94f-eef07cafeffb	Other	2019-04-16 07:46:25.655327	2019-04-16 07:46:25.655327
369	c9d01602-32cf-4bf2-9a22-57cd68a18d7a	Otter	2019-04-16 07:46:25.66342	2019-04-16 07:46:25.66342
370	be5c2cc1-7879-4edc-a539-ee9401d61710	Owl	2019-04-16 07:46:25.671935	2019-04-16 07:46:25.671935
371	bfdbe26c-34ca-4ad6-adad-a5ddc9d22de3	Panda	2019-04-16 07:46:25.681461	2019-04-16 07:46:25.681461
372	b2f69452-a0d3-4a8c-828f-9c6d725ef61d	Panther	2019-04-16 07:46:25.691124	2019-04-16 07:46:25.691124
373	5bcb9727-3ea0-4072-b919-115f7c0e7b8a	Parrot	2019-04-16 07:46:25.700629	2019-04-16 07:46:25.700629
374	90fe1f6c-2a22-433a-ac2a-a1a8c8376703	Phoenix	2019-04-16 07:46:25.708527	2019-04-16 07:46:25.708527
375	5498df6b-46ec-465d-a6e2-2b79e5bbc657	Pig	2019-04-16 07:46:25.717301	2019-04-16 07:46:25.717301
376	ed9874d9-3846-4a17-b5d7-3d46094f811b	Platypus	2019-04-16 07:46:25.724755	2019-04-16 07:46:25.724755
377	726a2d65-ad5a-406f-9c4b-f219265f0330	Pokemon	2019-04-16 07:46:25.733395	2019-04-16 07:46:25.733395
378	33515102-9476-4130-a6b8-cf39db85fcbb	Polar Bear	2019-04-16 07:46:25.741997	2019-04-16 07:46:25.741997
379	2be286d5-e1e5-4e92-a38b-939da919bafc	Pony	2019-04-16 07:46:25.751131	2019-04-16 07:46:25.751131
380	52d9ad7c-4b00-4ce4-be75-70edfd1d2d04	Porcupine	2019-04-16 07:46:25.758564	2019-04-16 07:46:25.758564
381	f6be1af5-4645-4e75-8cb9-88ef4171f4e6	Possum	2019-04-16 07:46:25.766854	2019-04-16 07:46:25.766854
382	da04a798-554c-4b03-a6ec-f1e2878327ac	Primate	2019-04-16 07:46:25.775361	2019-04-16 07:46:25.775361
383	a1e6be33-196a-469d-a16f-f3f27defbb15	Puffin	2019-04-16 07:46:25.783487	2019-04-16 07:46:25.783487
384	844a694e-3077-4b1a-91a2-b190bfd2f2a2	Rabbit	2019-04-16 07:46:25.791879	2019-04-16 07:46:25.791879
385	8169210a-4197-4fd5-904e-99cd3809ae04	Raccoon	2019-04-16 07:46:25.801253	2019-04-16 07:46:25.801253
386	51822083-df48-4e35-b7f2-7fe090bdfe9c	Rat	2019-04-16 07:46:25.808693	2019-04-16 07:46:25.808693
387	24d3f8d7-e5a8-44b1-ad2e-bc3da39f6754	Red Panda	2019-04-16 07:46:25.817673	2019-04-16 07:46:25.817673
388	262ea0eb-7c8b-4d7f-9bf7-f56f208f1148	Rhinoceros	2019-04-16 07:46:25.826518	2019-04-16 07:46:25.826518
389	a37a8141-477a-4bd3-b3c5-0de9966cf703	Salamander	2019-04-16 07:46:25.837458	2019-04-16 07:46:25.837458
390	3a77683c-3cf2-4902-a944-c8c341400ccf	Sand Dune Cat	2019-04-16 07:46:25.845646	2019-04-16 07:46:25.845646
391	1c5e3548-80f3-4dc9-bdb7-ffe6fdbe6055	Seal	2019-04-16 07:46:25.855487	2019-04-16 07:46:25.855487
392	0cc1af2d-f268-4915-ad58-d8e67130e200	Serval	2019-04-16 07:46:25.865309	2019-04-16 07:46:25.865309
393	fa112d59-d2f3-4040-80c2-245da72394c8	Shark	2019-04-16 07:46:25.874534	2019-04-16 07:46:25.874534
394	f628e667-1f65-40cc-ab1c-881e4ec783ed	Sheep	2019-04-16 07:46:25.884282	2019-04-16 07:46:25.884282
395	4dbcee55-c0da-4e8b-8565-4a9055c94781	Skunk	2019-04-16 07:46:25.89396	2019-04-16 07:46:25.89396
396	83f2810b-3ee5-4d11-a159-9302c2cae0a3	Sloth	2019-04-16 07:46:25.904963	2019-04-16 07:46:25.904963
397	964b897e-97c0-4d38-92ec-6ce8e6c749da	Snake	2019-04-16 07:46:25.9148	2019-04-16 07:46:25.9148
398	2c940675-6ff6-4dd5-9352-f1de1e371e49	Snow Leopard	2019-04-16 07:46:25.923913	2019-04-16 07:46:25.923913
399	bed689c9-99f2-48a0-9ad0-81e918e24831	Squirrel	2019-04-16 07:46:25.933194	2019-04-16 07:46:25.933194
400	53d683d2-3d14-4ab3-a599-9e55e1dcf6d8	Sugar Glider	2019-04-16 07:46:25.942487	2019-04-16 07:46:25.942487
401	5d83955b-a366-4a75-9e60-6731d68aeebe	Tanuki	2019-04-16 07:46:25.951023	2019-04-16 07:46:25.951023
402	05b1a8e6-d361-4f5f-b4f1-13ba12f5e462	Tasmanian Devil	2019-04-16 07:46:25.959341	2019-04-16 07:46:25.959341
403	515ed65a-bb8f-4af0-bd92-a0afceca2b3b	Tiger	2019-04-16 07:46:25.96849	2019-04-16 07:46:25.96849
404	90951fe0-6fb4-46b6-acd3-983541fa8898	Toad	2019-04-16 07:46:25.976414	2019-04-16 07:46:25.976414
405	edd924e7-64f3-4e46-8c90-ea95c5134834	Turtle	2019-04-16 07:46:25.984246	2019-04-16 07:46:25.984246
406	1ac4c692-4be4-4825-ae4b-a75973dcdcbe	Undead	2019-04-16 07:46:25.993493	2019-04-16 07:46:25.993493
407	66fe515d-4f20-417f-9d0d-3eddc75a7113	Unicorn	2019-04-16 07:46:26.002512	2019-04-16 07:46:26.002512
408	9af8ba86-d6d8-4cf1-afd5-12ac6d45ab5c	Weasel	2019-04-16 07:46:26.010441	2019-04-16 07:46:26.010441
409	731817f5-1c52-471f-9750-c5d131bdc2e4	Werewolf	2019-04-16 07:46:26.019491	2019-04-16 07:46:26.019491
410	142b6bf4-fc2d-4ce6-b283-524b72af1e93	Wickerbeast	2019-04-16 07:46:26.028137	2019-04-16 07:46:26.028137
411	fcbcc773-4951-4af4-a0ee-97deee3c4281	Wild Boar	2019-04-16 07:46:26.036476	2019-04-16 07:46:26.036476
412	1d7c9e16-c8ba-4a42-8c63-e54c5498ff9e	Wild Cat	2019-04-16 07:46:26.045099	2019-04-16 07:46:26.045099
413	b071ca6f-a9fd-41c1-9280-f13dc61ebb71	Wild Dog	2019-04-16 07:46:26.053108	2019-04-16 07:46:26.053108
414	6d4b0c83-771f-4985-add3-a750ce9f29b9	Wildebeest	2019-04-16 07:46:26.062938	2019-04-16 07:46:26.062938
415	9d8aadd7-c693-4385-8ca0-4594fe5f7b92	Wolf	2019-04-16 07:46:26.072002	2019-04-16 07:46:26.072002
416	1718dd3a-3540-43ae-8f61-948e52ebc30b	Wolverine	2019-04-16 07:46:26.079996	2019-04-16 07:46:26.079996
417	7f4cdb68-b0b2-4112-b03d-8da0384f79d6	Yeti	2019-04-16 07:46:26.089044	2019-04-16 07:46:26.089044
418	4945f20c-1266-46a3-9075-94ef4d391d9f	Zebra	2019-04-16 07:46:26.097959	2019-04-16 07:46:26.097959
\.


--
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.sponsors (id, uuid, customer, charge, created_at, updated_at, status, charge_id, customer_id, "limit", plan, user_id) FROM stdin;
88	d3b56135-d04f-4f59-9344-89316ee97edd	\N	\N	2019-05-05 22:18:42.360924	2019-05-05 22:18:42.360924	live	\N	\N	2019-05-19 22:18:42.348172	Free Trial	3e69717e-9803-4fc1-9909-419092780574
90	f66ed72a-8f74-4369-9b2b-d773c66894a6	\N	\N	2019-05-07 05:11:52.559097	2019-05-07 05:12:46.846959	live	\N	\N	2021-05-07 05:11:52.557945	yearly	ffa902c2-63b1-40a9-8fbf-348a65ec7960
\.


--
-- Data for Name: statistics; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.statistics (id, users, likes, media, created_at, updated_at, tags, claimed_suits, claimed_makers, sponsors, faves, comments, average_completion, impressions) FROM stdin;
1	1	0	0	2019-01-27 07:49:51.008214	2019-01-27 07:50:13.683535	0	0	0	0	0	0	0	\N
2	3	3	16	2019-04-20 18:35:34.439322	2019-04-20 18:35:34.526838	0	3	1	1	1	5	3.125	\N
3	3	4	16	2019-04-23 23:59:37.733633	2019-04-23 23:59:37.88701	2	2	1	1	1	7	10	\N
5	254	0	16	2019-05-08 20:53:26.866665	2019-05-08 20:53:26.955464	0	5	2	2	0	0	20	710
4	254	0	16	2019-05-07 20:54:42.881651	2019-05-08 20:54:42.884645	0	5	2	2	0	0	20	710
\.


--
-- Data for Name: sub_events; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.sub_events (id, uuid, name, created_at, updated_at) FROM stdin;
2	3b1b58bd-bedd-459a-8b05-c4dddca8e912	MotorFurs	2019-03-15 21:57:52.391876	2019-03-15 21:57:52.391876
\.


--
-- Data for Name: suspended_users; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.suspended_users (id, uuid, user_id, "limit", created_at, updated_at, reason) FROM stdin;
\.


--
-- Data for Name: tag_reports; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.tag_reports (id, uuid, created_at, updated_at, description, medium_id, reporter_id, status, assignee_id, fursuit_medium_ids) FROM stdin;
\.


--
-- Data for Name: taggings; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.taggings (id, tag_id, taggable_type, taggable_id, tagger_type, tagger_id, context, created_at) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.tags (id, name, taggings_count) FROM stdin;
\.


--
-- Data for Name: tech_reports; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.tech_reports (id, page, description, user_id, created_at, updated_at, kind) FROM stdin;
\.


--
-- Data for Name: tooltips; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.tooltips (id, uuid, public, file, category, created_at, updated_at, name, body, aspect, topic) FROM stdin;
96	bf89e724-6b49-4a22-82f8-0370cd8b1d19	f	65057367-2eee-4fa8-a594-77d3a160c45e.png	Conventions	2019-04-30 20:59:34.576634	2019-04-30 20:59:34.754747	C01-01-01	The first Convention was Confurence 0 on Jan 21st 1989, hosting 65 attendees.	General	Facts
97	6374c3d0-3373-4d5e-8966-631cc24cd6c6	f	786952f1-a376-4a87-bf66-40a3e039856e.png	Conventions	2019-04-30 20:59:35.990693	2019-04-30 20:59:36.097321	C01-01-02	Conventions raise considerable amounts for nominated Charities.	General	Facts
98	88ef1152-8f1a-49fb-b3d0-4cf318a769af	f	c4ca1da7-8142-4a3c-a5ba-76366e9a2c3a.png	Conventions	2019-04-30 20:59:37.062277	2019-04-30 20:59:37.13738	C01-01-03	Having a Fursuit is not a pre-requisite to attending a Convention.	General	Facts
99	ffc41bd1-2493-4e26-9898-26f7002cc060	f	0d4b1c12-0843-4e9e-b8ec-9eb4312379fa.png	Conventions	2019-04-30 20:59:38.162778	2019-04-30 20:59:38.272677	C02-01-01	If you are new to Conventions, attend a smaller Event first so as not to be overwhelmed.	Registering	Readiness
100	f23e2723-bfdd-4cf1-8db9-dafe523c6a2d	f	9b3bec52-2810-4334-b3d8-4a651899a457.png	Conventions	2019-04-30 20:59:39.259531	2019-04-30 20:59:39.352805	C02-02-01	Opting to attend a Convention closer to you will save on travel costs.	Registering	Budget
101	d8a47495-6a2d-4c35-885e-19fa52ee372f	f	8f084788-2b14-4ab2-a9ee-f68d76f279ca.png	Conventions	2019-04-30 20:59:40.309867	2019-04-30 20:59:40.403306	C02-02-02	Be sensible with Convention planning by attending Events within your budget/leave allowance.	Registering	Budget
102	0d5b0210-9b8b-4733-90f0-cdcc90967d52	f	fe62a1d3-5b22-4bb8-902b-f3be8407dce3.png	Conventions	2019-04-30 20:59:41.361457	2019-04-30 20:59:41.484855	C02-03-01	Pre-registering will avoid the requirement to pay an increased rate "at the door".	Registering	Pre-registration
103	ef757748-cda9-4570-b719-99faa120a5c0	f	e180e5d5-5faf-4945-89e4-2a24fdc27485.png	Conventions	2019-04-30 20:59:42.426304	2019-04-30 20:59:42.502676	C02-03-02	Established Convention room allocations can be sold in minutes, so be online when Registration opens for the best chance of getting one.	Registering	Pre-registration
104	88394d10-74a8-4074-94d8-0bc007eb06ae	f	bc5a83a6-0622-4207-a96a-7cc72a974ef8.png	Conventions	2019-04-30 20:59:43.441837	2019-04-30 20:59:43.532601	C02-04-01	Being a Convention Sponsor allows priority access/early seating to Events.	Registering	Sponsorship
105	58ce5ad7-70b1-48da-8856-bd5fc5b2ecb8	f	f5f6ed3b-d05c-408d-ae32-12ce8f6eaf46.png	Conventions	2019-04-30 20:59:44.487381	2019-04-30 20:59:44.576209	C02-05-01	Convention forums can be a good way to recover some outlay by selling your ticket if you are unable to attend.	Registering	Cancellations
106	87fa747d-f9c0-4c2d-abea-5feb4a6095fe	f	91831202-201d-4b0e-b2e2-1c6d73478bf9.png	Conventions	2019-04-30 20:59:45.526345	2019-04-30 20:59:45.607584	C03-01-01	Book travel early to take advantage of lower price points.	Travel	Planning
107	a4de33b0-d3da-4119-a311-f0ca7f45458c	f	1753a042-c41f-4ba4-b570-d3f79e5a2a11.png	Conventions	2019-04-30 20:59:46.576566	2019-04-30 20:59:46.658866	C03-01-02	Split the cost by sharing a ride to a Convention with a friend.	Travel	Planning
108	4b793547-6196-4b88-88e0-c03fc6f3368f	f	8b80488b-d339-4fd6-b780-75ce19273956.png	Conventions	2019-04-30 20:59:47.607777	2019-04-30 20:59:47.70117	C03-01-03	Don't leave packing to the last minute as the day of travel is usually stressful enough as it is.	Travel	Planning
109	085ff93a-7b80-4a4e-b391-e3cda85e6e3d	f	c834e397-eb10-48ba-9852-6198e22986eb.png	Conventions	2019-04-30 20:59:48.656937	2019-04-30 20:59:48.743693	C03-01-04	Make a list of everything you need to pack and run a last check prior to departing.	Travel	Planning
110	8c7e583b-4b62-439a-8462-0432eca7f70d	f	04f2dba1-8875-4c72-a158-39939029ecf7.png	Conventions	2019-04-30 20:59:49.682099	2019-04-30 20:59:49.762721	C03-01-05	Arrive early to the airport before check-in to safeguard against transport delays.	Travel	Planning
111	f5cbb596-3b89-43d1-ae02-b0a6d7aa7060	f	671dcad4-de02-4e59-83ed-737410e52386.png	Conventions	2019-04-30 20:59:50.700458	2019-04-30 20:59:50.795789	C03-02-01	Tether luggage with a bicycle lock to prevent theft during transport.	Travel	Security of Belongings
112	5d1970bb-5246-428e-9cb6-5904de008f0b	f	2c3bf402-6559-43b0-87f4-5c98815d0c2c.png	Conventions	2019-04-30 20:59:51.735796	2019-04-30 20:59:51.839838	C04-01-01	Minimise traffic and check in queues by taking advantage of early arrival attendance options.	Attending	Check In
113	56c4640e-6af3-4d73-8592-3a1955deb462	f	023beca0-7f65-4674-a98d-51fc3c1d73db.png	Conventions	2019-04-30 20:59:52.848756	2019-04-30 20:59:52.94062	C04-01-02	To avoid being stranded with your belongings in the lobby, be aware of Hotel Check In times and plan accordingly.	Attending	Check In
114	bdc81d27-d8c5-40d7-8128-d7e010046ca5	f	f18822a9-9774-4535-a386-ec0b204ebe7f.png	Conventions	2019-04-30 20:59:53.947861	2019-04-30 20:59:54.0462	C04-02-01	Don't disrespect the Convention Venue, its Staff, or its Guests.	Attending	Conduct
115	1ddd0ec6-0fee-4a80-afe5-0d9b9ec605dc	f	70afee03-c240-4e7c-9b10-8a10c3809fc2.png	Conventions	2019-04-30 20:59:55.064362	2019-04-30 20:59:55.211715	C04-02-02	Conventions are almost entirely run by volunteer Staff Members, so be polite/respect they have given up their own time to be there for you.	Attending	Conduct
116	6131e18a-3ef9-48c2-9d33-fc7dfc5e3043	f	8b3ef20e-2d9a-43e8-96e1-464288fca16d.png	Conventions	2019-04-30 20:59:56.227361	2019-04-30 20:59:56.344293	C04-02-03	Treat attendees in a manner you would want to be treated yourself.	Attending	Conduct
117	319cfd93-bb13-4845-a719-cf81c9e1feb7	f	f7b50bdf-dbac-4b9a-9811-c53594777240.png	Conventions	2019-04-30 20:59:57.289064	2019-04-30 20:59:57.381422	C04-02-04	Don't discriminate other attendee interests, everyone is entitled to engage in activities within the rules of the Convention.	Attending	Conduct
118	9d497faf-8cc5-449d-af6e-f8acd70aa0cb	f	45b4ba63-2f7f-424c-93b5-bbb3993b93e4.png	Conventions	2019-04-30 20:59:58.330567	2019-04-30 20:59:58.43096	C04-02-05	Keep promiscuity behind closed doors to preserve Fandom reputation.	Attending	Conduct
119	b0b6ed38-7806-4248-a730-01c1ff462d81	f	b5d30e56-ac4e-48f0-ae87-020d3cf0cee8.png	Conventions	2019-04-30 20:59:59.385041	2019-04-30 20:59:59.490182	C04-03-01	Familiarise yourself with Venue evacuation protocols in case of emergency.	Attending	Safety
120	1fd41416-7aac-4aaa-b9de-793c419c3dd5	f	004672c7-4867-47d9-8ca4-6bf3be325e6f.png	Conventions	2019-04-30 21:00:00.430818	2019-04-30 21:00:00.539044	C04-03-02	Keep doorways and walkways clear as these areas support Venue egress should an incident occur.	Attending	Safety
121	fdcdc91a-1a80-4c1f-b397-c22cf3a3e742	f	16f7e762-7f94-4718-8e24-995949ed9c32.png	Conventions	2019-04-30 21:00:01.499931	2019-04-30 21:00:01.608938	C04-04-01	The 6-2-1 rule is a good guideline at Conventions (at least: 6 Hrs of Sleep, 2 Meals, & 1 Shower per Day).	Attending	Survival Tips
122	d3c427ca-ee51-40dd-a467-3c40c46a9b26	f	e22dae10-3748-409c-80d4-a510f18cd074.png	Conventions	2019-04-30 21:00:02.523093	2019-04-30 21:00:02.618365	C04-04-02	Create reminders for activities on your phone as you can lose track of time when having fun!	Attending	Survival Tips
123	57e00ce6-95d5-4e0c-8f3b-14282d65bec2	f	2eb8999c-8278-4ebb-9a4a-db37b6e8e648.png	Conventions	2019-04-30 21:00:03.538656	2019-04-30 21:00:03.655611	C04-04-03	Avoid dehydration in long queues by taking a bottle of water with you.	Attending	Survival Tips
124	6c50df79-246e-4790-8fe2-07075410d34a	f	09b429ab-335b-43e4-bf70-008148f4c642.png	Conventions	2019-04-30 21:00:04.635947	2019-04-30 21:00:04.72318	C04-04-04	It's wise to carry a power bank to charge your phone on the go.	Attending	Survival Tips
125	8edd4fdd-69bc-4df4-a868-53378fb33adb	f	c5a9aa6c-0754-4772-b3f8-8839c0be85b0.png	Conventions	2019-04-30 21:00:05.700988	2019-04-30 21:00:05.789965	C05-01-01	Convention Staff are there to help you if you need assistance.	Con-ops	Assistance
126	9692c7a7-4c7e-4dd0-9096-c712c8fe3d7c	f	fe6a8a37-d324-4859-98dd-7d6d3db3592c.png	Conventions	2019-04-30 21:00:06.793254	2019-04-30 21:00:06.894253	C05-02-01	Convention Operations (Con-ops) hold Lost Property allowing recovery of your belongings if handed in.	Con-ops	Lost Property
127	f6593f99-aeca-4483-9ad4-f2aaeea286e8	f	1f0556b0-764b-4307-9746-6456ca1479ab.png	Conventions	2019-04-30 21:00:07.849435	2019-04-30 21:00:07.948888	C06-01-01	Take full advantage of breakfast if included with your Hotel room.	Subsistence	Breakfast
128	db2bbfca-f622-42c3-84a9-a44a0540cb33	f	e481acd4-4827-4259-8d0c-8fdfb9f1a49e.png	Conventions	2019-04-30 21:00:08.940114	2019-04-30 21:00:09.05007	C06-02-01	Make substantial savings on your tab.by purchasing drinks and snacks outside of the Hotel for you room.	Subsistence	Room Snacks
129	d2a1e837-fd7d-4da1-bf0e-3fa8319ead86	f	42cc183a-262f-450d-990c-393618f06c1e.png	Conventions	2019-04-30 21:00:10.063391	2019-04-30 21:00:10.163613	C06-03-01	Restaurants near Conventions can fill up quick so book ahead. Be sure to honour your booking though.	Subsistence	Restaurants
130	0a2c6d1d-7efb-4d0e-ae5e-d01043678933	f	51fc87e6-5863-4c9b-a4ea-5638fac1a923.png	Conventions	2019-04-30 21:00:11.148455	2019-04-30 21:00:11.231042	C07-01-01	Take time to review the Conbook Schedule to plan activities of interest.	Events	Scheduled
131	6215ba47-a157-419a-95a7-1a1530f6f9d1	f	be642277-4aab-4887-9229-fccdad7a0348.png	Conventions	2019-04-30 21:00:12.178975	2019-04-30 21:00:12.262698	C07-01-02	Getting to Events early can help you get a closer seat to the action.	Events	Scheduled
132	a0ce9c80-f9af-4806-b881-5c1590206710	f	806f0ffd-40a3-456d-8253-fee5c552b086.png	Conventions	2019-04-30 21:00:13.237075	2019-04-30 21:00:13.332713	C07-01-03	Since most Conventions are ran by volunteers, Event delays can occur.	Events	Scheduled
134	046bf7aa-2494-47ce-92a5-f84b0f556aeb	t	52838503-85c2-4d5b-88f0-a86da14081e8.png	Conventions	2019-04-30 21:00:15.431533	2019-05-06 20:26:11.721127	C07-02-02	Keep an ear out for activities ran by attendees/groups that may not be in the Conbook Schedule.	Events	Unscheduled
133	a015d271-08b3-46c5-a7e1-e6132ae0efca	t	3e443685-d632-4362-a64d-305dc28c1484.png	Conventions	2019-04-30 21:00:14.33753	2019-05-06 20:26:17.377522	C07-02-01	Unscheduled Events add enjoyment to the Convention when they happen.	Events	Unscheduled
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.users (id, uuid, name, created_at, updated_at, slug, bio, telegram_id, avatar, banner, theme, last_activities_read, website, public, blocked_users_ids, last_announcements_read, chat_enabled, tag_tutorial, customer, charge, available_impressions, charge_id, customer_id, show_ads, show_tooltips, telegram_username, score, global_score, metric_species, suspension_count, offenses_number, used_free_trial, last_seen_media, last_seen_fursuits, last_seen_makers, bought_impressions) FROM stdin;
3	abaf25c5-9e24-484e-90ce-e4159fd4bb03	Nul	2019-02-27 09:02:52.720773	2019-05-08 20:18:58.434996	nul	\N	\N	\N	\N	dark	2019-03-28 06:37:04.117579	\N	t	{}	\N	t	t	\N	\N	9992	\N	\N	t	t	\N	356	1	Yeti	0	0	f	2019-04-22 00:13:54.833975	2019-04-22 00:13:54.833975	2019-04-22 00:13:54.833975	0
46	4b20a082-a371-49c2-90e1-d77a4e6580f4	Lemuel Prock	2019-04-25 12:15:04.684735	2019-04-25 12:58:30.957154	lemuel-prock	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-22	0	Dog Australian Shepherd	0	0	f	2019-04-25 12:15:04.678523	2019-04-25 12:15:04.678523	2019-04-25 12:15:04.678523	0
58	43cc6dc6-ed4b-4359-9cca-41ffe6732a6f	Elizbeth Mcpeters	2019-04-25 12:15:04.883747	2019-04-25 12:55:50.484997	elizbeth-mcpeters	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	348	0	Wildebeest	0	0	f	2019-04-25 12:15:04.876185	2019-04-25 12:15:04.876185	2019-04-25 12:15:04.876185	0
2	bd88fca0-9b2d-4252-9357-298429a6d5a3	toto	2019-02-27 08:59:50.350278	2019-05-08 20:24:16.173951	toto	\N	\N	5875d425-d6bb-437c-9050-d4afe2e760eb.png	\N	dark	2019-03-19 18:38:00.013495		t	{}	\N	t	t	\N	\N	9994	\N	\N	t	t	Arkee	477	1	Zebra	0	2	t	2019-04-22 00:13:54.833975	2019-04-22 00:13:54.833975	2019-04-22 00:13:54.833975	0
50	d2ef7c4d-136c-4696-84f5-1094787980e9	Kyle Delcastillo	2019-04-25 12:15:04.751113	2019-04-25 12:55:50.713873	kyle-delcastillo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	402	0	Zebra	0	0	f	2019-04-25 12:15:04.743343	2019-04-25 12:15:04.743343	2019-04-25 12:15:04.743343	0
76	743018b9-bf95-4f7c-942c-2c74680429ba	Pamella Lawalin	2019-04-25 12:15:05.705621	2019-04-25 12:55:50.649251	pamella-lawalin	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	395	0	Zebra	0	0	f	2019-04-25 12:15:05.696456	2019-04-25 12:15:05.696456	2019-04-25 12:15:05.696456	0
51	3b706744-b60a-43d7-b523-23094c09d43f	Robyn Deland	2019-04-25 12:15:04.766227	2019-04-25 12:58:30.989924	robyn-deland	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-11	0	Dog Bull Terrier	0	0	f	2019-04-25 12:15:04.760153	2019-04-25 12:15:04.760153	2019-04-25 12:15:04.760153	0
78	66f49d0e-bb65-48ba-a533-971f369258d3	Stewart Quandt	2019-04-25 12:15:05.738753	2019-04-25 12:55:50.575925	stewart-quandt	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	374	0	Zebra	0	0	f	2019-04-25 12:15:05.731443	2019-04-25 12:15:05.731443	2019-04-25 12:15:05.731443	0
81	864b2b4a-11e0-4793-924c-0edddbcf6a3f	Dorthey Galati	2019-04-25 12:15:05.789383	2019-04-25 12:58:31.99611	dorthey-galati	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	237	0	Mole	0	0	f	2019-04-25 12:15:05.782282	2019-04-25 12:15:05.782282	2019-04-25 12:15:05.782282	0
67	bb484b31-443e-474b-8d29-6a59e835eea6	Maximo Tawney	2019-04-25 12:15:05.035054	2019-04-25 12:55:50.222949	maximo-tawney	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	317	0	Skunk	0	0	f	2019-04-25 12:15:05.028947	2019-04-25 12:15:05.028947	2019-04-25 12:15:05.028947	0
53	f5d4eda6-5b74-494f-9be5-9e74ccd86b0c	Chong Dorsch	2019-04-25 12:15:04.799544	2019-04-25 12:58:31.753333	chong-dorsch	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	175	0	Hybrid Kitsune	0	0	f	2019-04-25 12:15:04.791964	2019-04-25 12:15:04.791964	2019-04-25 12:15:04.791964	0
70	50f38ba5-0852-4153-8843-a033619ba880	Dusty Willis	2019-04-25 12:15:05.089259	2019-04-25 12:55:50.400987	dusty-willis	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	344	0	Werewolf	0	0	f	2019-04-25 12:15:05.080912	2019-04-25 12:15:05.080912	2019-04-25 12:15:05.080912	0
65	c095359c-e492-4325-8b35-68907db3219f	Deborah Sorrell	2019-04-25 12:15:05.001706	2019-04-25 12:58:30.93741	deborah-sorrell	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-28	0	Dodo	0	0	f	2019-04-25 12:15:04.992855	2019-04-25 12:15:04.992855	2019-04-25 12:15:04.992855	0
64	9a7ae880-89f1-4318-9927-0819ddb7532f	Maryjo Muldrew	2019-04-25 12:15:04.982612	2019-04-25 12:58:31.467177	maryjo-muldrew	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	90	0	Giraffe	0	0	f	2019-04-25 12:15:04.976488	2019-04-25 12:15:04.976488	2019-04-25 12:15:04.976488	0
62	988f327a-eede-4561-84b3-f5265f79db52	Elizabeth Gledhill	2019-04-25 12:15:04.950181	2019-04-25 12:55:50.758497	elizabeth-gledhill	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	421	0	Zebra	0	0	f	2019-04-25 12:15:04.94419	2019-04-25 12:15:04.94419	2019-04-25 12:15:04.94419	0
49	a4160603-1db8-434c-9fb8-c1989de7507e	Ettie Cashman	2019-04-25 12:15:04.734005	2019-04-25 12:58:32.045801	ettie-cashman	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	262	0	Panther	0	0	f	2019-04-25 12:15:04.727933	2019-04-25 12:15:04.727933	2019-04-25 12:15:04.727933	0
72	6cda9c5d-5bff-48cd-806b-eeae53d39c11	Pa Munk	2019-04-25 12:15:05.125067	2019-04-25 12:58:31.203779	pa-munk	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	43	0	Dog Newfoundland	0	0	f	2019-04-25 12:15:05.117192	2019-04-25 12:15:05.117192	2019-04-25 12:15:05.117192	0
66	ba7a95df-763d-45c1-b4f7-fdbdbd23c361	Frederica Pressley	2019-04-25 12:15:05.01951	2019-04-25 12:55:50.702031	frederica-pressley	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	402	0	Zebra	0	0	f	2019-04-25 12:15:05.011905	2019-04-25 12:15:05.011905	2019-04-25 12:15:05.011905	0
43	f7902b16-6962-4014-af83-c5a3e4e36358	Alix Hoover	2019-04-25 12:15:04.635582	2019-04-25 12:55:49.949975	alix-hoover	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	257	0	Otter	0	0	f	2019-04-25 12:15:04.626495	2019-04-25 12:15:04.626495	2019-04-25 12:15:04.626495	0
42	5127436d-c163-43af-b727-c4bdf37cb616	Ivan Angulo	2019-04-25 12:15:04.617001	2019-04-25 12:58:32.091132	ivan-angulo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	275	0	Porcupine	0	0	f	2019-04-25 12:15:04.609062	2019-04-25 12:15:04.609062	2019-04-25 12:15:04.609062	0
60	2d5fa8d6-012d-473f-b5f8-bc9abca6db4a	Epifania Mobley	2019-04-25 12:15:04.917527	2019-04-25 12:58:31.063052	epifania-mobley	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	11	0	Dog Dachshund	0	0	f	2019-04-25 12:15:04.910585	2019-04-25 12:15:04.910585	2019-04-25 12:15:04.910585	0
69	13eb2cbf-aafb-4431-83c3-29b600881f72	Eliana Sheperd	2019-04-25 12:15:05.070675	2019-04-25 12:58:31.698599	eliana-sheperd	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	163	0	Hybrid Folf	0	0	f	2019-04-25 12:15:05.062967	2019-04-25 12:15:05.062967	2019-04-25 12:15:05.062967	0
57	273e8c2f-633f-4db1-acd8-21cabc9048c3	Yasmin He	2019-04-25 12:15:04.86722	2019-04-25 12:55:49.668578	yasmin-he	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	207	0	Jaguar	0	0	f	2019-04-25 12:15:04.861381	2019-04-25 12:15:04.861381	2019-04-25 12:15:04.861381	0
54	9198ef4d-d9ea-499a-b8f9-3c52603c9a0d	Lucy Deleeuw	2019-04-25 12:15:04.816396	2019-04-25 12:58:30.947145	lucy-deleeuw	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-27	0	Dog Akita	0	0	f	2019-04-25 12:15:04.809951	2019-04-25 12:15:04.809951	2019-04-25 12:15:04.809951	0
61	a72f7936-62a7-49e1-aaf2-03b135529da2	Noma Kovac	2019-04-25 12:15:04.934182	2019-04-25 12:58:31.442685	noma-kovac	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	86	0	Gecko	0	0	f	2019-04-25 12:15:04.926724	2019-04-25 12:15:04.926724	2019-04-25 12:15:04.926724	0
47	302042f2-74c9-4d4c-be25-7df64d71ff55	Glady Gowen	2019-04-25 12:15:04.701663	2019-04-25 12:55:49.710626	glady-gowen	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	217	0	Lemur	0	0	f	2019-04-25 12:15:04.694446	2019-04-25 12:15:04.694446	2019-04-25 12:15:04.694446	0
48	1eccfce3-9e5f-4a0c-8663-283762c36754	Randolph Patout	2019-04-25 12:15:04.718072	2019-04-25 12:58:31.105364	randolph-patout	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	17	0	Dog German Shepherd	0	0	f	2019-04-25 12:15:04.710812	2019-04-25 12:15:04.710812	2019-04-25 12:15:04.710812	0
80	86729035-bde9-4f88-90c4-f581e274175c	Dean Cobb	2019-04-25 12:15:05.772639	2019-04-25 12:58:30.895962	dean-cobb	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-36	0	Demon	0	0	f	2019-04-25 12:15:05.764856	2019-04-25 12:15:05.764856	2019-04-25 12:15:05.764856	0
68	0890b01c-d3d6-4670-a25b-88041839d35d	Michelle Burke	2019-04-25 12:15:05.053174	2019-04-25 12:58:31.213986	michelle-burke	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	44	0	Dog Pitbull	0	0	f	2019-04-25 12:15:05.045298	2019-04-25 12:15:05.045298	2019-04-25 12:15:05.045298	0
56	568bba76-985d-435b-a4fe-11dea1823a3e	Penni Vermillion	2019-04-25 12:15:04.851257	2019-04-25 12:58:31.894974	penni-vermillion	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	205	0	Insect	0	0	f	2019-04-25 12:15:04.844035	2019-04-25 12:15:04.844035	2019-04-25 12:15:04.844035	0
73	977f189e-5663-4178-925d-1ff144d7f845	Kristi Lentine	2019-04-25 12:15:05.143627	2019-04-25 12:55:50.094759	kristi-lentine	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	280	0	Puffin	0	0	f	2019-04-25 12:15:05.134774	2019-04-25 12:15:05.134774	2019-04-25 12:15:05.134774	0
71	b7104f76-84e6-44bb-8e18-dc47684d831c	Katelynn Oakland	2019-04-25 12:15:05.105989	2019-04-25 12:55:50.526272	katelynn-oakland	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	359	0	Zebra	0	0	f	2019-04-25 12:15:05.099231	2019-04-25 12:15:05.099231	2019-04-25 12:15:05.099231	0
82	55cd3b61-c83b-4902-9f9d-5835caba0f31	Sumiko Miron	2019-04-25 12:15:05.805204	2019-04-25 12:55:50.908485	sumiko-miron	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	450	0	Zebra	0	0	f	2019-04-25 12:15:05.799123	2019-04-25 12:15:05.799123	2019-04-25 12:15:05.799123	0
55	f39fc853-880e-40fe-8391-e04580cf7771	Joie Rash	2019-04-25 12:15:04.834878	2019-04-25 12:55:49.761929	joie-rash	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	226	0	Lynx	0	0	f	2019-04-25 12:15:04.827375	2019-04-25 12:15:04.827375	2019-04-25 12:15:04.827375	0
45	f254f045-1262-4530-ab58-ea4af6a9fe9a	Latarsha Palomba	2019-04-25 12:15:04.66914	2019-04-25 12:55:50.233379	latarsha-palomba	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	318	0	Sloth	0	0	f	2019-04-25 12:15:04.661652	2019-04-25 12:15:04.661652	2019-04-25 12:15:04.661652	0
77	b01b5152-ced6-4092-a7c4-96d6861be723	Kalyn Rosner	2019-04-25 12:15:05.721683	2019-04-25 12:55:50.617514	kalyn-rosner	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	392	0	Zebra	0	0	f	2019-04-25 12:15:05.715483	2019-04-25 12:15:05.715483	2019-04-25 12:15:05.715483	0
63	5494bf7c-dd63-4b98-8223-6a7202b0952d	Marylou Hacker	2019-04-25 12:15:04.967455	2019-04-25 12:58:30.976822	marylou-hacker	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-13	0	Dog Border Collie	0	0	f	2019-04-25 12:15:04.959176	2019-04-25 12:15:04.959176	2019-04-25 12:15:04.959176	0
98	b42ca4f1-af14-41b5-a7f3-24719389a758	Gilbert Huseman	2019-04-25 12:15:06.101876	2019-04-25 12:55:49.865039	gilbert-huseman	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	244	0	Monkey	0	0	f	2019-04-25 12:15:06.093856	2019-04-25 12:15:06.093856	2019-04-25 12:15:06.093856	0
120	6d7db8f4-4a68-43e2-b253-1d58dbe044b5	Joannie Shade	2019-04-25 12:15:06.488066	2019-04-25 12:58:31.305739	joannie-shade	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	59	0	Donkey	0	0	f	2019-04-25 12:15:06.480194	2019-04-25 12:15:06.480194	2019-04-25 12:15:06.480194	0
111	144bdbc4-0804-45f9-8450-7004117609f8	Enoch Alan	2019-04-25 12:15:06.333107	2019-04-25 12:58:30.827898	enoch-alan	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-44	0	Cougar	0	0	f	2019-04-25 12:15:06.326717	2019-04-25 12:15:06.326717	2019-04-25 12:15:06.326717	0
94	80706348-09a2-4108-849e-b56f8e0a6aff	Chasidy Hitchings	2019-04-25 12:15:06.02808	2019-04-25 12:58:30.96729	chasidy-hitchings	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-19	0	Dog Beagle	0	0	f	2019-04-25 12:15:06.019551	2019-04-25 12:15:06.019551	2019-04-25 12:15:06.019551	0
108	b9fad38c-606a-406f-b9e4-450382dea849	Malissa Earnest	2019-04-25 12:15:06.276109	2019-04-25 12:58:31.383699	malissa-earnest	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	79	0	Fish	0	0	f	2019-04-25 12:15:06.268422	2019-04-25 12:15:06.268422	2019-04-25 12:15:06.268422	0
87	183c0442-eca8-45ec-9c68-f124106ae34d	Jamar Damiano	2019-04-25 12:15:05.901466	2019-04-25 12:55:51.002743	jamar-damiano	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	488	0	Zebra	0	0	f	2019-04-25 12:15:05.894001	2019-04-25 12:15:05.894001	2019-04-25 12:15:05.894001	0
84	19216b80-b0d9-4806-bd42-ad6dc92f3190	Anja Overfelt	2019-04-25 12:15:05.845815	2019-04-25 12:58:31.488216	anja-overfelt	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	100	0	Golem	0	0	f	2019-04-25 12:15:05.838225	2019-04-25 12:15:05.838225	2019-04-25 12:15:05.838225	0
100	ceba1ad0-df85-4d2d-97f8-a1d6ba78fe41	Janina Dugas	2019-04-25 12:15:06.136096	2019-04-25 12:55:50.922214	janina-dugas	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	451	0	Zebra	0	0	f	2019-04-25 12:15:06.12968	2019-04-25 12:15:06.12968	2019-04-25 12:15:06.12968	0
97	4087da60-93dd-472d-9d9e-394189c9b537	Kimbra Lorentzen	2019-04-25 12:15:06.08331	2019-04-25 12:55:50.49605	kimbra-lorentzen	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	355	0	Wolf	0	0	f	2019-04-25 12:15:06.074783	2019-04-25 12:15:06.074783	2019-04-25 12:15:06.074783	0
95	12bd84b1-fe89-409f-b049-fbfd13111efa	Ayako Westerfield	2019-04-25 12:15:06.045897	2019-04-25 12:58:30.917019	ayako-westerfield	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-32	0	Dingo	0	0	f	2019-04-25 12:15:06.037332	2019-04-25 12:15:06.037332	2019-04-25 12:15:06.037332	0
102	0d72dcb1-f613-4381-9c97-b4141f118144	Laquita Dufour	2019-04-25 12:15:06.172379	2019-04-25 12:58:31.362429	laquita-dufour	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	72	0	Fennec	0	0	f	2019-04-25 12:15:06.164706	2019-04-25 12:15:06.164706	2019-04-25 12:15:06.164706	0
125	9beb6f0a-f891-464c-9e51-ec1dc20bfbd5	Thelma Carbo	2019-04-25 12:15:06.576893	2019-04-25 12:55:49.337101	thelma-carbo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	143	0	Hybrid Cabbit	0	0	f	2019-04-25 12:15:06.570168	2019-04-25 12:15:06.570168	2019-04-25 12:15:06.570168	0
107	a1c1671e-c841-4aae-9fdd-3b383a398d05	Khadijah Shisler	2019-04-25 12:15:06.259464	2019-04-25 12:55:50.253454	khadijah-shisler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	319	0	Snow Leopard	0	0	f	2019-04-25 12:15:06.25129	2019-04-25 12:15:06.25129	2019-04-25 12:15:06.25129	0
90	afdfb5e2-d3c9-4253-b062-31d24121a68f	Cristie Atkinson	2019-04-25 12:15:05.951069	2019-04-25 12:58:30.594198	cristie-atkinson	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-100	0	Aardwolf	0	0	f	2019-04-25 12:15:05.942279	2019-04-25 12:15:05.942279	2019-04-25 12:15:05.942279	0
96	4fe57caf-101b-408c-ab5b-fcf9725065a2	Octavia Dingle	2019-04-25 12:15:06.063842	2019-04-25 12:55:50.16092	octavia-dingle	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	303	0	Salamander	0	0	f	2019-04-25 12:15:06.056441	2019-04-25 12:15:06.056441	2019-04-25 12:15:06.056441	0
88	4543d862-606b-4ed3-9c31-152cdf6b806f	Junie Yin	2019-04-25 12:15:05.916517	2019-04-25 12:55:48.589826	junie-yin	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-11	0	Dog Boxer	0	0	f	2019-04-25 12:15:05.91057	2019-04-25 12:15:05.91057	2019-04-25 12:15:05.91057	0
109	9c2f5e58-2104-4305-9738-e52eba517746	Theresia Hussein	2019-04-25 12:15:06.294969	2019-04-25 12:55:50.030479	theresia-hussein	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	272	0	Pokemon	0	0	f	2019-04-25 12:15:06.285294	2019-04-25 12:15:06.285294	2019-04-25 12:15:06.285294	0
113	311b06f6-189a-48f8-ba6a-0a7e9aae4119	Gidget Cree	2019-04-25 12:15:06.365237	2019-04-25 12:55:49.190406	gidget-cree	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	90	0	Gerbil	0	0	f	2019-04-25 12:15:06.358786	2019-04-25 12:15:06.358786	2019-04-25 12:15:06.358786	0
85	ec87e860-35b3-4a8e-ab09-10d0629ed674	Chere Prisco	2019-04-25 12:15:05.867128	2019-04-25 12:55:49.729641	chere-prisco	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	219	0	Lion	0	0	f	2019-04-25 12:15:05.85953	2019-04-25 12:15:05.85953	2019-04-25 12:15:05.85953	0
114	c3f445fb-1066-4c4e-b545-22b7ec65d40b	Charis Kalman	2019-04-25 12:15:06.381994	2019-04-25 12:55:48.430337	charis-kalman	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-42	0	Crocodile	0	0	f	2019-04-25 12:15:06.374978	2019-04-25 12:15:06.374978	2019-04-25 12:15:06.374978	0
116	49e0a377-5e37-4b0f-9466-955ccf616a59	Ervin Nadel	2019-04-25 12:15:06.414349	2019-04-25 12:55:50.659819	ervin-nadel	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	395	0	Zebra	0	0	f	2019-04-25 12:15:06.407894	2019-04-25 12:15:06.407894	2019-04-25 12:15:06.407894	0
92	c4bf80b6-1509-48d9-a464-85a8edfa9928	Mohamed Aultman	2019-04-25 12:15:05.987227	2019-04-25 12:55:50.191305	mohamed-aultman	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	313	0	Serval	0	0	f	2019-04-25 12:15:05.979238	2019-04-25 12:15:05.979238	2019-04-25 12:15:05.979238	0
115	8ffe026e-e694-456a-812c-4ac971206188	Sommer Duley	2019-04-25 12:15:06.399003	2019-04-25 12:55:50.180398	sommer-duley	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	311	0	Seal	0	0	f	2019-04-25 12:15:06.390977	2019-04-25 12:15:06.390977	2019-04-25 12:15:06.390977	0
93	a2b8f235-3807-4122-bba5-a37937166d99	Devorah Gundersen	2019-04-25 12:15:06.005203	2019-04-25 12:55:50.788928	devorah-gundersen	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	427	0	Zebra	0	0	f	2019-04-25 12:15:05.996974	2019-04-25 12:15:05.996974	2019-04-25 12:15:05.996974	0
123	59411696-8fa9-45ec-ac16-4dd14728d082	Ai Rodda	2019-04-25 12:15:06.541672	2019-04-25 12:58:31.785146	ai-rodda	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	185	0	Hybrid Pandacat	0	0	f	2019-04-25 12:15:06.532258	2019-04-25 12:15:06.532258	2019-04-25 12:15:06.532258	0
103	6c31d6d1-f6c8-47a6-8552-d252bab66b02	Cesar Kaul	2019-04-25 12:15:06.189345	2019-04-25 12:55:50.264114	cesar-kaul	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	330	0	Squirrel	0	0	f	2019-04-25 12:15:06.180599	2019-04-25 12:15:06.180599	2019-04-25 12:15:06.180599	0
118	e5de241c-7531-4773-ae7d-5c8b140e2638	Marcel People	2019-04-25 12:15:06.453233	2019-04-25 12:55:50.72582	marcel-people	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	403	0	Zebra	0	0	f	2019-04-25 12:15:06.445843	2019-04-25 12:15:06.445843	2019-04-25 12:15:06.445843	0
101	633a9753-ac14-4387-a90b-dbbae4f2e9eb	Clay Pestana	2019-04-25 12:15:06.155246	2019-04-25 12:58:31.192599	clay-pestana	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	39	0	Dog Mixed Breed	0	0	f	2019-04-25 12:15:06.147461	2019-04-25 12:15:06.147461	2019-04-25 12:15:06.147461	0
121	7de17a38-38ba-460c-841f-90c75ae7df55	Gerard Heitmann	2019-04-25 12:15:06.505715	2019-04-25 12:58:31.531245	gerard-heitmann	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	113	0	Hare	0	0	f	2019-04-25 12:15:06.497362	2019-04-25 12:15:06.497362	2019-04-25 12:15:06.497362	0
124	36a90e71-ba8c-4a1a-8be0-064b5fbb6722	Wava Peagler	2019-04-25 12:15:06.55932	2019-04-25 12:58:32.120349	wava-peagler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	293	0	Raccoon	0	0	f	2019-04-25 12:15:06.551745	2019-04-25 12:15:06.551745	2019-04-25 12:15:06.551745	0
112	4834b56e-8171-4e11-b8dc-a4c4c911d161	Jovan Rabinowitz	2019-04-25 12:15:06.349902	2019-04-25 12:58:31.281817	jovan-rabinowitz	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	54	0	Dog Spaniel	0	0	f	2019-04-25 12:15:06.342345	2019-04-25 12:15:06.342345	2019-04-25 12:15:06.342345	0
119	d2c7615d-3b83-4f5d-809f-d747b47e5b5e	Sharda Folden	2019-04-25 12:15:06.469662	2019-04-25 12:55:49.700697	sharda-folden	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	216	0	Koala	0	0	f	2019-04-25 12:15:06.462954	2019-04-25 12:15:06.462954	2019-04-25 12:15:06.462954	0
126	64dd8438-266c-4a22-aee1-c35f3568263a	Raisa Lance	2019-04-25 12:15:06.595433	2019-04-25 12:58:31.720713	raisa-lance	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	166	0	Hybrid Foxcoon	0	0	f	2019-04-25 12:15:06.587689	2019-04-25 12:15:06.587689	2019-04-25 12:15:06.587689	0
122	40147620-7c3f-406a-92b6-ae2dcf1a3c25	Rosanne Knack	2019-04-25 12:15:06.522182	2019-04-25 12:55:50.104362	rosanne-knack	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	282	0	Rabbit	0	0	f	2019-04-25 12:15:06.515394	2019-04-25 12:15:06.515394	2019-04-25 12:15:06.515394	0
106	7a003d1d-f97d-4079-add1-4954d891df84	Makeda Westbrooks	2019-04-25 12:15:06.241127	2019-04-25 12:55:49.885955	makeda-westbrooks	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	245	0	Moose	0	0	f	2019-04-25 12:15:06.234332	2019-04-25 12:15:06.234332	2019-04-25 12:15:06.234332	0
105	09cbae8f-40c2-4b0c-a68d-e22f6d39aaac	Cordie Farrow	2019-04-25 12:15:06.225206	2019-04-25 12:58:31.165274	cordie-farrow	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	29	0	Dog Labrador	0	0	f	2019-04-25 12:15:06.216781	2019-04-25 12:15:06.216781	2019-04-25 12:15:06.216781	0
104	f189a0db-1b93-44f2-9955-6b2a29688eba	Mittie Stillwell	2019-04-25 12:15:06.207857	2019-04-25 12:55:50.201553	mittie-stillwell	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	314	0	Shark	0	0	f	2019-04-25 12:15:06.199008	2019-04-25 12:15:06.199008	2019-04-25 12:15:06.199008	0
110	543684a2-0e67-494c-b706-7bdce9ba2f57	Otha Bose	2019-04-25 12:15:06.31171	2019-04-25 12:55:50.243605	otha-bose	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	318	0	Snake	0	0	f	2019-04-25 12:15:06.303576	2019-04-25 12:15:06.303576	2019-04-25 12:15:06.303576	0
117	40b7c3fe-33cc-4d02-bf5e-f9c57a3ce7ff	Miesha Yohn	2019-04-25 12:15:06.435772	2019-04-25 12:58:30.605495	miesha-yohn	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-98	0	Alien	0	0	f	2019-04-25 12:15:06.425605	2019-04-25 12:15:06.425605	2019-04-25 12:15:06.425605	0
169	d0a1a1e4-3edc-4b00-8a46-1988927799d5	Nickole Ranieri	2019-04-25 12:15:07.354632	2019-04-25 12:58:30.927019	nickole-ranieri	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-29	0	Dinosaur	0	0	f	2019-04-25 12:15:07.347531	2019-04-25 12:15:07.347531	2019-04-25 12:15:07.347531	0
137	53d7af68-6519-44c0-b8f7-60df8475ed70	Maryann Pipkins	2019-04-25 12:15:06.8031	2019-04-25 12:58:31.270886	maryann-pipkins	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	53	0	Dog Shiba Inu	0	0	f	2019-04-25 12:15:06.794593	2019-04-25 12:15:06.794593	2019-04-25 12:15:06.794593	0
164	7b0d080a-4606-474e-9235-d380598ceb5b	Edris Schoepp	2019-04-25 12:15:07.266409	2019-04-25 12:55:49.739262	edris-schoepp	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	219	0	Lizard	0	0	f	2019-04-25 12:15:07.259643	2019-04-25 12:15:07.259643	2019-04-25 12:15:07.259643	0
157	1ce5c463-894a-4acf-9a9e-f78a7570b09f	Danica Hunsaker	2019-04-25 12:15:07.148084	2019-04-25 12:58:31.394008	danica-hunsaker	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	80	0	Fox	0	0	f	2019-04-25 12:15:07.140198	2019-04-25 12:15:07.140198	2019-04-25 12:15:07.140198	0
160	721fa199-3de3-4fe9-9d8c-fbc1888e6bcb	Hans Ranson	2019-04-25 12:15:07.19959	2019-04-25 12:58:31.453125	hans-ranson	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	89	0	Genet	0	0	f	2019-04-25 12:15:07.191729	2019-04-25 12:15:07.191729	2019-04-25 12:15:07.191729	0
153	950cd550-1900-4a21-a3f6-b52152ab49a9	Lyda Fontana	2019-04-25 12:15:07.078049	2019-04-25 12:55:50.545801	lyda-fontana	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	359	0	Zebra	0	0	f	2019-04-25 12:15:07.070267	2019-04-25 12:15:07.070267	2019-04-25 12:15:07.070267	0
163	76e50bf3-b9f6-4ff9-959a-75ce164650e2	Isiah Visitacion	2019-04-25 12:15:07.250376	2019-04-25 12:58:30.77255	isiah-visitacion	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-60	0	Cerberus	0	0	f	2019-04-25 12:15:07.241643	2019-04-25 12:15:07.241643	2019-04-25 12:15:07.241643	0
158	422ac5eb-d50d-4c12-890b-f333a5638f70	Antonina Stiltner	2019-04-25 12:15:07.163794	2019-04-25 12:55:50.779238	antonina-stiltner	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	424	0	Zebra	0	0	f	2019-04-25 12:15:07.157076	2019-04-25 12:15:07.157076	2019-04-25 12:15:07.157076	0
147	ca8acc98-75c1-4078-95f9-9e9be0ea61c4	Inga Oser	2019-04-25 12:15:06.976081	2019-04-25 12:58:31.848247	inga-oser	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	193	0	Hybrid Wolfcoon	0	0	f	2019-04-25 12:15:06.967826	2019-04-25 12:15:06.967826	2019-04-25 12:15:06.967826	0
154	191100ab-f81a-4211-8e9b-17b9a739b50d	Geralyn To	2019-04-25 12:15:07.095977	2019-04-25 12:58:31.405286	geralyn-to	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	80	0	Frog	0	0	f	2019-04-25 12:15:07.087207	2019-04-25 12:15:07.087207	2019-04-25 12:15:07.087207	0
135	be4efd63-d615-4876-8a45-a96576cfaa2c	Georgette Cutter	2019-04-25 12:15:06.76627	2019-04-25 12:55:50.051883	georgette-cutter	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	274	0	Pony	0	0	f	2019-04-25 12:15:06.759037	2019-04-25 12:15:06.759037	2019-04-25 12:15:06.759037	0
138	37487c78-dbfb-4708-b12e-3af820e02edc	Honey Hendon	2019-04-25 12:15:06.819183	2019-04-25 12:58:31.624978	honey-hendon	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	157	0	Hybrid Custom	0	0	f	2019-04-25 12:15:06.812803	2019-04-25 12:15:06.812803	2019-04-25 12:15:06.812803	0
144	476ec620-ee19-4218-b808-6ae624d47ed5	Gloria Sons	2019-04-25 12:15:06.92247	2019-04-25 12:58:31.032328	gloria-sons	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-2	0	Dog Chow Chow	0	0	f	2019-04-25 12:15:06.913918	2019-04-25 12:15:06.913918	2019-04-25 12:15:06.913918	0
134	5e38b7fc-ef7d-4a15-8e4c-1b61d94d802e	Tennille Marcinek	2019-04-25 12:15:06.748049	2019-04-25 12:55:50.67042	tennille-marcinek	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	395	0	Zebra	0	0	f	2019-04-25 12:15:06.739413	2019-04-25 12:15:06.739413	2019-04-25 12:15:06.739413	0
143	119067b9-1187-4966-814a-7bf1f241d9ef	Roma Core	2019-04-25 12:15:06.903483	2019-04-25 12:58:30.707949	roma-core	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-79	0	Bird	0	0	f	2019-04-25 12:15:06.897115	2019-04-25 12:15:06.897115	2019-04-25 12:15:06.897115	0
130	f05dbfa3-9730-409e-9b44-0c438cc1dc6d	Idell Seigler	2019-04-25 12:15:06.674224	2019-04-25 12:58:31.352093	idell-seigler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	70	0	Extinct Mammal	0	0	f	2019-04-25 12:15:06.665511	2019-04-25 12:15:06.665511	2019-04-25 12:15:06.665511	0
162	d52eceac-4743-41b0-9156-d07abd86f471	Wesley Ohlsen	2019-04-25 12:15:07.232719	2019-04-25 12:55:48.943636	wesley-ohlsen	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	54	0	Dog Terrier	0	0	f	2019-04-25 12:15:07.224676	2019-04-25 12:15:07.224676	2019-04-25 12:15:07.224676	0
129	f5d48439-a140-4111-9ed7-b48661a6ba8b	Carlee Lanning	2019-04-25 12:15:06.654583	2019-04-25 12:58:30.906669	carlee-lanning	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-35	0	Digimon	0	0	f	2019-04-25 12:15:06.643737	2019-04-25 12:15:06.643737	2019-04-25 12:15:06.643737	0
136	9e2f8f8a-f392-4932-bbae-ea33c6491fd2	Fonda Julio	2019-04-25 12:15:06.785338	2019-04-25 12:58:31.372754	fonda-julio	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	77	0	Ferret	0	0	f	2019-04-25 12:15:06.777265	2019-04-25 12:15:06.777265	2019-04-25 12:15:06.777265	0
141	fc0b1eb9-7729-43ed-b6cb-63719d002f01	Christeen Gilbertson	2019-04-25 12:15:06.871298	2019-04-25 12:58:32.182043	christeen-gilbertson	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	333	0	Sugar Glider	0	0	f	2019-04-25 12:15:06.864666	2019-04-25 12:15:06.864666	2019-04-25 12:15:06.864666	0
140	cee8f123-e12e-47c7-b839-5d1c4da619bf	Tamie Tan	2019-04-25 12:15:06.854145	2019-04-25 12:55:50.864878	tamie-tan	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	443	0	Zebra	0	0	f	2019-04-25 12:15:06.845816	2019-04-25 12:15:06.845816	2019-04-25 12:15:06.845816	0
152	cde69fbc-11cf-49f5-afbc-bb2d4b644538	Julia Zackery	2019-04-25 12:15:07.060969	2019-04-25 12:55:50.565461	julia-zackery	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	363	0	Zebra	0	0	f	2019-04-25 12:15:07.054747	2019-04-25 12:15:07.054747	2019-04-25 12:15:07.054747	0
145	7ff8111b-1e08-4e85-ae8b-7113b787644c	Delorse Redel	2019-04-25 12:15:06.939641	2019-04-25 12:55:50.535798	delorse-redel	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	359	0	Zebra	0	0	f	2019-04-25 12:15:06.931754	2019-04-25 12:15:06.931754	2019-04-25 12:15:06.931754	0
170	0363e6a0-eca9-4aee-938c-c698e0f60e77	Emelia Shaver	2019-04-25 12:15:07.369919	2019-04-25 12:58:30.807256	emelia-shaver	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-49	0	Chipmunk	0	0	f	2019-04-25 12:15:07.363739	2019-04-25 12:15:07.363739	2019-04-25 12:15:07.363739	0
128	64115716-ad4f-4af8-95be-b5378a7abcab	Ashly Cobble	2019-04-25 12:15:06.632315	2019-04-25 12:58:30.663212	ashly-cobble	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-92	0	Badger	0	0	f	2019-04-25 12:15:06.622003	2019-04-25 12:15:06.622003	2019-04-25 12:15:06.622003	0
168	757a646a-8c00-4659-adc1-2bbcbb9c7206	Earline Staggers	2019-04-25 12:15:07.336794	2019-04-25 12:58:32.055857	earline-staggers	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	262	0	Parrot	0	0	f	2019-04-25 12:15:07.330476	2019-04-25 12:15:07.330476	2019-04-25 12:15:07.330476	0
159	ba0b986b-62ea-4d4f-9af2-66357840fc56	Taunya Dandy	2019-04-25 12:15:07.182765	2019-04-25 12:55:48.350403	taunya-dandy	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-52	0	Chimera	0	0	f	2019-04-25 12:15:07.174864	2019-04-25 12:15:07.174864	2019-04-25 12:15:07.174864	0
131	b2fe722d-2e6a-43fb-bdf7-7f68b03dbab6	Nellie Hosea	2019-04-25 12:15:06.692325	2019-04-25 12:58:32.066889	nellie-hosea	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	262	0	Phoenix	0	0	f	2019-04-25 12:15:06.684755	2019-04-25 12:15:06.684755	2019-04-25 12:15:06.684755	0
151	49a727fa-105b-4b6d-8504-5a78e43bed8e	Sara Echavarria	2019-04-25 12:15:07.044865	2019-04-25 12:55:50.17066	sara-echavarria	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	309	0	Sand Dune Cat	0	0	f	2019-04-25 12:15:07.036952	2019-04-25 12:15:07.036952	2019-04-25 12:15:07.036952	0
167	bf69230f-fa0c-4070-a72f-aeea31b25d9e	Bertie Huntington	2019-04-25 12:15:07.3202	2019-04-25 12:55:49.720108	bertie-huntington	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	218	0	Leopard	0	0	f	2019-04-25 12:15:07.311542	2019-04-25 12:15:07.311542	2019-04-25 12:15:07.311542	0
146	19edc1cd-76d5-4c0a-bae5-78da47dc535a	Isa Schell	2019-04-25 12:15:06.955995	2019-04-25 12:58:31.1801	isa-schell	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	36	0	Dog Malamute	0	0	f	2019-04-25 12:15:06.949264	2019-04-25 12:15:06.949264	2019-04-25 12:15:06.949264	0
148	8a8d63b8-d1ef-4157-8f2f-32356f1b6827	Milan Quon	2019-04-25 12:15:06.994304	2019-04-25 12:58:32.240984	milan-quon	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	346	0	Wild Cat	0	0	f	2019-04-25 12:15:06.986493	2019-04-25 12:15:06.986493	2019-04-25 12:15:06.986493	0
156	d1fef9ba-b349-459c-96e8-576eeee98566	Londa Knipp	2019-04-25 12:15:07.131426	2019-04-25 12:58:31.590249	londa-knipp	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	143	0	Hybrid Cannax	0	0	f	2019-04-25 12:15:07.1232	2019-04-25 12:15:07.1232	2019-04-25 12:15:07.1232	0
149	8e75a2e0-e90c-4476-8e51-3425d781b80d	Lavone Wier	2019-04-25 12:15:07.009458	2019-04-25 12:58:31.07398	lavone-wier	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	12	0	Dog Dalmatian	0	0	f	2019-04-25 12:15:07.003491	2019-04-25 12:15:07.003491	2019-04-25 12:15:07.003491	0
132	ebeec4e8-3426-4c96-b3a5-5311a05545b8	Doreen Tinkler	2019-04-25 12:15:06.71144	2019-04-25 12:55:50.376786	doreen-tinkler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	342	0	Unicorn	0	0	f	2019-04-25 12:15:06.702713	2019-04-25 12:15:06.702713	2019-04-25 12:15:06.702713	0
166	a278a5ca-57c8-4485-96ba-d2ce51d7af8d	Myesha Bobby	2019-04-25 12:15:07.302296	2019-04-25 12:55:50.506	myesha-bobby	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	356	0	Wolverine	0	0	f	2019-04-25 12:15:07.294867	2019-04-25 12:15:07.294867	2019-04-25 12:15:07.294867	0
133	b37281fc-b148-453c-86dc-252ad045a725	Tisha Kriner	2019-04-25 12:15:06.730437	2019-04-25 12:55:51.021936	tisha-kriner	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	495	0	Zebra	0	0	f	2019-04-25 12:15:06.721477	2019-04-25 12:15:06.721477	2019-04-25 12:15:06.721477	0
165	c8a68b7e-465a-4112-ad09-16cf25dd1999	Tisha Abrego	2019-04-25 12:15:07.285442	2019-04-25 12:58:31.245111	tisha-abrego	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	52	0	Dog Rottweiler	0	0	f	2019-04-25 12:15:07.279048	2019-04-25 12:15:07.279048	2019-04-25 12:15:07.279048	0
139	586501a4-fa06-48ca-b78b-38e5741ed3d4	Gerardo Bellard	2019-04-25 12:15:06.836236	2019-04-25 12:58:31.316169	gerardo-bellard	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	63	0	Dragon	0	0	f	2019-04-25 12:15:06.828548	2019-04-25 12:15:06.828548	2019-04-25 12:15:06.828548	0
180	8b02655b-b01a-4298-b994-71039945305b	Brook Lloyd	2019-04-25 12:15:07.540082	2019-04-25 12:55:49.928913	brook-lloyd	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	256	0	Orca	0	0	f	2019-04-25 12:15:07.532509	2019-04-25 12:15:07.532509	2019-04-25 12:15:07.532509	0
191	dbd7b966-85ea-424b-b25d-ec209a76b3f3	Donetta Kindrick	2019-04-25 12:15:07.721147	2019-04-25 12:55:49.303927	donetta-kindrick	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	128	0	Hippopotamus	0	0	f	2019-04-25 12:15:07.714743	2019-04-25 12:15:07.714743	2019-04-25 12:15:07.714743	0
185	28f0887d-d744-42f5-a453-59fdb58508af	George Zazueta	2019-04-25 12:15:07.623018	2019-04-25 12:58:31.125991	george-zazueta	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	24	0	Dog Great Dane	0	0	f	2019-04-25 12:15:07.614941	2019-04-25 12:15:07.614941	2019-04-25 12:15:07.614941	0
194	65688f05-a257-439e-bd08-9450c55ab0d6	Veronika Herod	2019-04-25 12:15:07.770903	2019-04-25 12:55:49.772136	veronika-herod	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	228	0	Maned Wolf	0	0	f	2019-04-25 12:15:07.764262	2019-04-25 12:15:07.764262	2019-04-25 12:15:07.764262	0
209	44b07738-5f03-48f3-9d48-a063a8619761	Ciara Beegle	2019-04-25 12:15:08.033243	2019-04-25 12:58:31.042328	ciara-beegle	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	3	0	Dog Collie	0	0	f	2019-04-25 12:15:08.025597	2019-04-25 12:15:08.025597	2019-04-25 12:15:08.025597	0
175	8b5e3044-8b73-47d6-87f4-b7d8abfd0049	Lillian Herr	2019-04-25 12:15:07.456316	2019-04-25 12:58:30.740641	lillian-herr	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-76	0	Camel	0	0	f	2019-04-25 12:15:07.449142	2019-04-25 12:15:07.449142	2019-04-25 12:15:07.449142	0
189	b837a573-f7d0-4062-b4cc-7d10d1d5edc8	Hildegard Mei	2019-04-25 12:15:07.689087	2019-04-25 12:55:50.982323	hildegard-mei	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	475	0	Zebra	0	0	f	2019-04-25 12:15:07.681677	2019-04-25 12:15:07.681677	2019-04-25 12:15:07.681677	0
174	cd83d0ce-ab6c-461b-83d2-acbb7c233c02	Kallie Mcgown	2019-04-25 12:15:07.440122	2019-04-25 12:58:30.865495	kallie-mcgown	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-42	0	Crustacean	0	0	f	2019-04-25 12:15:07.432433	2019-04-25 12:15:07.432433	2019-04-25 12:15:07.432433	0
196	e44574b6-3c91-48d7-94d7-e5f7ced19a7a	Stephania Wass	2019-04-25 12:15:07.805341	2019-04-25 12:55:50.851236	stephania-wass	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	441	0	Zebra	0	0	f	2019-04-25 12:15:07.797709	2019-04-25 12:15:07.797709	2019-04-25 12:15:07.797709	0
208	5063f90a-0c2b-4959-a400-2946d5b70b63	Cristin Narcisse	2019-04-25 12:15:08.016745	2019-04-25 12:55:49.532912	cristin-narcisse	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	190	0	Hybrid Sergal	0	0	f	2019-04-25 12:15:08.00914	2019-04-25 12:15:08.00914	2019-04-25 12:15:08.00914	0
210	c5655dc9-5c72-4cce-9664-8407de602fb8	Vida Nuckolls	2019-04-25 12:15:08.050084	2019-04-25 12:58:31.052933	vida-nuckolls	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	4	0	Dog Corgi	0	0	f	2019-04-25 12:15:08.042166	2019-04-25 12:15:08.042166	2019-04-25 12:15:08.042166	0
213	afb5f504-32da-4acb-81aa-24466dd76c1f	Sanford Sherron	2019-04-25 12:15:08.102527	2019-04-25 12:58:30.641947	sanford-sherron	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-93	0	Anubis	0	0	f	2019-04-25 12:15:08.09486	2019-04-25 12:15:08.09486	2019-04-25 12:15:08.09486	0
187	de5dfa29-7b32-4eb5-a8c1-4fe43ee412e0	Woodrow Follmer	2019-04-25 12:15:07.656083	2019-04-25 12:58:31.949707	woodrow-follmer	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	231	0	Marten	0	0	f	2019-04-25 12:15:07.648568	2019-04-25 12:15:07.648568	2019-04-25 12:15:07.648568	0
197	478b83a2-c225-41fd-b152-245d0e1a3ce1	Tammara Leet	2019-04-25 12:15:07.828721	2019-04-25 12:58:31.795041	tammara-leet	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	185	0	Hybrid Protogen	0	0	f	2019-04-25 12:15:07.820587	2019-04-25 12:15:07.820587	2019-04-25 12:15:07.820587	0
214	70c415c0-cafa-432c-a3b8-bc6be209ff67	Monnie Shackelford	2019-04-25 12:15:08.119526	2019-04-25 12:58:30.762083	monnie-shackelford	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-62	0	Cat Domestic	0	0	f	2019-04-25 12:15:08.112503	2019-04-25 12:15:08.112503	2019-04-25 12:15:08.112503	0
206	7b25be47-afa6-4f78-87ef-08a7309c6160	Agustina Quin	2019-04-25 12:15:07.983408	2019-04-25 12:55:50.150188	agustina-quin	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	300	0	Rhinoceros	0	0	f	2019-04-25 12:15:07.975094	2019-04-25 12:15:07.975094	2019-04-25 12:15:07.975094	0
193	e3ef2857-f906-4983-9f36-6a41419af377	Kassie Guzzi	2019-04-25 12:15:07.75522	2019-04-25 12:55:50.388649	kassie-guzzi	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	343	0	Weasel	0	0	f	2019-04-25 12:15:07.74756	2019-04-25 12:15:07.74756	2019-04-25 12:15:07.74756	0
181	cab73893-3778-4ce8-bfb6-44c48637c13b	Albertine Godoy	2019-04-25 12:15:07.55642	2019-04-25 12:58:30.752102	albertine-godoy	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-69	0	Caracal	0	0	f	2019-04-25 12:15:07.550132	2019-04-25 12:15:07.550132	2019-04-25 12:15:07.550132	0
186	d5be9121-63ca-4632-8399-74b6238429ce	Lizbeth Mattos	2019-04-25 12:15:07.639252	2019-04-25 12:55:49.659059	lizbeth-mattos	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	206	0	Jackal	0	0	f	2019-04-25 12:15:07.632961	2019-04-25 12:15:07.632961	2019-04-25 12:15:07.632961	0
207	bfc91b09-cf54-4908-bd02-2a862ae1394f	Jackeline Cleveland	2019-04-25 12:15:07.999217	2019-04-25 12:55:50.321677	jackeline-cleveland	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	335	0	Tiger	0	0	f	2019-04-25 12:15:07.992594	2019-04-25 12:15:07.992594	2019-04-25 12:15:07.992594	0
172	fe6db832-6d2d-4063-ae12-83e49e4b5a93	Annita Kapoor	2019-04-25 12:15:07.404027	2019-04-25 12:58:31.885403	annita-kapoor	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	205	0	Hyena	0	0	f	2019-04-25 12:15:07.396577	2019-04-25 12:15:07.396577	2019-04-25 12:15:07.396577	0
178	9e1e1e75-a46a-4e39-8d81-c833d7b29227	Barney Pasquale	2019-04-25 12:15:07.506067	2019-04-25 12:55:50.936195	barney-pasquale	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	453	0	Zebra	0	0	f	2019-04-25 12:15:07.499499	2019-04-25 12:15:07.499499	2019-04-25 12:15:07.499499	0
177	ef308f1e-1e3c-40d2-8b61-d5c1e64a7247	Daisy Dineen	2019-04-25 12:15:07.490248	2019-04-25 12:58:32.230767	daisy-dineen	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	346	0	Wild Boar	0	0	f	2019-04-25 12:15:07.48252	2019-04-25 12:15:07.48252	2019-04-25 12:15:07.48252	0
200	cd7281e7-a1a2-4137-a1d6-7672bf20fa5f	Dylan Presti	2019-04-25 12:15:07.879815	2019-04-25 12:55:50.878571	dylan-presti	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	445	0	Zebra	0	0	f	2019-04-25 12:15:07.871343	2019-04-25 12:15:07.871343	2019-04-25 12:15:07.871343	0
203	8257b9ec-0035-48e7-a069-fd2c1b79d726	Rosalee Eriksen	2019-04-25 12:15:07.932259	2019-04-25 12:58:30.652798	rosalee-eriksen	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-92	0	Armadillo	0	0	f	2019-04-25 12:15:07.923406	2019-04-25 12:15:07.923406	2019-04-25 12:15:07.923406	0
173	88ba0b1a-f333-4fdb-ac3a-d174a4cb8ec5	Jesusa Palacio	2019-04-25 12:15:07.42178	2019-04-25 12:55:50.337956	jesusa-palacio	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	336	0	Toad	0	0	f	2019-04-25 12:15:07.41481	2019-04-25 12:15:07.41481	2019-04-25 12:15:07.41481	0
192	22ef4c3f-c0ae-4d33-ad33-5a3638b839c5	Lily Rolls	2019-04-25 12:15:07.738377	2019-04-25 12:58:31.295368	lily-rolls	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	54	0	Dolphin	0	0	f	2019-04-25 12:15:07.731269	2019-04-25 12:15:07.731269	2019-04-25 12:15:07.731269	0
188	1e311778-7fd6-488d-9d75-cee6c4e4242f	Lilian Quirion	2019-04-25 12:15:07.671714	2019-04-25 12:58:32.101323	lilian-quirion	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	275	0	Possum	0	0	f	2019-04-25 12:15:07.665147	2019-04-25 12:15:07.665147	2019-04-25 12:15:07.665147	0
199	8c78d0bd-ad68-4d66-a9b6-c98707a0e6ad	Malorie Renegar	2019-04-25 12:15:07.862002	2019-04-25 12:58:32.129864	malorie-renegar	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	293	0	Rat	0	0	f	2019-04-25 12:15:07.85405	2019-04-25 12:15:07.85405	2019-04-25 12:15:07.85405	0
204	7f61a129-59bd-4f5c-b390-d126a44d22c2	Rusty Tingey	2019-04-25 12:15:07.949171	2019-04-25 12:55:50.691656	rusty-tingey	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	401	0	Zebra	0	0	f	2019-04-25 12:15:07.942233	2019-04-25 12:15:07.942233	2019-04-25 12:15:07.942233	0
211	fef363ec-16de-44b2-a8c8-e693cf5eaa80	Sheryll Ingold	2019-04-25 12:15:08.067156	2019-04-25 12:58:31.021343	sheryll-ingold	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-3	0	Dog Cattledog	0	0	f	2019-04-25 12:15:08.059304	2019-04-25 12:15:08.059304	2019-04-25 12:15:08.059304	0
190	cfaa3708-0307-403a-bc08-39478feccf51	Janita Prue	2019-04-25 12:15:07.705604	2019-04-25 12:58:30.616825	janita-prue	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-97	0	Alligator	0	0	f	2019-04-25 12:15:07.698252	2019-04-25 12:15:07.698252	2019-04-25 12:15:07.698252	0
182	99fa8489-92d1-4ee0-8dc2-5f3a25ba12e3	Ashlie Lange	2019-04-25 12:15:07.572746	2019-04-25 12:55:50.830571	ashlie-lange	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	436	0	Zebra	0	0	f	2019-04-25 12:15:07.5654	2019-04-25 12:15:07.5654	2019-04-25 12:15:07.5654	0
198	b99498f8-1f6a-407f-a938-674c5bde030b	Evelin Mcateer	2019-04-25 12:15:07.845379	2019-04-25 12:58:30.885791	evelin-mcateer	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-37	0	Deer	0	0	f	2019-04-25 12:15:07.837422	2019-04-25 12:15:07.837422	2019-04-25 12:15:07.837422	0
195	b1fd6f7d-6fb5-47f2-913b-82a24f3f3c99	Jose Bobo	2019-04-25 12:15:07.788809	2019-04-25 12:55:49.821328	jose-bobo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	233	0	Meerkat	0	0	f	2019-04-25 12:15:07.781324	2019-04-25 12:15:07.781324	2019-04-25 12:15:07.781324	0
183	c6335cf9-c5f7-4f23-bea9-7e031a70258a	Matthew Bilal	2019-04-25 12:15:07.588633	2019-04-25 12:58:31.509915	matthew-bilal	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	104	0	Guinea Pig	0	0	f	2019-04-25 12:15:07.58229	2019-04-25 12:15:07.58229	2019-04-25 12:15:07.58229	0
205	51e97d0f-4614-40ea-af40-1e11ed5b5ce7	Rasheeda Kimble	2019-04-25 12:15:07.966707	2019-04-25 12:58:31.731213	rasheeda-kimble	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	171	0	Hybrid Fusky	0	0	f	2019-04-25 12:15:07.958916	2019-04-25 12:15:07.958916	2019-04-25 12:15:07.958916	0
179	bb4cd8c5-80a4-4806-bf8c-a54e7299de34	Ricki Panton	2019-04-25 12:15:07.523326	2019-04-25 12:58:31.326559	ricki-panton	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	65	0	Duck	0	0	f	2019-04-25 12:15:07.51583	2019-04-25 12:15:07.51583	2019-04-25 12:15:07.51583	0
201	7c4bc626-17de-4032-8739-e9775cacfab3	Maximo Goncalves	2019-04-25 12:15:07.897617	2019-04-25 12:58:31.116014	maximo-goncalves	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	22	0	Dog Golden Retriever	0	0	f	2019-04-25 12:15:07.888971	2019-04-25 12:15:07.888971	2019-04-25 12:15:07.888971	0
239	6acd3a8d-b046-4281-af83-a6c9cda1a9df	Laveta Everitt	2019-04-25 12:15:08.537659	2019-04-25 12:58:31.741995	laveta-everitt	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	174	0	Hybrid Jackalope	0	0	f	2019-04-25 12:15:08.530043	2019-04-25 12:15:08.530043	2019-04-25 12:15:08.530043	0
224	b36f2150-a453-411a-8425-f6d9d53c40d9	Carletta Pilon	2019-04-25 12:15:08.288779	2019-04-25 12:58:30.68451	carletta-pilon	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-87	0	Bat	0	0	f	2019-04-25 12:15:08.282572	2019-04-25 12:15:08.282572	2019-04-25 12:15:08.282572	0
226	b6978d40-a703-4b08-a892-b56ec3da7431	Paul Band	2019-04-25 12:15:08.321548	2019-04-25 12:58:30.6738	paul-band	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-92	0	Bandicoot	0	0	f	2019-04-25 12:15:08.315141	2019-04-25 12:15:08.315141	2019-04-25 12:15:08.315141	0
251	af190c62-13cd-4fe8-b009-64f7f2ff414d	Kanisha Calvert	2019-04-25 12:15:08.737368	2019-04-25 12:55:49.896493	kanisha-calvert	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	250	0	Mouse	0	0	f	2019-04-25 12:15:08.731092	2019-04-25 12:15:08.731092	2019-04-25 12:15:08.731092	0
243	3e0c2385-174d-4b00-b738-9edf48ff0f26	Klara Mcclard	2019-04-25 12:15:08.60381	2019-04-25 12:55:50.768726	klara-mcclard	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	423	0	Zebra	0	0	f	2019-04-25 12:15:08.59772	2019-04-25 12:15:08.59772	2019-04-25 12:15:08.59772	0
231	46d3c2af-84c6-41bc-9e4c-8a304e509b10	Iona Willert	2019-04-25 12:15:08.403657	2019-04-25 12:55:48.160837	iona-willert	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-93	0	Antelope	0	0	f	2019-04-25 12:15:08.39748	2019-04-25 12:15:08.39748	2019-04-25 12:15:08.39748	0
247	bb5cf70e-46c9-449a-be94-bee7eedd468b	Nelia Sieben	2019-04-25 12:15:08.671479	2019-04-25 12:55:49.875692	nelia-sieben	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	245	0	Monster	0	0	f	2019-04-25 12:15:08.663843	2019-04-25 12:15:08.663843	2019-04-25 12:15:08.663843	0
236	840d1885-b543-4f5f-bf87-66ce519a6bc8	Georgene Kittredge	2019-04-25 12:15:08.487675	2019-04-25 12:55:49.690808	georgene-kittredge	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	212	0	Kirin	0	0	f	2019-04-25 12:15:08.481418	2019-04-25 12:15:08.481418	2019-04-25 12:15:08.481418	0
216	3b946478-466b-4edd-a9df-0d5156c42268	Tonia Cavalier	2019-04-25 12:15:08.153104	2019-04-25 12:58:31.565917	tonia-cavalier	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	128	0	Horse	0	0	f	2019-04-25 12:15:08.14682	2019-04-25 12:15:08.14682	2019-04-25 12:15:08.14682	0
127	e80fe77e-ac20-4243-8957-a708a59c3a8e	Carli Telles	2019-04-25 12:15:06.61272	2019-04-25 12:58:31.235131	carli-telles	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	51	0	Dog Pug	0	0	f	2019-04-25 12:15:06.604312	2019-04-25 12:15:06.604312	2019-04-25 12:15:06.604312	0
250	90d62c2d-53c5-41a0-907f-5b0a2c2299f5	Louise Zamora	2019-04-25 12:15:08.721156	2019-04-25 12:58:31.52067	louise-zamora	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	111	0	Hamster	0	0	f	2019-04-25 12:15:08.712706	2019-04-25 12:15:08.712706	2019-04-25 12:15:08.712706	0
254	3e43e485-eae6-47c0-a611-a93b2c44f68d	Fleta Rogowski	2019-04-25 12:15:08.7901	2019-04-25 12:55:49.854325	fleta-rogowski	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	243	0	Mongoose	0	0	f	2019-04-25 12:15:08.78384	2019-04-25 12:15:08.78384	2019-04-25 12:15:08.78384	0
225	86f60c84-4d1b-4b2f-86fd-781d846e55a3	Lorine Radosevich	2019-04-25 12:15:08.305538	2019-04-25 12:58:30.783044	lorine-radosevich	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-53	0	Cheetah	0	0	f	2019-04-25 12:15:08.29794	2019-04-25 12:15:08.29794	2019-04-25 12:15:08.29794	0
86	be534cb4-06c9-41f3-ae15-e2940f149a72	Rachal Whiteford	2019-04-25 12:15:05.885207	2019-04-25 12:58:31.710457	rachal-whiteford	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	166	0	Hybrid Fox Bat	0	0	f	2019-04-25 12:15:05.877592	2019-04-25 12:15:05.877592	2019-04-25 12:15:05.877592	0
253	b9e35ca5-09a7-4848-92fa-e15e8fb26bbf	E Goodlow	2019-04-25 12:15:08.77128	2019-04-25 12:55:49.918258	e-goodlow	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	253	0	Okapi	0	0	f	2019-04-25 12:15:08.764781	2019-04-25 12:15:08.764781	2019-04-25 12:15:08.764781	0
240	1f9bac02-a5e4-4e6c-97a4-f35edc82156a	Shantell Denicola	2019-04-25 12:15:08.555714	2019-04-25 12:58:31.136482	shantell-denicola	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	25	0	Dog Hound	0	0	f	2019-04-25 12:15:08.548416	2019-04-25 12:15:08.548416	2019-04-25 12:15:08.548416	0
220	611f2cd6-6e98-462d-906c-97b283c49218	Lucrecia Galban	2019-04-25 12:15:08.221634	2019-04-25 12:55:50.364458	lucrecia-galban	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	340	0	Undead	0	0	f	2019-04-25 12:15:08.212995	2019-04-25 12:15:08.212995	2019-04-25 12:15:08.212995	0
249	1893aa9a-ab2a-4873-adaa-04eb279b4f8f	Shaunte Milan	2019-04-25 12:15:08.703731	2019-04-25 12:55:49.377957	shaunte-milan	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	157	0	Hybrid Crux	0	0	f	2019-04-25 12:15:08.696646	2019-04-25 12:15:08.696646	2019-04-25 12:15:08.696646	0
242	a37e199a-0c50-4d42-b1e3-95b639d4da54	Kisha Brink	2019-04-25 12:15:08.588364	2019-04-25 12:58:31.477341	kisha-brink	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	93	0	Goat	0	0	f	2019-04-25 12:15:08.581115	2019-04-25 12:15:08.581115	2019-04-25 12:15:08.581115	0
237	ce1ab240-a4e5-4921-a4ff-814c79b94429	Mickie Killebrew	2019-04-25 12:15:08.504585	2019-04-25 12:58:31.576166	mickie-killebrew	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	142	0	Hybrid Angel Dragon	0	0	f	2019-04-25 12:15:08.496872	2019-04-25 12:15:08.496872	2019-04-25 12:15:08.496872	0
238	863e02b8-4bb4-4a1d-a83b-ecbe4f06ac7c	Bertie Qualls	2019-04-25 12:15:08.519295	2019-04-25 12:55:49.907272	bertie-qualls	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	252	0	Ocelot	0	0	f	2019-04-25 12:15:08.513349	2019-04-25 12:15:08.513349	2019-04-25 12:15:08.513349	0
246	4f12c5ba-131c-4884-a1a6-c43a45d16d5d	Shaniqua Overly	2019-04-25 12:15:08.654255	2019-04-25 12:55:50.2128	shaniqua-overly	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	314	0	Sheep	0	0	f	2019-04-25 12:15:08.647922	2019-04-25 12:15:08.647922	2019-04-25 12:15:08.647922	0
244	149198f6-33bf-4a22-b6f7-a665f2141727	Jammie Hathorn	2019-04-25 12:15:08.621594	2019-04-25 12:58:30.817941	jammie-hathorn	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-47	0	Civet	0	0	f	2019-04-25 12:15:08.613882	2019-04-25 12:15:08.613882	2019-04-25 12:15:08.613882	0
233	3eb5af17-19f1-4295-9125-288867cbf014	Reggie Perri	2019-04-25 12:15:08.438774	2019-04-25 12:55:51.012517	reggie-perri	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	492	0	Zebra	0	0	f	2019-04-25 12:15:08.430475	2019-04-25 12:15:08.430475	2019-04-25 12:15:08.430475	0
228	3f850957-7edc-4661-a155-4c3f656c916f	Stacy Santigo	2019-04-25 12:15:08.35531	2019-04-25 12:58:31.552281	stacy-santigo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	124	0	Hedgehog	0	0	f	2019-04-25 12:15:08.347592	2019-04-25 12:15:08.347592	2019-04-25 12:15:08.347592	0
232	ff1ed857-2539-4715-b5f7-ccf05a5d1ca0	Valerie Leitzel	2019-04-25 12:15:08.420862	2019-04-25 12:55:49.939379	valerie-leitzel	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	257	0	Other	0	0	f	2019-04-25 12:15:08.413377	2019-04-25 12:15:08.413377	2019-04-25 12:15:08.413377	0
245	799f3a91-5ed5-46c3-8580-5f63c46d8dca	Karla Prothro	2019-04-25 12:15:08.638163	2019-04-25 12:58:31.601403	karla-prothro	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	144	0	Hybrid Cat-Fox	0	0	f	2019-04-25 12:15:08.630964	2019-04-25 12:15:08.630964	2019-04-25 12:15:08.630964	0
234	1ba0eacc-3b15-4d11-8f82-a5998bc6fd86	Bridgette Crochet	2019-04-25 12:15:08.455575	2019-04-25 12:58:30.729991	bridgette-crochet	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-79	0	Bobcat	0	0	f	2019-04-25 12:15:08.449426	2019-04-25 12:15:08.449426	2019-04-25 12:15:08.449426	0
248	dbdb8249-a6d1-4031-a9b8-9b1dc4e47566	Clinton Felice	2019-04-25 12:15:08.68681	2019-04-25 12:58:31.541848	clinton-felice	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	116	0	Hawk	0	0	f	2019-04-25 12:15:08.680763	2019-04-25 12:15:08.680763	2019-04-25 12:15:08.680763	0
241	f88354f9-63e6-41d6-8c04-a62449e4ccb3	Dale Colon	2019-04-25 12:15:08.571845	2019-04-25 12:58:31.959882	dale-colon	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	231	0	Mechanical	0	0	f	2019-04-25 12:15:08.565509	2019-04-25 12:15:08.565509	2019-04-25 12:15:08.565509	0
83	4114ffa3-df83-40ed-a39d-4ecda50c8020	Donn Fant	2019-04-25 12:15:05.821856	2019-04-25 12:55:50.809787	donn-fant	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	435	0	Zebra	0	0	f	2019-04-25 12:15:05.814284	2019-04-25 12:15:05.814284	2019-04-25 12:15:05.814284	0
227	42af6273-4ac8-4d61-aa0b-fd062230b38d	Blanche Poehler	2019-04-25 12:15:08.338904	2019-04-25 12:55:50.010725	blanche-poehler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	268	0	Pig	0	0	f	2019-04-25 12:15:08.331746	2019-04-25 12:15:08.331746	2019-04-25 12:15:08.331746	0
217	33f63c8b-f786-4309-a301-f6a81c0d7bd4	Ferne Craft	2019-04-25 12:15:08.170156	2019-04-25 12:55:50.596662	ferne-craft	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	383	0	Zebra	0	0	f	2019-04-25 12:15:08.1624	2019-04-25 12:15:08.1624	2019-04-25 12:15:08.1624	0
222	4e7daa5a-0257-4990-9103-29201a995d96	Jim Frizell	2019-04-25 12:15:08.255411	2019-04-25 12:58:31.635513	jim-frizell	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	161	0	Hybrid Dragon Fox	0	0	f	2019-04-25 12:15:08.247681	2019-04-25 12:15:08.247681	2019-04-25 12:15:08.247681	0
252	dad265e8-d8a3-46c4-9e03-1d745b1864e6	Delia Hoefler	2019-04-25 12:15:08.754902	2019-04-25 12:55:50.085315	delia-hoefler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	276	0	Primate	0	0	f	2019-04-25 12:15:08.746291	2019-04-25 12:15:08.746291	2019-04-25 12:15:08.746291	0
221	fc9e48a1-b950-474d-a126-48c8a29ec7e9	Nigel Straughan	2019-04-25 12:15:08.237662	2019-04-25 12:55:49.598761	nigel-straughan	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	196	0	Hybrid Wolfdog	0	0	f	2019-04-25 12:15:08.231164	2019-04-25 12:15:08.231164	2019-04-25 12:15:08.231164	0
218	891833d5-444c-44c7-9e07-c74d617f1729	Lanette Salvia	2019-04-25 12:15:08.18584	2019-04-25 12:55:50.308382	lanette-salvia	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	333	0	Tasmanian Devil	0	0	f	2019-04-25 12:15:08.17922	2019-04-25 12:15:08.17922	2019-04-25 12:15:08.17922	0
223	cb276c2b-9b7c-4383-89c2-6b0a32e18156	Jimmy Briles	2019-04-25 12:15:08.271662	2019-04-25 12:58:31.224407	jimmy-briles	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	50	0	Dog Poodle	0	0	f	2019-04-25 12:15:08.264703	2019-04-25 12:15:08.264703	2019-04-25 12:15:08.264703	0
219	940c981f-8489-488d-a8f3-980f87a20f04	Neoma Swaim	2019-04-25 12:15:08.20325	2019-04-25 12:58:31.861036	neoma-swaim	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	201	0	Hybrid Wolgen/Drolf	0	0	f	2019-04-25 12:15:08.195781	2019-04-25 12:15:08.195781	2019-04-25 12:15:08.195781	0
36	ffa902c2-63b1-40a9-8fbf-348a65ec7960	sohudpsduf osdiupfsd ipuhsdfnj sd	2019-04-25 12:15:04.512104	2019-05-07 05:22:26.99852	pasty-maez	\N	1234	\N	\N	dark	2019-05-07 05:22:26.978926	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	83	0	Fudog	0	0	f	2019-04-25 12:15:04.503862	2019-04-25 12:15:04.503862	2019-04-25 12:15:04.503862	0
17	3d73db69-5a23-419d-a853-124f178e3a00	Toshia Thibert	2019-04-25 12:15:04.183261	2019-04-25 12:58:31.68606	toshia-thibert	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	162	0	Hybrid Dutch Angel Dragon	0	0	f	2019-04-25 12:15:04.176846	2019-04-25 12:15:04.176846	2019-04-25 12:15:04.176846	0
20	e818f1d5-2633-4280-8504-89537457b395	Nenita Fusco	2019-04-25 12:15:04.233476	2019-04-25 12:58:31.986339	nenita-fusco	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	237	0	Minotaur	0	0	f	2019-04-25 12:15:04.227555	2019-04-25 12:15:04.227555	2019-04-25 12:15:04.227555	0
19	e00e4021-9464-471b-8617-84e672d6b115	Candi Hobson	2019-04-25 12:15:04.21755	2019-04-25 12:55:50.840789	candi-hobson	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	440	0	Zebra	0	0	f	2019-04-25 12:15:04.210073	2019-04-25 12:15:04.210073	2019-04-25 12:15:04.210073	0
8	d17310e9-e79f-43e6-8da1-391ae6111efa	Jacquelin Coggins	2019-04-25 12:15:04.035398	2019-04-25 12:58:31.838187	jacquelin-coggins	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	191	0	Hybrid Wolf Shark	0	0	f	2019-04-25 12:15:04.029018	2019-04-25 12:15:04.029018	2019-04-25 12:15:04.029018	0
10	6219f35d-c691-402c-88bd-04ae93880115	Maryalice Vick	2019-04-25 12:15:04.067943	2019-04-25 12:58:32.192124	maryalice-vick	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	333	0	Tanuki	0	0	f	2019-04-25 12:15:04.061924	2019-04-25 12:15:04.061924	2019-04-25 12:15:04.061924	0
14	fc1e83f8-4eee-4770-9385-4d75fdd283cd	Merri Dewall	2019-04-25 12:15:04.135196	2019-04-25 12:55:49.751552	merri-dewall	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	220	0	Llama	0	0	f	2019-04-25 12:15:04.127749	2019-04-25 12:15:04.127749	2019-04-25 12:15:04.127749	0
24	d0f3f0a6-6936-4cdb-9cd2-5a63f86c890e	Jessenia Decola	2019-04-25 12:15:04.298433	2019-04-25 12:58:31.611347	jessenia-decola	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	150	0	Hybrid Chimera	0	0	f	2019-04-25 12:15:04.292151	2019-04-25 12:15:04.292151	2019-04-25 12:15:04.292151	0
33	7550af1f-e281-4585-8c55-22ab05db4364	Buddy Lopresti	2019-04-25 12:15:04.45476	2019-04-25 12:55:49.629359	buddy-lopresti	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	204	0	Hybrid Wusky/Wolfsky	0	0	f	2019-04-25 12:15:04.448198	2019-04-25 12:15:04.448198	2019-04-25 12:15:04.448198	0
11	3fb8522e-ec83-4fe1-8432-7df0b9d6b3ac	Annetta Bashaw	2019-04-25 12:15:04.086361	2019-04-25 12:55:50.040427	annetta-bashaw	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	273	0	Polar Bear	0	0	f	2019-04-25 12:15:04.078718	2019-04-25 12:15:04.078718	2019-04-25 12:15:04.078718	0
21	1cfe7420-4187-488e-8fe4-5dc3c0ceb4a8	Aurelia Barhorst	2019-04-25 12:15:04.250271	2019-04-25 12:55:50.135281	aurelia-barhorst	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	294	0	Red Panda	0	0	f	2019-04-25 12:15:04.242544	2019-04-25 12:15:04.242544	2019-04-25 12:15:04.242544	0
30	e89e8775-54f7-4a58-a273-936bd240617e	May Rayborn	2019-04-25 12:15:04.399814	2019-04-25 12:58:31.804977	may-rayborn	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	189	0	Hybrid Sergal	0	0	f	2019-04-25 12:15:04.392766	2019-04-25 12:15:04.392766	2019-04-25 12:15:04.392766	0
12	e9b563c2-6ae3-4d30-b1b9-846e152e5224	Edmond Ragland	2019-04-25 12:15:04.103105	2019-04-25 12:58:31.499404	edmond-ragland	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	102	0	Gryphon	0	0	f	2019-04-25 12:15:04.095456	2019-04-25 12:15:04.095456	2019-04-25 12:15:04.095456	0
41	28f21a80-4734-45cc-b462-b197185f5f38	Karlyn Herod	2019-04-25 12:15:04.599798	2019-04-25 12:55:50.992736	karlyn-herod	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	476	0	Zebra	0	0	f	2019-04-25 12:15:04.592057	2019-04-25 12:15:04.592057	2019-04-25 12:15:04.592057	0
27	17e8ebf0-a044-40d4-a643-aa5d4c270d5a	Amberly Bradberry	2019-04-25 12:15:04.349423	2019-04-25 12:58:31.001007	amberly-bradberry	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-10	0	Dog Bulldog	0	0	f	2019-04-25 12:15:04.341155	2019-04-25 12:15:04.341155	2019-04-25 12:15:04.341155	0
29	933cdf3c-1e7e-44ca-835a-14183896f86c	Evita Dameron	2019-04-25 12:15:04.38234	2019-04-25 12:55:50.35147	evita-dameron	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	337	0	Turtle	0	0	f	2019-04-25 12:15:04.375908	2019-04-25 12:15:04.375908	2019-04-25 12:15:04.375908	0
25	1044129a-0799-4c5a-9fe5-adfae2bb24df	Jeffie Odaniel	2019-04-25 12:15:04.316528	2019-04-25 12:55:50.638373	jeffie-odaniel	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	394	0	Zebra	0	0	f	2019-04-25 12:15:04.308203	2019-04-25 12:15:04.308203	2019-04-25 12:15:04.308203	0
13	a2b67040-9d72-4acb-aa24-33abe3f13c3e	Margy Kennison	2019-04-25 12:15:04.118214	2019-04-25 12:55:49.811153	margy-kennison	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	232	0	Media	0	0	f	2019-04-25 12:15:04.112329	2019-04-25 12:15:04.112329	2019-04-25 12:15:04.112329	0
6	ef542869-6774-41d2-a556-dce8c659bb9a	Sana Reams	2019-04-25 12:15:04.00252	2019-04-25 12:55:50.586268	sana-reams	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	382	0	Zebra	0	0	f	2019-04-25 12:15:03.994806	2019-04-25 12:15:03.994806	2019-04-25 12:15:03.994806	0
31	52ba79e7-8e93-4580-ba2d-fb7beeb86e11	Kindra Crisp	2019-04-25 12:15:04.418069	2019-04-25 12:55:50.946852	kindra-crisp	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	456	0	Zebra	0	0	f	2019-04-25 12:15:04.409234	2019-04-25 12:15:04.409234	2019-04-25 12:15:04.409234	0
34	f6c69b96-f789-46a4-94a1-db678c6fbb5e	Reena Cimino	2019-04-25 12:15:04.472744	2019-04-25 12:58:30.85028	reena-cimino	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-43	0	Coyote	0	0	f	2019-04-25 12:15:04.465098	2019-04-25 12:15:04.465098	2019-04-25 12:15:04.465098	0
18	807368c0-6003-44f9-b69a-0ef0c8a34b8d	Sharron Eidem	2019-04-25 12:15:04.200958	2019-04-25 12:55:50.737849	sharron-eidem	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	407	0	Zebra	0	0	f	2019-04-25 12:15:04.193092	2019-04-25 12:15:04.193092	2019-04-25 12:15:04.193092	0
38	be67449a-0bb8-4ff1-83a8-29b5615c88c0	Mayola Shuster	2019-04-25 12:15:04.549772	2019-04-25 12:55:49.970698	mayola-shuster	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	261	0	Panda	0	0	f	2019-04-25 12:15:04.541085	2019-04-25 12:15:04.541085	2019-04-25 12:15:04.541085	0
39	331d07b1-7fc3-4fc4-bee0-2521d21b043d	Darron Stonge	2019-04-25 12:15:04.566849	2019-04-25 12:55:50.799395	darron-stonge	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	428	0	Zebra	0	0	f	2019-04-25 12:15:04.559355	2019-04-25 12:15:04.559355	2019-04-25 12:15:04.559355	0
16	bde67f81-2af5-400d-9389-c7ab9ecfbb8e	Heather Shetler	2019-04-25 12:15:04.167662	2019-04-25 12:55:49.960853	heather-shetler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	260	0	Owl	0	0	f	2019-04-25 12:15:04.160661	2019-04-25 12:15:04.160661	2019-04-25 12:15:04.160661	0
23	9b8c819e-52c8-4192-b488-3d9a1817b2ce	Lyndia Alphonse	2019-04-25 12:15:04.282803	2019-04-25 12:58:31.084491	lyndia-alphonse	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	15	0	Dog Doberman	0	0	f	2019-04-25 12:15:04.274758	2019-04-25 12:15:04.274758	2019-04-25 12:15:04.274758	0
40	b4d89cbe-5cca-4a70-af72-b35d3b4f37fc	Denita Dimitri	2019-04-25 12:15:04.582287	2019-04-25 12:55:50.971335	denita-dimitri	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	461	0	Zebra	0	0	f	2019-04-25 12:15:04.575978	2019-04-25 12:15:04.575978	2019-04-25 12:15:04.575978	0
32	c17abb8e-ac19-4713-a80a-d2854c60aed7	Cami Gilles	2019-04-25 12:15:04.434536	2019-04-25 12:55:50.680976	cami-gilles	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	399	0	Zebra	0	0	f	2019-04-25 12:15:04.428	2019-04-25 12:15:04.428	2019-04-25 12:15:04.428	0
28	2d798afe-d8d2-4644-ae3b-dc9c84d6823d	Altagracia Haman	2019-04-25 12:15:04.366284	2019-04-25 12:58:31.871297	altagracia-haman	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	201	0	Hybrid Wolger	0	0	f	2019-04-25 12:15:04.358546	2019-04-25 12:15:04.358546	2019-04-25 12:15:04.358546	0
37	523ee056-a424-4567-8161-df33e771b70b	Hedy Flecha	2019-04-25 12:15:04.530138	2019-04-25 12:55:50.418491	hedy-flecha	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	344	0	Wickerbeast	0	0	f	2019-04-25 12:15:04.522661	2019-04-25 12:15:04.522661	2019-04-25 12:15:04.522661	0
26	92c49837-a16d-46c8-af9f-a585ef8b8d3c	Corine Troutt	2019-04-25 12:15:04.332789	2019-04-25 12:55:50.820179	corine-troutt	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	435	0	Zebra	0	0	f	2019-04-25 12:15:04.325616	2019-04-25 12:15:04.325616	2019-04-25 12:15:04.325616	0
22	7e2531a1-4d63-4e1f-990b-7695d3263b32	Larue Dandy	2019-04-25 12:15:04.26579	2019-04-25 12:58:30.698064	larue-dandy	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-81	0	Beaver	0	0	f	2019-04-25 12:15:04.259775	2019-04-25 12:15:04.259775	2019-04-25 12:15:04.259775	0
35	054ebd73-d27a-47d4-93ac-9ed30986231d	Tori Barrs	2019-04-25 12:15:04.493197	2019-04-25 12:55:50.020613	tori-barrs	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	269	0	Platypus	0	0	f	2019-04-25 12:15:04.483036	2019-04-25 12:15:04.483036	2019-04-25 12:15:04.483036	0
9	e0887a42-774e-4f2f-a5d4-a2c8c63d573d	Marcellus Foley	2019-04-25 12:15:04.052049	2019-04-25 12:58:31.150449	marcellus-foley	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	26	0	Dog Husky	0	0	f	2019-04-25 12:15:04.044488	2019-04-25 12:15:04.044488	2019-04-25 12:15:04.044488	0
15	b7871eec-971d-4a5e-b8b2-9665a6449b82	Rubi Illingworth	2019-04-25 12:15:04.151312	2019-04-25 12:58:31.259201	rubi-illingworth	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	52	0	Dog Sheepdog	0	0	f	2019-04-25 12:15:04.145093	2019-04-25 12:15:04.145093	2019-04-25 12:15:04.145093	0
7	ccac27da-535d-4601-aa7b-755742ffbbbb	Carma Horvath	2019-04-25 12:15:04.019924	2019-04-25 12:55:49.008417	carma-horvath	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	67	0	Eagle	0	0	f	2019-04-25 12:15:04.011976	2019-04-25 12:15:04.011976	2019-04-25 12:15:04.011976	0
5	db4c691f-f428-4163-b297-592de98e1ad1	Charlena Alejo	2019-04-25 12:15:03.977386	2019-04-25 12:58:31.431693	charlena-alejo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	84	0	Gargoyle	0	0	f	2019-04-25 12:15:03.96966	2019-04-25 12:15:03.96966	2019-04-25 12:15:03.96966	0
184	fb51b476-1623-4d14-a859-c0151431debb	Patricia Flavors	2019-04-25 12:15:07.60559	2019-04-25 12:55:48.231656	patricia-flavors	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-81	0	Bear	0	0	f	2019-04-25 12:15:07.598223	2019-04-25 12:15:07.598223	2019-04-25 12:15:07.598223	0
155	97a8d6ab-dd80-4837-a374-4154a75efaff	Quinn Balas	2019-04-25 12:15:07.11276	2019-04-25 12:58:31.764226	quinn-balas	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	179	0	Hybrid Liger/Tigon	0	0	f	2019-04-25 12:15:07.105764	2019-04-25 12:15:07.105764	2019-04-25 12:15:07.105764	0
150	df9dd558-a5ae-42c8-83a8-0d998f3a9750	Han Adolph	2019-04-25 12:15:07.028232	2019-04-25 12:55:50.555556	han-adolph	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	360	0	Zebra	0	0	f	2019-04-25 12:15:07.020274	2019-04-25 12:15:07.020274	2019-04-25 12:15:07.020274	0
52	a145933c-ad33-40d2-a260-6713ed8b0123	Shon Higley	2019-04-25 12:15:04.783087	2019-04-25 12:55:50.606825	shon-higley	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	384	0	Zebra	0	0	f	2019-04-25 12:15:04.775421	2019-04-25 12:15:04.775421	2019-04-25 12:15:04.775421	0
142	5a2e070f-43fe-46d4-9403-41c2806d2359	Laurine Pepin	2019-04-25 12:15:06.887957	2019-04-25 12:55:50.628337	laurine-pepin	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	392	0	Zebra	0	0	f	2019-04-25 12:15:06.880588	2019-04-25 12:15:06.880588	2019-04-25 12:15:06.880588	0
75	ddf91687-a01b-4e71-beeb-02c84c536e37	Angelena Ferriera	2019-04-25 12:15:05.679583	2019-04-25 12:55:50.748078	angelena-ferriera	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	419	0	Zebra	0	0	f	2019-04-25 12:15:05.173454	2019-04-25 12:15:05.173454	2019-04-25 12:15:05.173454	0
229	83be52e4-d36d-47de-9b65-dcad40a2005a	Hertha Elliff	2019-04-25 12:15:08.371606	2019-04-25 12:58:31.774447	hertha-elliff	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	182	0	Hybrid Manokit	0	0	f	2019-04-25 12:15:08.36528	2019-04-25 12:15:08.36528	2019-04-25 12:15:08.36528	0
171	a00dabaa-81a5-4a43-a2ce-0e87de449c27	Reynalda Kennington	2019-04-25 12:15:07.387192	2019-04-25 12:58:31.818776	reynalda-kennington	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	191	0	Hybrid Tiger Dragon	0	0	f	2019-04-25 12:15:07.37978	2019-04-25 12:15:07.37978	2019-04-25 12:15:07.37978	0
176	412f5add-62e5-4431-b9e5-c77d32207707	Christena Tarango	2019-04-25 12:15:07.473053	2019-04-25 12:55:50.892848	christena-tarango	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	449	0	Zebra	0	0	f	2019-04-25 12:15:07.466874	2019-04-25 12:15:07.466874	2019-04-25 12:15:07.466874	0
74	93227008-7fa8-4f7c-9588-b718bceaa441	Nathanial Fernald	2019-04-25 12:15:05.162665	2019-04-25 12:58:31.828184	nathanial-fernald	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	191	0	Hybrid Wolf Fox	0	0	f	2019-04-25 12:15:05.153376	2019-04-25 12:15:05.153376	2019-04-25 12:15:05.153376	0
89	46dbfe4b-68e1-4acc-9d96-7e559149e5e7	Gerri Romo	2019-04-25 12:15:05.932917	2019-04-25 12:58:32.251517	gerri-romo	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	346	0	Wild Dog	0	0	f	2019-04-25 12:15:05.925365	2019-04-25 12:15:05.925365	2019-04-25 12:15:05.925365	0
79	7010110e-3122-4631-b52e-c943aff3db08	Rosamond Lachance	2019-04-25 12:15:05.755232	2019-04-25 12:55:48.886712	rosamond-lachance	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	52	0	Dog Samoyed	0	0	f	2019-04-25 12:15:05.748574	2019-04-25 12:15:05.748574	2019-04-25 12:15:05.748574	0
215	67c2be04-6f77-4615-8c50-d27c4a5ca006	Melvin Reece	2019-04-25 12:15:08.1373	2019-04-25 12:55:50.959177	melvin-reece	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	460	0	Zebra	0	0	f	2019-04-25 12:15:08.129065	2019-04-25 12:15:08.129065	2019-04-25 12:15:08.129065	0
4	9afc32c0-58bf-4cf3-b02b-0f18869dbf32	Toto2	2019-04-25 12:12:17.450666	2019-04-25 12:58:30.719622	toto2	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-79	0	Bison	0	0	f	2019-04-25 12:12:14.809204	2019-04-25 12:12:14.809204	2019-04-25 12:12:14.809204	0
202	871f8d7e-5484-4585-85b0-0cb1554a6818	Meaghan Breland	2019-04-25 12:15:07.914626	2019-04-25 12:55:49.679472	meaghan-breland	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	208	0	Kangaroo	0	0	f	2019-04-25 12:15:07.906511	2019-04-25 12:15:07.906511	2019-04-25 12:15:07.906511	0
99	6b9d41e4-3758-4984-ae5f-ee6509d1a20f	Mechelle Daniels	2019-04-25 12:15:06.119537	2019-04-25 12:58:30.796581	mechelle-daniels	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-52	0	Chinchilla	0	0	f	2019-04-25 12:15:06.111745	2019-04-25 12:15:06.111745	2019-04-25 12:15:06.111745	0
230	b681a909-487c-4616-b72c-70f347640b7d	Alisha Stejskal	2019-04-25 12:15:08.388145	2019-04-25 12:58:30.838876	alisha-stejskal	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-44	0	Cow	0	0	f	2019-04-25 12:15:08.380807	2019-04-25 12:15:08.380807	2019-04-25 12:15:08.380807	0
44	4fb79b9b-7812-4a57-ab5f-9c0b13b7f063	Floria Litwin	2019-04-25 12:15:04.652211	2019-04-25 12:58:30.875457	floria-litwin	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-39	0	Crux	0	0	f	2019-04-25 12:15:04.64612	2019-04-25 12:15:04.64612	2019-04-25 12:15:04.64612	0
212	b658bf62-2e2f-4529-a59a-433e77870b72	Wilma Sinkler	2019-04-25 12:15:08.085084	2019-04-25 12:58:31.011344	wilma-sinkler	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	-7	0	Dog Burnese Mountain	0	0	f	2019-04-25 12:15:08.076275	2019-04-25 12:15:08.076275	2019-04-25 12:15:08.076275	0
161	29a4bf1c-2eab-47e4-9c0e-ec26ff2d164f	Shayla Duck	2019-04-25 12:15:07.215168	2019-04-25 12:58:31.094973	shayla-duck	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	16	0	Dog Domestic	0	0	f	2019-04-25 12:15:07.208635	2019-04-25 12:15:07.208635	2019-04-25 12:15:07.208635	0
235	cb2b3d28-9381-43e4-95fe-54645e67a31f	Racheal Kornreich	2019-04-25 12:15:08.472229	2019-04-25 12:58:31.341579	racheal-kornreich	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	67	0	Elephant	0	0	f	2019-04-25 12:15:08.464695	2019-04-25 12:15:08.464695	2019-04-25 12:15:08.464695	0
91	a86c4b6c-6a7c-4373-8af2-ffe00040759b	Ulrike Royall	2019-04-25 12:15:05.968143	2019-04-25 12:58:31.645433	ulrike-royall	\N	\N	\N	\N	dark	\N	\N	t	{}	\N	t	t	\N	\N	0	\N	\N	t	t	\N	161	0	Hybrid Drusky	0	0	f	2019-04-25 12:15:05.96145	2019-04-25 12:15:05.96145	2019-04-25 12:15:05.96145	0
59	02b49ce7-22fd-429f-b1b1-55cfad638f59	Hermila Cerna	2019-04-25 12:15:04.900108	2019-05-10 22:27:10.346115	hermila-cerna	\N	\N	\N	\N	dark	2019-05-05 23:55:40.273762	\N	t	{}	2019-05-06 20:21:41.802431	t	t	\N	\N	123123123	\N	\N	t	t	\N	-65	0	Anteater	0	0	f	2019-04-25 12:15:04.892929	2019-04-25 12:15:04.892929	2019-04-25 12:15:04.892929	0
1	3e69717e-9803-4fc1-9909-419092780574	Stormy	2019-01-21 22:41:26.027476	2019-05-12 22:42:33.024628	stormy	French ~ 26 ~ Developer ~ Fursuiter ~ Pup ~ ✈️ BLFC, GLC, MFF 	124845744	8025f21d-9ac9-4490-8fd9-f1450c19a78c.png	\N	dark	2019-05-12 08:53:23.364821	http://twitter.com/ThatFrenchCat	t	{}	2019-05-06 20:22:02.538572	t	t	{"id":"cus_EklP9RNUCGccmW","object":"customer","account_balance":0,"created":1553370723,"currency":null,"default_source":"card_1EHFsqA6cDuc9PFfunm9xBu8","delinquent":false,"description":null,"discount":null,"email":"rafiki910@hotmail.es","invoice_prefix":"589AA02","invoice_settings":{"custom_fields":null,"footer":null},"livemode":false,"metadata":{},"shipping":null,"sources":{"object":"list","data":[{"id":"card_1EHFsqA6cDuc9PFfunm9xBu8","object":"card","address_city":null,"address_country":null,"address_line1":null,"address_line1_check":null,"address_line2":null,"address_state":null,"address_zip":"24242","address_zip_check":"pass","brand":"Visa","country":"US","customer":"cus_EklP9RNUCGccmW","cvc_check":"pass","dynamic_last4":null,"exp_month":2,"exp_year":2042,"fingerprint":"UohEe8UAbr0jkmyo","funding":"credit","last4":"4242","metadata":{},"name":"rafiki910@hotmail.es","tokenization_method":null}],"has_more":false,"total_count":1,"url":"/v1/customers/cus_EklP9RNUCGccmW/sources"},"subscriptions":{"object":"list","data":[],"has_more":false,"total_count":0,"url":"/v1/customers/cus_EklP9RNUCGccmW/subscriptions"},"tax_info":null,"tax_info_verification":null,"source":"tok_1EJTDxA6cDuc9PFfDntEdzpU"}	{"id":"ch_1EJTE1A6cDuc9PFf0sthjTUw","object":"charge","amount":600,"amount_refunded":0,"application":null,"application_fee":null,"application_fee_amount":null,"balance_transaction":"txn_1EJTE1A6cDuc9PFfq4jZmGw3","billing_details":{"address":{"city":null,"country":null,"line1":null,"line2":null,"postal_code":"24242","state":null},"email":null,"name":"rafiki910@hotmail.es","phone":null},"captured":true,"created":1553898661,"currency":"usd","customer":"cus_EklP9RNUCGccmW","description":"100k ad impressions","destination":null,"dispute":null,"failure_code":null,"failure_message":null,"fraud_details":{},"invoice":null,"livemode":false,"metadata":{},"on_behalf_of":null,"order":null,"outcome":{"network_status":"approved_by_network","reason":null,"risk_level":"normal","risk_score":41,"seller_message":"Payment complete.","type":"authorized"},"paid":true,"payment_intent":null,"payment_method_details":{"card":{"brand":"visa","checks":{"address_line1_check":null,"address_postal_code_check":"pass","cvc_check":null},"country":"US","exp_month":2,"exp_year":2042,"fingerprint":"UohEe8UAbr0jkmyo","funding":"credit","last4":"4242","three_d_secure":null,"wallet":null},"type":"card"},"receipt_email":"rafiki910@hotmail.es","receipt_number":null,"receipt_url":"https://pay.stripe.com/receipts/acct_1E0fSCA6cDuc9PFf/ch_1EJTE1A6cDuc9PFf0sthjTUw/rcpt_En3KiKpuPFJkgFgwOIZy8HcL2Glr6Fz","refunded":false,"refunds":{"object":"list","data":[],"has_more":false,"total_count":0,"url":"/v1/charges/ch_1EJTE1A6cDuc9PFf0sthjTUw/refunds"},"review":null,"shipping":null,"source":{"id":"card_1EHFsqA6cDuc9PFfunm9xBu8","object":"card","address_city":null,"address_country":null,"address_line1":null,"address_line1_check":null,"address_line2":null,"address_state":null,"address_zip":"24242","address_zip_check":"pass","brand":"Visa","country":"US","customer":"cus_EklP9RNUCGccmW","cvc_check":null,"dynamic_last4":null,"exp_month":2,"exp_year":2042,"fingerprint":"UohEe8UAbr0jkmyo","funding":"credit","last4":"4242","metadata":{},"name":"rafiki910@hotmail.es","tokenization_method":null},"source_transfer":null,"statement_descriptor":null,"status":"succeeded","transfer_data":null,"transfer_group":null}	495128	ch_1EJTE1A6cDuc9PFf0sthjTUw	cus_EklP9RNUCGccmW	t	t	TheRealStormy	10	18	Aardvark	0	2	t	2019-04-22 20:34:05.909981	2019-04-22 20:31:01.126735	2019-04-22 20:34:10.975251	0
\.


--
-- Data for Name: views; Type: TABLE DATA; Schema: public; Owner: stormy
--

COPY public.views (id, uuid, ip, user_id, medium_id, created_at, updated_at) FROM stdin;
169	b73c5264-6974-4cce-934f-a20b73d48da0	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	54c277c0-19c3-4eea-97f0-fde6b977b67e	2019-05-03 04:01:52.549451	2019-05-03 04:01:52.549451
170	a4ee6fa0-eb79-450c-a1c7-6b2ccfd2ecf6	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	66f8b5ac-5dfa-4cc8-8d3a-14c6b205fd38	2019-05-03 04:04:25.687701	2019-05-03 04:04:25.687701
172	3ff577fe-3036-4309-9385-27c9a848b00e	4b84b15bff6ee5796152495a230e45e3d7e947d9	02b49ce7-22fd-429f-b1b1-55cfad638f59	58eaf0b1-6cec-4b6c-873e-eec7d3ba375d	2019-05-05 06:35:37.500925	2019-05-05 06:35:37.500925
173	3c615d02-f391-4afa-b26c-2ed3e5d3fecd	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	0bbf4f60-5c57-4fc5-80a8-56c111cf0ab0	2019-05-05 23:39:51.156171	2019-05-05 23:39:51.156171
174	63ea6af2-bdb0-4086-ba34-026df09e243f	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	0af34b1a-2dbb-4842-a625-e0620b101d7c	2019-05-05 23:39:56.910035	2019-05-05 23:39:56.910035
175	85b514e6-0381-428d-a03c-d5c79faa66d3	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	3cd6c36c-c3d2-46cc-a207-50d085a5e36b	2019-05-05 23:40:02.758686	2019-05-05 23:40:02.758686
176	cdc2e29a-0a9b-4804-b2e0-b3d2d6de9fb4	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	d169aa9b-b2b6-4192-b6a1-066f35811cbd	2019-05-05 23:40:07.847582	2019-05-05 23:40:07.847582
178	33a8b34c-d29c-4f9b-92cf-9eddf53dc4e3	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	368f2b54-9e9b-47a8-a07a-53cdea778912	2019-05-08 09:41:03.941403	2019-05-08 09:41:03.941403
182	f3f033de-2fc4-4cd4-8e62-1fff8eb687f9	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	eea1cb0c-3998-429b-99c6-4df98c2c3229	2019-05-08 09:58:57.18078	2019-05-08 09:58:57.18078
183	24130e21-8e2b-44a2-ac04-8de7330740b2	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	8cae3a07-02be-4c44-8db6-8f0c596b0341	2019-05-08 10:15:09.867078	2019-05-08 10:15:09.867078
184	94a3fa37-d24a-40a6-b417-d2a845ac9944	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	5972f3b1-fdc5-4052-baa1-61267f07e73a	2019-05-08 20:28:30.380309	2019-05-08 20:28:30.380309
185	4ae15680-45fc-407c-a70e-78bae0d4b575	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	00681928-a21b-4663-a0c4-02a9c9e562dd	2019-05-10 06:27:51.116725	2019-05-10 06:27:51.116725
186	7a1e6d7b-df62-4990-b13e-df297378354c	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	ce7324fc-2a1e-4754-aafb-d1d75c10d649	2019-05-10 06:35:49.393801	2019-05-10 06:35:49.393801
189	57e4fdb0-eb54-45ca-a9d8-80c9dfedf693	4b84b15bff6ee5796152495a230e45e3d7e947d9	3e69717e-9803-4fc1-9909-419092780574	865e39c8-13e4-4c0f-ad5d-04161252db5f	2019-05-12 09:28:13.122883	2019-05-12 09:28:13.122883
\.


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.active_admin_comments_id_seq', 1, false);


--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.active_storage_attachments_id_seq', 1, false);


--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.active_storage_blobs_id_seq', 1, false);


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.activities_id_seq', 248, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, false);


--
-- Name: adverts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.adverts_id_seq', 28, true);


--
-- Name: announcements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.announcements_id_seq', 4, true);


--
-- Name: apps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.apps_id_seq', 1, true);


--
-- Name: asset_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.asset_requests_id_seq', 4, true);


--
-- Name: banned_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.banned_users_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.categories_id_seq', 40, true);


--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.chats_id_seq', 1, false);


--
-- Name: chronofage_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.chronofage_jobs_id_seq', 1, false);


--
-- Name: claims_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.claims_id_seq', 89, true);


--
-- Name: comment_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.comment_reports_id_seq', 8, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.comments_id_seq', 17, true);


--
-- Name: commission_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.commission_statuses_id_seq', 4, true);


--
-- Name: editions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.editions_id_seq', 2969, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.events_id_seq', 592, true);


--
-- Name: faves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.faves_id_seq', 12, true);


--
-- Name: follows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.follows_id_seq', 39, true);


--
-- Name: friendly_id_slugs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.friendly_id_slugs_id_seq', 1, false);


--
-- Name: fursuit_builds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_builds_id_seq', 2, true);


--
-- Name: fursuit_fingers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_fingers_id_seq', 4, true);


--
-- Name: fursuit_genders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_genders_id_seq', 2, true);


--
-- Name: fursuit_leg_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_leg_types_id_seq', 3, true);


--
-- Name: fursuit_makers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_makers_id_seq', 437675, true);


--
-- Name: fursuit_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_media_id_seq', 120, true);


--
-- Name: fursuit_paddings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_paddings_id_seq', 3, true);


--
-- Name: fursuit_species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_species_id_seq', 423, true);


--
-- Name: fursuit_styles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_styles_id_seq', 3, true);


--
-- Name: fursuit_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_subscriptions_id_seq', 16, true);


--
-- Name: fursuit_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuit_users_id_seq', 33, true);


--
-- Name: fursuits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.fursuits_id_seq', 442322, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.likes_id_seq', 26, true);


--
-- Name: lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.lists_id_seq', 1, false);


--
-- Name: lists_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.lists_users_id_seq', 1, false);


--
-- Name: maker_claims_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.maker_claims_id_seq', 6, true);


--
-- Name: maker_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.maker_subscriptions_id_seq', 10, true);


--
-- Name: makers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.makers_id_seq', 4500, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.media_id_seq', 368, true);


--
-- Name: medium_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.medium_reports_id_seq', 23, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: moderation_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.moderation_comments_id_seq', 2, true);


--
-- Name: moderators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.moderators_id_seq', 2, true);


--
-- Name: panels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.panels_id_seq', 1, false);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.reports_id_seq', 9, true);


--
-- Name: ribbon_announcements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.ribbon_announcements_id_seq', 1, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.sessions_id_seq', 39, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.species_id_seq', 418, true);


--
-- Name: sponsors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.sponsors_id_seq', 90, true);


--
-- Name: statistics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.statistics_id_seq', 5, true);


--
-- Name: sub_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.sub_events_id_seq', 2, true);


--
-- Name: suspended_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.suspended_users_id_seq', 10, true);


--
-- Name: tag_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.tag_reports_id_seq', 13, true);


--
-- Name: taggings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.taggings_id_seq', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: tech_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.tech_reports_id_seq', 20, true);


--
-- Name: tooltips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.tooltips_id_seq', 135, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.users_id_seq', 254, true);


--
-- Name: views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stormy
--

SELECT pg_catalog.setval('public.views_id_seq', 189, true);


--
-- Name: active_admin_comments active_admin_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.active_admin_comments
    ADD CONSTRAINT active_admin_comments_pkey PRIMARY KEY (id);


--
-- Name: active_storage_attachments active_storage_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.active_storage_attachments
    ADD CONSTRAINT active_storage_attachments_pkey PRIMARY KEY (id);


--
-- Name: active_storage_blobs active_storage_blobs_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.active_storage_blobs
    ADD CONSTRAINT active_storage_blobs_pkey PRIMARY KEY (id);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: adverts adverts_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT adverts_pkey PRIMARY KEY (id);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: apps apps_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.apps
    ADD CONSTRAINT apps_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: asset_requests asset_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.asset_requests
    ADD CONSTRAINT asset_requests_pkey PRIMARY KEY (id);


--
-- Name: banned_users banned_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.banned_users
    ADD CONSTRAINT banned_users_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: chronofage_jobs chronofage_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.chronofage_jobs
    ADD CONSTRAINT chronofage_jobs_pkey PRIMARY KEY (id);


--
-- Name: claims claims_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (id);


--
-- Name: comment_reports comment_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.comment_reports
    ADD CONSTRAINT comment_reports_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: commission_statuses commission_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.commission_statuses
    ADD CONSTRAINT commission_statuses_pkey PRIMARY KEY (id);


--
-- Name: editions editions_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.editions
    ADD CONSTRAINT editions_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: faves faves_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.faves
    ADD CONSTRAINT faves_pkey PRIMARY KEY (id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);


--
-- Name: friendly_id_slugs friendly_id_slugs_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.friendly_id_slugs
    ADD CONSTRAINT friendly_id_slugs_pkey PRIMARY KEY (id);


--
-- Name: fursuit_builds fursuit_builds_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_builds
    ADD CONSTRAINT fursuit_builds_pkey PRIMARY KEY (id);


--
-- Name: fursuit_fingers fursuit_fingers_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_fingers
    ADD CONSTRAINT fursuit_fingers_pkey PRIMARY KEY (id);


--
-- Name: fursuit_genders fursuit_genders_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_genders
    ADD CONSTRAINT fursuit_genders_pkey PRIMARY KEY (id);


--
-- Name: fursuit_leg_types fursuit_leg_types_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_leg_types
    ADD CONSTRAINT fursuit_leg_types_pkey PRIMARY KEY (id);


--
-- Name: fursuit_makers fursuit_makers_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_makers
    ADD CONSTRAINT fursuit_makers_pkey PRIMARY KEY (id);


--
-- Name: fursuit_media fursuit_media_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_media
    ADD CONSTRAINT fursuit_media_pkey PRIMARY KEY (id);


--
-- Name: fursuit_paddings fursuit_paddings_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_paddings
    ADD CONSTRAINT fursuit_paddings_pkey PRIMARY KEY (id);


--
-- Name: fursuit_species fursuit_species_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_species
    ADD CONSTRAINT fursuit_species_pkey PRIMARY KEY (id);


--
-- Name: fursuit_styles fursuit_styles_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_styles
    ADD CONSTRAINT fursuit_styles_pkey PRIMARY KEY (id);


--
-- Name: fursuit_subscriptions fursuit_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_subscriptions
    ADD CONSTRAINT fursuit_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: fursuit_users fursuit_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuit_users
    ADD CONSTRAINT fursuit_users_pkey PRIMARY KEY (id);


--
-- Name: fursuits fursuits_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.fursuits
    ADD CONSTRAINT fursuits_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- Name: lists_users lists_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.lists_users
    ADD CONSTRAINT lists_users_pkey PRIMARY KEY (id);


--
-- Name: maker_claims maker_claims_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.maker_claims
    ADD CONSTRAINT maker_claims_pkey PRIMARY KEY (id);


--
-- Name: maker_subscriptions maker_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.maker_subscriptions
    ADD CONSTRAINT maker_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: makers makers_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.makers
    ADD CONSTRAINT makers_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: medium_reports medium_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.medium_reports
    ADD CONSTRAINT medium_reports_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: moderation_comments moderation_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.moderation_comments
    ADD CONSTRAINT moderation_comments_pkey PRIMARY KEY (id);


--
-- Name: moderators moderators_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.moderators
    ADD CONSTRAINT moderators_pkey PRIMARY KEY (id);


--
-- Name: panels panels_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.panels
    ADD CONSTRAINT panels_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: ribbon_announcements ribbon_announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.ribbon_announcements
    ADD CONSTRAINT ribbon_announcements_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: sponsors sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (id);


--
-- Name: statistics statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_pkey PRIMARY KEY (id);


--
-- Name: sub_events sub_events_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.sub_events
    ADD CONSTRAINT sub_events_pkey PRIMARY KEY (id);


--
-- Name: suspended_users suspended_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.suspended_users
    ADD CONSTRAINT suspended_users_pkey PRIMARY KEY (id);


--
-- Name: tag_reports tag_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tag_reports
    ADD CONSTRAINT tag_reports_pkey PRIMARY KEY (id);


--
-- Name: taggings taggings_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.taggings
    ADD CONSTRAINT taggings_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tech_reports tech_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tech_reports
    ADD CONSTRAINT tech_reports_pkey PRIMARY KEY (id);


--
-- Name: tooltips tooltips_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.tooltips
    ADD CONSTRAINT tooltips_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: views views_pkey; Type: CONSTRAINT; Schema: public; Owner: stormy
--

ALTER TABLE ONLY public.views
    ADD CONSTRAINT views_pkey PRIMARY KEY (id);


--
-- Name: index_active_admin_comments_on_author_type_and_author_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_active_admin_comments_on_author_type_and_author_id ON public.active_admin_comments USING btree (author_type, author_id);


--
-- Name: index_active_admin_comments_on_namespace; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_active_admin_comments_on_namespace ON public.active_admin_comments USING btree (namespace);


--
-- Name: index_active_admin_comments_on_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_active_admin_comments_on_resource_type_and_resource_id ON public.active_admin_comments USING btree (resource_type, resource_id);


--
-- Name: index_active_storage_attachments_on_blob_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_active_storage_attachments_on_blob_id ON public.active_storage_attachments USING btree (blob_id);


--
-- Name: index_active_storage_attachments_uniqueness; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_active_storage_attachments_uniqueness ON public.active_storage_attachments USING btree (record_type, record_id, name, blob_id);


--
-- Name: index_active_storage_blobs_on_key; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_active_storage_blobs_on_key ON public.active_storage_blobs USING btree (key);


--
-- Name: index_activities_on_owner_id_and_owner_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_activities_on_owner_id_and_owner_type ON public.activities USING btree (owner_id, owner_type);


--
-- Name: index_activities_on_owner_type_and_owner_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_activities_on_owner_type_and_owner_id ON public.activities USING btree (owner_type, owner_id);


--
-- Name: index_activities_on_recipient_id_and_recipient_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_activities_on_recipient_id_and_recipient_type ON public.activities USING btree (recipient_id, recipient_type);


--
-- Name: index_activities_on_recipient_type_and_recipient_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_activities_on_recipient_type_and_recipient_id ON public.activities USING btree (recipient_type, recipient_id);


--
-- Name: index_activities_on_trackable_id_and_trackable_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_activities_on_trackable_id_and_trackable_type ON public.activities USING btree (trackable_id, trackable_type);


--
-- Name: index_activities_on_trackable_type_and_trackable_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_activities_on_trackable_type_and_trackable_id ON public.activities USING btree (trackable_type, trackable_id);


--
-- Name: index_admin_users_on_email; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_admin_users_on_email ON public.admin_users USING btree (email);


--
-- Name: index_admin_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_admin_users_on_reset_password_token ON public.admin_users USING btree (reset_password_token);


--
-- Name: index_asset_requests_on_assignee_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_asset_requests_on_assignee_id ON public.asset_requests USING btree (assignee_id);


--
-- Name: index_asset_requests_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_asset_requests_on_user_id ON public.asset_requests USING btree (user_id);


--
-- Name: index_banned_users_on_telegram_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_banned_users_on_telegram_id ON public.banned_users USING btree (telegram_id);


--
-- Name: index_chats_on_recipient_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_chats_on_recipient_id ON public.chats USING btree (recipient_id);


--
-- Name: index_chats_on_sender_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_chats_on_sender_id ON public.chats USING btree (sender_id);


--
-- Name: index_chats_on_uuid; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_chats_on_uuid ON public.chats USING btree (uuid);


--
-- Name: index_claims_on_fursuit_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_claims_on_fursuit_id ON public.claims USING btree (fursuit_id);


--
-- Name: index_claims_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_claims_on_user_id ON public.claims USING btree (user_id);


--
-- Name: index_comment_reports_on_assignee_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_comment_reports_on_assignee_id ON public.comment_reports USING btree (assignee_id);


--
-- Name: index_comment_reports_on_comment_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_comment_reports_on_comment_id ON public.comment_reports USING btree (comment_id);


--
-- Name: index_comment_reports_on_reporter_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_comment_reports_on_reporter_id ON public.comment_reports USING btree (reporter_id);


--
-- Name: index_editions_on_name; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_editions_on_name ON public.editions USING gin (to_tsvector('english'::regconfig, (name)::text));


--
-- Name: index_events_on_name; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_events_on_name ON public.events USING gin (to_tsvector('english'::regconfig, (name)::text));


--
-- Name: index_faves_on_medium_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_faves_on_medium_id ON public.faves USING btree (medium_id);


--
-- Name: index_faves_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_faves_on_user_id ON public.faves USING btree (user_id);


--
-- Name: index_friendly_id_slugs_on_slug_and_sluggable_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_friendly_id_slugs_on_slug_and_sluggable_type ON public.friendly_id_slugs USING btree (slug, sluggable_type);


--
-- Name: index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope ON public.friendly_id_slugs USING btree (slug, sluggable_type, scope);


--
-- Name: index_friendly_id_slugs_on_sluggable_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_friendly_id_slugs_on_sluggable_id ON public.friendly_id_slugs USING btree (sluggable_id);


--
-- Name: index_friendly_id_slugs_on_sluggable_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_friendly_id_slugs_on_sluggable_type ON public.friendly_id_slugs USING btree (sluggable_type);


--
-- Name: index_fursuit_media_on_fursuit_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_media_on_fursuit_id ON public.fursuit_media USING btree (fursuit_id);


--
-- Name: index_fursuit_media_on_medium_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_media_on_medium_id ON public.fursuit_media USING btree (medium_id);


--
-- Name: index_fursuit_media_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_media_on_user_id ON public.fursuit_media USING btree (user_id);


--
-- Name: index_fursuit_species_on_fursuit_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_species_on_fursuit_id ON public.fursuit_species USING btree (fursuit_id);


--
-- Name: index_fursuit_species_on_specy_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_species_on_specy_id ON public.fursuit_species USING btree (specy_id);


--
-- Name: index_fursuit_subscriptions_on_fursuit_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_subscriptions_on_fursuit_id ON public.fursuit_subscriptions USING btree (fursuit_id);


--
-- Name: index_fursuit_subscriptions_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuit_subscriptions_on_user_id ON public.fursuit_subscriptions USING btree (user_id);


--
-- Name: index_fursuits_on_fursuit_gender_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_fursuits_on_fursuit_gender_id ON public.fursuits USING btree (fursuit_gender_id);


--
-- Name: index_maker_claims_on_maker_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_maker_claims_on_maker_id ON public.maker_claims USING btree (maker_id);


--
-- Name: index_maker_claims_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_maker_claims_on_user_id ON public.maker_claims USING btree (user_id);


--
-- Name: index_maker_subscriptions_on_maker_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_maker_subscriptions_on_maker_id ON public.maker_subscriptions USING btree (maker_id);


--
-- Name: index_maker_subscriptions_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_maker_subscriptions_on_user_id ON public.maker_subscriptions USING btree (user_id);


--
-- Name: index_makers_on_commission_status_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_makers_on_commission_status_id ON public.makers USING btree (commission_status_id);


--
-- Name: index_makers_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_makers_on_user_id ON public.makers USING btree (user_id);


--
-- Name: index_media_on_slug; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_media_on_slug ON public.media USING btree (slug);


--
-- Name: index_media_on_title; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_media_on_title ON public.media USING gin (to_tsvector('english'::regconfig, (title)::text));


--
-- Name: index_medium_reports_on_assignee_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_medium_reports_on_assignee_id ON public.medium_reports USING btree (assignee_id);


--
-- Name: index_medium_reports_on_medium_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_medium_reports_on_medium_id ON public.medium_reports USING btree (medium_id);


--
-- Name: index_medium_reports_on_reporter_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_medium_reports_on_reporter_id ON public.medium_reports USING btree (reporter_id);


--
-- Name: index_messages_on_chat_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_messages_on_chat_id ON public.messages USING btree (chat_id);


--
-- Name: index_messages_on_created_at; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_messages_on_created_at ON public.messages USING btree (created_at);


--
-- Name: index_messages_on_sender_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_messages_on_sender_id ON public.messages USING btree (sender_id);


--
-- Name: index_messages_on_uuid; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_messages_on_uuid ON public.messages USING btree (uuid);


--
-- Name: index_moderation_comments_on_moderator_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_moderation_comments_on_moderator_id ON public.moderation_comments USING btree (moderator_id);


--
-- Name: index_moderation_comments_on_subject_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_moderation_comments_on_subject_id ON public.moderation_comments USING btree (subject_id);


--
-- Name: index_moderators_on_email; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_moderators_on_email ON public.moderators USING btree (email);


--
-- Name: index_moderators_on_reset_password_token; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_moderators_on_reset_password_token ON public.moderators USING btree (reset_password_token);


--
-- Name: index_reports_on_assignee_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_reports_on_assignee_id ON public.reports USING btree (assignee_id);


--
-- Name: index_reports_on_reporter_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_reports_on_reporter_id ON public.reports USING btree (reporter_id);


--
-- Name: index_reports_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_reports_on_user_id ON public.reports USING btree (user_id);


--
-- Name: index_sessions_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_sessions_on_user_id ON public.sessions USING btree (user_id);


--
-- Name: index_suspended_users_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_suspended_users_on_user_id ON public.suspended_users USING btree (user_id);


--
-- Name: index_tag_reports_on_assignee_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_tag_reports_on_assignee_id ON public.tag_reports USING btree (assignee_id);


--
-- Name: index_tag_reports_on_medium_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_tag_reports_on_medium_id ON public.tag_reports USING btree (medium_id);


--
-- Name: index_tag_reports_on_reporter_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_tag_reports_on_reporter_id ON public.tag_reports USING btree (reporter_id);


--
-- Name: index_taggings_on_context; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_context ON public.taggings USING btree (context);


--
-- Name: index_taggings_on_tag_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_tag_id ON public.taggings USING btree (tag_id);


--
-- Name: index_taggings_on_taggable_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_taggable_id ON public.taggings USING btree (taggable_id);


--
-- Name: index_taggings_on_taggable_id_and_taggable_type_and_context; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_taggable_id_and_taggable_type_and_context ON public.taggings USING btree (taggable_id, taggable_type, context);


--
-- Name: index_taggings_on_taggable_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_taggable_type ON public.taggings USING btree (taggable_type);


--
-- Name: index_taggings_on_taggable_type_and_taggable_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_taggable_type_and_taggable_id ON public.taggings USING btree (taggable_type, taggable_id);


--
-- Name: index_taggings_on_tagger_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_tagger_id ON public.taggings USING btree (tagger_id);


--
-- Name: index_taggings_on_tagger_id_and_tagger_type; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_tagger_id_and_tagger_type ON public.taggings USING btree (tagger_id, tagger_type);


--
-- Name: index_taggings_on_tagger_type_and_tagger_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_taggings_on_tagger_type_and_tagger_id ON public.taggings USING btree (tagger_type, tagger_id);


--
-- Name: index_tags_on_name; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_tags_on_name ON public.tags USING btree (name);


--
-- Name: index_users_on_name; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_users_on_name ON public.users USING gin (name public.gin_trgm_ops);


--
-- Name: index_users_on_slug; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX index_users_on_slug ON public.users USING btree (slug);


--
-- Name: index_views_on_ip; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_views_on_ip ON public.views USING btree (ip);


--
-- Name: index_views_on_medium_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_views_on_medium_id ON public.views USING btree (medium_id);


--
-- Name: index_views_on_user_id; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX index_views_on_user_id ON public.views USING btree (user_id);


--
-- Name: taggings_idx; Type: INDEX; Schema: public; Owner: stormy
--

CREATE UNIQUE INDEX taggings_idx ON public.taggings USING btree (tag_id, taggable_id, taggable_type, context, tagger_id, tagger_type);


--
-- Name: taggings_idy; Type: INDEX; Schema: public; Owner: stormy
--

CREATE INDEX taggings_idy ON public.taggings USING btree (taggable_id, taggable_type, tagger_id, context);


--
-- PostgreSQL database dump complete
--

