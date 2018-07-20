# Mixed Binary Program

The code consists in a generalized solution of the "Tiny Planning Problem" proposed in the first chapter of the book "[Production Planning by Mixed Integer Programming](https://books.google.com.br/books?id=FwCzl07Y8WEC&printsec=frontcover&hl=pt-BR&redir_esc=y#v=onepage&q&f=false)" written by Yves Pochet and Laurence A. Wosley. This solution contains the CPLEX Optimzer model and a web interface to display each one of the models.

# Problem

Optimize a cost model that contains demand, production, unit cost, set-up cost, inventory cost and end inventory, in an arbitrary period of time. The unit cost, set-up cost and inventory cost are fixed, while the demand is variable for each month, so it's necessary to find the optimal production for each period to obtain the lowest cost possible.

So the Total inventory Cost can be represented by:

<img src="https://tex.s2cms.ru/svg/Inventory%20Cost%20%3D%20%5Csum_%7Bt%3D0%7D%5E%7BNT%7D%20hcost%20%5Ccdot%20%5Cfrac%7BINV_%7Bt-1%7D%20%2B%20INV%7D%7B2%7D" alt="Inventory Cost = \sum_{t=0}^{NT} hcost \cdot \frac{INV_{t-1} + INV}{2}" />

And the total cost is:

<img src="https://tex.s2cms.ru/svg/MinCost%20%3A%3D%20%5Csum_%7Bt%3D0%7D%5E%7BNT%7D(p%20x_t%20%2B%20qx_t)%20%20%2B%20%5Csum_%7Bt%3D0%7D%5E%7BNT%7D%20h%20s_t%20%2B%20%5Cfrac%7Bh%7D%7B2%7Ds_%7BNT%7D" alt="MinCost := \sum_{t=0}^{NT}(p x_t + qx_t)  + \sum_{t=0}^{NT} h s_t + \frac{h}{2}s_{NT}" />

Where in the data: _NT_ stands for the total time period, _p_ is the production unit cost and _q_ is the set-up cost.

And the variables are: _x_: the production size, _yt_: the production set-up and _s_: end inventory level.

To solve the problem, there are some constraints that should be taken in consideration:

The demand satisfaction constraint which ensures that the production and the inventory are capable to supply all the demand in each period and can be modeled as

<img src="https://tex.s2cms.ru/svg/dem%5C_sat%20%3A%3D%20s_%7Bt-1%7D%20%2B%20x_t%20%3D%20d_t%20%2B%20s_t" alt="dem\_sat := s_{t-1} + x_t = d_t + s_t" />   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _for all t = 1, . . . , NT_

<img src="https://tex.s2cms.ru/svg/s_0%20%3D%20s_%7Binit%7D%2C%20s_%7BNT%7D%20%3D%200" alt="s_0 = s_{init}, s_{NT} = 0" /> ,

The variable upper bound (VUB) constraint, a classical generic constraint used to enforce a set-up:

<img src="https://tex.s2cms.ru/svg/vub_t%20%3A%3D%20x_t%20%5Cleq%20%5Csum_%7Bk%3Dt%7D%5E%7BNT%7D(d_k)y_t%20" alt="vub_t := x_t \leq \sum_{k=t}^{NT}(d_k)y_t " />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _for all t = 1, . . . , NT_

<img src="https://tex.s2cms.ru/svg/x_t%2C%20s_t%20%20%5Cin%20%5CRe_%2B%2C%20y_t%20%5Cin%20%5C%7B0%2C1%5C%7D%20" alt="x_t, s_t  \in \Re_+, y_t \in \{0,1\} " />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _for all t = 1, . . . , NT_
