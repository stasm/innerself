# innerself example 03

An example illustrating how much hand-holding innerself needs to handle
form-based elements.  Because the assignment to innerHTML completely re-creates
the entire DOM tree under the root, all local state of the descendant elements
is lost upop re-render.  Focus and selection need to be restored manually.

To install the dependencies and serve the example locally run:

    $ npm install
    $ npm start
