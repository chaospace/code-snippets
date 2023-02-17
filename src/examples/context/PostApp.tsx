/**
 * 레벨 context를 사용하는 다른 방법
 */

import {PropsWithChildren} from 'react';
import {Heading, Section} from './elements';

function Post({title, body}: PropsWithChildren<{title: string; body: string}>) {
  return (
    <Section isFancy>
      <Heading>{title}</Heading>
      <p>
        <i>{body}</i>
      </p>
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>Recent Posts</Heading>
      <Post title="Flavors of Lisbon" body="...those pastéis de nata!" />
      <Post title="Buenos Aires in the rhythm of tango" body="I loved it!" />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>Posts</Heading>
      <RecentPosts />
    </Section>
  );
}

function PostApp() {
  return (
    <Section>
      <Heading>마이 프로필</Heading>
      <Post title="포스트 타이틀" body="여기는 포스트 바디입니다." />
      <AllPosts />
    </Section>
  );
}

export default PostApp;
