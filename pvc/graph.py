import networkx as nx
import matplotlib.pyplot as plt

class Vertex:
    def __init__(self, name, adj):
        self.name = name
        self.adj = adj.copy()

    def __repr__(self):
        return f"({self.name}) -> {self.adj}"

class Graph:
    SUBPLOT_NUM = 211

    def __init__(self, adj={}):
        self.vertices = { v: Vertex(v, adj[v]) for v in adj }

    def __repr__(self):
        return "<Graph:\n " + \
            "\n ".join(repr(v) for v in self.vertices.values()) + \
            "\n>"

    def __getitem__(self, name):
        return self.vertices[name]

    def __iter__(self):
        return iter(self.vertices)

    def edges(self):
        return [ (vertex, v, w) for vertex in self for v, w in self[vertex].adj ]

    def tomatrix(self):
        vertices = self.vertices.keys()
        n = len(vertices)
        indexes = { v: i for i, v in enumerate(vertices) }
        mat = [ None for _ in range(n) ]
        for vertex in vertices:
            arr = [ 0 for _ in range(n) ]
            for v, w in self[vertex].adj:
                arr[indexes[v]] = w
            mat[indexes[vertex]] = arr
        return mat

    def draw(self, title=None, edge_color_key={}, default_edge_color="black", visualize=False):
        nxgraph = nx.Graph()
        nxgraph.add_weighted_edges_from(self.edges())
        edge_color = [ edge_color_key.get(e, default_edge_color) for e in nxgraph.edges() ]
        edge_labels = nx.get_edge_attributes(nxgraph, "weight")
        plt.subplot(Graph.SUBPLOT_NUM, title=title)
        Graph.SUBPLOT_NUM += 1
        nx.draw_circular(nxgraph, node_color="red", edge_color=edge_color, font_weight="bold", with_labels=True)
        nx.draw_networkx_edge_labels(nxgraph, pos=nx.circular_layout(nxgraph), edge_labels=edge_labels)
        if visualize:
            plt.show()

    def vertices_number(self):
        return len(self.vertices)

    def add_edge(self, v, u, c):
        if v not in self.vertices:
            self.vertices[v] = Vertex(v, set())
        if u not in self.vertices:
            self.vertices[u] = Vertex(u, set())
        self[v].adj.add((u,c))
        self[u].adj.add((v,c))

    def unrepeated_edges(self):
        edges = []
        visited = []
        for vertex in self :
            for (v,c) in self[vertex].adj :
                if v not in visited:
                    edges.append((vertex, v, c))
                    visited.append(vertex)
        return edges
