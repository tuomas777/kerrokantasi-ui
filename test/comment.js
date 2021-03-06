import {renderIntoDocument} from 'react-addons-test-utils';
import Comment from 'components/Comment';
import {findDOMNode} from 'react-dom';
import {wireComponent, createTestStore, domDescribe} from './utils';
import React from 'react';

domDescribe('Comment', () => {
  it('should be able to render an anonymous comment without crashing', () => {
    const anonComment = {
      "id": "f00f00",
      "hearing": "f00f00",
      "content": "Reiciendis",
      "n_votes": 2,
      "created_by": null,
      "created_at": "2015-11-16T09:25:37.625607Z"
    };
    const comp = renderIntoDocument(wireComponent({}, Comment, {data: anonComment}));
    expect(findDOMNode(comp).className).to.contain("hearing-comment");
  });
});
