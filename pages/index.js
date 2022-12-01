import Head from 'next/head';
import { MongoClient } from 'mongodb';

import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge hilst of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//     const request = context.req
//     const response = context.res
//     // fetch data from an API, database
//     return{
//         props: DUMMY_MEETUPS
//     }
// }
export async function getStaticProps() {
  //fetch data from an API, database
  const client = await MongoClient.connect(
    'mongodb+srv://learning:stella2018@cluster0.tcs9qlo.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
